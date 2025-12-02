# 🤝 Multi-Agent Handoff Protocol

**Purpose:** Koordinace práce mezi Claude Code (CLI) a Gemini CLI při vývoji platformy.

---

## 🎯 Agent Roles & Strengths

### Claude Code (Senior Architect & Implementation Lead)

**Silné stránky:**
- ✅ Systematické myšlení, architektura
- ✅ Backend implementation (FastAPI, SQLAlchemy, Alembic)
- ✅ Multi-file refactoring
- ✅ Database migrations
- ✅ Testing & validation
- ✅ Git workflows (commits, branches, PRs)
- ✅ Documentation writing
- ✅ Code review
- ✅ Bug fixing s root cause analysis

**Použít pro:**
- Strukturální změny (database models, API endpoints)
- Složité refaktoringy (multi-file changes)
- Deployment scripting & DevOps
- Test writing
- Architecture decisions (ADRs)
- Security & performance optimization

**Nástroje:**
- Task tool (subagents: Explore, Plan, General)
- MCP servers (filesystem, git, postgres, context7)
- Read/Edit/Write/Bash tools

---

### Gemini CLI (Content & Creative Lead)

**Silné stránky:**
- ✅ Kreativní writing (MDX lessons)
- ✅ Natural language (Czech/English translations)
- ✅ Multimodální vstup (může "vidět" diagramy, screenshots)
- ✅ Rychlý prototyping
- ✅ Brainstorming
- ✅ Marketing copy

**Použít pro:**
- Psaní nových lekcí (content.mdx, content.cs.mdx)
- Vytváření kvízů (quiz.json, quiz.cs.json)
- Czech → English translations (a naopak)
- Návrhy SVG diagramů (může analyzovat visual concepts)
- Marketing materials (About page, landing copy)
- UI text polishing

**Nevhodné pro:**
- ❌ Složité multi-file refaktoringy
- ❌ Database schema changes
- ❌ Backend logic (raději Claude)
- ❌ Git workflows (preferovat Claude)

---

## 🔄 Handoff Process (Step-by-Step)

### 1. **Agent A Dokončí Svou Část**

**Claude dokončí backend:**
```markdown
# Example: Claude implementuje Achievement system

✅ Co jsem udělal:
- Created Achievement model in backend/app/models.py
- Added endpoints: GET /achievements, POST /achievements/{id}/unlock
- Database migration: alembic/versions/xxx_add_achievements.py
- Tests: tests/test_achievements.py

📦 Files Changed:
- backend/app/models.py
- backend/app/routers/achievements.py
- backend/alembic/versions/xxx_add_achievements.py
- backend/tests/test_achievements.py

🔄 HANDOFF TO GEMINI:
- Need frontend UI for achievements page
- See HANDOFF.md for details
```

### 2. **Napsat Handoff Note**

Vytvořit/aktualizovat `.ai-context/state/HANDOFF.md`:

```markdown
# 🔄 Active Handoff

**From:** Claude Code
**To:** Gemini CLI
**Date:** 2025-12-02 15:30
**Context:** Achievement system backend is complete

## What I Did
- Created `Achievement` model with fields: id, title, description, icon, xp_reward, unlock_condition
- Added API endpoints:
  - `GET /achievements` - List all achievements with user unlock status
  - `POST /achievements/{id}/unlock` - Unlock achievement for current user
- Database migration applied
- Tests passing (pytest)

## What You Need To Do

### Task: Create Achievement UI Components

1. **Component: `AchievementCard.tsx`**
   - Location: `frontend/components/AchievementCard.tsx`
   - Props:
     ```typescript
     interface AchievementCardProps {
       id: number;
       title: string;
       description: string;
       icon: string;
       xpReward: number;
       unlocked: boolean;
       progress?: number; // 0-100
     }
     ```
   - Design: Liquid glass theme
     - Unlocked: Purple/red gradient border (light/dark mode)
     - Locked: Grayscale with lock icon overlay
   - Animation: Confetti on unlock (use canvas-confetti)

2. **Page: `/achievements`**
   - Location: `frontend/app/[locale]/achievements/page.tsx`
   - Grid layout: 3 cols (mobile) → 6 cols (desktop)
   - Filter tabs: "All" | "Unlocked" | "Locked"
   - Fetch data from: `GET /achievements`
   - Handle loading/error states

3. **Localization**
   - Add to `frontend/messages/en.json`:
     ```json
     "Achievements": {
       "title": "Achievements",
       "unlocked": "Unlocked",
       "locked": "Locked",
       "progress": "Progress",
       "view_all": "View All Achievements"
     }
     ```
   - Add Czech translations to `frontend/messages/cs.json`

## API Contract

**GET /achievements**
```json
{
  "achievements": [
    {
      "id": 1,
      "title": "First Steps",
      "description": "Complete your first lesson",
      "icon": "🎓",
      "xp_reward": 50,
      "unlocked": true,
      "unlocked_at": "2025-12-01T10:30:00Z",
      "progress": 100
    },
    {
      "id": 2,
      "title": "Knowledge Seeker",
      "description": "Complete 5 lessons",
      "icon": "📚",
      "xp_reward": 100,
      "unlocked": false,
      "progress": 60
    }
  ]
}
```

## Guidelines to Follow
- See `.ai-context/core/CONTENT_GUIDELINES.md` for styling rules
- Use existing patterns from `LessonCard.tsx` and `ProfilePage.tsx`
- Dark mode compatible (ALWAYS test both themes!)
- Responsive design (mobile-first)

## Testing Checklist
- [ ] Component renders correctly in Storybook (if available)
- [ ] Light/Dark mode both work
- [ ] Mobile responsive (test at 375px width)
- [ ] Locked/Unlocked states visually distinct
- [ ] API integration works with real backend
- [ ] Localization works (EN + CZ)

## When Done
1. Test the UI manually (both themes, both languages)
2. Update this file with status: "✅ COMPLETE"
3. List any issues found
4. Commit with message: `feat(gemini): add achievements UI`
5. Handoff back to Claude for review & integration testing
```

### 3. **Switch Agent**

```bash
# Exit Claude Code
exit

# Start Gemini CLI
gemini
```

**První příkaz v Gemini:**
```
Read .ai-context/state/HANDOFF.md and complete the task described
```

### 4. **Agent B Pracuje**

Gemini implementuje UI podle specifikace v HANDOFF.md.

### 5. **Agent B Dokončí & Aktualizuje HANDOFF.md**

```markdown
# 🔄 Active Handoff

**Status:** ✅ COMPLETE
**Completed By:** Gemini CLI
**Date Completed:** 2025-12-02 17:45

## What I Did
- ✅ Created AchievementCard.tsx with unlocked/locked states
- ✅ Created achievements page with grid layout
- ✅ Added filter tabs (All/Unlocked/Locked)
- ✅ Localized strings (EN + CZ)
- ✅ Tested in both light/dark modes
- ✅ Mobile responsive design

## Files Changed
- frontend/components/AchievementCard.tsx (NEW)
- frontend/app/[locale]/achievements/page.tsx (NEW)
- frontend/messages/en.json (UPDATED)
- frontend/messages/cs.json (UPDATED)

## Issues Found
1. ⚠️ Confetti animation is heavy on mobile (consider reducing particles)
2. ℹ️ Progress bar needs better color contrast in light mode

## For Claude to Review
- [ ] Check API integration with real backend data
- [ ] Run `npm run build` to verify no TypeScript errors
- [ ] Test with actual unlock flow (backend endpoint)
- [ ] Verify accessibility (keyboard navigation, screen readers)
- [ ] Performance check (Lighthouse score)

## Git Commit
```bash
git add frontend/components/AchievementCard.tsx frontend/app/[locale]/achievements/page.tsx frontend/messages/
git commit -m "feat(gemini): add achievements UI with unlock animations

- Created AchievementCard component with liquid glass theme
- Implemented achievements page with filtering
- Added EN/CZ localization
- Responsive design with dark mode support

Co-authored-by: Gemini <gemini@google.com>"
```
```

### 6. **Switch Back to Claude**

```bash
# Exit Gemini
exit

# Back to Claude Code
claude
```

**První příkaz:**
```
Read .ai-context/state/HANDOFF.md and review Gemini's work. Run integration tests and merge if passing.
```

### 7. **Claude Reviewuje & Finalizuje**

```bash
# Claude spustí testy
npm run build
docker compose exec backend pytest

# Otestuje UI manuálně (pokud má Browser MCP)
# Nebo požádá uživatele o test

# Pokud vše OK:
git push origin main

# Aktualizuje SESSION_LOG.md
# Archivuje HANDOFF.md → history/completed_cycles/cycle_XX/
```

---

## 📋 Handoff Templates

### Template: Claude → Gemini (Frontend Task)

```markdown
# 🔄 Active Handoff

**From:** Claude Code
**To:** Gemini CLI
**Date:** YYYY-MM-DD HH:MM
**Context:** [Brief context]

## What I Did
- [Backend/API work]
- [Files changed]

## What You Need To Do
- [Frontend component to create]
- [Localization strings to add]
- [Design specs]

## API Contract
[JSON response examples]

## Guidelines
- Follow CONTENT_GUIDELINES.md
- Test both themes
- Mobile responsive

## When Done
- Update HANDOFF.md status
- Commit with `feat(gemini):`
```

### Template: Gemini → Claude (Review Request)

```markdown
# 🔄 Active Handoff

**Status:** ✅ COMPLETE
**Completed By:** Gemini CLI
**Date:** YYYY-MM-DD HH:MM

## What I Did
- [List of completed tasks]

## Files Changed
- [List of files]

## For Claude to Review
- [ ] Integration testing
- [ ] Build verification
- [ ] Performance check
```

---

## 🚨 Emergency Handoff

Pokud agent narazí na blocker a nemůže pokračovat:

```markdown
# 🚨 BLOCKED HANDOFF

**From:** Gemini CLI
**To:** Claude Code
**Date:** YYYY-MM-DD HH:MM
**Status:** 🔴 BLOCKED

## Problem
[Description of blocker]

## What I Tried
- [Attempted solutions]

## Need Help With
- [Specific issue Claude should resolve]

## Context
- [Relevant files, error messages]
```

---

## 📊 Handoff Metrics

Track handoff efficiency:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Handoff Clarity** | 100% | Did agent B understand task without questions? |
| **Completion Time** | <2 hours | Time from handoff to completion |
| **Integration Issues** | 0 | Bugs found during Claude review |
| **Rework Required** | <10% | % of work that needs changes |

---

## ✅ Best Practices

### Do:
- ✅ Write detailed handoff notes (better over-communicate)
- ✅ Include API contracts & examples
- ✅ List all files changed
- ✅ Test before handoff
- ✅ Use git tags: `feat(claude):` vs `feat(gemini):`
- ✅ Update SESSION_LOG.md after each handoff

### Don't:
- ❌ Hand off broken code
- ❌ Skip testing before handoff
- ❌ Assume agent knows context (write it down!)
- ❌ Hand off without clear acceptance criteria
- ❌ Forget to update HANDOFF.md status

---

## 🔄 Continuous Handoffs (Iterative Work)

Pro velké features s opakovanými handoffs:

```
Claude: Backend API → Gemini: UI v1 → Claude: Review →
Gemini: Polish UI → Claude: Performance optimization →
Gemini: Content writing → Claude: Final integration
```

Používat numbered handoffs:
- `HANDOFF.md` → archive as `handoff_01.md`
- New `HANDOFF.md` for next iteration

---

**Maintained by:** Senior Architect (Claude Code)
**Last Updated:** 2025-12-02
**Status:** Active
