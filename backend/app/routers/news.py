"""
News Feed Router - Aggregates AI news from multiple sources.

Endpoints:
- GET /news - Get cached news items (public, no auth required)
- POST /news/refresh - Manually trigger refresh (admin only)
"""

from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional
import logging

from app import models, schemas, database, auth
from app.services.news_aggregator import NewsAggregator

router = APIRouter(prefix="/news", tags=["news"])
logger = logging.getLogger(__name__)


@router.get("/", response_model=List[schemas.NewsItemResponse])
async def get_news(
    limit: int = Query(default=12, ge=1, le=50),
    source: Optional[str] = Query(default=None, description="Filter by source: youtube, rss, hackernews, papers"),
    db: Session = Depends(database.get_db)
):
    """
    Get latest AI news items.

    No authentication required - news is public.
    Results are cached and refreshed every 30 minutes.
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

    items = query.limit(limit).all()
    return items


@router.get("/stats")
async def get_news_stats(db: Session = Depends(database.get_db)):
    """
    Get news statistics by source.
    """
    stats = {}
    for source in models.NewsSource:
        count = db.query(models.NewsItem).filter(models.NewsItem.source == source).count()
        stats[source.value] = count

    total = db.query(models.NewsItem).count()
    stats["total"] = total

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
