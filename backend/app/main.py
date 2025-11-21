from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta

from . import models, schemas, database, auth

from fastapi.staticfiles import StaticFiles

# Vytvoření tabulek (pro jistotu, i když to dělá seed)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AI Learning Platform API")

# Mount content directory for static assets (images, etc.)
# This maps http://localhost:8000/content/ -> /app/content/
app.mount("/content", StaticFiles(directory="/app/content"), name="content")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency pro získání DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/auth/register", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    # Default difficulty is handled by Schema default, but we can be explicit if needed
    new_user = models.User(
        email=user.email, 
        hashed_password=hashed_password,
        difficulty=models.DifficultyLevel(user.difficulty) # Convert string to Enum
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/auth/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Learning Platform API"}

# --- COURSES ENDPOINTS ---

@app.get("/courses/", response_model=List[schemas.Course])
def read_courses(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    # Filter courses by user's difficulty level
    courses = db.query(models.Course)\
        .filter(models.Course.difficulty_level == current_user.difficulty)\
        .offset(skip).limit(limit).all()
    return courses

@app.get("/courses/{course_id}", response_model=schemas.Course)
def read_course(
    course_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if course matches user's difficulty level
    if course.difficulty_level != current_user.difficulty:
        raise HTTPException(status_code=403, detail="You don't have access to this course")
    
    return course

# --- LESSONS ENDPOINTS ---

@app.get("/lessons/", response_model=List[schemas.LessonSummary])
def read_lessons(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Tento endpoint volá frontend pro získání všech lekcí
    lessons = db.query(models.Lesson).offset(skip).limit(limit).all()
    return lessons

@app.get("/lessons/{lesson_id}", response_model=schemas.Lesson)
def read_lesson(lesson_id: int, db: Session = Depends(get_db)):
    # Detail lekce (vrací i `content`, na rozdíl od "/lessons/")
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


# --- QUIZ ENDPOINTS ---

@app.get("/lessons/{lesson_id}/quizzes", response_model=List[schemas.Quiz])
def get_lesson_quizzes(
    lesson_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get all quiz questions for a lesson"""
    quizzes = db.query(models.Quiz)\
        .filter(models.Quiz.lesson_id == lesson_id)\
        .order_by(models.Quiz.order)\
        .all()
    return quizzes


# --- USER PROFILE ENDPOINTS ---

@app.put("/users/me/difficulty", response_model=schemas.User)
def update_user_difficulty(
    difficulty: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Update user's difficulty level"""
    # Validate difficulty
    valid_difficulties = ['PIECE_OF_CAKE', 'LETS_ROCK', 'COME_GET_SOME', 'DAMN_IM_GOOD']
    if difficulty not in valid_difficulties:
        raise HTTPException(status_code=400, detail=f"Invalid difficulty. Must be one of: {valid_difficulties}")
    
    # Update difficulty
    current_user.difficulty = models.DifficultyLevel[difficulty]
    db.commit()
    db.refresh(current_user)
    return current_user


# --- PROGRESS ENDPOINTS ---

@app.post("/lessons/{lesson_id}/complete", response_model=schemas.UserProgress)
def complete_lesson(
    lesson_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Mark a lesson as completed"""
    # Check if lesson exists
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    # Check if already completed
    existing_progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson_id
    ).first()
    
    if existing_progress:
        return existing_progress
    
    # Create new progress entry
    new_progress = models.UserProgress(
        user_id=current_user.id,
        lesson_id=lesson_id,
        course_id=lesson.course_id
    )
    db.add(new_progress)
    db.commit()
    db.refresh(new_progress)
    return new_progress

@app.get("/users/me/progress", response_model=List[schemas.UserProgress])
def get_user_progress(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get all completed lessons for the current user"""
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id
    ).all()
    return progress

@app.get("/courses/{course_id}/progress")
def get_course_progress(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get progress percentage for a specific course"""
    # Get total lessons in course
    total_lessons = db.query(models.Lesson).filter(models.Lesson.course_id == course_id).count()
    
    if total_lessons == 0:
        return {"percentage": 0, "completed": 0, "total": 0}
    
    # Get completed lessons in course
    completed_lessons = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.course_id == course_id
    ).count()
    
    percentage = int((completed_lessons / total_lessons) * 100)
    
    return {
        "percentage": percentage,
        "completed": completed_lessons,
        "total": total_lessons
    }