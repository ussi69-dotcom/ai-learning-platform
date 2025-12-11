# Working Context

**Last Updated:** 2025-12-12 00:30 (Agent: Claude Opus 4.5)
**Last Commit:** `66855d6` feat(ui): unify Jedi theme to Shiny Violet-Indigo mix
**Status:** 🟢 READY - Lab Modernization Complete

---

## 🎯 Current State

### Latest Session (Dec 12, 2025 - Lab Modernization)

| Task                          | Status  | Notes                                   |
| ----------------------------- | ------- | --------------------------------------- |
| Lab Analysis                  | ✅ Done | 34 labs reviewed, 3 at-risk identified  |
| Gemini Research               | ✅ Done | 2025 AI limitations researched          |
| ChatGPT Browser Testing       | ✅ Done | Plenum wrench + sycophancy tested       |
| lab-rag-reality Fix (EN+CS)   | ✅ Done | FIFA 2026 → Knowledge boundaries        |
| lab-hallucination-trap Fix    | ✅ Done | Harry Potter → Plenum wrench            |
| lab-tokenizer-view Fix        | ✅ Done | AI guess → Official tool link           |
| New Sycophancy Trap Lab       | ✅ Done | Churchill/radar test (EN+CS)            |
| Backend QA                    | ✅ Done | 4 labs detected in Dark Side lesson     |

### Previous Session (Dec 11, 2025 - UI/UX)

| Task                          | Status  | Notes                         |
| ----------------------------- | ------- | ----------------------------- |
| Website Comprehensive Audit   | ✅ Done | All pages reviewed            |
| SystemStatus Hover Button     | ✅ Done | Discrete button bottom-left   |
| Difficulty Naming Unification | ✅ Done | Bronze/Silver/Gold/Diamond    |
| Course ID Hidden              | ✅ Done | Removed debug info from cards |
| Czech Translations            | ✅ Done | Courses 3 & 4 translated      |
| NODE_ENV Build Fix            | ✅ Done | Next.js 16 prerender bug      |
| Footer Component              | ✅ Done | Links, GitHub, Tech Stack     |

### Key Changes

**Footer (`frontend/components/Footer.tsx`):**

- Brand + description
- Links: O projektu, GitHub, Kontakt
- Tech Stack badges: Next.js 16, FastAPI, Claude Opus, Gemini 3
- Copyright + "Vytvořeno s ❤️ lidmi & AI"
- `pb-20` padding to avoid FAB overlap

**SystemStatus (`frontend/components/SystemStatus.tsx`):**

- Converted from inline bar to hover button
- Fixed position `bottom-20 left-4`
- Green dot (collapsed) → expands on hover showing PostgreSQL, Redis, version

**Naming Consistency:**

- User rank: "Tvoje hodnost: Bronz/Stříbro/Zlato/Diamant" (XP-based)
- Course difficulty: Duke Nukem style (Piece of Cake, Let's Rock, etc.)

**Color Scheme Unification:**

- Replaced generic purple with **AI Edutainment Gradeint** (`purple-600` via `fuchsia-500` to `purple-700`)
- Standardized buttons, gradients, and hover states
- Applied to: Hero, NavBar, Footer, ABTestShowcase, VideoPlayer

**Sith Dark Mode (Lightsaber Red):**

- Replaced mixed red/orange dark mode with pure **Sith Red** palette.
- Used `red-600` (base), `red-900` (depth), `red-500` (glow/text).
- Added `drop-shadow` and `box-shadow` for lightsaber glow effect.
- **Strict Mode:** Updated `JediSithToggle`, `AvatarSelector`, and Icons to strictly use Red (removed Orange).

**Jedi Violet Mode:**

- Replaced generic `purple`/`fuchsia` with **Shiny Violet-Indigo** (`violet-600` / `indigo-600`).
- Unified Text, Gradients, and Borders to match the "Resume Learning" button style.
- Applied to **All Pages** (Home, About, Nav, Footer, Avatars).

**Build Fix:**

- `package.json`: `"build": "NODE_ENV=production next build"`
- Fixes Next.js 16 + React 19 prerender bug
- Removed problematic `global-error.tsx`

**Translations Added:**

- `content/courses/advanced-ai-techniques/meta.json` → title_cs, description_cs
- `content/courses/ai-engineering-deep-dive/meta.json` → title_cs, description_cs

---

## 🎨 UI Components Summary

### Physics/Animation

- **AI Glossary Cubes:** `framer-motion` (already installed, no new deps)
- 12 bouncing ice cubes with physics simulation
- requestAnimationFrame loop for smooth animations

### Fixed Position Elements

| Element      | Position                 | Z-Index |
| ------------ | ------------------------ | ------- |
| NavBar       | `sticky top-0`           | `z-50`  |
| SystemStatus | `fixed bottom-20 left-4` | `z-40`  |
| FeedbackFAB  | `fixed bottom-6 right-4` | `z-40`  |
| ScrollToTop  | `fixed bottom-4 right-4` | varies  |

---

## 📋 Course Status

| Course                       | ID  | Status          | CS Translation |
| ---------------------------- | --- | --------------- | -------------- |
| AI Basics for Beginners      | 1   | ✅ Active       | ✅ Complete    |
| Practical Prompt Engineering | 2   | ✅ Active       | ✅ Complete    |
| AI Engineering Deep Dive     | 3   | 🚧 Construction | ✅ Added       |
| Advanced AI Techniques       | 4   | 🚧 Construction | ✅ Added       |

---

## 📋 Next Actions (Low Priority)

1. **Create content for courses 3 & 4** when ready
2. **About page navbar icon** - currently just ℹ️, could add text label
3. **Create missing SVG diagrams** (Optional)

---

## 📝 Mini Session Log (Last 5)

| Date       | Agent       | What                                                                                        |
| ---------- | ----------- | ------------------------------------------------------------------------------------------- |
| 2025-12-12 | Claude      | **Lab Modernization** - Fixed 3 at-risk labs + added Sycophancy Trap lab (EN+CS)            |
| 2025-12-11 | Antigravity | **Violet-Indigo Mix** - Re-aligned all fuchsia elements to Shiny Violet-Indigo as requested |
| 2025-12-11 | Antigravity | **Jedi Violet (About)** - Extended Jedi Violet theme to About Page                          |
| 2025-12-11 | Antigravity | **Sith Strict Mode** - Removed Orange traces from Avatars, Toggles, and Icons               |
| 2025-12-11 | Claude      | **Audit + Footer** - SystemStatus hover, naming fix, translations, footer                   |

---

## 🔗 Quick Reference

| Need                 | Location                                  |
| -------------------- | ----------------------------------------- |
| Lesson upgrade plans | `.ai-context/LESSON_UPGRADE_GUIDE.md`     |
| Edutainment vision   | `.ai-context/core/VISION.md`              |
| Content guidelines   | `.ai-context/core/CONTENT_GUIDELINES.md`  |
| Video System docs    | `MEMORY.md` → "Video System Architecture" |

---

_This file is the SINGLE SOURCE OF TRUTH for current project state._
_Updated by: Claude Code (2025-12-11 14:30)_
