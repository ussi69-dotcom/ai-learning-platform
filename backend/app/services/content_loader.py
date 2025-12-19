import json
import logging
from pathlib import Path
from sqlalchemy.orm import Session
from app.models import Course, Lesson, Quiz, DifficultyLevel, UserProgress

logger = logging.getLogger(__name__)

class ContentLoader:
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.dry_run = False  # When True, only log what would happen

    def sync_to_db(self, db: Session, owner_id: int, dry_run: bool = False):
        """
        Syncs content from file system to database.

        Args:
            db: Database session
            owner_id: Owner user ID for new content
            dry_run: If True, only log what would happen without making changes
        """
        self.dry_run = dry_run
        mode = "DRY-RUN" if dry_run else "LIVE"
        logger.info(f"🔄 [{mode}] Syncing content from {self.base_path}...")
        
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

        course_slug = course_dir.name  # Use directory name as stable identifier
        logger.info(f"📚 Processing course: {meta.get('title')} (slug: {course_slug})")

        # Create or Update Course - use SLUG as identity (not title, which can change)
        course = db.query(Course).filter(Course.slug == course_slug).first()
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
        processed_slugs = set()
        if lessons_dir.exists():
            for lesson_dir in sorted(lessons_dir.iterdir()):
                if lesson_dir.is_dir():
                    slug = self._process_lesson(db, lesson_dir, course.id)
                    if slug:
                        processed_slugs.add(slug)

        # Cleanup orphaned lessons (exist in DB but not in content)
        existing_lessons = db.query(Lesson).filter(Lesson.course_id == course.id).all()
        for lesson in existing_lessons:
            if lesson.slug not in processed_slugs:
                # Count affected user progress for warning
                progress_count = db.query(UserProgress).filter(UserProgress.lesson_id == lesson.id).count()
                if self.dry_run:
                    logger.warning(
                        f"  🗑️  [DRY-RUN] WOULD DELETE orphaned lesson: {lesson.slug} "
                        f"(affects {progress_count} user progress records)"
                    )
                else:
                    logger.warning(
                        f"  🗑️  Deleting orphaned lesson: {lesson.slug} "
                        f"(deleting {progress_count} user progress records)"
                    )
                    # Delete related user progress first
                    db.query(UserProgress).filter(UserProgress.lesson_id == lesson.id).delete()
                    # Delete related quizzes
                    db.query(Quiz).filter(Quiz.lesson_id == lesson.id).delete()
                    db.delete(lesson)
        if not self.dry_run:
            db.commit()

    def _process_lesson(self, db: Session, lesson_dir: Path, course_id: int) -> str | None:
        """Process a lesson directory and return its slug, or None if skipped."""
        meta_path = lesson_dir / "meta.json"
        content_path = lesson_dir / "content.mdx"
        content_cs_path = lesson_dir / "content.cs.mdx"

        if not meta_path.exists() or not content_path.exists():
            return None

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

        # Handle localization (support both string and dict formats)
        title = meta["title"]
        title_cs = meta.get("title_cs")
        if isinstance(title, dict):
            title_cs = title.get("cs")
            title = title.get("en")

        description = meta["description"]
        description_cs = meta.get("description_cs")
        if isinstance(description, dict):
            description_cs = description.get("cs")
            description = description.get("en")
            
        video_url = meta.get("video_url")
        if isinstance(video_url, dict):
            # We currently only store one video_url in DB, usually EN. 
            # If we want to support both, we might need schema change or pick based on context.
            # For now, picking EN as default.
            video_url = video_url.get("en")

        lesson_slug = lesson_dir.name  # Use directory name as stable identifier
        logger.info(f"  📖 Processing lesson: {title} ({duration}, {lab_count} labs) [slug: {lesson_slug}]")

        # Use SLUG as identity (not title, which can change)
        lesson = db.query(Lesson).filter(Lesson.slug == lesson_slug, Lesson.course_id == course_id).first()
        if not lesson:
            lesson = Lesson(
                title=title,
                title_cs=title_cs,
                slug=lesson_dir.name, # Use directory name as slug
                description=description,
                description_cs=description_cs,
                content=content,
                content_cs=content_cs,
                video_url=video_url,
                thumbnail=meta.get("thumbnail"),
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
            lesson.description = description
            lesson.title_cs = title_cs
            lesson.description_cs = description_cs
            lesson.content = content
            lesson.content_cs = content_cs
            lesson.content_cs = content_cs
            lesson.video_url = video_url
            lesson.thumbnail = meta.get("thumbnail")
            lesson.order = meta["order"]
            lesson.duration = duration
            lesson.lab_count = lab_count
            db.commit()

        # Process Quizzes
        quiz_path = lesson_dir / "quiz.json"
        if quiz_path.exists():
            self._process_quizzes(db, quiz_path, lesson.id)

        return lesson_dir.name  # Return slug for tracking

    def _process_quizzes(self, db: Session, quiz_path: Path, lesson_id: int):
        with open(quiz_path, "r", encoding="utf-8") as f:
            quizzes_data = json.load(f)

        # Normalize to list if wrapped in dict (e.g. {"questions": [...]})
        if isinstance(quizzes_data, dict):
            quizzes_data = quizzes_data.get("questions", [])

        # Try to load localized quizzes (CZ)
        quiz_cs_path = quiz_path.parent / "quiz.cs.json"
        quizzes_cs_data = []
        if quiz_cs_path.exists():
            try:
                with open(quiz_cs_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, dict):
                        quizzes_cs_data = data.get("questions", [])
                    elif isinstance(data, list):
                        quizzes_cs_data = data
            except Exception as e:
                logger.warning(f"⚠️ Failed to load {quiz_cs_path}: {e}")

        # Clear existing quizzes for this lesson
        db.query(Quiz).filter(Quiz.lesson_id == lesson_id).delete()
        
        for i, q_data in enumerate(quizzes_data):
            # Find matching CS data by index (assuming same order)
            # Find matching CS data by index
            q_cs = quizzes_cs_data[i] if i < len(quizzes_cs_data) else {}

            # Helper to extract options whether flat or in list
            def get_option(data, opt_id):
                # Try flat first
                val = data.get(f"option_{opt_id}")
                if val: return val
                # Try list
                options = data.get("options", [])
                for opt in options:
                    if opt.get("id") == opt_id:
                        return opt.get("text")
                return None

            option_a = get_option(q_data, "a")
            option_b = get_option(q_data, "b")
            option_c = get_option(q_data, "c")
            option_d = get_option(q_data, "d")

            quiz = Quiz(
                question=q_data["question"],
                question_cs=q_cs.get("question"), # CS localization
                
                option_a=option_a,
                option_a_cs=get_option(q_cs, "a"),
                
                option_b=option_b,
                option_b_cs=get_option(q_cs, "b"),
                
                option_c=option_c,
                option_c_cs=get_option(q_cs, "c"),
                
                option_d=option_d,
                option_d_cs=get_option(q_cs, "d"),
                
                correct_answer=q_data.get("correct_answer") or q_data.get("correct"),
                explanation=q_data["explanation"],
                explanation_cs=q_cs.get("explanation"),
                
                order=q_data.get("order", i + 1),
                lesson_id=lesson_id
            )
            db.add(quiz)
        
        db.commit()
