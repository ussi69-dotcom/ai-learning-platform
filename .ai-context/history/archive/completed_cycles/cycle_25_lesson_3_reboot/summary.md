# Cycle 25: Lesson 3 Reboot & Content Guidelines 2.0

## 🎯 Objective
Rebuild Lesson 3 ("The Mind of the Machine") to meet new high-quality standards and codify these standards into the project guidelines.

## 🛠️ Tasks Completed
- [x] **Lesson 3 Overhaul:**
    - Renamed to "The Mind of the Machine: LLMs".
    - Expanded content (Tokens, Context, Temperature, Hallucinations).
    - Added new diagrams (`llm-next-token`, `tokenization-viz`, `context-window`, `temperature-scale`, `training-pipeline`).
    - Added "Mission Report" summary.
    - Fixed Quiz (moved to `quiz.json`, removed from MDX).
- [x] **Component Upgrades:**
    - `Diagram.tsx`: Added 5 new SVG visualizations.
    - `ConceptCard.tsx`: Visual polish (glassmorphism, no forced difficulty badge).
    - `MarkdownRenderer.tsx`: Added support for `text-wrap` in headings.
- [x] **Content Strategy:**
    - Updated `STRATEGY.md` with new "Padawan -> Jedi" curriculum.
    - Updated `CONTENT_GUIDELINES.md` with strict rules (Video First, Mission Report, No Inline Quiz).
    - Updated `.agent/rules/rules.md` with "Lesson Generation Protocol".
- [x] **Cleanup:**
    - Resolved lesson ordering conflicts (shifted old Lesson 3 to 4).

## 📝 Key Learnings
- **Quiz Data Separation:** Quizzes must live in DB/JSON, not MDX.
- **Visuals:** Text-only lessons are boring. Every slide needs a visual anchor.
- **DB Management:** Content updates require `docker-compose restart backend`.
