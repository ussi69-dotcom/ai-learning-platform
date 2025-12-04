from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from typing import List, Optional
from app import models, schemas, database, auth

router = APIRouter()

# --- COURSES ENDPOINTS ---

@router.get("/courses/", response_model=List[schemas.Course])
def read_courses(
    skip: int = 0, 
    limit: int = 100, 
    lang: str = "en",
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    # Filter courses by user's difficulty level
    courses = db.query(models.Course)\
        .filter(models.Course.difficulty_level == current_user.difficulty)\
        .offset(skip).limit(limit).all()
    
    if lang == "cs":
        for course in courses:
            if course.title_cs:
                course.title = course.title_cs
            if course.description_cs:
                course.description = course.description_cs

    return courses

@router.get("/courses/{course_id}", response_model=schemas.Course)
def read_course(
    course_id: int,
    lang: str = "en",
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")

    # Check if course matches user's difficulty level
    if course.difficulty_level != current_user.difficulty:
        raise HTTPException(status_code=403, detail="You don't have access to this course")

    if lang == "cs":
        # Localize course
        if course.title_cs:
            course.title = course.title_cs
        if course.description_cs:
            course.description = course.description_cs

        # Localize lessons within course
        for lesson in course.lessons:
            if lesson.title_cs:
                lesson.title = lesson.title_cs
            if lesson.description_cs:
                lesson.description = lesson.description_cs

    return course

@router.get("/courses/{course_id}/progress")
def get_course_progress(
    course_id: int,
    db: Session = Depends(database.get_db),
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

# --- LESSONS ENDPOINTS ---

@router.get("/lessons/", response_model=List[schemas.LessonSummary])
def read_lessons(
    skip: int = 0, 
    limit: int = 100, 
    lang: str = "en",
    db: Session = Depends(database.get_db)
):
    # Tento endpoint volá frontend pro získání všech lekcí
    lessons = db.query(models.Lesson).offset(skip).limit(limit).all()

    if lang == "cs":
        for lesson in lessons:
            if lesson.title_cs:
                lesson.title = lesson.title_cs
            if lesson.description_cs:
                lesson.description = lesson.description_cs

    return lessons

@router.get("/lessons/{lesson_id}", response_model=schemas.Lesson)
def read_lesson(
    lesson_id: int, 
    lang: str = "en",
    db: Session = Depends(database.get_db)
):
    # Detail lekce (vrací i `content`, na rozdíl od "/lessons/")
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    if lang == "cs":
        if lesson.title_cs:
            lesson.title = lesson.title_cs
        if lesson.description_cs:
            lesson.description = lesson.description_cs
        if lesson.content_cs:
            lesson.content = lesson.content_cs
        if lesson.duration_cs:
            lesson.duration = lesson.duration_cs
            
    return lesson

# --- QUIZ ENDPOINTS ---

@router.get("/lessons/{lesson_id}/quizzes", response_model=List[schemas.Quiz])
def get_lesson_quizzes(
    lesson_id: int, 
    lang: str = "en",
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get all quiz questions for a lesson"""
    quizzes = db.query(models.Quiz)\
        .filter(models.Quiz.lesson_id == lesson_id)\
        .order_by(models.Quiz.order)\
        .all()
    
    if lang == "cs":
        for quiz in quizzes:
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
                
    return quizzes

# --- PROGRESS ENDPOINTS ---

@router.post("/lessons/{lesson_id}/complete", response_model=schemas.UserProgress)
def complete_lesson(
    lesson_id: int,
    db: Session = Depends(database.get_db),
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
        course_id=lesson.course_id,
        completed_at=func.now()
    )
    db.add(new_progress)
    
    # Award XP for lesson completion
    current_user.xp += 50
    
    db.commit()
    db.refresh(new_progress)
    db.refresh(current_user)
    return new_progress

@router.post("/lessons/{lesson_id}/progress", response_model=schemas.UserProgress)
def update_lesson_progress(
    lesson_id: int,
    page: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Update user's current page in a lesson"""
    # Check if lesson exists
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    # Find existing progress or create new
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson_id
    ).first()
    
    if not progress:
        progress = models.UserProgress(
            user_id=current_user.id,
            lesson_id=lesson_id,
            course_id=lesson.course_id,
            current_page=page
        )
        db.add(progress)
    else:
        progress.current_page = page
        # last_accessed is updated automatically by SQLAlchemy onupdate
    
    db.commit()
    db.refresh(progress)
    return progress

@router.post("/lessons/{lesson_id}/lab/complete", response_model=schemas.UserProgress)
def complete_lesson_lab(
    lesson_id: int,
    completion: schemas.LabCompletion,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Mark a specific lab within a lesson as completed"""
    # Check if lesson exists
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson_id
    ).first()
    
    lab_id = completion.lab_id
    
    if not progress:
        progress = models.UserProgress(
            user_id=current_user.id,
            lesson_id=lesson_id,
            course_id=lesson.course_id,
            completed_labs=[lab_id]
        )
        db.add(progress)
        current_user.xp += 25
    else:
        # Check if lab already completed
        # Note: SQLAlchemy JSON mutation tracking can be tricky, so we make a copy
        current_labs = list(progress.completed_labs) if progress.completed_labs else []
        
        if lab_id not in current_labs:
            current_labs.append(lab_id)
            progress.completed_labs = current_labs
            # Explicitly flag as modified for some DBs/Drivers
            from sqlalchemy.orm.attributes import flag_modified
            flag_modified(progress, "completed_labs")
            
            current_user.xp += 25
    
    db.commit()
    db.refresh(progress)
    db.refresh(current_user)
    return progress

@router.post("/lessons/{lesson_id}/quiz/complete", response_model=schemas.UserProgress)
def complete_lesson_quiz(
    lesson_id: int,
    completion: schemas.QuizCompletion,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Save quiz score and award XP if passed (>70%)"""
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson_id
    ).first()
    
    xp_award = 0
    
    if not progress:
        progress = models.UserProgress(
            user_id=current_user.id,
            lesson_id=lesson_id,
            course_id=lesson.course_id,
            quiz_score=completion.score
        )
        db.add(progress)
        if completion.score >= 70:
            xp_award = 50
    else:
        # Only award XP if improving from failing to passing, or first time passing
        previous_score = progress.quiz_score or 0
        progress.quiz_score = completion.score
        
        if completion.score >= 70 and previous_score < 70:
            xp_award = 50
            
    if xp_award > 0:
        current_user.xp += xp_award
    
    db.commit()
    db.refresh(progress)
    db.refresh(current_user)
    return progress
