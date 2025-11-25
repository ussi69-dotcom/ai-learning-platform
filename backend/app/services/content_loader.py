import json
import logging
from pathlib import Path
from sqlalchemy.orm import Session
from app.models import Course, Lesson, Quiz, DifficultyLevel

logger = logging.getLogger(__name__)

class ContentLoader:
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)

    def sync_to_db(self, db: Session, owner_id: int):
        """Syncs content from file system to database."""
        logger.info(f"🔄 Syncing content from {self.base_path}...")
        
        courses_dir = self.base_path / "courses"
        if not courses_dir.exists():
            logger.warning(f"⚠️ Courses directory not found: {courses_dir}")
            return

        for course_dir in courses_dir.iterdir():
            if not course_dir.is_dir():
                continue
            
            self._process_course(db, course_dir, owner_id)

    def _process_course(self, db: Session, course_dir: Path, owner_id: int):
        meta_path = course_dir / "meta.json"
        if not meta_path.exists():
            logger.warning(f"⚠️ Skipping {course_dir.name}: meta.json not found")
            return

        with open(meta_path, "r", encoding="utf-8") as f:
            meta = json.load(f)

        logger.info(f"📚 Processing course: {meta.get('title')}")

        # Create or Update Course
        course = db.query(Course).filter(Course.title == meta["title"]).first()
        if not course:
            course = Course(
                title=meta["title"],
                slug=course_dir.name, # Use directory name as slug
                description=meta["description"],
                image_url=meta["image_url"],
                difficulty_level=DifficultyLevel[meta["difficulty_level"]],
                owner_id=owner_id
            )
            db.add(course)
            db.commit()
            db.refresh(course)
        else:
            # Update fields if needed
            course.slug = course_dir.name # Ensure slug is set
            course.description = meta["description"]
            course.image_url = meta["image_url"]
            course.difficulty_level = DifficultyLevel[meta["difficulty_level"]]
            db.commit()

        # Process Lessons
        lessons_dir = course_dir / "lessons"
        if lessons_dir.exists():
            for lesson_dir in sorted(lessons_dir.iterdir()):
                if lesson_dir.is_dir():
                    self._process_lesson(db, lesson_dir, course.id)

    def _process_lesson(self, db: Session, lesson_dir: Path, course_id: int):
        meta_path = lesson_dir / "meta.json"
        content_path = lesson_dir / "content.mdx"
        
        if not meta_path.exists() or not content_path.exists():
            return

        with open(meta_path, "r", encoding="utf-8") as f:
            meta = json.load(f)
        
        with open(content_path, "r", encoding="utf-8") as f:
            content = f.read()

        logger.info(f"  📖 Processing lesson: {meta.get('title')}")

        lesson = db.query(Lesson).filter(Lesson.title == meta["title"], Lesson.course_id == course_id).first()
        if not lesson:
            lesson = Lesson(
                title=meta["title"],
                slug=lesson_dir.name, # Use directory name as slug
                description=meta["description"],
                content=content,
                video_url=meta.get("video_url"),
                order=meta["order"],
                course_id=course_id
            )
            db.add(lesson)
            db.commit()
            db.refresh(lesson)
        else:
            lesson.slug = lesson_dir.name # Ensure slug is set
            lesson.description = meta["description"]
            lesson.content = content
            lesson.video_url = meta.get("video_url")
            lesson.order = meta["order"]
            db.commit()

        # Process Quizzes
        quiz_path = lesson_dir / "quiz.json"
        if quiz_path.exists():
            self._process_quizzes(db, quiz_path, lesson.id)

    def _process_quizzes(self, db: Session, quiz_path: Path, lesson_id: int):
        with open(quiz_path, "r", encoding="utf-8") as f:
            quizzes_data = json.load(f)

        # Clear existing quizzes for this lesson
        db.query(Quiz).filter(Quiz.lesson_id == lesson_id).delete()
        
        for q_data in quizzes_data:
            quiz = Quiz(
                question=q_data["question"],
                option_a=q_data["option_a"],
                option_b=q_data["option_b"],
                option_c=q_data["option_c"],
                option_d=q_data["option_d"],
                correct_answer=q_data["correct_answer"],
                explanation=q_data["explanation"],
                order=q_data["order"],
                lesson_id=lesson_id
            )
            db.add(quiz)
        
        db.commit()
