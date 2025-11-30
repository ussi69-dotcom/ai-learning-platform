import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Načteme URL z proměnných prostředí přes config.py
SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

# Vytvoříme "motor" (engine), který pohání SQL dotazy
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True, # Ověří spojení před použitím (řeší "server closed the connection unexpectedly")
    pool_recycle=3600,  # Recykluje spojení po hodině
    pool_size=50,       # Robustní pool pro desítky paralelních požadavků
    max_overflow=30,    # Velká rezerva pro špičky (celkem max 80 spojení)
)

# Vytvoříme továrnu na "sessions" (relace). Každý požadavek od uživatele dostane svou session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Základní třída pro naše modely. Všechny tabulky budou dědit z této třídy.
Base = declarative_base()

# Pomocná funkce pro získání DB session v endpointu
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()