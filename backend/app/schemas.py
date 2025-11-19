from pydantic import BaseModel
from typing import List, Optional

# --- Lesson Schemas ---
class LessonBase(BaseModel):
    title: str
    description: str
    order: int
    video_url: Optional[str] = None

class LessonCreate(LessonBase):
    content: str
    course_id: int

class Lesson(LessonBase):
    id: int
    course_id: int
    content: str  # Zahrnujeme i obsah, frontend si to vyfiltruje pokud potrebuje

    class Config:
        from_attributes = True # Důležité pro Pydantic v2 + SQLAlchemy

# --- Course Schemas ---
class CourseBase(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: int
    owner_id: int
    # lessons: List[Lesson] = [] # Zatím necháme volitelné, abychom se nezacyklili

    class Config:
        from_attributes = True

# --- User Schemas ---
class UserBase(BaseModel):
    email: str
    is_active: bool

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    courses: List[Course] = []

    class Config:
        from_attributes = True