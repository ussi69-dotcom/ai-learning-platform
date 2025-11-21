# Task Checklist: Lesson 1 Redesign (Cycle 16)

## 📋 Overview
- **Cycle:** 16
- **Goal:** Redesign Lesson 1 with 2025 best practices
- **Estimated Time:** 30 minutes
- **Breaking Changes:** No

---

## ✅ Pre-Implementation Checks

- [ ] Read `.ai-context/PROJECT_CORE.md` (understand vision)
- [ ] Read `.ai-context/CONTENT_GUIDELINES.md` (design system rules)
- [ ] Read `.ai-context/implementation_plan.md` (this cycle's plan)
- [ ] Backup current `content.mdx` (just in case)

---

## 📝 Content Update Tasks

### Task 1: Replace Content File
- [ ] Navigate to: `content/courses/ai-basics-beginner/lessons/01-what-is-ai/`
- [ ] Backup current `content.mdx`:
  ```bash
  cp content.mdx content.mdx.backup
  ```
- [ ] Replace `content.mdx` with new version (provided by Lead Architect)
- [ ] Verify file saved correctly (check file size, no corruption)

**Commit:**
```bash
git add content/courses/ai-basics-beginner/lessons/01-what-is-ai/content.mdx
git commit -m "feat: redesign lesson 1 content structure

- Reorganized sections for better flow
- Added engagement prompts (Try This Now)
- Enhanced lab instructions with Steps component
- Improved visual hierarchy with ConceptCard/Callout

LEARN: Establishing gold standard template for future lessons."
```

---

## 🧪 Testing Tasks

### Task 2: Visual Verification
- [ ] Start dev server:
  ```bash
  npm run dev
  ```
- [ ] Open in browser: `http://localhost:3000/courses/ai-basics-beginner/lessons/01-what-is-ai`
- [ ] Check console for errors (F12)
- [ ] Verify all components render:
  - [ ] `<Callout>` boxes display correctly
  - [ ] `<ConceptCard>` components show with glass effect
  - [ ] `<Diagram>` components load (or show placeholder)
  - [ ] `<Steps>` component renders numbered lists
  - [ ] Markdown tables format correctly

**If errors found:**
- Check browser console for component errors
- Verify MDX syntax (closing tags, prop names)
- Consult `frontend/components/mdx/` for component API

### Task 3: Mobile Responsiveness
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test at 375px width (iPhone SE)
- [ ] Verify:
  - [ ] No horizontal scrolling
  - [ ] Text readable (not too small)
  - [ ] Components stack vertically
  - [ ] Buttons/links tappable (not too small)

### Task 4: Dark Mode Check
- [ ] Toggle dark mode (if app supports)
- [ ] Verify:
  - [ ] Text contrast sufficient
  - [ ] Glass effect visible
  - [ ] No unreadable text
  - [ ] Components maintain visual hierarchy

### Task 5: Reading Time Test
- [ ] Read through entire lesson at normal pace
- [ ] Time yourself (should be ~15 minutes for beginner)
- [ ] If too long/short, note in AGENT-STATE.md for next cycle

---

## 📊 Quality Checks

### Task 6: Content Quality Review
- [ ] All sections have clear headers
- [ ] Labs have step-by-step instructions
- [ ] No broken markdown syntax
- [ ] Code blocks properly formatted
- [ ] Links work (if any)
- [ ] Tone is beginner-friendly (no jargon without explanation)

### Task 7: Component Compliance
- [ ] All `<ConceptCard>` have `title` prop
- [ ] All `<Callout>` have `type` prop (info/warning/tip/success)
- [ ] All `<Diagram>` have `type` prop
- [ ] No components used that don't exist

### Task 8: Design System Compliance
- [ ] No stock images or decorative graphics
- [ ] Only educational diagrams used
- [ ] Glass effect on all containers
- [ ] Follows "Liquid Glass" philosophy (see CONTENT_GUIDELINES.md)

---

## 🚀 Deployment Tasks

### Task 9: Final Commit & Push
- [ ] Ensure all tests passed
- [ ] Update `AGENT-STATE.md`:
  ```markdown
  ## Cycle 16: Lesson 1 Redesign
  **Status:** ✅ Completed
  **Changes:**
  - Redesigned Lesson 1 content structure
  - Improved engagement and pacing
  - Enhanced component usage
  **Testing:** Passed visual, mobile, dark mode tests
  **Next:** Apply template to Lesson 2
  ```
- [ ] Commit AGENT-STATE update:
  ```bash
  git add .ai-context/AGENT-STATE.md
  git commit -m "docs: mark cycle 16 complete"
  ```
- [ ] Push all changes:
  ```bash
  git push origin main
  ```

---

## 📝 Post-Deployment

### Task 10: Archive Cycle
- [ ] Create archive directory:
  ```bash
  mkdir -p .ai-context/completed_cycles/cycle_16
  ```
- [ ] Move cycle files:
  ```bash
  mv .ai-context/implementation_plan.md .ai-context/completed_cycles/cycle_16/
  mv .ai-context/task.md .ai-context/completed_cycles/cycle_16/
  ```
- [ ] Commit archive:
  ```bash
  git add .ai-context/completed_cycles/cycle_16/
  git commit -m "chore: archive cycle 16"
  git push origin main
  ```

---

## ✅ Definition of Done

**All tasks complete when:**
- [x] Content file replaced
- [x] Visual tests passed
- [x] Mobile responsive verified
- [x] Dark mode compatible
- [x] Quality checks passed
- [x] Changes committed and pushed
- [x] AGENT-STATE updated
- [x] Cycle archived

---

## 🆘 If Something Goes Wrong

### Rollback Procedure:
```bash
# Restore backup
cp content.mdx.backup content.mdx

# Commit rollback
git add content.mdx
git commit -m "revert: rollback lesson 1 redesign (issue found)"
git push origin main
```

### Get Help:
1. Check browser console for specific error
2. Review component API in `frontend/components/mdx/`
3. Consult CONTENT_GUIDELINES.md for design rules
4. Ask Lead Developer or Lead Architect (Perplexity) for guidance

---

**Cycle Start:** [Date/Time when started]
**Cycle End:** [Date/Time when completed]
**Duration:** [Actual time taken]
