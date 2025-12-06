# 🚀 Protocol: New Lesson Generation (The Masterpiece Standard)

> **Usage:** Use this prompt to instruct the AI (Antigravity or others) to generate a new lesson from scratch or reboot an existing one.

---

## 📋 Context Loading
First, read the following files to establish the "Masterpiece" standard:
19.  `.ai-context/state/MEMORY.md` (Project Context)
10. `.ai-context/core/CONTENT_GUIDELINES.md` (The "Bible" - STRICT ADHERENCE REQUIRED)
11. `.ai-context/core/STRATEGY.md` (Curriculum Goals)
12. `frontend/components/mdx/diagrams/` (Available Visual Components)

---

## 🎯 The Objective
Create a **"Masterpiece" Standard Lesson** that feels like a premium interactive manual.
*   **Aesthetic:** "Liquid Glass" (Dark mode, neon accents, transparency).
*   **Tone:** Professional but engaging (Star Wars analogies allowed but not overbearing).
*   **Structure:** Video -> Hook -> Concepts -> Labs -> Summary -> Quiz.

---

## 🛠️ Step-by-Step Execution Plan

### Phase 1: The Foundation (Video First) 🎥
1.  **Find the Video:** Search for a high-quality YouTube video (< 20 min) that explains the core concept.
    *   *Criteria:* Recent (< 1 year), Authoritative (IBM, Google, Jeff Su), NO sales pitches.
2.  **Analyze & Integrate:** The lesson content must **explicitly reference** the video.
    *   *Good:* "As Martin explained in the video, tokens are like..."
    *   *Bad:* Placing the video and ignoring it in the text.

### Phase 2: Visual Asset Generation 🎨
**Rule: NO RECYCLED IMAGES.**
1.  **Diagrams:** Check `frontend/components/mdx/diagrams/`. Is there a relevant SVG? If not, plan to create one.
2.  **Images:** Generate 2-3 *new* images using DALL-E 3 / Imagen / NanoBanana.
    *   *Style:* Cybernetic, Glassmorphism, Data Visualization, Dark Mode.
    *   *Prompts:* "A digital representation of [Concept], high tech, neon, dark background."

### Phase 3: Drafting Content (`content.mdx`) ✍️
**Structure Checklist:**
*   [ ] **Header:** Title + Video (in `meta.json` ONLY).
*   [ ] **The Hook:** Why should I care? (Star Wars analogy: Force/Jedi).
*   [ ] **Core Concepts:** 3-5 sections.
    *   *Rule:* **No Walls of Text.** Every section needs a Visual Anchor (`<ConceptCard>`, `<Diagram>`, Image).
    *   *Rule:* **Length.** Minimum 10 slides. No slide shorter than 4 lines.
*   [ ] **Interactive Labs:**
    *   *Format:* Instructions *outside* the code block. Payload *inside* the code block.
    *   *Goal:* Copy-paste ready.
*   [ ] **The Holocron (Summary):** A structured Cheat Sheet in a `<ConceptCard>`.

### Phase 4: The Quiz (`quiz.json`) 🧠
*   **Format:** JSON file (NOT MDX).
*   **Quality:** 5+ questions. Focus on *reasoning*, not just definitions.
*   **Feedback:** Detailed `explanation` for why the answer is correct.

---

## 🚫 The "Blacklist" (Common Pitfalls)
**DO NOT DO THESE THINGS:**
1.  ❌ **Double Video:** Never put `<iframe src="youtube">` in the MDX. The platform handles it via `meta.json`.
2.  ❌ **Recycled Images:** Do not use `ai-timeline.png` again. Make new art.
3.  ❌ **Short Slides:** A header + 1 sentence is NOT a slide. Expand on the concept.
4.  ❌ **Lazy Labs:** Don't just describe the prompt. Give the user the exact text to copy.
5.  ❌ **Destructive Updates:** If asked to fix a typo, do not rewrite the whole lesson. **Incremental changes only.**

---

## 📝 Final Output Deliverables
1.  `content.mdx` (The Lesson)
2.  `meta.json` (The Metadata & Video)
3.  `quiz.json` (The Assessment)
4.  `images/` (The Visuals)

**Ready? Execute.**
