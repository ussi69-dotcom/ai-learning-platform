# 🎨 AI Learning Platform - Content & Design Guidelines

> **Philosophy:** "Holographic Datapad" 🌌
> The UI mimics a futuristic, technical interface. Content sits on semi-transparent glass panels with neon accents.
> The Goal: **"Don't just learn AI. Build it."**

---

## 1. Visual Aesthetic & Theme
*   **Theme Engine:** Dual-mode system: **Jedi (Light/Indigo)** vs **Sith (Dark/Red)**.
    *   **Jedi:** Clean white glass, indigo accents, green success states. Optimistic & wise.
    *   **Sith:** Deep slate/black background, red neon glows, golden success states. Powerful & technical.
*   **Glass Panels:** Use `.glass-panel` utility. Avoid solid opaque backgrounds.
*   **Asset Policy:**
    *   **NO Stock Photos:** No 3D robots, glowing brains, or matrix rain.
    *   **YES:** Code blocks, CSS diagrams (`<Diagram>`), real UI screenshots, or simple geometric abstractions.

## 2. Lesson Structure (Template) 📏
To support the **Pagination System**, every lesson MUST follow this MDX structure:

1.  **Hook (Page 1):** Title (`# Title`), short description, intro video or `<ConceptCard>`.
2.  **Core Concepts (Pages 2-N):**
    *   Split content using `## Heading 2`. Each `##` starts a new slide.
    *   **Length:** Keep pages short (mobile-friendly). 3-4 paragraphs max per slide.
3.  **Interactive Lab (Middle/End):** A `<LabSection>` for hands-on practice.
4.  **Final Challenge (Last Page):** A `<Quiz>`. This is the climax.

## 3. Writing Style & Pedagogical Goals 📝

### Target Audience: The "Rookie" to "Expert" Pipeline
*   **Beginner (Rookie):**
    *   **Tone:** Conversational ("You might not realize...").
    *   **Style:** Use analogies (AI is a student, not a calculator).
    *   **Labs:** Observational (Try this prompt, see what happens). No complex coding.
*   **Intermediate (Rock):**
    *   **Tone:** Practical and direct.
    *   **Labs:** Guided building (Copy-paste code, modify variables).
*   **Advanced (Come Get Some):**
    *   **Tone:** Technical and precise.
    *   **Labs:** Requirements-only. Debugging expected.

### General Rules:
*   ✅ **Active Voice:** "You build the model" (not "The model is built").
*   ✅ **Why > How:** Explain *why* we do something before showing the code.
*   ❌ **No Academic Jargon:** Unless defined immediately in a `<ConceptCard>`.

## 4. Component Usage 🧱

### `<LabSection>`
*   **Purpose:** Hands-on practice. Awards **25 XP**.
*   **Requirement:** **Unique Title**. The ID is generated from the title (e.g., "My First Prompt" -> `my-first-prompt`).
*   **Behavior:** Persists completion. Button turns Green/Gold.

### `<Quiz>`
*   **Purpose:** Knowledge verification. Awards **50 XP** (score >= 70%).
*   **Placement:** Must be the **last element** of the MDX file.
*   **Behavior:** Persists score. Triggers "QUIZ MASTERED" modal.

### `<ConceptCard>`
*   **Props:** `title`, `icon` (emoji), `difficulty` (Beginner/Intermediate/Advanced).
*   **Use for:** Definitions, key takeaways, or "Aha!" moments.

### `<Callout>`
*   **Props:** `type` ("info", "warning", "tip").
*   **Use for:** Side notes or critical warnings.

## 5. Quality Checklist for New Lessons ✅
- [ ] **Structure:** Does it split logically with `## ` headings?
- [ ] **Lab:** Is there a `<LabSection>` with a unique title?
- [ ] **Quiz:** Is there a `<Quiz>` at the very end?
- [ ] **Tone:** Is it conversational and encouraging?
- [ ] **Mobile:** Are tables handled with `whitespace-nowrap` headers?
- [ ] **Theme:** Does it look good in both Jedi and Sith modes?

---
**Status:** Consolidated Nov 2025 (Cycle 23)
**Architecture:** Next.js 16 + FastAPI + Postgres