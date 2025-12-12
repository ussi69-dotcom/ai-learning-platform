import enum
import re
from pydantic import BaseModel, field_validator, computed_field
from typing import List, Optional
from datetime import datetime
from app.models import FeedbackType, calculate_level_from_xp, get_next_level_xp, XP_THRESHOLDS, DifficultyLevel

# --- Lesson Schemas ---
class LessonBase(BaseModel):
    title: str
    slug: str # Added slug
    description: str
    order: int
    video_url: Optional[str] = None
    duration: Optional[str] = None
    lab_count: int = 0

class LessonCreate(LessonBase):
    content: str
    course_id: int

class LessonSummary(LessonBase):
    id: int
    course_id: int
    # content is explicitly excluded here

    class Config:
        from_attributes = True

class Lesson(LessonBase):
    id: int
    course_id: int
    content: str  # Zahrnujeme i obsah, frontend si to vyfiltruje pokud potrebuje

    class Config:
        from_attributes = True # Důležité pro Pydantic v2 + SQLAlchemy

# --- Course Schemas ---
class CourseBase(BaseModel):
    title: str
    slug: str # Added slug
    description: str
    image_url: Optional[str] = None

class CourseCreate(CourseBase):
    difficulty_level: str = "LETS_ROCK"

class Course(CourseBase):
    id: int
    owner_id: int
    difficulty_level: str
    lessons: List[LessonSummary] = []

    class Config:
        from_attributes = True

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# --- User Schemas ---
class UserBase(BaseModel):
    email: str
    is_active: bool

class UserCreate(UserBase):
    password: str
    difficulty: str = "PIECE_OF_CAKE"  # New users start at lowest level
    avatar: str = "droid_1"
    is_active: bool = True

    @field_validator('password')
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not re.search(r"\d", v):
            raise ValueError('Password must contain at least one number')
        if not re.search(r"[A-Z]", v):
            raise ValueError('Password must contain at least one uppercase letter')
        return v

class User(UserBase):
    id: int
    difficulty: str  # Legacy field, kept for backwards compatibility
    xp: int = 0
    avatar: str = "droid_1"
    courses: List[Course] = []

    @computed_field
    @property
    def calculated_level(self) -> str:
        """User's level calculated from XP (replaces manual difficulty)."""
        return calculate_level_from_xp(self.xp).value

    @computed_field
    @property
    def next_level_xp(self) -> int:
        """XP needed to reach next level. -1 if at max level."""
        current = calculate_level_from_xp(self.xp)
        return get_next_level_xp(current)

    @computed_field
    @property
    def xp_for_current_level(self) -> int:
        """XP threshold for current level (for progress bar)."""
        current = calculate_level_from_xp(self.xp)
        return XP_THRESHOLDS[current]

    class Config:
        from_attributes = True

class UserDifficultyUpdate(BaseModel):
    difficulty: str

class UserXPUpdate(BaseModel):
    xp_amount: int

class UserAvatarUpdate(BaseModel):
    avatar: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    avatar: Optional[str] = None
    difficulty: Optional[str] = None


# ===== QUIZ SCHEMAS =====
class QuizBase(BaseModel):
    question: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str
    explanation: Optional[str] = None
    order: int = 1

class Quiz(QuizBase):
    id: int
    lesson_id: int
    
    class Config:
        from_attributes = True

QuizQuestion = Quiz # Alias for backwards compatibility


# ===== USER PROGRESS SCHEMAS =====
class UserProgressBase(BaseModel):
    lesson_id: int
    course_id: int

class UserProgressCreate(UserProgressBase):
    pass

class LabCompletion(BaseModel):
    lab_id: str
    step_count: int = 1  # Number of steps in the lab for XP calculation

class QuizCompletion(BaseModel):
    score: int
    is_retry: bool = False  # True if user already passed this quiz before

class UserProgress(UserProgressBase):
    id: int
    user_id: int
    completed_at: Optional[datetime] = None
    last_accessed: datetime
    completed_labs: List[str] = []
    quiz_score: Optional[int] = None
    quiz_attempts: Optional[int] = 0  # Number of passing attempts (for XP bonus tracking)
    current_page: int = 0

    class Config:
        from_attributes = True

# --- FEEDBACK SCHEMAS ---

class FeedbackType(str, enum.Enum):
    BUG = "BUG"
    FEATURE = "FEATURE"
    NOTE = "NOTE"
    QUESTION = "QUESTION"

# Simplified User for Feedback Author display
class FeedbackUser(BaseModel):
    id: int
    email: str
    avatar: str

    class Config:
        from_attributes = True

class FeedbackItemBase(BaseModel):
    lesson_id: Optional[int] = None
    slide_index: Optional[int] = None
    x_pos: float
    y_pos: float
    type: FeedbackType
    message: str
    parent_id: Optional[int] = None # For replies

class FeedbackItemCreate(FeedbackItemBase):
    pass

class FeedbackItemResponse(FeedbackItemBase):
    id: int
    user_id: int
    created_at: datetime
    is_resolved: bool
    votes: int
    
    author: FeedbackUser # Include author details
    
    replies: Optional[List['FeedbackItemResponse']] = []
    user_vote: Optional[str] = None # "up", "down", or None

    class Config:
        from_attributes = True

# --- CERTIFICATE SCHEMAS ---

class CertificateBase(BaseModel):
    course_id: int
    personalized_name: Optional[str] = None

class CertificateCreate(CertificateBase):
    pass

class CertificateEmailRequest(BaseModel):
    personalized_name: Optional[str] = None
    email: Optional[str] = None  # Override email if different from user's

class Certificate(CertificateBase):
    id: int
    certificate_id: str  # UUID for public link
    user_id: int
    issued_at: datetime
    badge_level: int  # 1=Bronze, 2=Silver, 3=Gold, 4=Diamond
    xp_at_completion: int
    emailed: bool
    course_title: Optional[str] = None  # Populated from course relation

    class Config:
        from_attributes = True


# --- SANDBOX SCHEMAS ---
class SandboxRequest(BaseModel):
    code: str
    language: str = "python"

class SandboxResponse(BaseModel):
    status: str  # "success", "error", "timeout"
    output: Optional[str] = None
    error: Optional[str] = None
    exit_code: Optional[int] = None

# Update forward refs for recursive schema definition
FeedbackItemResponse.model_rebuild()


# --- NEWS FEED SCHEMAS ---

class NewsSourceEnum(str, enum.Enum):
    YOUTUBE = "youtube"
    RSS = "rss"
    HACKERNEWS = "hackernews"
    PAPERS = "papers"


class NewsItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    source: NewsSourceEnum
    source_url: str
    thumbnail_url: Optional[str] = None
    channel_name: Optional[str] = None
    published_at: Optional[datetime] = None
    video_id: Optional[str] = None
    duration_seconds: Optional[int] = None
    score: Optional[int] = None
    language: Optional[str] = "en"  # Language code: "en", "cs"


class NewsItemCreate(NewsItemBase):
    external_id: str


class NewsItemResponse(NewsItemBase):
    id: int
    external_id: str
    created_at: datetime

    class Config:
        from_attributes = True


class NewsRefreshResponse(BaseModel):
    status: str
    items_fetched: int
    sources_status: dict  # {"youtube": "ok", "rss": "error", ...}