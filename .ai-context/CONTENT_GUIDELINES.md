# 📜 Content Guidelines (The Golden Standard)

This document defines the "Masterpiece" quality standard for all course content.

## 1. Core Philosophy
*   **"Liquid Glass" Aesthetic:** Content must look native to the dark-mode, neon-accented UI.
*   **Interactive First:** No passive reading. Labs and Quizzes drive engagement.
*   **Jedi/Sith Theme:** Use analogies (The Force, Droids, Holocrons) but keep it professional.

## 2. Structure of a Lesson
Every lesson MUST follow this structure:

1.  **Header Callout:**
    ```markdown
    <Callout type="info">
    **Mission Goal:** [One sentence goal]
    ⏳ **Reading Time:** 15 min | 🧪 **[X] Labs Included**
    </Callout>
    ```
2.  **The Hook:** Why does this matter? (Star Wars analogy allowed).
3.  **Core Concepts:** Broken down into sections with **Visual Anchors**.
4.  **Interactive Labs:** Copy-Paste ready prompts.
5.  **The Holocron:** A summary ConceptCard at the end.

## 3. Visual Rules (SVG First) 🎨
*   **NO Raster Images:** Do not use `.png` or `.jpg` files unless absolutely necessary (and approved).
*   **Use Diagrams:** Use the `<Diagram type="...">` component.
    *   *Available Types:* `neural-network`, `training-loop`, `ai-timeline`, `dashboard-ui`, `data-analysis-chart`, etc.
    *   *Why?* Scales perfectly, respects Dark Mode, editable via code.
*   **Icons:** Use `LessonIcon` and `CourseIcon` components for UI elements.

## 4. Component Usage

### `<ConceptCard>`
Use for key definitions or summaries.
```tsx
<ConceptCard title="The Student" icon="🎓" jediQuote="Much to learn...">
  Content...
</ConceptCard>
```

### `<Steps>`
Use for sequential instructions or lab analysis.

### `<Callout>`
Use for warnings (Hallucinations) or tips.
*   `type="info"`: General info (Blue)
*   `type="warning"`: Risks/Hallucinations (Yellow/Red)
*   `type="success"`: Achievements (Green)
*   `type="tip"`: Pro Tips (Purple)

## 5. Lab Standards
Labs must be "Copy-Paste" ready. Don't describe the prompt. Write it.

**Bad:** "Ask the AI to write a poem."
**Good:**
```markdown
**The Prompt:**
```text
Write a poem about a robot who loves gardening.
```
```

## 6. Tone & Voice
*   **Empowering:** You are the Jedi Master guiding a Padawan.
*   **Precise:** No fluff. Short paragraphs.
*   **Formatted:** Use **Bold** for key terms. Use lists often.