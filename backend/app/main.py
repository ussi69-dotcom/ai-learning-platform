from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, joinedload, selectinload
from typing import List, Optional
from datetime import timedelta
import uuid

from . import models, schemas, database, auth
from app.routers import sandbox, lessons

from fastapi.staticfiles import StaticFiles

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
app.include_router(sandbox.router)
app.include_router(lessons.router)

from app.config import settings

# Mount content directory for static assets (images, etc.)
# This maps http://localhost:8000/content/ -> /app/content/
app.mount("/content", StaticFiles(directory="/app/content"), name="content")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
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

# Dependency pro získání DB session - ODSTRANĚNO, používáme database.get_db

from app.services.email import send_verification_email

# ... (existing imports)

@app.post("/auth/register", response_model=schemas.User)
@limiter.limit("5/minute")
async def register_user(request: Request, user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    verification_token = str(uuid.uuid4())

    # Auto-verify if SMTP is not configured (Dev mode)
    should_auto_verify = not settings.SMTP_HOST or settings.SMTP_HOST == "smtp.example.com"

    new_user = models.User(
        email=user.email, 
        hashed_password=hashed_password,
        difficulty=models.DifficultyLevel(user.difficulty),
        avatar=user.avatar,
        is_verified=should_auto_verify, 
        verification_token=verification_token
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send verification email only if not auto-verified
    if not should_auto_verify:
        try:
            await send_verification_email(new_user.email, verification_token)
        except Exception as e:
            print(f"Failed to send email: {e}")
            # Don't fail registration, just log it. User can request resend later.

    return new_user

from fastapi.responses import RedirectResponse
import os

@app.get("/auth/verify")
def verify_email(token: str, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.verification_token == token).first()
    if not user:
        # Redirect to error page or login with error
        return RedirectResponse(url=f"{settings.FRONTEND_URL}/login?error=InvalidToken")
    
    user.is_verified = True
    db.commit()
    
    # Redirect to login with success message
    return RedirectResponse(url=f"{settings.FRONTEND_URL}/login?verified=true")

@app.post("/auth/token", response_model=schemas.Token)
@limiter.limit("10/minute")
async def login_for_access_token(request: Request, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if email is verified
    if not user.is_verified:
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not verified. Please check your inbox.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

# Endpoint pro změnu profilu
@app.put("/users/me", response_model=schemas.User)
async def update_user_profile(user_update: schemas.UserUpdate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    # Update allowed fields
    if user_update.full_name is not None:
        current_user.full_name = user_update.full_name
    if user_update.avatar is not None:
        current_user.avatar = user_update.avatar
    if user_update.difficulty is not None:
        current_user.difficulty = models.DifficultyLevel(user_update.difficulty)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@app.get("/users/me/last-lesson", response_model=Optional[schemas.UserProgress])
async def get_last_lesson(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id
    ).order_by(models.UserProgress.last_accessed.desc()).first()
    return progress

# --- CONTENT ENDPOINTS ---

@app.get("/courses", response_model=List[schemas.Course])
def get_courses(db: Session = Depends(database.get_db)):
    """Vrátí seznam kurzů z databáze."""
    courses = db.query(models.Course).all()
    return courses

@app.get("/courses/{course_slug}", response_model=schemas.Course)
def get_course_detail(course_slug: str, db: Session = Depends(database.get_db)):
    """Vrátí detail kurzu a seznam lekcí."""
    course = db.query(models.Course).filter(models.Course.slug == course_slug).first()
    if not course:
        # Fallback: zkusíme ID
        if course_slug.isdigit():
             course = db.query(models.Course).filter(models.Course.id == int(course_slug)).first()
    
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Seřadíme lekce podle order
    course.lessons.sort(key=lambda x: x.order)
    return course

@app.get("/content/{course_slug}/{lesson_slug}")
def get_lesson_content(course_slug: str, lesson_slug: str, db: Session = Depends(database.get_db)):
    """Vrátí obsah lekce (MDX)."""
    # Najdeme kurz
    course = db.query(models.Course).filter(models.Course.slug == course_slug).first()
    if not course:
         raise HTTPException(status_code=404, detail="Course not found")
         
    # Najdeme lekci v kurzu podle slugu
    lesson = db.query(models.Lesson).filter(
        models.Lesson.course_id == course.id,
        models.Lesson.slug == lesson_slug
    ).first()
    
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    return {"content": lesson.content}

# --- PROGRESS TRACKING ---

@app.post("/progress/{course_slug}/{lesson_slug}")
def mark_lesson_complete(course_slug: str, lesson_slug: str, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    # Najdeme IDčka
    course = db.query(models.Course).filter(models.Course.slug == course_slug).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    lesson = db.query(models.Lesson).filter(models.Lesson.course_id == course.id, models.Lesson.slug == lesson_slug).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    # Check if already completed
    existing = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson.id
    ).first()

    if not existing:
        progress = models.UserProgress(
            user_id=current_user.id,
            course_id=course.id,
            lesson_id=lesson.id,
            completed=True
        )
        db.add(progress)
        
        # Add XP
        current_user.xp += 100 # Simple logic
        db.commit()
        
    return {"status": "success", "xp": current_user.xp}

@app.get("/progress")
def get_user_progress(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    progress = db.query(models.UserProgress).filter(models.UserProgress.user_id == current_user.id).all()
    return progress
