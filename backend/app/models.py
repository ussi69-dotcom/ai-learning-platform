import enum
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Enum, DateTime
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

    courses = relationship("Course", back_populates="owner")
    progress = relationship("UserProgress", back_populates="user")


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

    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="lessons")
    
    quizzes = relationship("Quiz", back_populates="lesson", cascade="all, delete-orphan")


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