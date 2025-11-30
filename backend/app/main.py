from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, joinedload, selectinload
from typing import List, Optional
from datetime import timedelta
import uuid

from . import models, schemas, database, auth
from app.routers import sandbox

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
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
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


# --- CONTENT ENDPOINTS ---

import os
import json

CONTENT_DIR = "/app/content"

@app.get("/courses")
def get_courses():
    """Vrátí seznam kurzů z adresářové struktury."""
    courses = []
    if not os.path.exists(CONTENT_DIR) or not os.path.exists(os.path.join(CONTENT_DIR, "courses")):
         return []

    courses_dir = os.path.join(CONTENT_DIR, "courses")
    for course_id in os.listdir(courses_dir):
        course_path = os.path.join(courses_dir, course_id)
        if os.path.isdir(course_path):
            # Zkusíme načíst meta.json, pokud existuje
            meta_path = os.path.join(course_path, "meta.json")
            title = course_id.replace("-", " ").title()
            description = "No description available."
            
            if os.path.exists(meta_path):
                with open(meta_path, "r") as f:
                    try:
                        meta = json.load(f)
                        title = meta.get("title", title)
                        description = meta.get("description", description)
                    except:
                        pass

            courses.append({
                "id": course_id,
                "title": title,
                "description": description,
                "image": f"/content/courses/{course_id}/cover.jpg" # Placeholder logic
            })
    return courses

@app.get("/courses/{course_id}")
def get_course_detail(course_id: str):
    """Vrátí detail kurzu a seznam lekcí."""
    course_path = os.path.join(CONTENT_DIR, "courses", course_id)
    if not os.path.exists(course_path):
        raise HTTPException(status_code=404, detail="Course not found")

    # Načíst metadata
    meta = {}
    meta_path = os.path.join(course_path, "meta.json")
    if os.path.exists(meta_path):
        with open(meta_path, "r") as f:
             meta = json.load(f)

    # Načíst lekce (adresáře začínající číslem nebo definované v meta.json)
    lessons = []
    # Jednoduchý průchod adresáři
    for item in sorted(os.listdir(course_path)):
        item_path = os.path.join(course_path, item)
        if os.path.isdir(item_path) and not item.startswith("."):
             # Hledáme index.mdx
             if os.path.exists(os.path.join(item_path, "index.mdx")):
                 lessons.append({
                     "id": item,
                     "title": item.replace("-", " ").title(), # Fallback, v reálu vyparsujeme z MDX
                     "path": f"/courses/{course_id}/{item}"
                 })
    
    return {
        "id": course_id,
        "title": meta.get("title", course_id.replace("-", " ").title()),
        "description": meta.get("description", ""),
        "lessons": lessons
    }

@app.get("/content/{course_id}/{lesson_id}")
def get_lesson_content(course_id: str, lesson_id: str):
    """Vrátí obsah lekce (MDX)."""
    lesson_path = os.path.join(CONTENT_DIR, "courses", course_id, lesson_id, "index.mdx")
    if not os.path.exists(lesson_path):
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    with open(lesson_path, "r") as f:
        content = f.read()
    
    return {"content": content}

# --- PROGRESS TRACKING ---

@app.post("/progress/{course_id}/{lesson_id}")
def mark_lesson_complete(course_id: str, lesson_id: str, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    # Check if already completed
    existing = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.course_id == course_id,
        models.UserProgress.lesson_id == lesson_id
    ).first()

    if not existing:
        progress = models.UserProgress(
            user_id=current_user.id,
            course_id=course_id,
            lesson_id=lesson_id,
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
