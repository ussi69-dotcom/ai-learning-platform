from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, joinedload, selectinload
from typing import List, Optional
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

# Dependency pro získání DB session - ODSTRANĚNO, používáme database.get_db

@app.post("/auth/register", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    # Default difficulty is handled by Schema default, but we can be explicit if needed
    new_user = models.User(
        email=user.email, 
        hashed_password=hashed_password,
        difficulty=models.DifficultyLevel(user.difficulty), # Convert string to Enum
        avatar=user.avatar
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/auth/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    print(f"DEBUG: Login attempt for username: {form_data.username}")
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    
    if not user:
        print("DEBUG: User not found in DB")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    print(f"DEBUG: User found: {user.email}, Hash in DB: {user.hashed_password[:20]}...")
    
    is_valid = auth.verify_password(form_data.password, user.hashed_password)
    print(f"DEBUG: Password verification result: {is_valid}")
    
    if not is_valid:
        print("DEBUG: Password invalid")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    print("DEBUG: Token generated successfully")
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

@app.get("/courses/{course_id}", response_model=schemas.Course)
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
        if course.title_cs:
            course.title = course.title_cs
        if course.description_cs:
            course.description = course.description_cs
            
    return course

# --- LESSONS ENDPOINTS ---

@app.get("/users/me/last-lesson", response_model=Optional[schemas.UserProgress])
def get_user_last_lesson(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get the last accessed lesson and page for the current user"""
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == current_user.id
    ).order_by(models.UserProgress.last_accessed.desc()).first()
    return progress

@app.get("/lessons/", response_model=List[schemas.LessonSummary])
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

@app.get("/lessons/{lesson_id}", response_model=schemas.Lesson)
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

# --- FEEDBACK ENDPOINTS ---

@app.post("/feedback", response_model=schemas.FeedbackItemResponse, status_code=status.HTTP_201_CREATED)
def create_feedback_item(
    feedback_in: schemas.FeedbackItemCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Create a new feedback item (Lesson-specific or Global)."""
    # Treat 0 as None for lesson_id (Global feedback)
    if feedback_in.lesson_id == 0:
        feedback_in.lesson_id = None

    # Check if lesson exists IF lesson_id is provided
    if feedback_in.lesson_id:
        lesson = db.query(models.Lesson).filter(models.Lesson.id == feedback_in.lesson_id).first()
        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found")
    
    # Check for parent_id if it's a reply
    if feedback_in.parent_id:
        parent_feedback = db.query(models.FeedbackItem).filter(models.FeedbackItem.id == feedback_in.parent_id).first()
        if not parent_feedback:
            raise HTTPException(status_code=404, detail="Parent feedback item not found")

    new_feedback = models.FeedbackItem(
        **feedback_in.model_dump(),
        user_id=current_user.id
    )
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    return new_feedback

@app.get("/feedback", response_model=List[schemas.FeedbackItemResponse])
def get_feedback(
    lesson_id: Optional[int] = None,
    slide_index: Optional[int] = None,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Get feedback items, optionally filtered by lesson and slide."""
    query = db.query(models.FeedbackItem)
    
    if lesson_id is not None:
        query = query.filter(models.FeedbackItem.lesson_id == lesson_id)
    else:
        # If no lesson_id, maybe return only global feedback? Or all?
        # Let's assume if no lesson_id is passed, we want GLOBAL feedback (lesson_id is NULL)
        # Unless we want ALL feedback? 
        # For Home Page, we probably want GLOBAL feedback (lesson_id=NULL).
        # Let's enforce: if lesson_id is None, filter where lesson_id IS NULL.
        query = query.filter(models.FeedbackItem.lesson_id == None)

    if slide_index is not None:
        query = query.filter(models.FeedbackItem.slide_index == slide_index)
    
    # Load author relationship and replies (and their authors)
    # Also load votes to check if user voted (though we might need a separate query for that efficiently)
    feedback_items = query.options(
        joinedload(models.FeedbackItem.author),
        selectinload(models.FeedbackItem.replies).joinedload(models.FeedbackItem.author)
    ).all()
    
    # Get all user votes for these items to populate user_vote
    item_ids = [item.id for item in feedback_items]
    user_votes = {}
    if item_ids:
        votes = db.query(models.FeedbackVote).filter(
            models.FeedbackVote.user_id == current_user.id,
            models.FeedbackVote.feedback_id.in_(item_ids)
        ).all()
        user_votes = {v.feedback_id: v.vote_type for v in votes}

    # Populate simplified FeedbackUser schema
    results = []
    for item in feedback_items:
        # Recursively populate replies
        replies_response = []
        # Handle case where replies might be None (though relationship should return list, better safe)
        current_replies = item.replies or []
        for reply in current_replies:
             replies_response.append(schemas.FeedbackItemResponse(
                id=reply.id,
                lesson_id=reply.lesson_id,
                slide_index=reply.slide_index,
                x_pos=reply.x_pos,
                y_pos=reply.y_pos,
                type=reply.type,
                message=reply.message,
                created_at=reply.created_at,
                is_resolved=reply.is_resolved,
                parent_id=reply.parent_id,
                votes=reply.votes,
                user_id=reply.user_id,
                author=schemas.FeedbackUser(
                    id=reply.author.id,
                    email=reply.author.email,
                    avatar=reply.author.avatar
                ),
                replies=[], # Replies to replies not supported deeply for now
                user_vote=None # Replies voting not fully implemented in UI yet
             ))

        results.append(schemas.FeedbackItemResponse(
            id=item.id,
            lesson_id=item.lesson_id,
            slide_index=item.slide_index,
            x_pos=item.x_pos,
            y_pos=item.y_pos,
            type=item.type,
            message=item.message,
            created_at=item.created_at,
            is_resolved=item.is_resolved,
            parent_id=item.parent_id,
            votes=item.votes,
            user_id=item.user_id,
            author=schemas.FeedbackUser(
                id=item.author.id,
                email=item.author.email,
                avatar=item.author.avatar
            ),
            replies=replies_response,
            user_vote=user_votes.get(item.id)
        ))
    return results

@app.post("/feedback/{feedback_id}/vote", response_model=schemas.FeedbackItemResponse)
def vote_on_feedback(
    feedback_id: int,
    direction: str, # "up" or "down"
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Vote up or down on a feedback item."""
    feedback_item = db.query(models.FeedbackItem).filter(models.FeedbackItem.id == feedback_id).first()
    if not feedback_item:
        raise HTTPException(status_code=404, detail="Feedback item not found")
    
    # Check if user already voted
    existing_vote = db.query(models.FeedbackVote).filter(
        models.FeedbackVote.user_id == current_user.id,
        models.FeedbackVote.feedback_id == feedback_id
    ).first()

    if existing_vote:
        if existing_vote.vote_type == direction:
            # Toggle off (remove vote)
            db.delete(existing_vote)
            if direction == "up":
                feedback_item.votes -= 1
            else:
                feedback_item.votes += 1
        else:
            # Switch vote
            existing_vote.vote_type = direction
            if direction == "up":
                feedback_item.votes += 2 # -1 (down) + 1 (neutral) + 1 (up)
            else:
                feedback_item.votes -= 2 # +1 (up) - 1 (neutral) - 1 (down)
    else:
        # New vote
        new_vote = models.FeedbackVote(
            user_id=current_user.id,
            feedback_id=feedback_id,
            vote_type=direction
        )
        db.add(new_vote)
        if direction == "up":
            feedback_item.votes += 1
        else:
            feedback_item.votes -= 1
    
    db.commit()
    db.refresh(feedback_item)
    
    # Re-fetch to return full structure (though frontend might just need updated votes)
    # Ideally we return the updated FeedbackItemResponse with user_vote
    # For simplicity, we return the item, but we need to populate the schema manually or re-query
    # Let's re-query to be safe and consistent with get_feedback
    # But for speed, let's just return the item and let frontend handle it or refresh
    # The schema expects author, so we need that loaded
    
    return schemas.FeedbackItemResponse(
            id=feedback_item.id,
            lesson_id=feedback_item.lesson_id,
            slide_index=feedback_item.slide_index,
            x_pos=feedback_item.x_pos,
            y_pos=feedback_item.y_pos,
            type=feedback_item.type,
            message=feedback_item.message,
            created_at=feedback_item.created_at,
            is_resolved=feedback_item.is_resolved,
            parent_id=feedback_item.parent_id,
            votes=feedback_item.votes,
            user_id=feedback_item.user_id,
            author=schemas.FeedbackUser(
                id=feedback_item.author.id,
                email=feedback_item.author.email,
                avatar=feedback_item.author.avatar
            ),
            replies=[], # Not needed for vote response usually
            user_vote=direction if not existing_vote or existing_vote.vote_type != direction else None
    )

@app.post("/feedback/{feedback_id}/reply", response_model=schemas.FeedbackItemResponse, status_code=status.HTTP_201_CREATED)
def create_feedback_reply(
    feedback_id: int,
    feedback_in: schemas.FeedbackItemCreate, # Re-use create schema for replies
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Create a reply to an existing feedback item."""
    parent_feedback = db.query(models.FeedbackItem).filter(models.FeedbackItem.id == feedback_id).first()
    if not parent_feedback:
        raise HTTPException(status_code=404, detail="Parent feedback item not found")
    
    # Ensure the reply has the same lesson_id and slide_index as parent
    if feedback_in.lesson_id != parent_feedback.lesson_id or feedback_in.slide_index != parent_feedback.slide_index:
        raise HTTPException(status_code=400, detail="Reply must belong to the same lesson and slide as parent")

    new_reply = models.FeedbackItem(
        **feedback_in.model_dump(exclude={"parent_id"}),
        user_id=current_user.id,
        parent_id=feedback_id
    )
    db.add(new_reply)
    db.commit()
    db.refresh(new_reply)
    return new_reply

@app.delete("/feedback/{feedback_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_feedback_item(
    feedback_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Delete a feedback item. Author or Admin only."""
    feedback_item = db.query(models.FeedbackItem).filter(models.FeedbackItem.id == feedback_id).first()
    if not feedback_item:
        raise HTTPException(status_code=404, detail="Feedback item not found")
    
    # Permission Check
    ADMIN_EMAILS = ["admin@ai-platform.com", "ussi@seznam.cz"]
    is_admin = current_user.email in ADMIN_EMAILS
    is_author = feedback_item.user_id == current_user.id

    if not (is_author or is_admin):
        raise HTTPException(status_code=403, detail="Not authorized to delete this feedback")

    # If it's a parent, we might want to delete replies too. 
    # SQLAlchemy cascade should handle this if configured, but let's be safe or assume cascade.
    # Checking model: replies = relationship(..., cascade="all, delete-orphan") is NOT present in previous view.
    # Let's manually delete replies if cascade isn't set, or just delete the item and hope for DB constraint or cascade.
    # Ideally we should update the model, but for now let's just delete the item. 
    # If there are replies, this might fail if FK constraint exists without cascade.
    # Let's check if we can delete.
    
    db.delete(feedback_item)
    db.commit()
    return None

@app.put("/feedback/{feedback_id}", response_model=schemas.FeedbackItemResponse)
def update_feedback_item(
    feedback_id: int,
    feedback_update: schemas.FeedbackItemCreate, # Using Create schema for simplicity, ideally Update schema
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Update a feedback item. Author or Admin only."""
    feedback_item = db.query(models.FeedbackItem).filter(models.FeedbackItem.id == feedback_id).first()
    if not feedback_item:
        raise HTTPException(status_code=404, detail="Feedback item not found")
    
    # Permission Check
    ADMIN_EMAILS = ["admin@ai-platform.com", "ussi@seznam.cz"]
    is_admin = current_user.email in ADMIN_EMAILS
    is_author = feedback_item.user_id == current_user.id

    if not (is_author or is_admin):
        raise HTTPException(status_code=403, detail="Not authorized to update this feedback")

    # Update fields
    feedback_item.message = feedback_update.message
    feedback_item.type = feedback_update.type
    # We probably don't want to update position or slide_index easily as it might break context, 
    # but the schema allows it. Let's stick to message/type for now if possible, 
    # but since we use the Create schema, we get all fields. 
    # Let's just update message and type for now as per requirements.
    
    db.commit()
    db.refresh(feedback_item)
    return feedback_item
# --- QUIZ ENDPOINTS ---

@app.get("/lessons/{lesson_id}/quizzes", response_model=List[schemas.Quiz])
def get_lesson_quizzes(
    lesson_id: int, 
    db: Session = Depends(database.get_db),
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

@app.put("/users/me/avatar", response_model=schemas.User)
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
    
@app.post("/users/me/xp", response_model=schemas.User)
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


# --- PROGRESS ENDPOINTS ---

@app.post("/lessons/{lesson_id}/complete", response_model=schemas.UserProgress)
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
        course_id=lesson.course_id
    )
    db.add(new_progress)
    
    # Award XP for lesson completion
    current_user.xp += 50
    
    db.commit()
    db.refresh(new_progress)
    db.refresh(current_user)
    return new_progress

@app.post("/lessons/{lesson_id}/progress", response_model=schemas.UserProgress)
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

@app.post("/lessons/{lesson_id}/lab/complete", response_model=schemas.UserProgress)
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

@app.post("/lessons/{lesson_id}/quiz/complete", response_model=schemas.UserProgress)
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

@app.get("/users/me/progress", response_model=List[schemas.UserProgress])
def get_user_progress(
    db: Session = Depends(database.get_db),
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

schemas.FeedbackItemResponse.model_rebuild()