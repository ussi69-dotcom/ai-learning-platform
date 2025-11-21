from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app, get_db
from app.database import Base
from app.models import Lesson, Course, User

# In-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite://"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def setup_data():
    db = TestingSessionLocal()
    # Create dummy user
    user = User(email="test@example.com", hashed_password="fake")
    db.add(user)
    db.commit()
    
    # Create dummy course
    course = Course(title="Test Course", description="Desc", owner_id=user.id)
    db.add(course)
    db.commit()
    
    # Create dummy lesson
    lesson = Lesson(
        title="Test Lesson",
        description="Lesson Desc",
        content="Full Content Here",
        order=1,
        course_id=course.id
    )
    db.add(lesson)
    db.commit()
    db.close()

# Run setup once (or use fixtures in real pytest)
setup_data()

def test_read_lessons_summary():
    response = client.get("/lessons/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    
    # Check that 'content' is NOT in the list response (Optimization)
    # This will FAIL until we implement LessonSummary
    assert "content" not in data[0], "List endpoint should not return full content"
    assert "title" in data[0]
    assert "id" in data[0]

def test_read_lesson_detail():
    # Get the ID from the list
    list_resp = client.get("/lessons/")
    lesson_id = list_resp.json()[0]["id"]
    
    response = client.get(f"/lessons/{lesson_id}")
    assert response.status_code == 200
    data = response.json()
    
    # Detail endpoint SHOULD have content
    assert "content" in data
    assert data["content"] == "Full Content Here"

def test_read_lesson_not_found():
    response = client.get("/lessons/9999")
    assert response.status_code == 404

# --- Auth & Progress Tests ---

from app import auth

def override_get_current_user():
    db = TestingSessionLocal()
    user = db.query(User).filter(User.email == "test@example.com").first()
    db.close()
    return user

app.dependency_overrides[auth.get_current_user] = override_get_current_user

def test_complete_lesson():
    # Get lesson ID
    list_resp = client.get("/lessons/")
    lesson_id = list_resp.json()[0]["id"]
    
    # Complete lesson
    response = client.post(f"/lessons/{lesson_id}/complete")
    assert response.status_code == 200
    data = response.json()
    assert data["lesson_id"] == lesson_id
    assert data["user_id"] is not None

def test_get_user_progress():
    response = client.get("/users/me/progress")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["lesson_id"] is not None

def test_get_course_progress():
    # Get course ID (assuming lesson is in course 1)
    list_resp = client.get("/lessons/")
    lesson = list_resp.json()[0]
    course_id = lesson["course_id"]
    
    response = client.get(f"/courses/{course_id}/progress")
    assert response.status_code == 200
    data = response.json()
    
    # Since we completed 1 lesson out of 1 (in setup_data), it should be 100%
    assert data["percentage"] == 100
    assert data["completed"] == 1
    assert data["total"] == 1
