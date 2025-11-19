from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app, get_db
from app.database import Base
from app.models import User

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

def test_register_user():
    response = client.post(
        "/auth/register",
        json={"email": "newuser@example.com", "password": "password123", "difficulty": "PIECE_OF_CAKE", "is_active": True},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "newuser@example.com"
    assert data["difficulty"] == "PIECE_OF_CAKE"
    assert "id" in data

def test_login_user():
    # Register first
    client.post(
        "/auth/register",
        json={"email": "loginuser@example.com", "password": "password123", "is_active": True},
    )
    
    # Login
    response = client.post(
        "/auth/token",
        data={"username": "loginuser@example.com", "password": "password123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_read_users_me():
    # Register
    client.post(
        "/auth/register",
        json={"email": "me@example.com", "password": "password123", "is_active": True},
    )
    # Login
    login_res = client.post(
        "/auth/token",
        data={"username": "me@example.com", "password": "password123"},
    )
    token = login_res.json()["access_token"]
    
    # Access protected route
    response = client.get(
        "/users/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "me@example.com"
