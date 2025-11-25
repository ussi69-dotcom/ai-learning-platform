# 🎨 AI Learning Platform - Content & Design Guidelines

> **Philosophy:** "Holographic Datapad" 🌌
> The UI mimics a futuristic, technical interface. Content sits on semi-transparent glass panels with neon accents.
> The Goal: **"Don't just learn AI. Build it."**

---

## 1. Lesson Structure (The Protocol) 📏
Every lesson must follow this structure to work with the **Pagination System**:

1.  **The Briefing (Page 1):**
    *   **Title:** Punchy, engaging (e.g., "Jedi Mind Tricks: Prompting").
    *   **The Hook:** 2-3 sentences on why this matters.
    *   **Video Feed:** A curated **YouTube Video** (< 20 min) that explains the concept visually. This sets the mental model.
2.  **The Archives (Core Concepts, Pages 2-N):**
    *   Break content into digestible slides using `## Heading`.
    *   **Star Wars Easter Eggs:** Mandatory. Use analogies (The Force = Compute, Droids = Agents).
    *   **"Wow" Facts:** Use `<Callout type="tip">` or `<ConceptCard>` for mind-blowing stats.
3.  **Training Simulation (Interactive Lab):**
    *   **Beginner:** Embedded `<LabSection>` (Quick interactions).
    *   **Advanced:** A dedicated project-based lab section. "Build this module".
4.  **Mission Report (Review):**
    *   **Mandatory:** A summary slide before the quiz. "What have we learned, Padawan?"
    *   Use bullet points or a `<ConceptCard>` to recap key terms.
5.  **The Trials (Final Quiz):**
    *   **Placement:** AUTOMATICALLY appended by the system. **DO NOT** include `<Quiz />` in the MDX file.
    *   **Data:** Must be provided in `quiz.json` in the lesson folder.
    *   **Difficulty:** Harder questions. Dynamic scenarios.

## 2. Visual & Asset Policy
*   **Theme:** Jedi (Indigo/Green) vs Sith (Red/Gold).
*   **Visual Richness:**
    *   **Every page** must have at least one visual element (Diagram, Code Block, or ConceptCard). No walls of text.
    *   **Icons:** Use clean, thematic icons (Lucide/SVG) or carefully selected emojis to break up paragraphs.
    *   **Diagrams:** Use Mermaid.js or CSS `<Diagram>`.
    *   **Banners/Headers:** Can be CSS-generated art or carefully selected minimal SVG.
    *   **NO Stock Photos:** No generic 3D robots.

## 3. Writing Style: The Mentor 📝
*   **Tone:** Authoritative yet encouraging (like Qui-Gon Jinn).
*   **Analogy First:** Explain complex math using simple concepts (Vectors -> Coordinates on a Star Map).
*   **Action Oriented:** "Now you try it."

## 4. Component Usage 🧱

### `<LabSection>`
*   **Purpose:** Hands-on practice. Awards **25 XP**.
*   **Requirement:** **Unique Title**. The ID is generated from the title.
*   **Behavior:** Persists completion. Button turns Green/Gold.

### `<Quiz>`
*   **Purpose:** Knowledge verification. Awards **50 XP** (score >= 70%).
*   **Placement:** Must be the **last element** of the MDX file.

### `<ConceptCard>`
*   **Props:** `title`, `icon` (emoji), `difficulty`.
*   **Use for:** Definitions, key takeaways.

### `<Callout>`
*   **Props:** `type` ("info", "warning", "tip").
*   **Use for:** "Did you know?" or "Dark Side Warning" (Bias/Safety).

---
**Status:** Updated Nov 2025 (Cycle 24 - Star Wars Edition)
**Architecture:** Next.js 16 + FastAPI + Postgres
