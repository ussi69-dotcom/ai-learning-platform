import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Načteme URL z proměnných prostředí, nebo použijeme default (pro lokální vývoj)
# V Docker Compose jsme nastavili DATABASE_URL, takže se použije to.
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://user:password@localhost/learning_platform" # Fallback pro spuštění mimo Docker
)

# Vytvoříme "motor" (engine), který pohání SQL dotazy
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True, # Ověří spojení před použitím (řeší "server closed the connection unexpectedly")
    pool_recycle=3600,  # Recykluje spojení po hodině
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