"""
Daily Digest Router - Perplexity AI Integration.

Endpoints:
- POST /digest/webhook - Receive daily digest from Perplexity (webhook)
- GET /digest - Get latest digest (public)
- GET /digest/{date} - Get digest for specific date (public)
"""

from fastapi import APIRouter, Depends, HTTPException, Header, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional
from datetime import datetime, date, timedelta
import logging
import os

from app import models, schemas, database

router = APIRouter(prefix="/digest", tags=["digest"])
logger = logging.getLogger(__name__)

# Webhook secret for authentication (set in .env)
WEBHOOK_SECRET = os.getenv("PERPLEXITY_WEBHOOK_SECRET", "")


@router.post("/webhook", response_model=schemas.DailyDigestResponse)
async def receive_digest_webhook(
    payload: schemas.DailyDigestWebhook,
    x_webhook_secret: Optional[str] = Header(None, alias="X-Webhook-Secret"),
    db: Session = Depends(database.get_db)
):
    """
    Receive daily digest from Perplexity scheduled task.

    Expected to be called daily at 08:00 CET.
    Stores the 4-section digest in the database.

    Authentication via X-Webhook-Secret header (optional for dev).
    """
    # Validate webhook secret in production
    if WEBHOOK_SECRET and x_webhook_secret != WEBHOOK_SECRET:
        logger.warning("Invalid webhook secret received")
        raise HTTPException(status_code=401, detail="Invalid webhook secret")

    # Use provided date or default to today
    digest_date = payload.digest_date or datetime.utcnow().replace(
        hour=8, minute=0, second=0, microsecond=0
    )

    # Check if digest for this date already exists
    existing = db.query(models.DailyDigest).filter(
        models.DailyDigest.digest_date >= digest_date.replace(hour=0, minute=0, second=0),
        models.DailyDigest.digest_date < digest_date.replace(hour=0, minute=0, second=0) + timedelta(days=1)
    ).first()

    if existing:
        # Update existing digest
        existing.summary_en = payload.summary_en
        existing.summary_cs = payload.summary_cs
        existing.feed_en = [item.model_dump() for item in payload.feed_en]
        existing.feed_cs = [item.model_dump() for item in payload.feed_cs]
        existing.raw_response = payload.raw_response
        existing.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(existing)
        logger.info(f"Updated daily digest for {digest_date.date()}")
        return existing

    # Create new digest
    new_digest = models.DailyDigest(
        digest_date=digest_date,
        summary_en=payload.summary_en,
        summary_cs=payload.summary_cs,
        feed_en=[item.model_dump() for item in payload.feed_en],
        feed_cs=[item.model_dump() for item in payload.feed_cs],
        raw_response=payload.raw_response,
        source="perplexity"
    )

    db.add(new_digest)
    db.commit()
    db.refresh(new_digest)

    logger.info(f"Created new daily digest for {digest_date.date()} with {len(payload.summary_en)} EN bullets")
    return new_digest


@router.get("", response_model=Optional[schemas.DailyDigestResponse])
async def get_latest_digest(
    lang: Optional[str] = Query(default=None, description="Filter response to specific language: en, cs"),
    db: Session = Depends(database.get_db)
):
    """
    Get the most recent daily digest.

    No authentication required - digests are public.
    Optionally filter to specific language sections only.
    """
    digest = db.query(models.DailyDigest).order_by(
        desc(models.DailyDigest.digest_date)
    ).first()

    if not digest:
        return None

    return digest


@router.get("/{digest_date}", response_model=Optional[schemas.DailyDigestResponse])
async def get_digest_by_date(
    digest_date: date,
    db: Session = Depends(database.get_db)
):
    """
    Get digest for a specific date.

    Date format: YYYY-MM-DD
    """
    start_of_day = datetime.combine(digest_date, datetime.min.time())
    end_of_day = start_of_day + timedelta(days=1)

    digest = db.query(models.DailyDigest).filter(
        models.DailyDigest.digest_date >= start_of_day,
        models.DailyDigest.digest_date < end_of_day
    ).first()

    if not digest:
        raise HTTPException(status_code=404, detail=f"No digest found for {digest_date}")

    return digest


@router.get("/history/list")
async def list_digest_dates(
    limit: int = Query(default=30, ge=1, le=90),
    db: Session = Depends(database.get_db)
):
    """
    List available digest dates (most recent first).

    Useful for building a digest archive/calendar.
    """
    digests = db.query(
        models.DailyDigest.id,
        models.DailyDigest.digest_date,
        models.DailyDigest.created_at
    ).order_by(
        desc(models.DailyDigest.digest_date)
    ).limit(limit).all()

    return [
        {
            "id": d.id,
            "date": d.digest_date.date().isoformat(),
            "created_at": d.created_at.isoformat()
        }
        for d in digests
    ]
