from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from app import models, schemas, database, auth

router = APIRouter()

# Test API key for E2E testing (only set in test environments)
TEST_API_KEY = os.getenv("TEST_API_KEY")

@router.get("/users/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@router.delete("/users/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_me(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Delete the current user's account and related data."""
    # 1. Check if user owns courses (Admins/Creators)
    # We prevent deletion if they own content to preserve platform integrity
    owned_courses = db.query(models.Course).filter(models.Course.owner_id == current_user.id).count()
    if owned_courses > 0:
        raise HTTPException(
            status_code=400, 
            detail="Cannot delete account because you own courses. Please contact support or transfer ownership."
        )

    # 2. Delete User Progress
    db.query(models.UserProgress).filter(models.UserProgress.user_id == current_user.id).delete()

    # 3. Delete Feedback Votes
    db.query(models.FeedbackVote).filter(models.FeedbackVote.user_id == current_user.id).delete()

    # 4. Delete Feedback Items (and their replies via cascade if configured, or leave orphans if DB allows)
    # Ideally we should delete them, but for now let's just delete the user and rely on DB Foreign Keys 
    # if they are set to CASCADE. If not, this might fail. 
    # Let's try to delete items explicitly.
    db.query(models.FeedbackItem).filter(models.FeedbackItem.user_id == current_user.id).delete()

    # 5. Delete User
    db.delete(current_user)
    
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error deleting user: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete account")

    return None

@router.put("/users/me/difficulty", response_model=schemas.User)
def update_user_difficulty(
    difficulty_update: schemas.UserDifficultyUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Update user's difficulty level"""
    difficulty = difficulty_update.difficulty
    # Validate difficulty
    valid_difficulties = ['PIECE_OF_CAKE', 'LETS_ROCK', 'COME_GET_SOME', 'DAMN_IM_GOOD']
    if difficulty not in valid_difficulties:
        raise HTTPException(status_code=400, detail=f"Invalid difficulty. Must be one of: {valid_difficulties}")
    
    # Update difficulty
    current_user.difficulty = models.DifficultyLevel[difficulty]
    db.commit()
    db.refresh(current_user)
    return current_user

@router.put("/users/me/avatar", response_model=schemas.User)
def update_user_avatar(
    avatar_update: schemas.UserAvatarUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Update user's avatar"""
    current_user.avatar = avatar_update.avatar
    db.commit()
    db.refresh(current_user)
    return current_user
    
@router.post("/users/me/xp", response_model=schemas.User)
def add_user_xp(
    xp_update: schemas.UserXPUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Add XP to current user"""
    current_user.xp += xp_update.xp_amount
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/users/me/progress", response_model=List[schemas.UserProgress])
def get_user_progress(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get all completed lessons for the current user"""
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id
    ).all()
    return progress

@router.get("/users/me/last-lesson", response_model=Optional[schemas.UserProgress])
def get_user_last_lesson(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get the last accessed lesson and page for the current user"""
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id
    ).order_by(models.UserProgress.last_accessed.desc()).first()
    return progress


# =============================================================================
# TEST ENDPOINTS (Protected by TEST_API_KEY - only for E2E testing)
# =============================================================================

def verify_test_api_key(x_test_api_key: Optional[str] = Header(None)):
    """Verify the test API key is valid and configured."""
    if not TEST_API_KEY:
        raise HTTPException(
            status_code=403,
            detail="Test API not configured. Set TEST_API_KEY environment variable."
        )
    if x_test_api_key != TEST_API_KEY:
        raise HTTPException(status_code=403, detail="Invalid test API key")
    return True


@router.get("/test/verification-token/{email}")
def get_verification_token(
    email: str,
    db: Session = Depends(database.get_db),
    _: bool = Depends(verify_test_api_key)
):
    """
    Get verification token for a user (TEST ONLY).
    Protected by TEST_API_KEY header.
    Used for E2E testing of registration flow.
    """
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.verification_token:
        raise HTTPException(status_code=400, detail="User already verified or no token")
    return {"verification_token": user.verification_token}


@router.delete("/test/user/{email}")
def delete_test_user(
    email: str,
    db: Session = Depends(database.get_db),
    _: bool = Depends(verify_test_api_key)
):
    """
    Delete a user by email (TEST ONLY).
    Protected by TEST_API_KEY header.
    Used for E2E testing cleanup.
    """
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Clean up related data
    db.query(models.UserProgress).filter(models.UserProgress.user_id == user.id).delete()
    db.query(models.FeedbackVote).filter(models.FeedbackVote.user_id == user.id).delete()
    db.query(models.FeedbackItem).filter(models.FeedbackItem.user_id == user.id).delete()
    db.query(models.Certificate).filter(models.Certificate.user_id == user.id).delete()

    db.delete(user)
    db.commit()

    return {"message": f"User {email} deleted successfully"}
