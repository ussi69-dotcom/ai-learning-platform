# Task: Feedback System Implementation

- [x] **Backend Fixes**:
    - [x] Fix `NameError: name 'enum' is not defined` in `models.py` and `schemas.py`.
    - [x] Verify backend startup and seeding.
    - [x] Verify Login/Registration API.

- [x] Implement Feedback System (Frontend)
    - [x] Create `FeedbackSubmissionModal`
    - [x] Integrate FAB and Modal into `LessonPage`
    - [x] Implement drag-and-drop for feedback placement
    - [x] Display existing feedback markers
    - [x] Polish UI (Gradient header, improved inputs)
    - [x] **New**: Implement Interactions (Reply, Vote, Delete) - Robust with `FeedbackVote` model
    - [x] **New**: Add Feedback to Home Page
    - [x] **New**: Redesign Markers (Avatar + Badge) - Standardized with `UserAvatar`ubmitting feedback.

- [x] **Frontend - Display Feedback**:
    - [x] Fetch feedback items for the current lesson/slide.
    - [x] Render feedback markers on the screen (absolute positioning).
    - [x] Implement "Viewing" mode in FAB.

- [x] **Frontend - UI Polish**:
    - [x] Improve `FeedbackSubmissionModal` design (Header, Gradient).
    - [x] Fix `FeedbackFAB` button styling (removed invalid `size="icon"`).

- [ ] **Frontend - Interaction**:
    - [ ] Click marker to view details (Modal or Popover).
    - [ ] Show replies and voting UI.
    - [ ] Implement Upvote/Downvote logic.
    - [ ] Implement Reply logic.

- [ ] **Backend - Advanced Features**:
    - [ ] Rate limiting (max 10 requests per user).
    - [ ] Social features (notifications?).

- [ ] **Profile Icons (Prerequisite)**:
    - [ ] Verify Avatar selection in Profile.
    - [ ] Ensure Avatar is returned in Feedback API.
