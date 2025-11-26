# Feedback System Walkthrough

## Overview
I have implemented a comprehensive feedback system that works both within lessons and on the Home Page.

## Key Features
1.  **Global Feedback**: You can now place feedback on the Home Page (requires login).
2.  **Avatar Markers**: Feedback markers now display the **User's Avatar** with a small badge indicating the type (Bug, Feature, etc.).
3.  **Feedback Details**: Clicking a marker opens a modal where you can:
    *   View the full message.
    *   **Vote** (Up/Down).
    *   **Reply** to the feedback.
    *   **Delete** (if you are the author or admin).
4.  **Admin Tools**: `admin@ai-platform.com` and `ussi@seznam.cz` have global delete/edit permissions.

## How to Verify

### 1. Home Page Feedback
1.  Login to the platform.
2.  On the Home Page, look for the **Bug Icon** (FAB) in the bottom right.
3.  Hover over it to see "Report a Bug / Feedback".
4.  Click it to enter **Placing Mode**.
5.  Click anywhere on the page to place a marker.
6.  Select a type (e.g., BUG) and write a message.
7.  Submit.
8.  Verify the marker appears with your avatar.

### 2. Interactions
1.  Click on the marker you just created.
2.  Verify the **Feedback Detail Modal** opens.
3.  Try **Upvoting**.
4.  Write a **Reply** and submit.
5.  Verify the reply appears in the list.

### 3. Lesson Feedback
1.  Navigate to a lesson.
2.  Verify the FAB and Markers work the same way.
3.  Verify that feedback is specific to that lesson/slide (unless you are viewing global feedback, but currently lesson page filters by lesson).

### 4. Deletion
1.  Open your own feedback.
2.  Click the **Trash Icon** to delete it.
3.  Verify it disappears.

## Technical Changes
- **Backend**: Updated `FeedbackItem` model to allow global feedback (nullable `lesson_id`). Added `DELETE` and `PUT` endpoints.
- **Frontend**: Created `FeedbackDetailModal`, updated `FeedbackMarker`, `FeedbackFAB`, and integrated everything into `HomePage` and `LessonPage`.
- **Avatars**: Created `UserAvatar` component to correctly render both **DiceBear** images and **Lucide Icons** (Jedi/Sith), ensuring consistency with the Profile and NavBar.
- **Bug Fix**: Resolved `TypeError` in `create_feedback_reply` endpoint by excluding `parent_id` from model dump (preventing duplicate argument error).
- **Robustness**: Implemented `FeedbackVote` model to limit voting (one vote per user) and updated `get_feedback` to recursively load replies and user vote status.
- **Bug Fix**: Handled `lesson_id=0` in `create_feedback_item` by converting it to `None`, preventing Foreign Key constraint violations for global feedback.
- **Bug Fix**: Updated `FeedbackItemResponse` schema to make `replies` optional (`Optional[List]`), resolving `ResponseValidationError` when creating new items.
- **Bug Fix**: Handled `None` value for `item.replies` in `get_feedback` loop to prevent `TypeError: 'NoneType' object is not iterable`.
- **Bug Fix**: Corrected SQLAlchemy self-referential relationship in `models.py`. Moved `remote_side=[id]` to `parent_feedback` (Many-to-One) instead of `replies` (One-to-Many), ensuring `replies` is correctly treated as a list.
- **UI Polish**: Redesigned `FeedbackSubmissionModal` and `FeedbackDetailModal` with "Liquid Glass" aesthetic (gradients, blur, neon accents) and improved icons, matching the project's premium design guidelines.
- **Theme Alignment**: Updated feedback components to use `primary` and `secondary` CSS variables, ensuring full compatibility with both Jedi (Indigo) and Sith (Red) themes.
- **Bug Fix**: Restored the missing "Report" button icon in `FeedbackFAB` by replacing the generic `Flag` with `MessageCircle` and fixing the button variant.
- **Bug Fix**: Resolved `FeedbackFAB` layout issues by removing a redundant button and restoring `onMouseDown` handler for drag-and-drop functionality.
- **Styling Fix**: Fixed "ugly" icons and wrong colors in `FeedbackFAB` by removing hardcoded dark mode styles from the `Button` component and ensuring proper flex alignment for icon centering.
- **Final Polish**: Applied full "Liquid Glass" aesthetic to `FeedbackFAB` banners and buttons (neon borders, glass backgrounds, circular shapes) to match the premium design system.
- **Icon Upgrade**: Replaced generic icons with `Bug` (Add) and `Eye` (View) in `FeedbackFAB`.
- **Layout Update**: Changed `FeedbackFAB` layout to side-by-side (horizontal) buttons for better usability.
- **Feature Addition**: Integrated `FeedbackFAB` into the Course Overview page (`courses/[courseId]/page.tsx`), allowing users to leave general course feedback.
