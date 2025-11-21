# Implementation Plan - Cycle 9: Content Engine Refactor

## Goal
Refactor the lesson content storage to solve scalability issues. Move hardcoded strings from `seed.py` into a structured file system (Markdown/JSON). This prepares the platform for scaling, localization (CZ/EN), and easier content updates.

## Architecture Change
- **Current State**: `seed.py` instantiates `Lesson` objects with massive strings.
- **Target State**: `seed.py` uses a `ContentLoader` service to iterate over a `/content` directory, parse MDX/JSON files, and sync the Database.

## Directory Structure (Target)
We will create a root-level `content/` directory:
```text
content/
  courses/
    ai-basics-beginner/          (Slug based on course title)
      meta.json                  (Title: "AI Basics...", Difficulty: "PIECE_OF_CAKE", etc.)
      lessons/
        01-what-is-ai/           (Ordered folder)
          content.mdx            (The lesson text)
          meta.json              (Title, description, video_url)
          quiz.json              (List of quiz questions for this lesson)
    practical-prompt-engineering/
      ...

## Proposed Changes
1. Content Migration
Action: Create the content/ folder structure.

Task: Extract text from the current seed.py into .mdx files.

Extract "AI Basics" lessons (1-5).

Extract Quizzes into quiz.json for each lesson.

Create placeholders for other difficulty courses defined in seed.

2. Backend Logic (backend/app/services/content_loader.py)
Implement ContentLoader class:

load_courses(base_path: str): Scans directories.

sync_to_db(db: Session): Updates or Creates records (Idempotent logic).

Logic: Use folder names for ordering (01-... -> order=1).

3. Update seed.py
Delete the hardcoded lists (easy_lessons, lesson1_quizzes, etc.).

Import ContentLoader and call loader.sync_to_db(db).

Keep User (Admin) creation in seed.py as it is system data, not content.

4. Frontend UX (Quiz Separation)
Target: frontend/app/courses/[courseId]/lessons/[lessonId]/page.tsx

Refactor:

Currently, Quiz is rendered at the bottom of the content.

New Flow: Treat Quiz as a separate "Slide" in the pagination.

When user finishes the last text slide -> Show "Start Quiz" button -> Transition to Quiz Component.

Verification Plan
Data Integrity: Run docker compose exec backend python seed.py. Verify DB still contains all 5 lessons and quizzes.

UX Check: Navigate through a lesson. Verify text renders correctly from MDX. Verify Quiz appears cleanly at the end.