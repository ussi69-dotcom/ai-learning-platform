# Working Context

**Last Updated:** 2025-12-11 14:30 (Agent: Claude Code)
**Last Commit:** `bcbf456` fix: navbar profile - horizontal layout with wider XP bar
**Status:** 🟢 READY - Website Audit Complete + Footer Added

---

## 🎯 Current State

### Latest Session (Dec 11, 2025 - Afternoon)

| Task | Status | Notes |
|------|--------|-------|
| Website Comprehensive Audit | ✅ Done | All pages reviewed |
| SystemStatus Hover Button | ✅ Done | Discrete button bottom-left |
| Difficulty Naming Unification | ✅ Done | Bronze/Silver/Gold/Diamond |
| Course ID Hidden | ✅ Done | Removed debug info from cards |
| Czech Translations | ✅ Done | Courses 3 & 4 translated |
| NODE_ENV Build Fix | ✅ Done | Next.js 16 prerender bug |
| Footer Component | ✅ Done | Links, GitHub, Tech Stack |

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
- Unified across homepage hero + course list

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
| Element | Position | Z-Index |
|---------|----------|---------|
| NavBar | `sticky top-0` | `z-50` |
| SystemStatus | `fixed bottom-20 left-4` | `z-40` |
| FeedbackFAB | `fixed bottom-6 right-4` | `z-40` |
| ScrollToTop | `fixed bottom-4 right-4` | varies |

---

## 📋 Course Status

| Course | ID | Status | CS Translation |
|--------|-----|--------|----------------|
| AI Basics for Beginners | 1 | ✅ Active | ✅ Complete |
| Practical Prompt Engineering | 2 | ✅ Active | ✅ Complete |
| AI Engineering Deep Dive | 3 | 🚧 Construction | ✅ Added |
| Advanced AI Techniques | 4 | 🚧 Construction | ✅ Added |

---

## 📋 Next Actions (Low Priority)

1. **Create content for courses 3 & 4** when ready
2. **About page navbar icon** - currently just ℹ️, could add text label
3. **Create missing SVG diagrams** (Optional)

---

## 📝 Mini Session Log (Last 5)

| Date | Agent | What |
|------|-------|------|
| 2025-12-11 | Claude | **Audit + Footer** - SystemStatus hover, naming fix, translations, footer |
| 2025-12-11 | Claude | **NavBar Redesign** - Horizontal profile, responsive, XP bar |
| 2025-12-11 | Claude | **AI Glossary v2** - 120px cubes, scroll reaction, heavy bottom |
| 2025-12-10 | Claude | **XP Level System** - Full difficulty refactor, level-up modal |
| 2025-12-09 | Claude | **Practical PE L01-L05 ALL DONE** - Full Edutainment upgrade |

---

## 🔗 Quick Reference

| Need | Location |
|------|----------|
| Lesson upgrade plans | `.ai-context/LESSON_UPGRADE_GUIDE.md` |
| Edutainment vision | `.ai-context/core/VISION.md` |
| Content guidelines | `.ai-context/core/CONTENT_GUIDELINES.md` |
| Video System docs | `MEMORY.md` → "Video System Architecture" |

---

_This file is the SINGLE SOURCE OF TRUTH for current project state._
_Updated by: Claude Code (2025-12-11 14:30)_
