# Task List - Cycle 9: Content Engine

- [/] **Content Migration**
    - [x] Create folder structure `content/courses/` in root.
    - [x] Migrate "AI Basics" (Piece of Cake) from `seed.py` to MDX/JSON files.
    - [x] Migrate Quizzes for "AI Basics" to JSON.
    - [x] Create skeleton folders for other courses (Lets Rock, etc.).
- [x] **Backend Logic**
    - [x] Create `backend/app/services/content_loader.py` with parsing logic.
    - [x] Update `backend/seed.py` to use `ContentLoader` instead of hardcoded lists.
    - [x] Test seed script (`python seed.py`) - ensure no errors.
- [x] **Frontend UX**
    - [x] Update `LessonPage` to handle Quiz as a standalone slide.
    - [x] Verify "Next" button logic handles the transition to Quiz.
- [/] **Verification**
    - [x] Fixed Docker configuration for content directory access.
    - [ ] Verify content matches the original text.
    - [ ] Verify Quiz flow works in the browser.
