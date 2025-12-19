"""
FastAPI Dependencies for automatic ID/slug resolution.

These dependencies ensure that both numeric IDs and slugs work seamlessly
across all endpoints, preventing 422 errors from ID/slug mismatches.

Usage:
    @router.get("/lessons/{lesson_id}")
    def get_lesson_endpoint(lesson: models.Lesson = Depends(get_lesson)):
        # lesson is already resolved - use lesson.id for queries
        return lesson
"""

from fastapi import Depends, HTTPException, Path
from sqlalchemy.orm import Session
from app import models, database


def get_lesson(
    lesson_id: str = Path(..., description="Lesson ID (numeric) or slug"),
    db: Session = Depends(database.get_db)
) -> models.Lesson:
    """
    Resolve lesson from either numeric ID or slug.

    Returns the Lesson model instance, raising 404 if not found.
    This dependency should be used in all lesson-related endpoints.
    """
    if lesson_id.isdigit():
        lesson = db.query(models.Lesson).filter(models.Lesson.id == int(lesson_id)).first()
    else:
        lesson = db.query(models.Lesson).filter(models.Lesson.slug == lesson_id).first()

    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


def get_course(
    course_id: str = Path(..., description="Course ID (numeric) or slug"),
    db: Session = Depends(database.get_db)
) -> models.Course:
    """
    Resolve course from either numeric ID or slug.

    Returns the Course model instance, raising 404 if not found.
    This dependency should be used in all course-related endpoints.
    """
    if course_id.isdigit():
        course = db.query(models.Course).filter(models.Course.id == int(course_id)).first()
    else:
        course = db.query(models.Course).filter(models.Course.slug == course_id).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course
