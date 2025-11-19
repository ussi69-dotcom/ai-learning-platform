import enum
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

# Definice obtížností
class DifficultyLevel(str, enum.Enum):
    PIECE_OF_CAKE = "piece_of_cake"       # Začátečník
    LETS_ROCK = "lets_rock"               # Pokročilý
    COME_GET_SOME = "come_get_some"       # Expert
    DAMN_IM_GOOD = "damn_im_good"         # Hardcore

# Tabulka Uživatele
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    
    selected_difficulty = Column(Enum(DifficultyLevel), default=DifficultyLevel.LETS_ROCK)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# Tabulka Kurzy
class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    
    difficulty = Column(Enum(DifficultyLevel), default=DifficultyLevel.LETS_ROCK)
    is_published = Column(Boolean, default=False)
    
    # Vztah: Kurz má více lekcí
    lessons = relationship("Lesson", back_populates="course")

# Tabulka Lekce
class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    content = Column(Text, nullable=False) # MDX obsah
    video_url = Column(String, nullable=True)
    order = Column(Integer, default=0)
    is_published = Column(Boolean, default=False)
    
    # Cizí klíč - odkazuje na tabulku courses
    course_id = Column(Integer, ForeignKey("courses.id"))
    
    # Vztah zpět na kurz
    course = relationship("Course", back_populates="lessons")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())