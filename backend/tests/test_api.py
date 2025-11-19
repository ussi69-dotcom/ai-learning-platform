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
