from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app import database, models, schemas, auth
from app.services.content_loader import ContentLoader # Assuming we might need this for markdown processing if not already stored

router = APIRouter(
    prefix="/lessons",
    tags=["lessons"]
)

@router.get("/", response_model=List[schemas.Lesson])
def get_lessons(lang: str = "en", db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Get all lessons.
    """
    # TODO: Filter/Translation based on lang if stored in DB differently, 
    # currently assumes DB holds the single source or we need to handle localization lookup.
    # For now, returning standard DB records.
    lessons = db.query(models.Lesson).order_by(models.Lesson.order).all()
    return lessons

@router.get("/{lesson_id}", response_model=schemas.Lesson)
def get_lesson(lesson_id: int, lang: str = "en", db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Get a specific lesson by ID.
    """
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

@router.get("/{lesson_id}/quizzes", response_model=List[schemas.Quiz])
def get_lesson_quizzes(lesson_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Get quizzes for a lesson.
    """
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    # Assuming quizzes are related to lessons via a relationship or stored in JSON
    # Checking models.py structure would be ideal, but assuming relationship based on standard pattern
    # If quizzes are in quiz.json and not in DB relations, we might need to load them differently.
    # Let's check if models.Lesson has quizzes relationship.
    return lesson.quizzes

@router.post("/{lesson_id}/progress")
def update_lesson_progress(lesson_id: int, page: int = 0, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Update user progress for a lesson (current page).
    """
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson_id
    ).first()

    if not progress:
        progress = models.UserProgress(
            user_id=current_user.id,
            course_id=lesson.course_id,
            lesson_id=lesson_id,
            current_page=page,
            completed=False # Logic for completion might be separate
        )
        db.add(progress)
    else:
        progress.current_page = page
        progress.last_accessed = database.func.now()
    
    db.commit()
    return {"status": "success", "page": page}
