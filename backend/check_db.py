from app.database import SessionLocal
from app.models import Course, Lesson

db = SessionLocal()
courses = db.query(Course).all()
print(f"Found {len(courses)} courses.")
for c in courses:
    print(f"Course: {c.title}, Slug: {c.slug}, Diff: {c.difficulty_level}")
    print(f"  Lessons count: {len(c.lessons)}")
    for l in c.lessons:
        print(f"    - {l.title} ({l.slug})")

db.close()
