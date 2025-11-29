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
    *   **Check First:** Before creating a new diagram, check `frontend/components/mdx/Diagram.tsx` to see if a suitable one already exists. **Do not create duplicates.**
    *   *Available Types:* `neural-network`, `training-loop`, `traditional-vs-ml`, `ai-timeline`, `dashboard-ui`, `data-analysis-chart`, etc.
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

## 7. Technical Best Practices 🔧

### Diagram Design
*   **Light Mode Contrast:** ALWAYS use dark-mode-aware color classes for text:
    ```tsx
    // ✅ CORRECT
    className="fill-slate-600 dark:fill-slate-400"
    
    // ❌ WRONG (unreadable in light mode)
    className="fill-slate-400"
    ```
*   **Legibility:** Ensure SVG paths (arrows, lines) DO NOT overlap with text labels. Test visually.
*   **Context Match:** Ensure the diagram fits the specific pedagogical goal (e.g., use `traditional-vs-ml` for rule-based vs learning, and `training-loop` for the feedback cycle).
*   **Font Sizes:** Minimum `text-xs` for body text, `text-[10px]` for labels.
*   **Test Both Modes:** Verify diagrams in both light and dark themes before committing.

### Component Capabilities
*   **Nested Markdown:** `<ConceptCard>` and `<Callout>` support complex Markdown (Lists, Code Blocks, Headings) thanks to recursive parsing.
    *   **Requirement:** Ensure valid Markdown structure.
    *   **Pattern:**
      ```markdown
      <ConceptCard ...>
      ### 🔑 Key Points
      *   **Item 1:** Description
      ```
*   **Diagrams in Cards:** While possible, avoid putting heavy `<Diagram>` components inside `<ConceptCard>` to prevent layout clutter. Use them *between* cards.

### Code Blocks
*   **Language Identifier:** Always specify language for syntax highlighting:
    ```markdown
    ```python  ← Specify language
    def example():
        pass
    ```  ← Close properly
    ```
*   **Where They Work:** Code blocks are supported everywhere (not just `<Steps>`).
*   **Styling:** Code blocks automatically get Mac-style window dots (🔴🟡🟢) and a Copy button.

### Summary Section Pattern
*   **Inspiration:** Use Lesson 3's Holocron as the gold standard.
*   **Icon Usage:** One icon per key concept improves scannability.
*   **Avoid:** Long paragraphs, walls of text, ASCII art dividers.

## 8. Localization Protocol 🌍
**CRITICAL:** The platform supports both English (`en`) and Czech (`cs`).
*   **Dual Update Rule:** When modifying content (fixing typos, changing images, merging pages), you **MUST** update both:
    *   `content.mdx` (English)
    *   `content.cs.mdx` (Czech)
*   **Syncing:** After updating files, run `docker-compose exec backend python seed.py` to sync changes to the database.
*   **Verification:** Verify changes in both languages if possible, or at least ensure the file structure matches.

## 9. Design System Rules 🎨
*   **Light Mode (Jedi):** "Purple Lightsaber" theme.
    *   Primary Action Color: Purple (`purple-600` to `purple-800`).
    *   Gradients: Purple/Fuchsia mix.
    *   Text Highlights: Purple.
*   **Dark Mode (Sith):** "Sith Red & Silver" theme.
    *   Primary Action Color: Red (`red-500` to `red-700`).
    *   Headings: Silver/White (`slate-200` to `slate-400`).
    *   Text Highlights: Red.