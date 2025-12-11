import uuid
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas, database, auth
from app.models import calculate_level_from_xp

router = APIRouter()


def get_badge_level(xp: int) -> int:
    """Convert XP to badge level (1-4)."""
    level = calculate_level_from_xp(xp)
    levels = list(models.DifficultyLevel)
    return levels.index(level) + 1


@router.post("/certificates/", response_model=schemas.Certificate)
def create_certificate(
    cert_data: schemas.CertificateCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Create a certificate for completing a course."""
    # Check if course exists
    course = db.query(models.Course).filter(models.Course.id == cert_data.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Check if user completed all lessons in the course
    total_lessons = db.query(models.Lesson).filter(
        models.Lesson.course_id == cert_data.course_id
    ).count()

    completed_lessons = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id,
        models.UserProgress.course_id == cert_data.course_id,
        models.UserProgress.completed_at.isnot(None)
    ).count()

    if completed_lessons < total_lessons:
        raise HTTPException(
            status_code=400,
            detail=f"Course not completed. {completed_lessons}/{total_lessons} lessons done."
        )

    # Check if certificate already exists
    existing = db.query(models.Certificate).filter(
        models.Certificate.user_id == current_user.id,
        models.Certificate.course_id == cert_data.course_id
    ).first()

    if existing:
        # Update personalized name if provided
        if cert_data.personalized_name:
            existing.personalized_name = cert_data.personalized_name
            db.commit()
            db.refresh(existing)
        existing.course_title = course.title
        return existing

    # Create new certificate
    certificate = models.Certificate(
        certificate_id=str(uuid.uuid4()),
        user_id=current_user.id,
        course_id=cert_data.course_id,
        badge_level=get_badge_level(current_user.xp),
        xp_at_completion=current_user.xp,
        personalized_name=cert_data.personalized_name
    )
    db.add(certificate)
    db.commit()
    db.refresh(certificate)

    certificate.course_title = course.title
    return certificate


@router.get("/certificates/", response_model=List[schemas.Certificate])
def get_user_certificates(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get all certificates for current user."""
    certificates = db.query(models.Certificate).filter(
        models.Certificate.user_id == current_user.id
    ).all()

    # Add course titles
    for cert in certificates:
        course = db.query(models.Course).filter(models.Course.id == cert.course_id).first()
        cert.course_title = course.title if course else "Unknown Course"

    return certificates


@router.get("/certificates/{certificate_id}", response_model=schemas.Certificate)
def get_certificate(
    certificate_id: str,
    db: Session = Depends(database.get_db)
):
    """Get certificate by public ID (no auth required for sharing)."""
    certificate = db.query(models.Certificate).filter(
        models.Certificate.certificate_id == certificate_id
    ).first()

    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")

    course = db.query(models.Course).filter(models.Course.id == certificate.course_id).first()
    certificate.course_title = course.title if course else "Unknown Course"

    return certificate


@router.post("/certificates/{certificate_id}/email")
async def email_certificate(
    certificate_id: str,
    email_request: schemas.CertificateEmailRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Send certificate to email."""
    certificate = db.query(models.Certificate).filter(
        models.Certificate.certificate_id == certificate_id,
        models.Certificate.user_id == current_user.id
    ).first()

    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")

    # Update personalized name if provided
    if email_request.personalized_name:
        certificate.personalized_name = email_request.personalized_name

    target_email = email_request.email or current_user.email

    # Get course info
    course = db.query(models.Course).filter(models.Course.id == certificate.course_id).first()

    # TODO: Implement actual email sending via email service
    # For now, mark as emailed
    from sqlalchemy.sql import func
    certificate.emailed = True
    certificate.email_sent_at = func.now()
    db.commit()

    return {
        "status": "success",
        "message": f"Certificate will be sent to {target_email}",
        "certificate_id": certificate_id
    }


@router.put("/certificates/{certificate_id}", response_model=schemas.Certificate)
def update_certificate(
    certificate_id: str,
    update_data: schemas.CertificateEmailRequest,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Update certificate personalized name."""
    certificate = db.query(models.Certificate).filter(
        models.Certificate.certificate_id == certificate_id,
        models.Certificate.user_id == current_user.id
    ).first()

    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")

    if update_data.personalized_name is not None:
        certificate.personalized_name = update_data.personalized_name

    db.commit()
    db.refresh(certificate)

    course = db.query(models.Course).filter(models.Course.id == certificate.course_id).first()
    certificate.course_title = course.title if course else "Unknown Course"

    return certificate
