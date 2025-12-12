from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
import uuid
import os
import json
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from . import models, schemas, database, auth
from app.routers import sandbox, lessons, feedback, users, health, certificates, news, digest

# Vytvoření tabulek (pro jistotu, i když to dělá seed)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AI Learning Platform API")

# Rate Limiting Setup
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.limiter import limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Include Routers
app.include_router(health.router, tags=["health"])
app.include_router(sandbox.router)
app.include_router(lessons.router)
app.include_router(feedback.router)
app.include_router(users.router)
app.include_router(certificates.router, tags=["certificates"])
app.include_router(news.router)
app.include_router(digest.router)

# Mount content directory for static assets (images, etc.)
# This maps http://localhost:8000/content/ -> /app/content/
content_dir = os.getenv("CONTENT_DIR", "/app/content")
if os.path.exists(content_dir):
    app.mount("/content", StaticFiles(directory=content_dir), name="content")

# CORS middleware - origins from env or defaults for dev
def get_cors_origins():
    cors_origins_str = os.getenv("BACKEND_CORS_ORIGINS")
    if cors_origins_str:
        try:
            return json.loads(cors_origins_str)
        except json.JSONDecodeError:
            pass
    # Default: dev origins
    return ["http://localhost:3000", "http://frontend:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

from app.services.email import send_verification_email
from app.services.news_aggregator import NewsAggregator
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import logging

# Setup logging for scheduler
logging.basicConfig(level=logging.INFO)
scheduler_logger = logging.getLogger("news_scheduler")

# Initialize scheduler
news_scheduler = AsyncIOScheduler()


async def scheduled_news_refresh():
    """Background task to refresh news every 30 minutes."""
    scheduler_logger.info("🔄 Starting scheduled news refresh...")
    try:
        db = database.SessionLocal()
        aggregator = NewsAggregator(db)
        result = await aggregator.refresh_all()
        scheduler_logger.info(f"✅ News refresh complete: {result.get('total', 0)} items")
        db.close()
    except Exception as e:
        scheduler_logger.error(f"❌ Scheduled news refresh failed: {e}")


@app.on_event("startup")
async def start_news_scheduler():
    """Start the news refresh scheduler on app startup."""
    interval_minutes = int(os.getenv("NEWS_REFRESH_INTERVAL_MINUTES", "30"))
    scheduler_logger.info(f"📰 Starting news scheduler (interval: {interval_minutes} min)")

    # Schedule periodic refresh
    news_scheduler.add_job(
        scheduled_news_refresh,
        'interval',
        minutes=interval_minutes,
        id='news_refresh',
        replace_existing=True
    )

    # Also run initial refresh on startup (with delay to let DB initialize)
    news_scheduler.add_job(
        scheduled_news_refresh,
        'date',
        run_date=None,  # Run immediately
        id='news_initial_refresh'
    )

    news_scheduler.start()
    scheduler_logger.info("📰 News scheduler started")


@app.on_event("shutdown")
async def stop_news_scheduler():
    """Stop the scheduler on app shutdown."""
    news_scheduler.shutdown()
    scheduler_logger.info("📰 News scheduler stopped")

@app.post("/auth/register", response_model=schemas.User)
@limiter.limit("5/minute")
async def register_user(request: Request, user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    verification_token = str(uuid.uuid4())

    new_user = models.User(
        email=user.email, 
        hashed_password=hashed_password,
        difficulty=models.DifficultyLevel(user.difficulty),
        avatar=user.avatar,
        is_verified=False, # Must verify email
        verification_token=verification_token
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send verification email (background task would be better, but await is fine for now)
    try:
        await send_verification_email(new_user.email, verification_token)
    except Exception as e:
        print(f"Failed to send email: {e}")
        # Don't fail registration, just log it. User can request resend later.

    return new_user

@app.get("/auth/verify")
def verify_email(token: str, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.verification_token == token).first()
    if not user:
        # Redirect to error page or login with error
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        return RedirectResponse(url=f"{frontend_url}/login?error=invalid_token", status_code=303)
    
    if not user.is_verified:
        user.is_verified = True
        user.verification_token = None # Clear token
        db.commit()
    
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    return RedirectResponse(url=f"{frontend_url}/login?verified=true", status_code=303)


@app.post("/auth/token", response_model=schemas.Token)
@limiter.limit("5/minute")
def login_for_access_token(request: Request, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not verified. Please check your inbox.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Learning Platform API"}