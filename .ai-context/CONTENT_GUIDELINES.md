# 🎨 AI Learning Platform - Content & Design Guidelines

> **Philosophy:** "Holographic Datapad" 🌌
> The UI mimics a futuristic, technical interface used by Jedi or Sith. Content sits on semi-transparent glass panels with neon accents.

---

## 1. Visual Aesthetic: The Holographic Datapad
*   **Theme Engine:** The app switches between **Jedi (Light/Indigo)** and **Sith (Dark/Red)** modes.
    *   **Jedi:** Clean white glass, indigo accents, green success states. Optimistic & wise.
    *   **Sith:** Deep slate/black background, red neon glows, golden success states. Powerful & technical.
*   **Glass Panels:** All content containers must use the `.glass-panel` utility. Never use solid opaque white/black backgrounds for cards.
*   **Glow Effects:** In Dark mode, active elements emit a subtle glow (`box-shadow`) instead of flat borders.

## 2. Lesson Structure (The Template) 📏
Every lesson must follow this structure to work with the **Pagination System**:

1.  **Hook (Page 1):** Title, short description, maybe a video or an intro `<ConceptCard>`.
2.  **Core Concepts (Pages 2-N):** Break content into digestible slides.
    *   **IMPORTANT:** The splitter splits content by `## ` (H2) headings.
    *   Each `## Headline` starts a new "page" in the reader.
    *   Keep pages short (mobile-friendly).
3.  **Interactive Lab (Middle/End):** A `<LabSection>` where users try things out.
4.  **Final Challenge (Last Page):** A `<Quiz>`. This is the climax of the lesson.

## 3. Component Usage 🧱

### `<LabSection>`
*   **Purpose:** Hands-on practice. Awards **25 XP** once per lesson.
*   **Requirement:** **Must have a unique Title** within the lesson. The backend generates a unique ID from the title to track completion.
*   **Behavior:**
    *   Unfinished: "I Finished This Lab" button (Primary color).
    *   Finished: Button turns Green (Jedi) or Gold (Sith) and disables. State is persisted forever.

### `<Quiz>`
*   **Purpose:** Verify knowledge. Awards **50 XP** if score >= 70%.
*   **Placement:** MUST be the very last element of the lesson.
*   **Behavior:**
    *   Persists the score in the database.
    *   On success (>= 70%), triggers a "QUIZ MASTERED" confetti modal.
    *   Allows retries, but XP is awarded only for the first success/improvement.

### `<ConceptCard>`
*   **Purpose:** Explaining definitions or key ideas.
*   **Props:** `title`, `icon`, `difficulty`.
*   **Style:** Uses the glass panel look.

### `<Callout>`
*   **Purpose:** Warnings, Tips, or Info.
*   **Style:** Bordered glass panel.

### Images & Assets
*   **Preferred:** CSS-based `<Diagram>` components or Code Blocks.
*   **Images:** Only use if strictly necessary (e.g., screenshot of an interface). No decorative stock photos.

## 4. Navigation & UX 🧭
*   **Pagination:** Users navigate via "Prev/Next" buttons or the **Segmented Progress Bar** (top/bottom).
*   **Resume Capability:** The system remembers the exact page (`current_page`) where the user left off.
*   **XP & Leveling:**
    *   Levels are calculated dynamically based on XP (not difficulty setting).
    *   Level 1: 0-500 XP | Level 2: 500-1200 XP | Level 3: 1200-2500 XP | Level 4: 2500+ XP.

## 5. Quality Checklist for New Lessons ✅
- [ ] Does the content split logically with `## ` headings?
- [ ] Is there at least one `<LabSection>`?
- [ ] Is there a `<Quiz>` at the end?
- [ ] Are long tables handled with `whitespace-nowrap` headers?
- [ ] Does the content look good in both Jedi and Sith modes?

---
**Status:** Updated Nov 2025 (Cycle 23)
**Architecture:** Next.js 16 + FastAPI + Postgres
