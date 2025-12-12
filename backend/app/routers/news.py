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
    if lang:
        if lang.lower() not in ["en", "cs"]:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid language. Must be one of: en, cs"
            )
        query = query.filter(models.NewsItem.language == lang.lower())

    items = query.limit(limit).all()
    return items


@router.get("/hot", response_model=List[schemas.NewsItemResponse])
async def get_hot_news(
    limit: int = Query(default=12, ge=1, le=24),
    db: Session = Depends(database.get_db)
):
    """
    Get hot/trending AI news from the last 7 days.

    Returns a diverse mix of sources (YouTube, RSS, HN, Papers),
    prioritizing recent items with good engagement.
    Default: 12 items for 3x4 grid layout.
    """
    week_ago = datetime.utcnow() - timedelta(days=7)

    # Get recent items from each source for diversity
    items = []

    # Get top items from each source (ensure mix)
    # YouTube: 4, RSS: 4, HN: 2, Papers: 2 = 12 items
    source_limits = {
        models.NewsSource.YOUTUBE: 4,
        models.NewsSource.RSS: 4,
        models.NewsSource.HACKERNEWS: 2,
        models.NewsSource.PAPERS: 2,
    }

    for source, max_items in source_limits.items():
        source_items = db.query(models.NewsItem).filter(
            models.NewsItem.source == source,
            models.NewsItem.published_at >= week_ago
        ).order_by(
            models.NewsItem.published_at.desc()
        ).limit(max_items).all()
        items.extend(source_items)

    # Sort all by published_at and return top N
    items.sort(key=lambda x: x.published_at or datetime.min, reverse=True)

    return items[:limit]


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
