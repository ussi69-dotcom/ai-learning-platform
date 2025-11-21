# Implementation Plan - Cycle 13: Content Repair & Navigation Overhaul

## 🎯 Goal
Fix broken content assets (images, quiz) and redesign the navigation to prioritize intra-lesson reading flow (slides) over inter-lesson jumping.

## 🔧 Content Repair (The Blueprint)
* **Images**: Replace broken local paths with curated Unsplash URLs.
* **Structure**: Merge small sections to reduce slide count (target: 6-8 slides/lesson).
* **Quiz**: Align questions with the new "Probability/Hallucination" content.

## 🎨 UX/UI: The "Reading Mode" Navigation
The current navigation mixes "Next Slide" and "Next Lesson" confusingly.
* **New Sticky Bottom Bar Layout**:
    * **Left**: Large "Prev Slide" button (Ghost variant).
    * **Center**: **Progress Box**. Shows current lesson info + progress bar (e.g., "Slide 3/8").
    * **Right**: Large "Next Slide" button (Primary variant).
    * **Mobile**: Full width, easy to tap.
* **Lesson Switching ("Prev/Next Course Lesson")**:
    * De-emphasize. Move to the top header (small icons) or make them small text links/secondary buttons outside the main flow.
    * Only when the lesson is **100% complete** (last slide), the "Next Slide" button transforms into a big "Finish & Next Lesson" button.

## 🛠️ Technical Tasks
* Update `LessonPage` state logic to differentiate between `nextSlide()` and `nextLesson()`.
* Refactor `MarkdownRenderer` styles to fix spacing.