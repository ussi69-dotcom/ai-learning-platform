from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List

from . import models, schemas, database

# 1. Vytvoření tabulek v databázi
# (Musí být hned po importech)
models.Base.metadata.create_all(bind=database.engine)

# 2. Inicializace aplikace
# (TOTO je ten klíčový řádek, který musí být PŘED endpointy)
app = FastAPI(title="AI Learning Platform API")

# 3. Dependency pro získání DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ENDPOINTY (až teď, když 'app' existuje) ---

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Learning Platform API", "status": "ready"}

# Vytvoření kurzu (s ošetřením duplicity)
@app.post("/courses/", response_model=schemas.CourseResponse)
def create_course(course: schemas.CourseCreate, db: Session = Depends(get_db)):
    db_course = models.Course(**course.model_dump())
    try:
        db.add(db_course)
        db.commit()
        db.refresh(db_course)
        return db_course
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Course with this slug already exists")

# Získání seznamu kurzů
@app.get("/courses/", response_model=List[schemas.CourseResponse])
def read_courses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    courses = db.query(models.Course).offset(skip).limit(limit).all()
    return courses