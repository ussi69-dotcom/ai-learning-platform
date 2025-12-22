"""
Admin Router - Protected endpoints for platform administration.

Access restricted to specific admin emails defined in ADMIN_EMAILS.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, text
from typing import List, Optional
from datetime import datetime, timedelta
from pydantic import BaseModel
import os

from app import models, schemas, database, auth

router = APIRouter(prefix="/admin", tags=["admin"])

# Admin emails - only these users can access admin endpoints
# Configure via ADMIN_EMAILS env var (comma-separated) or defaults to FIRST_SUPERUSER
def get_admin_emails() -> list:
    """Get admin emails from environment. Cached after first call."""
    env_admins = os.getenv("ADMIN_EMAILS", "")
    if env_admins:
        return [e.strip() for e in env_admins.split(",") if e.strip()]
    # Fallback to FIRST_SUPERUSER only
    superuser = os.getenv("FIRST_SUPERUSER", "admin@ai-platform.com")
    return [superuser]

ADMIN_EMAILS = get_admin_emails()


# === SCHEMAS ===

class UserAdminView(BaseModel):
    id: int
    email: str
    is_active: bool
    is_verified: bool
    difficulty: str
    xp: int
    avatar: Optional[str]
    current_streak: int
    longest_streak: int
    last_activity_date: Optional[datetime]
    created_at: Optional[datetime] = None
    courses_completed: int = 0
    lessons_completed: int = 0
    total_quiz_score: int = 0

    class Config:
        from_attributes = True


class UserProgressView(BaseModel):
    lesson_id: int
    lesson_title: Optional[str] = None
    course_title: Optional[str] = None
    completed_at: Optional[datetime]
    last_accessed: Optional[datetime]
    quiz_score: Optional[int]
    quiz_attempts: Optional[int]
    current_page: Optional[int]
    completed_labs: Optional[list] = []

    class Config:
        from_attributes = True


class SystemStatus(BaseModel):
    database: str
    redis: str
    total_users: int
    verified_users: int
    active_today: int
    active_week: int
    total_courses: int
    total_lessons: int
    total_news_items: int
    total_certificates: int


class TestResult(BaseModel):
    name: str
    status: str  # "pass", "fail", "warning"
    message: str
    duration_ms: Optional[int] = None


class SystemTestResults(BaseModel):
    timestamp: datetime
    overall_status: str
    tests: List[TestResult]


# === DEPENDENCIES ===

def get_admin_user(current_user: models.User = Depends(auth.get_current_user)) -> models.User:
    """Verify the current user is an admin."""
    if current_user.email not in ADMIN_EMAILS:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user


# === ENDPOINTS ===

@router.get("/status", response_model=SystemStatus)
def get_system_status(
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(get_admin_user)
):
    """Get overall system status and statistics."""
    now = datetime.utcnow()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_ago = now - timedelta(days=7)

    # Count users
    total_users = db.query(models.User).count()
    verified_users = db.query(models.User).filter(models.User.is_verified == True).count()

    # Active users (based on last_activity_date)
    active_today = db.query(models.User).filter(
        models.User.last_activity_date >= today_start
    ).count()
    active_week = db.query(models.User).filter(
        models.User.last_activity_date >= week_ago
    ).count()

    # Content counts
    total_courses = db.query(models.Course).count()
    total_lessons = db.query(models.Lesson).count()
    total_news = db.query(models.NewsItem).count()
    total_certs = db.query(models.Certificate).count()

    # Check database connection
    try:
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception:
        db_status = "error"

    # Check Redis (simplified - just check if import works)
    try:
        import redis
        r = redis.from_url(os.getenv("REDIS_URL", "redis://redis:6379/0"))
        r.ping()
        redis_status = "connected"
    except Exception:
        redis_status = "disconnected"

    return SystemStatus(
        database=db_status,
        redis=redis_status,
        total_users=total_users,
        verified_users=verified_users,
        active_today=active_today,
        active_week=active_week,
        total_courses=total_courses,
        total_lessons=total_lessons,
        total_news_items=total_news,
        total_certificates=total_certs
    )


@router.get("/users", response_model=List[UserAdminView])
def list_users(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(get_admin_user)
):
    """List all users with basic stats."""
    query = db.query(models.User)

    if search:
        query = query.filter(models.User.email.ilike(f"%{search}%"))

    users = query.order_by(models.User.id.desc()).offset(skip).limit(limit).all()

    result = []
    for user in users:
        # Count completed lessons
        lessons_completed = db.query(models.UserProgress).filter(
            models.UserProgress.user_id == user.id,
            models.UserProgress.completed_at.isnot(None)
        ).count()

        # Count completed courses (all lessons in course completed)
        # Simplified: count distinct courses with any progress
        courses_with_progress = db.query(models.UserProgress.course_id).filter(
            models.UserProgress.user_id == user.id,
            models.UserProgress.completed_at.isnot(None)
        ).distinct().count()

        # Total quiz score
        total_quiz = db.query(func.sum(models.UserProgress.quiz_score)).filter(
            models.UserProgress.user_id == user.id
        ).scalar() or 0

        result.append(UserAdminView(
            id=user.id,
            email=user.email,
            is_active=user.is_active,
            is_verified=user.is_verified,
            difficulty=user.difficulty.value if user.difficulty else "LETS_ROCK",
            xp=user.xp or 0,
            avatar=user.avatar,
            current_streak=user.current_streak or 0,
            longest_streak=user.longest_streak or 0,
            last_activity_date=user.last_activity_date,
            courses_completed=courses_with_progress,
            lessons_completed=lessons_completed,
            total_quiz_score=total_quiz
        ))

    return result


@router.get("/users/{user_id}", response_model=UserAdminView)
def get_user_detail(
    user_id: int,
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(get_admin_user)
):
    """Get detailed user information."""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    lessons_completed = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == user.id,
        models.UserProgress.completed_at.isnot(None)
    ).count()

    courses_with_progress = db.query(models.UserProgress.course_id).filter(
        models.UserProgress.user_id == user.id,
        models.UserProgress.completed_at.isnot(None)
    ).distinct().count()

    total_quiz = db.query(func.sum(models.UserProgress.quiz_score)).filter(
        models.UserProgress.user_id == user.id
    ).scalar() or 0

    return UserAdminView(
        id=user.id,
        email=user.email,
        is_active=user.is_active,
        is_verified=user.is_verified,
        difficulty=user.difficulty.value if user.difficulty else "LETS_ROCK",
        xp=user.xp or 0,
        avatar=user.avatar,
        current_streak=user.current_streak or 0,
        longest_streak=user.longest_streak or 0,
        last_activity_date=user.last_activity_date,
        courses_completed=courses_with_progress,
        lessons_completed=lessons_completed,
        total_quiz_score=total_quiz
    )


@router.get("/users/{user_id}/progress", response_model=List[UserProgressView])
def get_user_progress(
    user_id: int,
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(get_admin_user)
):
    """Get detailed progress for a specific user."""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    progress_items = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == user_id
    ).all()

    result = []
    for p in progress_items:
        # Get lesson and course titles
        lesson = db.query(models.Lesson).filter(models.Lesson.id == p.lesson_id).first()
        course = db.query(models.Course).filter(models.Course.id == p.course_id).first() if p.course_id else None

        result.append(UserProgressView(
            lesson_id=p.lesson_id,
            lesson_title=lesson.title if lesson else None,
            course_title=course.title if course else None,
            completed_at=p.completed_at,
            last_accessed=p.last_accessed,
            quiz_score=p.quiz_score,
            quiz_attempts=p.quiz_attempts,
            current_page=p.current_page,
            completed_labs=p.completed_labs or []
        ))

    return result


@router.post("/users/{user_id}/reset-progress")
def reset_user_progress(
    user_id: int,
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(get_admin_user)
):
    """Reset all progress for a user (keeps account, deletes progress)."""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Don't allow resetting admin accounts
    if user.email in ADMIN_EMAILS:
        raise HTTPException(status_code=400, detail="Cannot reset admin accounts")

    # Delete progress
    deleted_count = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == user_id
    ).delete()

    # Reset XP and streaks
    user.xp = 0
    user.current_streak = 0
    user.longest_streak = 0
    user.last_activity_date = None
    user.achievements = []

    db.commit()

    return {
        "message": f"Progress reset for user {user.email}",
        "deleted_progress_items": deleted_count
    }


@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(get_admin_user)
):
    """Delete a user and all their data."""
    import logging
    logger = logging.getLogger(__name__)

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Don't allow deleting admin accounts
    if user.email in ADMIN_EMAILS:
        raise HTTPException(status_code=400, detail="Cannot delete admin accounts")

    email = user.email

    try:
        # Delete related data in transaction
        db.query(models.UserProgress).filter(models.UserProgress.user_id == user_id).delete()
        db.query(models.FeedbackVote).filter(models.FeedbackVote.user_id == user_id).delete()
        db.query(models.FeedbackItem).filter(models.FeedbackItem.user_id == user_id).delete()
        db.query(models.Certificate).filter(models.Certificate.user_id == user_id).delete()

        # Delete user
        db.delete(user)
        db.commit()

        # Audit log
        logger.info(f"ADMIN_ACTION: User {email} (id={user_id}) deleted by {admin.email}")

        return {"message": f"User {email} deleted successfully"}
    except Exception as e:
        db.rollback()
        logger.error(f"ADMIN_ACTION_FAILED: Delete user {email} failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete user")


@router.post("/users/{user_id}/verify")
def verify_user_manually(
    user_id: int,
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(get_admin_user)
):
    """Manually verify a user's email."""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.is_verified = True
    user.verification_token = None
    db.commit()

    return {"message": f"User {user.email} verified successfully"}


# =============================================================================
# INDIVIDUAL TEST FUNCTIONS
# =============================================================================

def _test_database(db: Session) -> TestResult:
    """Test database connection."""
    import time
    start = time.time()
    try:
        db.execute(text("SELECT 1"))
        return TestResult(
            name="database",
            status="pass",
            message="PostgreSQL connected",
            duration_ms=int((time.time() - start) * 1000)
        )
    except Exception as e:
        return TestResult(
            name="database",
            status="fail",
            message=str(e)[:100],
            duration_ms=int((time.time() - start) * 1000)
        )


def _test_redis() -> TestResult:
    """Test Redis connection."""
    import time
    start = time.time()
    try:
        import redis
        r = redis.from_url(os.getenv("REDIS_URL", "redis://redis:6379/0"))
        r.ping()
        return TestResult(
            name="redis",
            status="pass",
            message="Redis connected",
            duration_ms=int((time.time() - start) * 1000)
        )
    except Exception as e:
        return TestResult(
            name="redis",
            status="warning",
            message=f"Redis unavailable: {str(e)[:50]}",
            duration_ms=int((time.time() - start) * 1000)
        )


def _test_courses(db: Session) -> TestResult:
    """Test courses data exists."""
    import time
    start = time.time()
    count = db.query(models.Course).count()
    return TestResult(
        name="courses",
        status="pass" if count > 0 else "fail",
        message=f"{count} courses found" if count > 0 else "No courses in database",
        duration_ms=int((time.time() - start) * 1000)
    )


def _test_lessons(db: Session) -> TestResult:
    """Test lessons data exists."""
    import time
    start = time.time()
    count = db.query(models.Lesson).count()
    return TestResult(
        name="lessons",
        status="pass" if count > 0 else "fail",
        message=f"{count} lessons found" if count > 0 else "No lessons in database",
        duration_ms=int((time.time() - start) * 1000)
    )


def _test_news(db: Session) -> TestResult:
    """Test news data exists."""
    import time
    start = time.time()
    count = db.query(models.NewsItem).count()
    return TestResult(
        name="news",
        status="pass" if count > 0 else "warning",
        message=f"{count} news items" if count > 0 else "No news items",
        duration_ms=int((time.time() - start) * 1000)
    )


def _test_admin_user(db: Session) -> TestResult:
    """Test admin user exists."""
    import time
    start = time.time()
    admin_email = os.getenv("FIRST_SUPERUSER", "admin@ai-platform.com")
    admin_exists = db.query(models.User).filter(models.User.email == admin_email).first()
    return TestResult(
        name="admin_user",
        status="pass" if admin_exists else "fail",
        message="Admin user configured" if admin_exists else "Admin user not found",
        duration_ms=int((time.time() - start) * 1000)
    )


def _test_email_config() -> TestResult:
    """Test email configuration."""
    import time
    start = time.time()

    smtp_host = os.getenv("SMTP_HOST", "")
    smtp_user = os.getenv("SMTP_USER", "")
    emails_from = os.getenv("EMAILS_FROM_EMAIL", "")

    if smtp_host and smtp_user and emails_from:
        return TestResult(
            name="email_config",
            status="pass",
            message=f"SMTP: {smtp_host}, From: {emails_from}",
            duration_ms=int((time.time() - start) * 1000)
        )
    else:
        missing = []
        if not smtp_host: missing.append("SMTP_HOST")
        if not smtp_user: missing.append("SMTP_USER")
        if not emails_from: missing.append("EMAILS_FROM_EMAIL")
        return TestResult(
            name="email_config",
            status="warning",
            message=f"Missing: {', '.join(missing)}",
            duration_ms=int((time.time() - start) * 1000)
        )


def _test_registration_flow(db: Session) -> TestResult:
    """Test full registration flow: register -> verify -> login -> delete."""
    import time
    import uuid
    start = time.time()

    test_email = f"test-{uuid.uuid4().hex[:8]}@e2e-test.local"
    test_password = "TestPassword123!"

    try:
        # Step 1: Create user
        from app.auth import get_password_hash
        verification_token = str(uuid.uuid4())

        new_user = models.User(
            email=test_email,
            hashed_password=get_password_hash(test_password),
            difficulty=models.DifficultyLevel.PIECE_OF_CAKE,
            avatar="droid_1",
            is_verified=False,
            verification_token=verification_token
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Step 2: Verify user exists with token
        user_check = db.query(models.User).filter(models.User.email == test_email).first()
        if not user_check or not user_check.verification_token:
            raise Exception("User not created properly")

        # Step 3: Simulate email verification
        user_check.is_verified = True
        user_check.verification_token = None
        db.commit()

        # Step 4: Check user is verified
        user_verified = db.query(models.User).filter(models.User.email == test_email).first()
        if not user_verified.is_verified:
            raise Exception("Verification failed")

        # Step 5: Clean up - delete test user
        db.query(models.UserProgress).filter(models.UserProgress.user_id == user_verified.id).delete()
        db.delete(user_verified)
        db.commit()

        # Verify cleanup
        user_deleted = db.query(models.User).filter(models.User.email == test_email).first()
        if user_deleted:
            raise Exception("Cleanup failed")

        return TestResult(
            name="registration_flow",
            status="pass",
            message="Register → Verify → Delete: OK",
            duration_ms=int((time.time() - start) * 1000)
        )

    except Exception as e:
        # Cleanup on error
        try:
            user = db.query(models.User).filter(models.User.email == test_email).first()
            if user:
                db.query(models.UserProgress).filter(models.UserProgress.user_id == user.id).delete()
                db.delete(user)
                db.commit()
        except:
            db.rollback()

        return TestResult(
            name="registration_flow",
            status="fail",
            message=str(e)[:100],
            duration_ms=int((time.time() - start) * 1000)
        )


def _test_youtube_feed() -> TestResult:
    """Test YouTube API connectivity and data fetch."""
    import time
    import asyncio
    start = time.time()

    youtube_api_key = os.getenv("YOUTUBE_API_KEY", "")
    if not youtube_api_key:
        return TestResult(
            name="youtube_feed",
            status="warning",
            message="YOUTUBE_API_KEY not configured",
            duration_ms=int((time.time() - start) * 1000)
        )

    try:
        from app.services.news_aggregator import YouTubeFetcher
        fetcher = YouTubeFetcher(youtube_api_key)

        # Run async fetch
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            items = loop.run_until_complete(fetcher.fetch())
        finally:
            loop.close()

        if len(items) > 0:
            return TestResult(
                name="youtube_feed",
                status="pass",
                message=f"Fetched {len(items)} videos from YouTube",
                duration_ms=int((time.time() - start) * 1000)
            )
        else:
            return TestResult(
                name="youtube_feed",
                status="warning",
                message="YouTube API returned 0 items",
                duration_ms=int((time.time() - start) * 1000)
            )
    except Exception as e:
        return TestResult(
            name="youtube_feed",
            status="fail",
            message=f"YouTube API error: {str(e)[:80]}",
            duration_ms=int((time.time() - start) * 1000)
        )


def _test_rss_feeds() -> TestResult:
    """Test RSS feeds (including Perplexity-like sources) connectivity."""
    import time
    import asyncio
    start = time.time()

    try:
        from app.services.news_aggregator import RSSFetcher
        fetcher = RSSFetcher()

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            items = loop.run_until_complete(fetcher.fetch())
        finally:
            loop.close()

        if len(items) > 0:
            return TestResult(
                name="rss_feeds",
                status="pass",
                message=f"Fetched {len(items)} items from RSS feeds",
                duration_ms=int((time.time() - start) * 1000)
            )
        else:
            return TestResult(
                name="rss_feeds",
                status="warning",
                message="RSS feeds returned 0 items",
                duration_ms=int((time.time() - start) * 1000)
            )
    except Exception as e:
        return TestResult(
            name="rss_feeds",
            status="fail",
            message=f"RSS error: {str(e)[:80]}",
            duration_ms=int((time.time() - start) * 1000)
        )


def _test_registration_api(db: Session) -> TestResult:
    """Test registration via actual API endpoints (uses internal localhost to bypass Cloudflare)."""
    import time
    import uuid
    import httpx
    start = time.time()

    test_email = f"apitest-{uuid.uuid4().hex[:8]}@e2e-test.local"
    test_password = "TestPassword123!"
    # Use internal URL to bypass Cloudflare - nginx routes /api to backend
    api_url = "http://nginx/api"

    try:
        with httpx.Client(timeout=10.0, verify=False) as client:
            # Step 1: Register via API
            register_resp = client.post(
                f"{api_url}/register",
                json={
                    "email": test_email,
                    "password": test_password,
                    "difficulty": "LETS_ROCK"
                }
            )

            if register_resp.status_code not in [200, 201]:
                return TestResult(
                    name="registration_api",
                    status="fail",
                    message=f"Register failed: HTTP {register_resp.status_code}",
                    duration_ms=int((time.time() - start) * 1000)
                )

            # Step 2: Get verification token from DB
            user = db.query(models.User).filter(models.User.email == test_email).first()
            if not user:
                return TestResult(
                    name="registration_api",
                    status="fail",
                    message="User not created in DB after registration",
                    duration_ms=int((time.time() - start) * 1000)
                )

            verification_token = user.verification_token
            if not verification_token:
                return TestResult(
                    name="registration_api",
                    status="warning",
                    message="No verification token (user may be auto-verified)",
                    duration_ms=int((time.time() - start) * 1000)
                )

            # Step 3: Verify email via API
            verify_resp = client.get(f"{api_url}/verify-email/{verification_token}")
            if verify_resp.status_code not in [200, 307, 302]:
                # Cleanup and fail
                db.query(models.UserProgress).filter(models.UserProgress.user_id == user.id).delete()
                db.delete(user)
                db.commit()
                return TestResult(
                    name="registration_api",
                    status="fail",
                    message=f"Email verify failed: HTTP {verify_resp.status_code}",
                    duration_ms=int((time.time() - start) * 1000)
                )

            # Step 4: Login via API
            login_resp = client.post(
                f"{api_url}/login",
                data={"username": test_email, "password": test_password},
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            )

            if login_resp.status_code != 200:
                db.query(models.UserProgress).filter(models.UserProgress.user_id == user.id).delete()
                db.delete(user)
                db.commit()
                return TestResult(
                    name="registration_api",
                    status="fail",
                    message=f"Login failed: HTTP {login_resp.status_code}",
                    duration_ms=int((time.time() - start) * 1000)
                )

            login_data = login_resp.json()
            if "access_token" not in login_data:
                db.query(models.UserProgress).filter(models.UserProgress.user_id == user.id).delete()
                db.delete(user)
                db.commit()
                return TestResult(
                    name="registration_api",
                    status="fail",
                    message="Login response missing access_token",
                    duration_ms=int((time.time() - start) * 1000)
                )

            # Step 5: Cleanup - delete test user
            db.query(models.UserProgress).filter(models.UserProgress.user_id == user.id).delete()
            db.delete(user)
            db.commit()

            return TestResult(
                name="registration_api",
                status="pass",
                message="Register → Verify → Login → Delete: OK",
                duration_ms=int((time.time() - start) * 1000)
            )

    except Exception as e:
        # Cleanup on error
        try:
            user = db.query(models.User).filter(models.User.email == test_email).first()
            if user:
                db.query(models.UserProgress).filter(models.UserProgress.user_id == user.id).delete()
                db.delete(user)
                db.commit()
        except:
            db.rollback()

        return TestResult(
            name="registration_api",
            status="fail",
            message=f"API error: {str(e)[:80]}",
            duration_ms=int((time.time() - start) * 1000)
        )


# Available tests registry
AVAILABLE_TESTS = {
    "database": _test_database,
    "redis": _test_redis,
    "courses": _test_courses,
    "lessons": _test_lessons,
    "news": _test_news,
    "admin_user": _test_admin_user,
    "email_config": _test_email_config,
    "youtube_feed": _test_youtube_feed,
    "rss_feeds": _test_rss_feeds,
    "registration_flow": _test_registration_flow,
    "registration_api": _test_registration_api,
}

TEST_DISPLAY_NAMES = {
    "database": "Database Connection",
    "redis": "Redis Connection",
    "courses": "Courses Data",
    "lessons": "Lessons Data",
    "news": "News Data",
    "admin_user": "Admin User",
    "email_config": "Email Configuration",
    "youtube_feed": "YouTube Feed",
    "rss_feeds": "RSS/News Feeds",
    "registration_flow": "Registration Flow (DB)",
    "registration_api": "Registration Flow (API)",
}


@router.get("/tests/list")
def list_available_tests(
    admin: models.User = Depends(get_admin_user)
):
    """List all available tests."""
    return {
        "tests": [
            {"id": k, "name": TEST_DISPLAY_NAMES.get(k, k)}
            for k in AVAILABLE_TESTS.keys()
        ]
    }


@router.post("/tests/run/{test_id}", response_model=TestResult)
def run_single_test(
    test_id: str,
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(get_admin_user)
):
    """Run a single test by ID."""
    if test_id not in AVAILABLE_TESTS:
        raise HTTPException(status_code=404, detail=f"Test '{test_id}' not found")

    test_func = AVAILABLE_TESTS[test_id]

    # Some tests need db, some don't
    import inspect
    sig = inspect.signature(test_func)
    if 'db' in sig.parameters:
        result = test_func(db)
    else:
        result = test_func()

    # Update name with display name
    result.name = TEST_DISPLAY_NAMES.get(test_id, test_id)
    return result


@router.get("/tests/run", response_model=SystemTestResults)
def run_all_tests(
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(get_admin_user)
):
    """Run all system tests."""
    import inspect
    tests = []

    for test_id, test_func in AVAILABLE_TESTS.items():
        sig = inspect.signature(test_func)
        if 'db' in sig.parameters:
            result = test_func(db)
        else:
            result = test_func()

        # Update name with display name
        result.name = TEST_DISPLAY_NAMES.get(test_id, test_id)
        tests.append(result)

    # Determine overall status
    has_fail = any(t.status == "fail" for t in tests)
    has_warning = any(t.status == "warning" for t in tests)

    if has_fail:
        overall = "fail"
    elif has_warning:
        overall = "warning"
    else:
        overall = "pass"

    return SystemTestResults(
        timestamp=datetime.utcnow(),
        overall_status=overall,
        tests=tests
    )


# =============================================================================
# NEWS FEED REFRESH ENDPOINTS
# =============================================================================

class RefreshResult(BaseModel):
    status: str
    sources: dict
    total: int
    duration_ms: int


@router.post("/feeds/refresh", response_model=RefreshResult)
async def refresh_news_feeds(
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(get_admin_user)
):
    """Manually trigger a refresh of all news feeds (YouTube, RSS, etc.)."""
    import time
    import logging
    logger = logging.getLogger(__name__)
    start = time.time()

    try:
        from app.services.news_aggregator import NewsAggregator
        aggregator = NewsAggregator(db)
        result = await aggregator.refresh_all()

        logger.info(f"ADMIN_ACTION: News feeds refreshed by {admin.email}")

        return RefreshResult(
            status="success",
            sources=result.get("sources", {}),
            total=result.get("total", 0),
            duration_ms=int((time.time() - start) * 1000)
        )
    except Exception as e:
        logger.error(f"ADMIN_ACTION_FAILED: News refresh failed: {str(e)}")
        return RefreshResult(
            status="error",
            sources={"error": str(e)[:100]},
            total=0,
            duration_ms=int((time.time() - start) * 1000)
        )
