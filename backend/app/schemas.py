from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# --- Lesson Schemas ---
class LessonBase(BaseModel):
    title: str
    slug: str # Added slug
    description: str
    order: int
    video_url: Optional[str] = None

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
    # lessons: List[Lesson] = [] # Zatím necháme volitelné, abychom se nezacyklili

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
    difficulty: str = "LETS_ROCK" # Default difficulty

class User(UserBase):
    id: int
    difficulty: str
    courses: List[Course] = []

    class Config:
        from_attributes = True


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

# ===== USER PROGRESS SCHEMAS =====
class UserProgressBase(BaseModel):
    lesson_id: int
    course_id: int

class UserProgressCreate(UserProgressBase):
    pass

class UserProgress(UserProgressBase):
    id: int
    user_id: int
    completed_at: datetime

    class Config:
        from_attributes = True