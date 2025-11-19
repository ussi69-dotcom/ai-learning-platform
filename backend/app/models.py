import enum
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Enum
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

    courses = relationship("Course", back_populates="owner")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    image_url = Column(String, nullable=True) 
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="courses")
    
    lessons = relationship("Lesson", back_populates="course", cascade="all, delete-orphan")


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    content = Column(Text) # MDX obsah
    order = Column(Integer)
    video_url = Column(String, nullable=True)

    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="lessons")