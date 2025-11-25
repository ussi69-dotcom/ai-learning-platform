# 🎨 AI Learning Platform - Content & Design Guidelines
> **Standard Version:** "The Masterpiece" (Cycle 26+)
> **Benchmark:** ALWAYS refer to **Lesson 4** (`04-your-first-prompt`) as the visual and structural gold standard.

---

## 1. The "Masterpiece" Structure 📏
Every lesson must feel like a deep-dive manual.
**Target Length:** 10-15 Sections (Pages).

1.  **The Briefing (Header Only):**
    *   **Video:** Defined in `meta.json` ONLY.
    *   **Source:** Top-tier educational (IBM, Jeff Su). No sales promo.
    *   **Rule:** **NEVER** embed the video `<YouTube>` inside the MDX body. It creates duplicates.
    *   **Integration:** The text MUST explicitly reference concepts from the video ("As seen in the video..."). Do not just place the video and ignore it.
2.  **The Hook:** Start with a Star Wars analogy or strong "Why".
3.  **The Core Pillars:** Break topic into 3-5 concepts. Use Visual Anchors for each.
4.  **The Labs:** "Copy & Paste" ready.
5.  **The Summary (Holocron):** A structured Cheat Sheet.

---

## 2. The Lab Protocol (Crucial) 🧪
Interactive Labs must be frictionless.

*   **❌ The Wrong Way:**
    *   Putting instructions inside the code block.
    *   *Example:*
        ```text
        Step 1: Copy this prompt.
        Act as a bot...
        ```
*   **✅ The Masterpiece Way:**
    *   Instructions outside. Payload inside.
    *   *Example:*
        "Copy this prompt exactly:"
        ```text
        Act as a bot...
        ```

---

## 3. Visual Strategy & Formatting 🎨
*   **Visual Anchors:** Every scroll MUST have a visual element.
    *   `<ConceptCard>`, `<Diagram>`, `<Callout>`, or **Icon Lists** (🎭, ⚔️).
    *   **Rule:** **NO RECYCLED IMAGES.** Generate new, specific images for every lesson.
    *   **Rule:** **NO WALLS OF TEXT.** No slide should be shorter than 4 lines (too empty) or longer than 2 paragraphs without a visual break.
*   **Tables:** Use Markdown tables for "Weak vs. Strong" comparisons.
*   **Formatting:**
    *   Use **Bold** for key terms.
    *   Use `Code Style` for technical terms.
    *   Use Delimiters (`---`) to separate sections within cards.

---

## 4. The "No Wipe" Rule (Iteration) 🔄
*   **Evolution, not Revolution:** When asked to "expand" or "improve", **DO NOT DELETE** existing high-quality content unless explicitly told to.
*   **Integrate:** Merge new concepts (e.g., from a video) with existing technical sections (e.g., Delimiters, JSON).
*   **Incrementalism:** If asked to fix one section, **DO NOT** rewrite the whole lesson. Fix only what is broken.

---

## 5. The Summary Protocol (The Holocron) 🏆
The final page is not a goodbye; it is a **Cheat Sheet**.
*   **Format:** Inside a `<ConceptCard>`.
*   **Structure:**
    *   ### Category 1
    *   *   **Concept:** Definition.
    *   ### Category 2
    *   *   **Concept:** Definition.
*   **Goal:** The user should want to screenshot this page.

---

## 6. Technical Protocols 🛠️
*   **Quizzes:** `quiz.json` (5+ questions, focus on logic/reasoning).
*   **Metadata:** Update `meta.json` (Video URL, Description).
*   **Database:** `docker-compose restart backend` after content changes.

---
**Status:** Updated Cycle 27 (Refined after Lesson 4 Iterations)
