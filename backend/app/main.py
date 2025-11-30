from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
import uuid
import os
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from . import models, schemas, database, auth
from app.routers import sandbox, lessons, feedback, users

# Vytvoření tabulek (pro jistotu, i když to dělá seed)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AI Learning Platform API")

# Rate Limiting Setup
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.limiter import limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Include Routers
app.include_router(sandbox.router)
app.include_router(lessons.router)
app.include_router(feedback.router)
app.include_router(users.router)

# Mount content directory for static assets (images, etc.)
# This maps http://localhost:8000/content/ -> /app/content/
app.mount("/content", StaticFiles(directory="/app/content"), name="content")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://frontend:3000", 
        "https://ai-teach.me", 
        "https://www.ai-teach.me"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

from app.services.email import send_verification_email

@app.post("/auth/register", response_model=schemas.User)
@limiter.limit("5/minute")
async def register_user(request: Request, user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    verification_token = str(uuid.uuid4())

    new_user = models.User(
        email=user.email, 
        hashed_password=hashed_password,
        difficulty=models.DifficultyLevel(user.difficulty),
        avatar=user.avatar,
        is_verified=False, # Must verify email
        verification_token=verification_token
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send verification email (background task would be better, but await is fine for now)
    try:
        await send_verification_email(new_user.email, verification_token)
    except Exception as e:
        print(f"Failed to send email: {e}")
        # Don't fail registration, just log it. User can request resend later.

    return new_user

@app.get("/auth/verify")
def verify_email(token: str, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.verification_token == token).first()
    if not user:
        # Redirect to error page or login with error
        frontend_url = os.getenv("FRONTEND_URL", "https://ai-teach.me")
        return RedirectResponse(url=f"{frontend_url}/login?error=invalid_token", status_code=303)
    
    if not user.is_verified:
        user.is_verified = True
        user.verification_token = None # Clear token
        db.commit()
    
    frontend_url = os.getenv("FRONTEND_URL", "https://ai-teach.me")
    return RedirectResponse(url=f"{frontend_url}/login?verified=true", status_code=303)


@app.post("/auth/token", response_model=schemas.Token)
@limiter.limit("5/minute")
def login_for_access_token(request: Request, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    print(f"DEBUG: Login attempt for username: {form_data.username}")
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    
    if not user:
        print("DEBUG: User not found in DB")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    print(f"DEBUG: User found: {user.email}, Hash in DB: {user.hashed_password[:20]}...")
    
    is_valid = auth.verify_password(form_data.password, user.hashed_password)
    print(f"DEBUG: Password verification result: {is_valid}")
    
    if not is_valid:
        print("DEBUG: Password invalid")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_verified:
        print("DEBUG: User email not verified")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not verified. Please check your inbox.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    print("DEBUG: Token generated successfully")
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Learning Platform API"}