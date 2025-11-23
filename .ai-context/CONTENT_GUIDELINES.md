# 🎨 AI Learning Platform - Content & Design Guidelines

## 1. Visual Philosophy: "Liquid Glass" 💧
Our UI mimics a premium, futuristic interface. Content floats on glass panels.
* **Glass Effect:** Use `bg-background/60` (or `white/5` in dark mode) + `backdrop-blur-xl` + `border-white/10`.
* **No Solid Cards:** Avoid fully opaque backgrounds that hide the app wallpaper.
* **Typography:** Crisp, high-contrast text. Headings should be prominent.

## 2. Asset Policy: "Educational or Nothing" 🚫
* **FORBIDDEN:**
    * Generic stock photos (3D robots, glowing brains, matrix rain).
    * "Decorative" images that add no information.
* **ALLOWED:**
    * **Diagrams:** Mermaid.js flowcharts or clean SVGs (simple shapes).
    * **Screenshots:** Real UI screenshots if explaining a tool.
* **Rule of Thumb:** If you can't generate a perfect diagram, use **NO IMAGE**. Text and typography are beautiful enough.

## 3. Interactive Elements 🧩
* **Code Blocks:** Must be Dark Glass (`bg-slate-950/80`) with a functional **Copy Button**.
* **Callouts:** Glass panels with colored accent borders (Blue=Info, Amber=Warning). Never use solid alert colors.
* **Quiz:** The entire quiz container must be a Glass Panel.

## 4. Mobile Navigation (Sticky Footer) 📱
* **Requirement:** On mobile (< md), navigation buttons MUST be in a fixed bottom bar (`fixed bottom-0`).
* **Layout:**
    * [Left]: Previous Slide (Ghost Icon)
    * [Center]: Progress Indicator (Text or Bar)
    * [Right]: Next Slide (Primary Icon)
* **Logic:** "Next Lesson" button only appears on the very last slide.

## 5. Lesson Length & Structure by Difficulty 📏

### Beginner (IM_A_ROOKIE)
* **Reading Time:** 15-20 minutes
* **Labs:** 10-15 minutes (guided, step-by-step)
* **Total:** ~30 minutes
* **Goal:** Build confidence, explain concepts with analogies
* **Pacing:** 1 lesson per day
* **Content Style:**
  - Use simple analogies (Calculator vs Student, Recipe vs Chef)
  - Break complex ideas into visual cards (`<ConceptCard>`)
  - Include "Try This Now" prompts for immediate engagement
  - Labs are observational (no coding required)

### Intermediate (LETS_ROCK)
* **Reading Time:** 15-20 minutes (mobile-friendly)
* **Labs:** 45-60 minutes (hands-on coding)
* **Total:** ~75 minutes
* **Goal:** Apply concepts, build real tools
* **Pacing:** Theory in commute, lab in evening
* **Content Style:**
  - Concise theory with links to deep dives
  - Step-by-step coding labs with copy-paste code
  - "Change X and observe Y" exercises
  - Deploy working demos

### Advanced (COME_GET_SOME)
* **Reading Time:** 10-15 minutes (brief, reference-style)
* **Projects:** 90-120 minutes (multi-step implementations)
* **Total:** ~2 hours
* **Goal:** Production-ready skills, debugging, optimization
* **Pacing:** 2-3 days per lesson
* **Content Style:**
  - Requirements-only (minimal hand-holding)
  - Multiple solution paths
  - Real-world datasets and APIs
  - Production deployment required

### Expert (DAMN_IM_GOOD)
* **Reading Time:** 5-10 minutes (just requirements & context)
* **Projects:** Multi-day real-world builds
* **Total:** 1 week per project
* **Goal:** Ship production code, contribute to open source
* **Final Project:** Build this AI Learning Platform (meta-learning)
* **Content Style:**
  - Open-ended challenges
  - No provided code
  - Research and problem-solving required
  - Code review and feedback loops

## 6. Component Usage 🧱

### Must Use:
- `<Callout>` - Important notes, warnings, tips
- `<ConceptCard>` - Key concepts, comparisons
- `<Diagram>` - Visual explanations (SVG only)
- `<Steps>` - Sequential instructions for labs
- `<MDXImage>` - Educational screenshots (rare)

### Nice to Have (Future):
- `<QuickCheck>` - Inline mini-quizzes
- `<LabBadge>` - XP notifications
- `<ProgressIndicator>` - Visual lesson progress
- `<TryItYourself>` - Interactive coding sandboxes

## 7. Writing Style 📝

### Beginner Content:
- ✅ Conversational tone ("You might not realize it...")
- ✅ Use "you" and "we" (not "one should")
- ✅ Real-world examples ("Open your phone gallery...")
- ✅ Analogies over jargon ("AI is like a student, not a calculator")
- ❌ Avoid: Academic language, passive voice, unnecessary complexity

### Advanced Content:
- ✅ Technical precision
- ✅ Link to documentation
- ✅ Industry best practices
- ✅ Real production examples
- ❌ Avoid: Over-simplification, hand-holding

## 8. Lab Design Philosophy 🧪

### Beginner Labs: Observation & Interaction
- "Try this prompt"
- "Spot the hallucination"
- "Compare outputs"
- **No coding required**

### Intermediate Labs: Guided Building
- Step-by-step instructions
- Copy-paste friendly code
- "Change X and observe Y"
- **Coding with guardrails**

### Advanced Labs: Independent Projects
- Requirements-only (no step-by-step)
- Multiple solution paths
- Debugging required
- **Real developer experience**

### Expert Labs: Open-Ended Challenges
- "Build X with these constraints"
- No provided code
- Research required
- **Production-ready outputs**

## 9. Accessibility & Responsiveness ♿

* **Mobile-First:** All content must be readable on mobile (commute learning)
* **Dark Mode:** All components must support dark mode
* **Keyboard Navigation:** All interactive elements must be keyboard accessible
* **Screen Readers:** Use semantic HTML and ARIA labels where needed

## 10. Quality Checklist ✅

Before publishing a lesson, verify:
- [ ] Reading time matches difficulty level
- [ ] All components follow "Liquid Glass" design
- [ ] No decorative/stock images
- [ ] Labs are appropriate for skill level
- [ ] Mobile-friendly (test on phone)
- [ ] Dark mode works
- [ ] All code blocks have copy buttons
- [ ] Links to next lesson work

---

**Status:** Aktualizováno listopad 2025  
**Agent Architecture:** Perplexity (Architect) + Antigravity (Executor)  
**OSS/Gemini/ostatní agenti se NEpoužívají pro tento projekt**