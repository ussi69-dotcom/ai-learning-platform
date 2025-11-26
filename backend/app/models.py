import enum
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Enum, DateTime, Float, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class DifficultyLevel(str, enum.Enum):
    PIECE_OF_CAKE = "PIECE_OF_CAKE"
    LETS_ROCK = "LETS_ROCK"
    COME_GET_SOME = "COME_GET_SOME"
    DAMN_IM_GOOD = "DAMN_IM_GOOD"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    difficulty = Column(Enum(DifficultyLevel), default=DifficultyLevel.LETS_ROCK)
    xp = Column(Integer, default=0)
    avatar = Column(String, default="droid_1") # Default avatar identifier

    courses = relationship("Course", back_populates="owner")
    progress = relationship("UserProgress", back_populates="user")
    feedback_items = relationship("FeedbackItem", back_populates="author")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True) # Added slug
    description = Column(Text)
    image_url = Column(String, nullable=True) 
    difficulty_level = Column(Enum(DifficultyLevel), default=DifficultyLevel.LETS_ROCK, index=True)
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="courses")
    
    lessons = relationship("Lesson", back_populates="course", cascade="all, delete-orphan")


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, index=True) # Added slug
    description = Column(Text)
    content = Column(Text) # MDX obsah
    order = Column(Integer)
    video_url = Column(String, nullable=True)
    duration = Column(String, nullable=True) # e.g. "15 min"
    lab_count = Column(Integer, default=0)

    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="lessons")
    
    quizzes = relationship("Quiz", back_populates="lesson", cascade="all, delete-orphan")
    feedback_items = relationship("FeedbackItem", back_populates="lesson")


class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    question = Column(String, nullable=False)
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)  # 'A', 'B', 'C', or 'D'
    explanation = Column(Text, nullable=True)
    order = Column(Integer, default=1)
    
    lesson = relationship("Lesson", back_populates="quizzes")


from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Enum, DateTime, JSON
# ... imports ...

# ... (User, Course, Lesson, Quiz classes remain same) ...

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    completed_at = Column(DateTime(timezone=True), nullable=True)
    last_accessed = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # JSON list of completed lab IDs e.g. ["intro-lab", "advanced-lab"]
    completed_labs = Column(JSON, default=list) 
    
    # Quiz score (0-100), null if not attempted
    quiz_score = Column(Integer, nullable=True)
    
    current_page = Column(Integer, default=0)

    user = relationship("User", back_populates="progress")
    lesson = relationship("Lesson")
    course = relationship("Course")

# --- NEW MODELS FOR FEEDBACK SYSTEM ---

class FeedbackType(str, enum.Enum):
    BUG = "BUG"
    FEATURE = "FEATURE"
    NOTE = "NOTE"
    QUESTION = "QUESTION"

class FeedbackItem(Base):
    __tablename__ = "feedback_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=True)
    slide_index = Column(Integer, nullable=True)
    x_pos = Column(Float, nullable=False) # Relative X position (0.0 to 1.0)
    y_pos = Column(Float, nullable=False) # Relative Y position (0.0 to 1.0)
    type = Column(Enum(FeedbackType), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_resolved = Column(Boolean, default=False)
    parent_id = Column(Integer, ForeignKey("feedback_items.id"), nullable=True) # For replies
    votes = Column(Integer, default=0)

    author = relationship("User", back_populates="feedback_items")
    lesson = relationship("Lesson", back_populates="feedback_items")
    replies = relationship("FeedbackItem", back_populates="parent_feedback")
    parent_feedback = relationship("FeedbackItem", back_populates="replies", remote_side=[id])
    votes_list = relationship("FeedbackVote", back_populates="feedback_item", cascade="all, delete-orphan")

class FeedbackVote(Base):
    __tablename__ = "feedback_votes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    feedback_id = Column(Integer, ForeignKey("feedback_items.id"), nullable=False)
    vote_type = Column(String, nullable=False) # "up" or "down"
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")
    feedback_item = relationship("FeedbackItem", back_populates="votes_list")

    __table_args__ = (
        UniqueConstraint('user_id', 'feedback_id', name='unique_user_feedback_vote'),
    )