import logging
from app.database import SessionLocal, engine, Base
from app.models import User, Course, Lesson

# Nastavení logování
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def reset_db(db):
    """Vyčistí data v tabulkách."""
    logger.info("🗑️  Mažu stará data...")
    try:
        # Smažeme data v pořadí závislostí
        db.query(Lesson).delete()
        db.query(Course).delete()
        db.query(User).delete()
        db.commit()
    except Exception as e:
        # Pokud tabulky neexistují nebo jsou prázdné, delete může selhat (což nevadí)
        logger.warning(f"Mazání přeskočeno (možná prázdná DB): {e}")
        db.rollback()

def seed_data():
    # 1. NEJDŮLEŽITĚJŠÍ KROK: Vytvoření tabulek, pokud neexistují
    logger.info("🏗️  Vytvářím strukturu databáze (tabulky)...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    
    reset_db(db)

    logger.info("🌱 Sázím nová data...")

    # 2. Vytvoření Admina / Mentora
    admin = User(
        email="admin@ai-platform.com",
        hashed_password="fakehash123", # V reálu použít hashovací funkci
        is_active=True
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)

    # 3. Vytvoření Kurzu
    course = Course(
        title="Build Your Own AI Platform",
        description="30-denní výzva: Od prázdného editoru k produkčnímu SaaS s AI agenty. Uč se tím, že tvoříš.",
        image_url="[https://placehold.co/600x400/1a1a1a/ffffff?text=AI+Platform](https://placehold.co/600x400/1a1a1a/ffffff?text=AI+Platform)",
        owner_id=admin.id
    )
    db.add(course)
    db.commit()
    db.refresh(course)

    # 4. Vytvoření Lekcí
    lessons = [
        Lesson(
            title="Day 1: The Foundation",
            description="Setup Docker, FastAPI a Next.js.",
            content=r"""
# Vítej v Bootcampu!

Dnes položíme základy naší **AI Platformy**. 
Používáme stack, který neodpouští chyby, ale odměňuje rychlostí:

- **Docker**: Aby to běželo všude stejně.
- **FastAPI**: Rychlý Python backend.
- **Next.js**: Moderní frontend.

## Úkol
1. Nainstaluj Docker Desktop.
2. Spusť `docker compose up`.
""",
            order=1,
            course_id=course.id,
            video_url="[https://www.youtube.com/watch?v=dQw4w9WgXcQ](https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
        ),
        Lesson(
            title="Day 2: Database & Data Flow",
            description="PostgreSQL, SQLAlchemy a propojení s Frontendem.",
            content=r"""
# Data Flow

Bez databáze je aplikace jen hezká obálka. Dnes zapojíme **PostgreSQL**.

> "Data jsou nová ropa, ale bez trubek (API) ti jen zamoří zahradu."

## Co se naučíš
- Definovat modely v `SQLAlchemy`.
- Migrace (nebo `Base.metadata.create_all`).
""",
            order=2,
            course_id=course.id,
            video_url=None
        ),
        Lesson(
            title="Day 3: The Lesson Engine",
            description="MDX Rendering a Dynamic Routing.",
            content=r"""
# Lesson Engine

Teď to začne být zajímavé. Tvoříme engine, který právě čteš!

```typescript
// Příklad toho, co budeme stavět
const Lesson = ({ content }) => {
  return <MDXRemote source={content} />;
};
```
""",
            order=3,
            course_id=course.id,
            video_url=None
        )
    ]

    db.add_all(lessons)
    db.commit()

    logger.info("✅ Hotovo! DB je naplněna.")
    db.close()

if __name__ == "__main__":
    seed_data()