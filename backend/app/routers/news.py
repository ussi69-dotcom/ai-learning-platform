"""
News Feed Router - Aggregates AI news from multiple sources.

Endpoints:
- GET /news - Get cached news items (public, no auth required)
- POST /news/refresh - Manually trigger refresh (admin only)
"""

from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, timedelta
import logging

from app import models, schemas, database, auth
from app.services.news_aggregator import NewsAggregator

router = APIRouter(prefix="/news", tags=["news"])
logger = logging.getLogger(__name__)


@router.get("/", response_model=List[schemas.NewsItemResponse])
async def get_news(
    limit: int = Query(default=12, ge=1, le=50),
    source: Optional[str] = Query(default=None, description="Filter by source: youtube, rss, hackernews, papers"),
    lang: Optional[str] = Query(default=None, description="Filter by language: en, cs"),
    db: Session = Depends(database.get_db)
):
    """
    Get latest AI news items.

    No authentication required - news is public.
    Results are cached and refreshed every 30 minutes.
    Supports filtering by language (en=English, cs=Czech).
    """
    query = db.query(models.NewsItem).order_by(models.NewsItem.published_at.desc())

    # Filter by source if specified
    if source:
        try:
            source_enum = models.NewsSource(source.lower())
            query = query.filter(models.NewsItem.source == source_enum)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid source. Must be one of: youtube, rss, hackernews, papers"
            )

    # Filter by language if specified
    # For EN: exclude Czech content (show EN + NULL language, which is mostly English)
    # For CS: show only Czech content
    if lang:
        if lang.lower() not in ["en", "cs"]:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid language. Must be one of: en, cs"
            )
        if lang.lower() == "en":
            # Exclude Czech content - show everything else (EN + untagged)
            query = query.filter(
                (models.NewsItem.language != "cs") | (models.NewsItem.language.is_(None))
            )
        elif lang.lower() == "cs":
            # Show only Czech content
            query = query.filter(models.NewsItem.language == "cs")

    items = query.limit(limit).all()
    return items


@router.get("/hot", response_model=List[schemas.NewsItemResponse])
async def get_hot_news(
    limit: int = Query(default=40, ge=1, le=100),
    lang: Optional[str] = Query(default=None, description="Filter by language: en, cs"),
    db: Session = Depends(database.get_db)
):
    """
    Get hot/trending AI news from the last 14 days.

    Returns engaging content for AI enthusiasts (YouTube, RSS blogs, HN).
    EXCLUDES academic papers - those are too technical for casual readers.
    Uses flexible source allocation - if one source has fewer items, others fill the gap.
    Supports language filtering (en=English only, cs=Czech only).
    Default: 40 items for rich content display.
    """
    two_weeks_ago = datetime.utcnow() - timedelta(days=14)

    # Build query - EXCLUDE Papers (too academic for casual readers)
    # Focus on engaging content: YouTube videos, blog articles, HN discussions
    engaging_sources = [
        models.NewsSource.YOUTUBE,
        models.NewsSource.RSS,
        models.NewsSource.HACKERNEWS,
    ]

    query = db.query(models.NewsItem).filter(
        models.NewsItem.published_at >= two_weeks_ago,
        models.NewsItem.source.in_(engaging_sources)
    )

    # Apply language filter if specified
    # For EN: exclude Czech content (show EN + NULL language, which is mostly English)
    # For CS: show only Czech content
    if lang:
        if lang.lower() == "en":
            # Exclude Czech content - show everything else (EN + untagged)
            query = query.filter(
                (models.NewsItem.language != "cs") | (models.NewsItem.language.is_(None))
            )
        elif lang.lower() == "cs":
            # Show only Czech content
            query = query.filter(models.NewsItem.language == "cs")

    # Get all recent items sorted by date
    all_items = query.order_by(
        models.NewsItem.published_at.desc()
    ).limit(limit * 2).all()  # Fetch extra for diversity balancing

    # Balance sources - YouTube videos, RSS articles, HN discussions
    # Target ratios: YouTube 30%, RSS 55%, HN 15%
    source_targets = {
        models.NewsSource.YOUTUBE: int(limit * 0.30),
        models.NewsSource.RSS: int(limit * 0.55),
        models.NewsSource.HACKERNEWS: int(limit * 0.15),
    }

    # Group items by source
    by_source = {source: [] for source in engaging_sources}
    for item in all_items:
        by_source[item.source].append(item)

    # First pass: take up to target from each source
    result = []
    remaining_slots = limit

    for source, target in source_targets.items():
        take = min(target, len(by_source[source]), remaining_slots)
        result.extend(by_source[source][:take])
        by_source[source] = by_source[source][take:]  # Remove taken items
        remaining_slots -= take

    # Second pass: fill remaining slots with whatever is left (sorted by date)
    if remaining_slots > 0:
        leftover = []
        for items_list in by_source.values():
            leftover.extend(items_list)
        leftover.sort(key=lambda x: x.published_at or datetime.min, reverse=True)
        result.extend(leftover[:remaining_slots])

    # Final sort by date
    result.sort(key=lambda x: x.published_at or datetime.min, reverse=True)

    return result[:limit]


@router.get("/stats")
async def get_news_stats(
    lang: Optional[str] = Query(default=None, description="Filter by language: en, cs"),
    db: Session = Depends(database.get_db)
):
    """
    Get news statistics by source.
    Optionally filter by language.
    """
    stats = {}

    base_query = db.query(models.NewsItem)
    if lang and lang.lower() in ["en", "cs"]:
        base_query = base_query.filter(models.NewsItem.language == lang.lower())

    for source in models.NewsSource:
        count = base_query.filter(models.NewsItem.source == source).count()
        stats[source.value] = count

    total = base_query.count()
    stats["total"] = total

    # Add language-specific counts
    stats["cs_total"] = db.query(models.NewsItem).filter(models.NewsItem.language == "cs").count()
    stats["en_total"] = db.query(models.NewsItem).filter(models.NewsItem.language == "en").count()

    return stats


@router.post("/refresh", response_model=schemas.NewsRefreshResponse)
async def refresh_news(
    background_tasks: BackgroundTasks,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Manually trigger news refresh.

    Requires authentication (admin only in production).
    Runs in background to avoid blocking.
    """
    # In production, you'd check if user is admin
    # if not current_user.is_admin:
    #     raise HTTPException(status_code=403, detail="Admin access required")

    aggregator = NewsAggregator(db)

    # Run refresh in background
    background_tasks.add_task(aggregator.refresh_all)

    return schemas.NewsRefreshResponse(
        status="refresh_started",
        items_fetched=0,  # Will be updated async
        sources_status={"message": "Refresh started in background"}
    )


@router.post("/refresh/sync", response_model=schemas.NewsRefreshResponse)
async def refresh_news_sync(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Synchronously refresh news (for testing/debugging).

    Warning: This can take 10-30 seconds depending on API response times.
    """
    aggregator = NewsAggregator(db)

    try:
        result = await aggregator.refresh_all()
        return schemas.NewsRefreshResponse(
            status="success",
            items_fetched=result.get("total", 0),
            sources_status=result.get("sources", {})
        )
    except Exception as e:
        logger.error(f"News refresh failed: {e}")
        raise HTTPException(status_code=500, detail=f"Refresh failed: {str(e)}")
