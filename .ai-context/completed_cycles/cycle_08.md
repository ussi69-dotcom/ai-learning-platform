# Implementation Plan - Day 8: Progress Tracking System

## Goal
Implement a comprehensive progress tracking system that allows users to mark lessons as completed, view their progress within a course, and see a summary of their learning achievements on their profile.

## User Review Required
> [!IMPORTANT]
> We are adding a new database table `UserProgress`. Ensure database migrations are handled or the database is reset if we are in dev mode without migrations.

## Proposed Changes

### Backend

#### [MODIFY] [models.py](file://wsl$/Ubuntu/home/ussi/ai-learning-platform/backend/app/models.py)
- Add `UserProgress` model:
    - `id`: int (primary key)
    - `user_id`: int (foreign key)
    - `lesson_id`: int (foreign key)
    - `completed_at`: datetime
    - `course_id`: int (foreign key, for easier aggregation)

#### [MODIFY] [schemas.py](file://wsl$/Ubuntu/home/ussi/ai-learning-platform/backend/app/schemas.py)
- Add `UserProgressBase`, `UserProgressCreate`, `UserProgressRead`.

#### [MODIFY] [main.py](file://wsl$/Ubuntu/home/ussi/ai-learning-platform/backend/app/main.py)
- Add `POST /lessons/{lesson_id}/complete`: Mark lesson as complete.
- Add `GET /courses/{course_id}/progress`: Get progress for a specific course (percentage, completed lessons).
- Add `GET /users/me/progress`: Get all progress for the user.

### Frontend

#### [NEW] [LessonComplete.tsx](file://wsl$/Ubuntu/home/ussi/ai-learning-platform/frontend/components/LessonComplete.tsx)
- Button component to mark lesson as complete.
- Shows "Completed" state if already done.
- Triggers confetti or visual celebration on completion.

#### [MODIFY] [page.tsx](file://wsl$/Ubuntu/home/ussi/ai-learning-platform/frontend/app/courses/[courseId]/lessons/[lessonId]/page.tsx)
- Integrate `LessonComplete` component at the end of the lesson (after Quiz).

#### [MODIFY] [page.tsx](file://wsl$/Ubuntu/home/ussi/ai-learning-platform/frontend/app/courses/[courseId]/page.tsx)
- Fetch user progress for the course.
- Show checkmarks next to completed lessons in the list.
- Show a progress bar for the course.

#### [MODIFY] [page.tsx](file://wsl$/Ubuntu/home/ussi/ai-learning-platform/frontend/app/profile/page.tsx)
- Add "My Learning" section.
- Display list of in-progress and completed courses.

## Verification Plan

### Automated Tests
- Create `backend/tests/test_progress.py` to test:
    - Marking lesson as complete.
    - Retrieving course progress.
    - Ensuring no duplicate progress entries.

### Manual Verification
1.  **Lesson Completion**: Go to a lesson, finish it, click "Mark Complete". Verify UI updates.
2.  **Course Progress**: Go to course page, verify progress bar increases and checkmark appears.
3.  **Profile**: Go to profile, verify course shows up in "My Learning".
