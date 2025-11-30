from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app import database, models, schemas, auth
from app.services.content_loader import ContentLoader # Assuming we might need this for markdown processing if not already stored

router = APIRouter(
    prefix="/lessons",
    tags=["lessons"]
)

def localize_lesson(lesson: models.Lesson, lang: str) -> models.Lesson:
    if lang == 'cs':
        if lesson.title_cs:
            lesson.title = lesson.title_cs
        if lesson.description_cs:
            lesson.description = lesson.description_cs
        if lesson.content_cs:
            lesson.content = lesson.content_cs
        if lesson.duration_cs:
            lesson.duration = lesson.duration_cs
    return lesson

@router.get("/", response_model=List[schemas.Lesson])
def get_lessons(lang: str = "en", db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Get all lessons.
    """
    lessons = db.query(models.Lesson).order_by(models.Lesson.order).all()
    return [localize_lesson(l, lang) for l in lessons]

@router.get("/{lesson_id}", response_model=schemas.Lesson)
def get_lesson(lesson_id: int, lang: str = "en", db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Get a specific lesson by ID.
    """
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return localize_lesson(lesson, lang)

def localize_quiz(quiz: models.Quiz, lang: str) -> models.Quiz:
    if lang == 'cs':
        if quiz.question_cs:
            quiz.question = quiz.question_cs
        if quiz.option_a_cs:
            quiz.option_a = quiz.option_a_cs
        if quiz.option_b_cs:
            quiz.option_b = quiz.option_b_cs
        if quiz.option_c_cs:
            quiz.option_c = quiz.option_c_cs
        if quiz.option_d_cs:
            quiz.option_d = quiz.option_d_cs
        if quiz.explanation_cs:
            quiz.explanation = quiz.explanation_cs
    return quiz

@router.get("/{lesson_id}/quizzes", response_model=List[schemas.Quiz])
def get_lesson_quizzes(lesson_id: int, lang: str = "en", db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Get quizzes for a lesson.
    """
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    return [localize_quiz(q, lang) for q in lesson.quizzes]

@router.post("/{lesson_id}/lab/complete")
def complete_lab(lesson_id: int, lab_completion: schemas.LabCompletion, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Mark a specific lab within a lesson as complete.
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
            completed_labs=[lab_completion.lab_id],
            current_page=0
        )
        db.add(progress)
    else:
        # Append if not exists
        current_labs = list(progress.completed_labs) if progress.completed_labs else []
        if lab_completion.lab_id not in current_labs:
            current_labs.append(lab_completion.lab_id)
            progress.completed_labs = current_labs
            # Note: We don't necessarily award XP here, usually XP is for lesson completion
            # But we could add small XP for labs if desired. For now, just tracking.
            
    db.commit()
    return {"status": "success", "completed_labs": progress.completed_labs}

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
            current_page=page
        )
        db.add(progress)
    else:
        progress.current_page = page
        progress.last_accessed = func.now()
    
    db.commit()
    return {"status": "success", "page": page}

@router.post("/{lesson_id}/complete")
def complete_lesson(lesson_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Mark a lesson as complete and award XP.
    """
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    # Check if already completed
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson_id
    ).first()

    if not progress:
        progress = models.UserProgress(
            user_id=current_user.id,
            course_id=lesson.course_id,
            lesson_id=lesson_id,
            completed_at=func.now(), # Mark as completed
            current_page=0 # Reset or keep? Usually keep max, but here we just mark complete
        )
        db.add(progress)
        
        # Award XP
        current_user.xp += 100
        db.commit()
    else:
        # If exists but not marked complete (e.g. only progress tracked)
        if not progress.completed_at:
             progress.completed_at = func.now()
             current_user.xp += 100
             db.commit()
    
    return {"status": "success", "xp": current_user.xp}
