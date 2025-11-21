# Task List - Cycle 13

- [x] **Content: Fix Lesson 1 Assets**
    - [x] Replace broken image links in `01-what-is-ai/content.mdx` with working Unsplash URLs.
    - [x] Merge sections (`##` -> `###`) to reduce total slides to ~8.
    - [x] Rewrite `quiz.json` to match current topics (Hallucinations, Training vs Inference).

- [x] **Frontend: Navigation Redesign (Sticky Footer)**
    - [x] Modify the Sticky Bottom Bar in `LessonPage`.
    - [x] **Left/Right**: Big buttons for **Prev Slide** / **Next Slide**.
    - [x] **Center**: A compact card/box showing "Lesson Progress" (e.g., progress bar or "Slide X of Y").
    - [x] **Logic**: "Next Lesson" button should strictly only appear on the very last slide.
    - [x] **De-emphasize**: Make global "Prev/Next Lesson" buttons small (e.g., small outline buttons at the top or minimal links).

- [x] **Frontend: Visual Polish**
    - [x] Fix margins in `MarkdownRenderer` (ensure `<p>` inside Callouts looks good).
    - [x] Verify images are responsive (`w-full`).