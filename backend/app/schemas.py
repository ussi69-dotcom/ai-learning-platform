from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional, List
from .models import DifficultyLevel

# --- USER ---
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    selected_difficulty: DifficultyLevel = DifficultyLevel.LETS_ROCK

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserResponse(UserBase):
    id: int
    is_active: bool
    # ConfigDict zajišťuje, že Pydantic umí číst data přímo z SQLAlchemy objektů
    model_config = ConfigDict(from_attributes=True)

# --- LESSON ---
class LessonBase(BaseModel):
    title: str
    slug: str
    content: str
    video_url: Optional[str] = None
    order: int = 0
    is_published: bool = False

class LessonCreate(LessonBase):
    course_id: int

class LessonResponse(LessonBase):
    id: int
    course_id: int
    model_config = ConfigDict(from_attributes=True)

# --- COURSE ---
class CourseBase(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    difficulty: DifficultyLevel
    is_published: bool = False

class CourseCreate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: int
    # Tady vracíme i seznam lekcí uvnitř kurzu
    lessons: List[LessonResponse] = []
    model_config = ConfigDict(from_attributes=True)