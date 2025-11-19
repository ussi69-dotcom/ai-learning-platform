import logging
from app.database import SessionLocal, engine, Base
from app.models import User, Course, Lesson, DifficultyLevel
from app.auth import get_password_hash

# Nastavení logování
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def reset_db(db):
    """Vyčistí data v tabulkách."""
    logger.info("🗑️  Mažu stará data...")
    try:
        db.query(Lesson).delete()
        db.query(Course).delete()
        db.query(User).delete()
        db.commit()
    except Exception as e:
        logger.warning(f"Mazání přeskočeno: {e}")
        db.rollback()

def seed_data():
    logger.info("🏗️  Vytvářím strukturu databáze...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    reset_db(db)
    logger.info("🌱 Sázím nová data...")

    # Admin
    admin = User(
        email="admin@ai-platform.com",
        hashed_password=get_password_hash("admin123"),
        is_active=True,
        difficulty=DifficultyLevel.DAMN_IM_GOOD
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)

    # 🍰 EASY
    logger.info("🍰 Creating PIECE_OF_CAKE course...")
    easy_course = Course(
        title="AI Basics for Absolute Beginners",
        description="Start your AI journey from zero. Learn what AI is, how it works, and how to talk to it.",
        image_url="https://placehold.co/600x400/4ade80/1a1a1a?text=AI+Basics",
        owner_id=admin.id,
        difficulty_level=DifficultyLevel.PIECE_OF_CAKE
    )
    db.add(easy_course)
    db.commit()
    db.refresh(easy_course)

    easy_lessons = [
        Lesson(
            title="What is Artificial Intelligence?",
            description="Understanding AI in simple terms - no tech jargon!",
            content="# What is AI?\n\nAI is when computers can do things that normally need human intelligence.",
            order=1,
            course_id=easy_course.id
        ),
        Lesson(
            title="What is a Large Language Model?",
            description="Meet ChatGPT's brain - the LLM!",
            content="# What is an LLM?\n\nAn LLM is an AI that understands and generates human language.",
            order=2,
            course_id=easy_course.id
        )
    ]
    db.add_all(easy_lessons)
    db.commit()

    # 🎸 NORMAL
    logger.info("🎸 Creating LETS_ROCK course...")
    normal_course = Course(
        title="Practical Prompt Engineering",
        description="Master the art of prompt engineering. Learn patterns, techniques, and best practices.",
        image_url="https://placehold.co/600x400/3b82f6/ffffff?text=Prompt+Engineering",
        owner_id=admin.id,
        difficulty_level=DifficultyLevel.LETS_ROCK
    )
    db.add(normal_course)
    db.commit()
    db.refresh(normal_course)

    normal_lessons = [
        Lesson(
            title="Prompt Patterns and Templates",
            description="Learn reusable prompt structures.",
            content="# Prompt Patterns\n\nTemplates save time and improve consistency.",
            order=1,
            course_id=normal_course.id
        ),
        Lesson(
            title="Context Management",
            description="How to give AI the right context.",
            content="# Context Management\n\nContext is EVERYTHING in prompt engineering.",
            order=2,
            course_id=normal_course.id
        )
    ]
    db.add_all(normal_lessons)
    db.commit()

    # 💪 HARD
    logger.info("💪 Creating COME_GET_SOME course...")
    hard_course = Course(
        title="Advanced AI Techniques",
        description="Master advanced prompting: chain-of-thought, few-shot learning, and complex task decomposition.",
        image_url="https://placehold.co/600x400/8b5cf6/ffffff?text=Advanced+AI",
        owner_id=admin.id,
        difficulty_level=DifficultyLevel.COME_GET_SOME
    )
    db.add(hard_course)
    db.commit()
    db.refresh(hard_course)

    hard_lessons = [
        Lesson(
            title="Chain-of-Thought Prompting",
            description="Make AI show its reasoning step-by-step.",
            content="# Chain-of-Thought\n\nMake AI show its work!",
            order=1,
            course_id=hard_course.id
        ),
        Lesson(
            title="Few-Shot Learning",
            description="Teach AI by example.",
            content="# Few-Shot Learning\n\nShow AI examples of what you want.",
            order=2,
            course_id=hard_course.id
        )
    ]
    db.add_all(hard_lessons)
    db.commit()

    # 🔥 EXPERT
    logger.info("🔥 Creating DAMN_IM_GOOD course...")
    expert_course = Course(
        title="AI Engineering Deep Dive",
        description="Production AI systems: RAG, fine-tuning, agents, and enterprise best practices.",
        image_url="https://placehold.co/600x400/ef4444/ffffff?text=AI+Engineering",
        owner_id=admin.id,
        difficulty_level=DifficultyLevel.DAMN_IM_GOOD
    )
    db.add(expert_course)
    db.commit()
    db.refresh(expert_course)

    expert_lessons = [
        Lesson(
            title="Retrieval-Augmented Generation (RAG)",
            description="Build AI systems that access external knowledge.",
            content="# RAG\n\nBuild AI systems that know YOUR data!",
            order=1,
            course_id=expert_course.id
        ),
        Lesson(
            title="Fine-Tuning Fundamentals",
            description="Customize LLMs for your specific use case.",
            content="# Fine-Tuning\n\nMake AI speak YOUR language!",
            order=2,
            course_id=expert_course.id
        )
    ]
    db.add_all(expert_lessons)
    db.commit()

    logger.info("✅ Hotovo! DB naplněna se všemi difficulty levely.")
    db.close()

if __name__ == "__main__":
    seed_data()