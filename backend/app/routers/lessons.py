from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, timedelta, timezone
from app import models, schemas, database, auth
from app.dependencies import get_lesson, get_course

router = APIRouter()


def update_user_streak(user: models.User, db: Session) -> None:
    """
    Update user's streak based on activity.

    Logic:
    - If no previous activity: start streak at 1
    - If last activity was yesterday: increment streak
    - If last activity was today: no change
    - If last activity was >1 day ago: reset streak to 1

    Also updates longest_streak if current_streak exceeds it.
    """
    now = datetime.now(timezone.utc)
    today = now.date()

    if user.last_activity_date is None:
        # First ever activity
        user.current_streak = 1
        user.longest_streak = 1
        user.last_activity_date = now
    else:
        last_date = user.last_activity_date.date()

        if last_date == today:
            # Already active today, no change to streak
            pass
        elif last_date == today - timedelta(days=1):
            # Active yesterday, increment streak!
            user.current_streak += 1
            if user.current_streak > user.longest_streak:
                user.longest_streak = user.current_streak
            user.last_activity_date = now
        else:
            # Gap of >1 day, reset streak
            user.current_streak = 1
            user.last_activity_date = now


# --- ACHIEVEMENTS SYSTEM (Phase 1.3) ---

ACHIEVEMENTS = {
    "first_blood": {
        "name": "First Blood",
        "name_cs": "První krev",
        "description": "Complete your first lesson",
        "description_cs": "Dokončete svou první lekci",
        "icon": "🩸",
        "xp_bonus": 25
    },
    "lab_rat": {
        "name": "Lab Rat",
        "name_cs": "Laboratorní krysa",
        "description": "Complete 5 labs",
        "description_cs": "Dokončete 5 laboratorních cvičení",
        "icon": "🐀",
        "xp_bonus": 50
    },
    "quiz_master": {
        "name": "Quiz Master",
        "name_cs": "Mistr kvízů",
        "description": "Score 100% on any quiz",
        "description_cs": "Získejte 100% v jakémkoli kvízu",
        "icon": "🎓",
        "xp_bonus": 50
    },
    "course_conqueror": {
        "name": "Course Conqueror",
        "name_cs": "Dobyvatel kurzu",
        "description": "Complete a full course",
        "description_cs": "Dokončete celý kurz",
        "icon": "👑",
        "xp_bonus": 100
    },
    "week_warrior": {
        "name": "Week Warrior",
        "name_cs": "Týdenní válečník",
        "description": "Maintain a 7-day learning streak",
        "description_cs": "Udržujte 7denní sérii učení",
        "icon": "⚔️",
        "xp_bonus": 100
    }
}


def check_and_award_achievements(user: models.User, db: Session, trigger: str = None) -> List[str]:
    """
    Check if user has earned any new achievements and award them.
    Returns list of newly unlocked achievement IDs.
    """
    from sqlalchemy.orm.attributes import flag_modified

    current_achievements = list(user.achievements) if user.achievements else []
    newly_unlocked = []

    # Helper to award achievement
    def award(achievement_id: str):
        if achievement_id not in current_achievements:
            current_achievements.append(achievement_id)
            user.xp += ACHIEVEMENTS[achievement_id]["xp_bonus"]
            newly_unlocked.append(achievement_id)

    # First Blood: Complete first lesson
    if "first_blood" not in current_achievements:
        completed_lessons = db.query(models.UserProgress).filter(
            models.UserProgress.user_id == user.id,
            models.UserProgress.completed_at.isnot(None)
        ).count()
        if completed_lessons >= 1:
            award("first_blood")

    # Lab Rat: Complete 5 labs
    if "lab_rat" not in current_achievements:
        total_labs = 0
        progresses = db.query(models.UserProgress).filter(
            models.UserProgress.user_id == user.id
        ).all()
        for p in progresses:
            if p.completed_labs:
                total_labs += len(p.completed_labs)
        if total_labs >= 5:
            award("lab_rat")

    # Quiz Master: Score 100% on any quiz
    if "quiz_master" not in current_achievements:
        perfect_quiz = db.query(models.UserProgress).filter(
            models.UserProgress.user_id == user.id,
            models.UserProgress.quiz_score == 100
        ).first()
        if perfect_quiz:
            award("quiz_master")

    # Course Conqueror: Complete full course
    if "course_conqueror" not in current_achievements:
        courses = db.query(models.Course).all()
        for course in courses:
            total_lessons = db.query(models.Lesson).filter(
                models.Lesson.course_id == course.id
            ).count()
            if total_lessons > 0:
                completed = db.query(models.UserProgress).filter(
                    models.UserProgress.user_id == user.id,
                    models.UserProgress.course_id == course.id,
                    models.UserProgress.completed_at.isnot(None)
                ).count()
                if completed >= total_lessons:
                    award("course_conqueror")
                    break

    # Week Warrior: 7-day streak
    if "week_warrior" not in current_achievements:
        if user.current_streak >= 7 or user.longest_streak >= 7:
            award("week_warrior")

    # Update user achievements if changed
    if newly_unlocked:
        user.achievements = current_achievements
        flag_modified(user, "achievements")

    return newly_unlocked


# --- ACHIEVEMENTS ENDPOINT ---

@router.get("/achievements")
def get_achievements(
    lang: str = "en",
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get all available achievements with user's unlock status."""
    user_achievements = current_user.achievements if current_user.achievements else []

    result = []
    for achievement_id, data in ACHIEVEMENTS.items():
        result.append({
            "id": achievement_id,
            "name": data["name_cs"] if lang == "cs" else data["name"],
            "description": data["description_cs"] if lang == "cs" else data["description"],
            "icon": data["icon"],
            "xp_bonus": data["xp_bonus"],
            "unlocked": achievement_id in user_achievements
        })

    return result


# --- COURSES ENDPOINTS ---

@router.get("/courses/", response_model=List[schemas.Course])
def read_courses(
    skip: int = 0,
    limit: int = 100,
    lang: str = "en",
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    # Return ALL courses (no difficulty filtering - user sees everything)
    # Frontend will show "Recommended" badge based on calculated_level
    courses = db.query(models.Course)\
        .order_by(models.Course.difficulty_level)\
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
    course: models.Course = Depends(get_course),
    lang: str = "en",
    current_user: models.User = Depends(auth.get_current_user)
):
    # Course is auto-resolved via dependency (supports both ID and slug)

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
    course: models.Course = Depends(get_course),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get progress percentage for a specific course"""
    # Course is auto-resolved via dependency (supports both ID and slug)

    # Get total lessons in course
    total_lessons = db.query(models.Lesson).filter(models.Lesson.course_id == course.id).count()

    if total_lessons == 0:
        return {"percentage": 0, "completed": 0, "total": 0}

    # Get completed lessons in course
    completed_lessons = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.course_id == course.id
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
    lesson: models.Lesson = Depends(get_lesson),
    lang: str = "en"
):
    # Lesson is auto-resolved via dependency (supports both ID and slug)

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
    lesson: models.Lesson = Depends(get_lesson),
    lang: str = "en",
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get all quiz questions for a lesson"""
    # Lesson is auto-resolved via dependency (supports both ID and slug)
    quizzes = db.query(models.Quiz)\
        .filter(models.Quiz.lesson_id == lesson.id)\
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
    lesson: models.Lesson = Depends(get_lesson),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Mark a lesson as completed"""
    # Lesson is auto-resolved via dependency (supports both ID and slug)

    # Check if already completed
    existing_progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson.id
    ).first()

    if existing_progress:
        # Still update streak even if lesson already completed
        update_user_streak(current_user, db)
        check_and_award_achievements(current_user, db)
        db.commit()
        return existing_progress

    # Create new progress entry
    new_progress = models.UserProgress(
        user_id=current_user.id,
        lesson_id=lesson.id,
        course_id=lesson.course_id,
        completed_at=func.now()
    )
    db.add(new_progress)

    # Award XP for lesson completion
    current_user.xp += 50

    # Update streak and check achievements
    update_user_streak(current_user, db)
    check_and_award_achievements(current_user, db)

    db.commit()
    db.refresh(new_progress)
    db.refresh(current_user)
    return new_progress

@router.post("/lessons/{lesson_id}/progress", response_model=schemas.UserProgress)
def update_lesson_progress(
    lesson: models.Lesson = Depends(get_lesson),
    page: int = 0,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Update user's current page in a lesson"""
    # Lesson is auto-resolved via dependency (supports both ID and slug)

    # Find existing progress or create new
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson.id
    ).first()

    if not progress:
        progress = models.UserProgress(
            user_id=current_user.id,
            lesson_id=lesson.id,
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

def calculate_lab_xp(step_count: int) -> int:
    """Calculate XP award based on lab complexity (step count)."""
    if step_count <= 3:
        return 25  # Simple lab
    elif step_count <= 6:
        return 50  # Medium lab
    else:
        return 75  # Complex lab

@router.post("/lessons/{lesson_id}/lab/complete", response_model=schemas.UserProgress)
def complete_lesson_lab(
    completion: schemas.LabCompletion,
    lesson: models.Lesson = Depends(get_lesson),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Mark a specific lab within a lesson as completed. XP based on step count."""
    # Lesson is auto-resolved via dependency (supports both ID and slug)

    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson.id
    ).first()

    lab_id = completion.lab_id
    xp_award = calculate_lab_xp(completion.step_count)

    if not progress:
        progress = models.UserProgress(
            user_id=current_user.id,
            lesson_id=lesson.id,
            course_id=lesson.course_id,
            completed_labs=[lab_id]
        )
        db.add(progress)
        current_user.xp += xp_award
    else:
        # Check if lab already completed
        current_labs = list(progress.completed_labs) if progress.completed_labs else []

        if lab_id not in current_labs:
            current_labs.append(lab_id)
            progress.completed_labs = current_labs
            from sqlalchemy.orm.attributes import flag_modified
            flag_modified(progress, "completed_labs")

            current_user.xp += xp_award

    # Update streak and check achievements on any lab activity
    update_user_streak(current_user, db)
    check_and_award_achievements(current_user, db)

    db.commit()
    db.refresh(progress)
    db.refresh(current_user)
    return progress

@router.post("/lessons/{lesson_id}/quiz/complete", response_model=schemas.UserProgress)
def complete_lesson_quiz(
    completion: schemas.QuizCompletion,
    lesson: models.Lesson = Depends(get_lesson),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Save quiz score and award XP if passed (>=70%).

    XP System:
    - First pass: +50 XP
    - Second pass (retry): +25 XP bonus
    - Subsequent: no additional XP
    """
    # Lesson is auto-resolved via dependency (supports both ID and slug)

    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.lesson_id == lesson.id
    ).first()

    xp_award = 0
    passed = completion.score >= 70

    if not progress:
        # First attempt
        progress = models.UserProgress(
            user_id=current_user.id,
            lesson_id=lesson.id,
            course_id=lesson.course_id,
            quiz_score=completion.score,
            quiz_attempts=1 if passed else 0  # Track passing attempts
        )
        db.add(progress)
        if passed:
            xp_award = 50  # First pass bonus
    else:
        previous_score = progress.quiz_score or 0
        previous_attempts = getattr(progress, 'quiz_attempts', 0) or 0
        progress.quiz_score = max(completion.score, previous_score)  # Keep best score

        if passed:
            if previous_attempts == 0:
                # First time passing
                xp_award = 50
                progress.quiz_attempts = 1
            elif previous_attempts == 1 and completion.is_retry:
                # Second pass (retry bonus)
                xp_award = 25
                progress.quiz_attempts = 2
            # No XP for 3rd+ attempts

    if xp_award > 0:
        current_user.xp += xp_award

    # Update streak and check achievements on quiz activity
    update_user_streak(current_user, db)
    check_and_award_achievements(current_user, db)

    db.commit()
    db.refresh(progress)
    db.refresh(current_user)
    return progress
