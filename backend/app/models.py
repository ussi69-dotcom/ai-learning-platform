import enum
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Enum, DateTime, Float, UniqueConstraint, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class DifficultyLevel(str, enum.Enum):
    PIECE_OF_CAKE = "PIECE_OF_CAKE"
    LETS_ROCK = "LETS_ROCK"
    COME_GET_SOME = "COME_GET_SOME"
    DAMN_IM_GOOD = "DAMN_IM_GOOD"

# XP thresholds for automatic level calculation
XP_THRESHOLDS = {
    DifficultyLevel.PIECE_OF_CAKE: 0,      # 0 - 499 XP
    DifficultyLevel.LETS_ROCK: 500,        # 500 - 1999 XP
    DifficultyLevel.COME_GET_SOME: 2000,   # 2000 - 4999 XP
    DifficultyLevel.DAMN_IM_GOOD: 5000,    # 5000+ XP
}

def calculate_level_from_xp(xp: int) -> DifficultyLevel:
    """Calculate user's difficulty level based on their XP."""
    if xp >= XP_THRESHOLDS[DifficultyLevel.DAMN_IM_GOOD]:
        return DifficultyLevel.DAMN_IM_GOOD
    elif xp >= XP_THRESHOLDS[DifficultyLevel.COME_GET_SOME]:
        return DifficultyLevel.COME_GET_SOME
    elif xp >= XP_THRESHOLDS[DifficultyLevel.LETS_ROCK]:
        return DifficultyLevel.LETS_ROCK
    else:
        return DifficultyLevel.PIECE_OF_CAKE

def get_next_level_xp(current_level: DifficultyLevel) -> int:
    """Get XP needed for next level. Returns -1 if max level."""
    levels = list(DifficultyLevel)
    current_idx = levels.index(current_level)
    if current_idx >= len(levels) - 1:
        return -1  # Already at max level
    return XP_THRESHOLDS[levels[current_idx + 1]]

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False) # Changed default to False for production
    verification_token = Column(String, nullable=True) # Token for email verification
    difficulty = Column(Enum(DifficultyLevel), default=DifficultyLevel.LETS_ROCK)
    xp = Column(Integer, default=0)
    avatar = Column(String, default="droid_1") # Default avatar identifier

    # Streak System (Phase 1.2)
    current_streak = Column(Integer, default=0)  # Current consecutive days
    longest_streak = Column(Integer, default=0)  # Personal best streak
    last_activity_date = Column(DateTime(timezone=True), nullable=True)  # Last learning activity

    # Achievements System (Phase 1.3)
    achievements = Column(JSON, default=list)  # ["first_blood", "lab_rat", "quiz_master", ...]

    courses = relationship("Course", back_populates="owner")
    progress = relationship("UserProgress", back_populates="user")
    feedback_items = relationship("FeedbackItem", back_populates="author")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    title_cs = Column(String, nullable=True) # CS Localization
    slug = Column(String, unique=True, index=True) # Added slug
    description = Column(Text)
    description_cs = Column(Text, nullable=True) # CS Localization
    image_url = Column(String, nullable=True) 
    difficulty_level = Column(Enum(DifficultyLevel), default=DifficultyLevel.LETS_ROCK, index=True)
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="courses")
    
    lessons = relationship("Lesson", back_populates="course", cascade="all, delete-orphan")


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    title_cs = Column(String, nullable=True) # CS Localization
    slug = Column(String, index=True) # Added slug
    description = Column(Text)
    description_cs = Column(Text, nullable=True) # CS Localization
    content = Column(Text) # MDX obsah
    content_cs = Column(Text, nullable=True) # CS Localization
    order = Column(Integer)
    video_url = Column(String, nullable=True)
    thumbnail = Column(String, nullable=True)
    duration = Column(String, nullable=True) # e.g. "15 min"
    duration_cs = Column(String, nullable=True) # CS Localization
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
    question_cs = Column(String, nullable=True) # CS Localization
    
    option_a = Column(String, nullable=False)
    option_a_cs = Column(String, nullable=True) # CS Localization
    
    option_b = Column(String, nullable=False)
    option_b_cs = Column(String, nullable=True) # CS Localization
    
    option_c = Column(String, nullable=False)
    option_c_cs = Column(String, nullable=True) # CS Localization
    
    option_d = Column(String, nullable=False)
    option_d_cs = Column(String, nullable=True) # CS Localization
    
    correct_answer = Column(String, nullable=False)  # 'A', 'B', 'C', or 'D'
    
    explanation = Column(Text, nullable=True)
    explanation_cs = Column(Text, nullable=True) # CS Localization
    
    order = Column(Integer, default=1)
    
    lesson = relationship("Lesson", back_populates="quizzes")


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

    # Track quiz passing attempts for XP bonuses (1st: 50XP, 2nd: 25XP)
    quiz_attempts = Column(Integer, default=0)

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

class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    certificate_id = Column(String, unique=True, index=True)  # UUID for public sharing
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    issued_at = Column(DateTime(timezone=True), server_default=func.now())
    badge_level = Column(Integer, default=1)  # 1=Bronze, 2=Silver, 3=Gold, 4=Diamond
    xp_at_completion = Column(Integer, default=0)
    personalized_name = Column(String, nullable=True)  # Optional name for certificate
    emailed = Column(Boolean, default=False)
    email_sent_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", backref="certificates")
    course = relationship("Course")

    __table_args__ = (
        UniqueConstraint('user_id', 'course_id', name='unique_user_course_certificate'),
    )


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


# --- NEWS FEED MODELS ---

class NewsSource(str, enum.Enum):
    YOUTUBE = "youtube"
    RSS = "rss"
    HACKERNEWS = "hackernews"
    PAPERS = "papers"


class NewsItem(Base):
    __tablename__ = "news_items"

    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String, unique=True, index=True)  # YouTube video ID, HN story ID, etc.
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    source = Column(Enum(NewsSource), nullable=False, index=True)
    source_url = Column(String, nullable=False)
    thumbnail_url = Column(String, nullable=True)
    channel_name = Column(String, nullable=True)  # YouTube channel or blog name
    published_at = Column(DateTime(timezone=True), nullable=True, index=True)
    video_id = Column(String, nullable=True)  # YouTube video ID for embedding
    duration_seconds = Column(Integer, nullable=True)  # Video duration
    score = Column(Integer, nullable=True)  # HN score, YouTube views
    language = Column(String(5), nullable=True, default="en", index=True)  # Language code: "en", "cs"
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


# --- DAILY DIGEST MODEL (Perplexity Integration) ---

class DailyDigest(Base):
    """
    Daily AI/Tech digest from Perplexity scheduled task.
    One record per day with 4 sections: EN/CZ short summaries and detailed feeds.
    """
    __tablename__ = "daily_digests"

    id = Column(Integer, primary_key=True, index=True)
    digest_date = Column(DateTime(timezone=True), nullable=False, unique=True, index=True)

    # Short summaries (5-8 bullet points each)
    summary_en = Column(JSON, nullable=True)  # ["bullet1", "bullet2", ...]
    summary_cs = Column(JSON, nullable=True)  # ["bullet1", "bullet2", ...]

    # Detailed feeds (8-15 items each)
    # Each item: {"title": "...", "description": "...", "source_url": "..."}
    feed_en = Column(JSON, nullable=True)
    feed_cs = Column(JSON, nullable=True)

    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Source tracking
    source = Column(String, default="perplexity")  # For future: could be other AI sources
    raw_response = Column(Text, nullable=True)  # Store original response for debugging