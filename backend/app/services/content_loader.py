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
                title_cs=meta.get("title_cs"),
                slug=course_dir.name, # Use directory name as slug
                description=meta["description"],
                description_cs=meta.get("description_cs"),
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
            course.title_cs = meta.get("title_cs")
            course.description_cs = meta.get("description_cs")
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
        content_cs_path = lesson_dir / "content.cs.mdx"
        
        if not meta_path.exists() or not content_path.exists():
            return

        with open(meta_path, "r", encoding="utf-8") as f:
            meta = json.load(f)
        
        with open(content_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        content_cs = None
        if content_cs_path.exists():
            with open(content_cs_path, "r", encoding="utf-8") as f:
                content_cs = f.read()

        # Extract Metadata from MDX (Mission Goal Callout)
        # Format: ⏳ **Reading Time:** 15 min | 🧪 **[3] Labs Included**
        import re
        duration = "15 min" # Default
        lab_count = 0 # Default

        # Regex for Time
        time_match = re.search(r"⏳ \*\*Reading Time:\*\* (.+?) \|", content)
        if time_match:
            duration = time_match.group(1).strip()
        
        # Regex for Labs (supports "[3]" or "3")
        lab_match = re.search(r"🧪 \*\*\[?(\d+)\]? Labs? Included\*\*", content)
        if lab_match:
            lab_count = int(lab_match.group(1))

        logger.info(f"  📖 Processing lesson: {meta.get('title')} ({duration}, {lab_count} labs)")

        lesson = db.query(Lesson).filter(Lesson.title == meta["title"], Lesson.course_id == course_id).first()
        if not lesson:
            lesson = Lesson(
                title=meta["title"],
                title_cs=meta.get("title_cs"),
                slug=lesson_dir.name, # Use directory name as slug
                description=meta["description"],
                description_cs=meta.get("description_cs"),
                content=content,
                content_cs=content_cs,
                video_url=meta.get("video_url"),
                order=meta["order"],
                course_id=course_id,
                duration=duration,
                lab_count=lab_count
            )
            db.add(lesson)
            db.commit()
            db.refresh(lesson)
        else:
            lesson.slug = lesson_dir.name # Ensure slug is set
            lesson.description = meta["description"]
            lesson.title_cs = meta.get("title_cs")
            lesson.description_cs = meta.get("description_cs")
            lesson.content = content
            lesson.content_cs = content_cs
            lesson.video_url = meta.get("video_url")
            lesson.order = meta["order"]
            lesson.duration = duration
            lesson.lab_count = lab_count
            db.commit()

        # Process Quizzes
        quiz_path = lesson_dir / "quiz.json"
        if quiz_path.exists():
            self._process_quizzes(db, quiz_path, lesson.id)

    def _process_quizzes(self, db: Session, quiz_path: Path, lesson_id: int):
        with open(quiz_path, "r", encoding="utf-8") as f:
            quizzes_data = json.load(f)

        # Try to load localized quizzes (CZ)
        quiz_cs_path = quiz_path.parent / "quiz.cs.json"
        quizzes_cs_data = []
        if quiz_cs_path.exists():
            try:
                with open(quiz_cs_path, "r", encoding="utf-8") as f:
                    quizzes_cs_data = json.load(f)
            except Exception as e:
                logger.warning(f"⚠️ Failed to load {quiz_cs_path}: {e}")

        # Clear existing quizzes for this lesson
        db.query(Quiz).filter(Quiz.lesson_id == lesson_id).delete()
        
        for i, q_data in enumerate(quizzes_data):
            # Find matching CS data by index (assuming same order)
            q_cs = quizzes_cs_data[i] if i < len(quizzes_cs_data) else {}

            quiz = Quiz(
                question=q_data["question"],
                question_cs=q_cs.get("question"), # CS localization
                
                option_a=q_data["option_a"],
                option_a_cs=q_cs.get("option_a"),
                
                option_b=q_data["option_b"],
                option_b_cs=q_cs.get("option_b"),
                
                option_c=q_data["option_c"],
                option_c_cs=q_cs.get("option_c"),
                
                option_d=q_data["option_d"],
                option_d_cs=q_cs.get("option_d"),
                
                correct_answer=q_data["correct_answer"],
                explanation=q_data["explanation"],
                explanation_cs=q_cs.get("explanation"),
                
                order=q_data.get("order", i + 1),
                lesson_id=lesson_id
            )
            db.add(quiz)
        
        db.commit()
