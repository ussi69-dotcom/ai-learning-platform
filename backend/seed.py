import logging
import os
from pathlib import Path
from app.database import SessionLocal, engine, Base
from app.models import User, Course, Lesson, Quiz, DifficultyLevel, UserProgress
from app.auth import get_password_hash
from app.services.content_loader import ContentLoader

# Nastavení logování
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def reset_db(db):
    """Vyčistí data v tabulkách."""
    logger.info("🗑️  Mažu stará data...")
    try:
        db.query(UserProgress).delete()
        db.query(Quiz).delete()
        db.query(Lesson).delete()
        db.query(Course).delete()
        db.query(User).delete()
        db.commit()
        logger.info("✅ Data vymazána")
    except Exception as e:
        logger.warning(f"Mazání přeskočeno: {e}")
        db.rollback()

def seed_data():
    logger.info("🏗️  Vytvářím strukturu databáze...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    # reset_db(db)
    logger.info("🌱 Sázím nová data...")

    # Admin
    superuser_email = os.getenv("FIRST_SUPERUSER", "admin@ai-platform.com")
    superuser_password = os.getenv("FIRST_SUPERUSER_PASSWORD", "admin123")

    # SECURITY: Prevent default password in production
    environment = os.getenv("ENVIRONMENT", "development")
    if environment == "production" and superuser_password == "admin123":
        raise ValueError(
            "🚨 SECURITY ERROR: Cannot use default admin password 'admin123' in production! "
            "Set FIRST_SUPERUSER_PASSWORD environment variable to a secure password."
        )

    admin = db.query(User).filter(User.email == superuser_email).first()
    if not admin:
        admin = User(
            email=superuser_email,
            hashed_password=get_password_hash(superuser_password),
            is_active=True,
            is_verified=True,
            difficulty=DifficultyLevel.DAMN_IM_GOOD,
            xp=100
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        logger.info(f"👤 Created admin user: {admin.email}")
    else:
        # Update password if admin exists (optional, but good for initial setup fixes)
        # admin.hashed_password = get_password_hash(superuser_password)
        # db.commit()
        logger.info(f"👤 Admin user already exists: {admin.email}")

    # Load Content
    # Try Docker path first, then local development path
    content_path = Path("/app/content")
    if not content_path.exists():
        content_path = Path(__file__).parent.parent / "content"
    
    if not content_path.exists():
        logger.error(f"❌ Content directory not found at {content_path}")
        return

    loader = ContentLoader(str(content_path))
    loader.sync_to_db(db, admin.id)

    logger.info("✅ Hotovo! DB naplněna z content souborů.")
    db.close()

if __name__ == "__main__":
    seed_data()