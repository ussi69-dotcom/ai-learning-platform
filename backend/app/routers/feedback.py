from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app import database, models, schemas, auth

router = APIRouter(
    prefix="/feedback",
    tags=["feedback"]
)

@router.get("/", response_model=List[schemas.FeedbackItemResponse])
def get_feedback(
    lesson_id: Optional[int] = None, 
    slide_index: Optional[int] = None, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Get feedback items, optionally filtered by lesson and slide.
    """
    query = db.query(models.FeedbackItem)
    
    if lesson_id:
        query = query.filter(models.FeedbackItem.lesson_id == lesson_id)
    if slide_index is not None:
        query = query.filter(models.FeedbackItem.slide_index == slide_index)
        
    # Only top-level items (replies are loaded via relationship)
    query = query.filter(models.FeedbackItem.parent_id == None)
    
    items = query.order_by(models.FeedbackItem.created_at.desc()).all()
    
    # Populate user_vote for the current user
    # This is a bit inefficient (N+1), but fine for small feedback lists.
    # Ideally, we'd use a joined load or subquery.
    for item in items:
        vote = db.query(models.FeedbackVote).filter(
            models.FeedbackVote.feedback_id == item.id,
            models.FeedbackVote.user_id == current_user.id
        ).first()
        item.user_vote = vote.vote_type if vote else None
        
        # Also for replies
        for reply in item.replies:
             vote = db.query(models.FeedbackVote).filter(
                models.FeedbackVote.feedback_id == reply.id,
                models.FeedbackVote.user_id == current_user.id
            ).first()
             reply.user_vote = vote.vote_type if vote else None

    return items

@router.post("/", response_model=schemas.FeedbackItemResponse)
def create_feedback(feedback: schemas.FeedbackItemCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Create a new feedback item.
    """
    new_item = models.FeedbackItem(
        user_id=current_user.id,
        lesson_id=feedback.lesson_id,
        slide_index=feedback.slide_index,
        x_pos=feedback.x_pos,
        y_pos=feedback.y_pos,
        type=feedback.type,
        message=feedback.message,
        parent_id=feedback.parent_id
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.post("/{feedback_id}/vote")
def vote_feedback(feedback_id: int, direction: str = Query(..., regex="^(up|down)$"), db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Vote on a feedback item.
    """
    item = db.query(models.FeedbackItem).filter(models.FeedbackItem.id == feedback_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Feedback not found")

    # Check existing vote
    existing_vote = db.query(models.FeedbackVote).filter(
        models.FeedbackVote.feedback_id == feedback_id,
        models.FeedbackVote.user_id == current_user.id
    ).first()

    if existing_vote:
        if existing_vote.vote_type == direction:
            # Remove vote (toggle off)
            db.delete(existing_vote)
            if direction == "up":
                item.votes -= 1
            else:
                item.votes += 1 # Undo downvote? Logic depends. Usually score = up - down.
                # Let's assume simple score: +1 for up, -1 for down.
                # If item.votes is just a counter, we need to be careful.
                # Let's assume item.votes is the sum.
        else:
            # Change vote
            if existing_vote.vote_type == "up" and direction == "down":
                item.votes -= 2
            elif existing_vote.vote_type == "down" and direction == "up":
                item.votes += 2
            existing_vote.vote_type = direction
    else:
        # New vote
        new_vote = models.FeedbackVote(
            user_id=current_user.id,
            feedback_id=feedback_id,
            vote_type=direction
        )
        db.add(new_vote)
        if direction == "up":
            item.votes += 1
        else:
            item.votes -= 1
            
    db.commit()
    return {"status": "success", "votes": item.votes}

@router.post("/{feedback_id}/reply", response_model=schemas.FeedbackItemResponse)
def reply_feedback(feedback_id: int, reply: schemas.FeedbackItemCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Reply to a feedback item.
    """
    parent = db.query(models.FeedbackItem).filter(models.FeedbackItem.id == feedback_id).first()
    if not parent:
        raise HTTPException(status_code=404, detail="Parent feedback not found")
        
    new_reply = models.FeedbackItem(
        user_id=current_user.id,
        lesson_id=parent.lesson_id, # Inherit context
        slide_index=parent.slide_index,
        x_pos=parent.x_pos, # Same position stack
        y_pos=parent.y_pos,
        type=reply.type, # Or NOTE
        message=reply.message,
        parent_id=feedback_id
    )
    db.add(new_reply)
    db.commit()
    db.refresh(new_reply)
    return new_reply

@router.delete("/{feedback_id}")
def delete_feedback(feedback_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    """
    Delete feedback item (only author).
    """
    item = db.query(models.FeedbackItem).filter(models.FeedbackItem.id == feedback_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Feedback not found")
        
    if item.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this feedback")
        
    db.delete(item)
    db.commit()
    return {"status": "success"}
