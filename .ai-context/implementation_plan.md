# Implementation Plan - Cycle 10: UX/UI Polish & Asset Pipeline

## 🎯 Goal
Transform the raw functionality into a polished product. Replace the generic "Blue Banner" design with a modern "Liquid Glass" aesthetic, optimize mobile navigation, and establish a pipeline for serving images directly from the lesson content folders.

## 🏗️ Architecture Changes

### 1. Backend: Content Asset Serving
The content currently resides in `/app/content` (Docker volume). Frontend cannot access this directly.
* **Action**: Mount a generic static file route in FastAPI.
* **Route**: `/content/*` -> Maps to `/app/content/`.
* **Implication**: Any image inside `content/courses/x/lessons/y/images/img.png` becomes accessible via `http://backend:8000/content/courses/x/lessons/y/images/img.png`.

### 2. Frontend: Asset Handling via MDX
We need to intercept image tags in Markdown to point to the API.
* **Component**: Create a custom `MDXImage` component.
* **Logic**:
    * If `src` starts with `http` (external): Render as is.
    * If `src` is relative (`./images/foo.png`): Rewrite URL to `${API_BASE_URL}/content/${currentCourseId}/${currentLessonId}/${src}`.

### 3. UX/UI Redesign ("Liquid Glass")
* **Header Removal**: Remove the solid blue hero section.
* **New Layout**:
    * **Background**: Subtle, dynamic gradient or abstract shape that persists behind the content.
    * **Glass Cards**: Content containers will use `bg-background/60` (semi-transparent) with `backdrop-blur-md` and a thin border.
    * **Typography**: Larger, cleaner fonts. Better spacing between paragraphs.
* **Mobile Navigation**:
    * Sticky footer bar for "Previous / Next" buttons on mobile viewports.
    * Increase touch targets (min 44px height).

## 📋 Technical Details

### Backend (FastAPI)
Update `backend/app/main.py`:
```python
from fastapi.staticfiles import StaticFiles
# ...
app.mount("/content", StaticFiles(directory="/app/content"), name="content")
Frontend (Tailwind Config)
Ensure we have a consistent glass utility class (or use arbitrary values):

CSS

.glass-panel {
  @apply bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border border-slate-200 dark:border-slate-800 shadow-sm;
}
Assets Checklist (Piece of Cake)
We need to physically place the image files into the content/ structure for the "AI Basics" course to test the pipeline.