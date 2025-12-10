# Working Context

**Last Updated:** 2025-12-10 22:30 (Agent: Claude Code)
**Last Commit:** `7f44f73` chore: update page title and description
**Status:** 🟢 READY - XP Level System + UI Updates Complete

---

## 🎯 Current State

### Latest Session (Dec 10, 2025 - Evening)

| Task | Status | Commit |
|------|--------|--------|
| XP-Based Level System | ✅ Done | `3cfb14a` |
| Content Loader Orphan Cleanup | ✅ Done | `ba46cb1` |
| Under Construction Banner (courses 3&4) | ✅ Done | `85794eb` |
| Page Title (AI Edutainment) | ✅ Done | `7f44f73` |
| Pre-commit Hook (Docker) | ✅ Done | `3cfb14a` |

### XP-Based Level System Summary

**Backend Changes:**
- XP thresholds: 0/500/2000/5000 for PIECE_OF_CAKE → LETS_ROCK → COME_GET_SOME → DAMN_IM_GOOD
- New computed fields: `calculated_level`, `next_level_xp`, `xp_for_current_level`
- `/courses/` returns ALL courses (no difficulty filtering)
- Default difficulty: PIECE_OF_CAKE

**Frontend Changes:**
- Registration: Removed difficulty selector (auto PIECE_OF_CAKE)
- Homepage: "Recommended" badge (⭐) for courses matching user's XP level
- Homepage: "Under Construction" overlay on courses 3 & 4 (animated robot 🤖)
- Profile: Read-only level display with XP progress bar
- Level-up: Celebration modal with confetti animation
- Page title: "AI Edutainment | Learn AI by Doing"

**Files Modified:**
- `backend/app/models.py` - XP thresholds, calculate_level_from_xp()
- `backend/app/schemas.py` - computed fields
- `backend/app/routers/lessons.py` - return all courses
- `backend/app/services/content_loader.py` - orphan cleanup
- `frontend/context/AuthContext.tsx` - level-up detection
- `frontend/components/LevelUpModal.tsx` - NEW
- `frontend/components/LevelUpProvider.tsx` - NEW
- `frontend/app/[locale]/layout.tsx` - LevelUpProvider + metadata
- `frontend/app/[locale]/page.tsx` - Recommended badge + Under Construction
- `frontend/app/[locale]/profile/page.tsx` - read-only level
- `frontend/app/[locale]/register/page.tsx` - removed difficulty
- `frontend/app/global-error.tsx` - NEW (Next.js 16 fix)
- `.husky/pre-commit` - Docker typecheck

---

## 📋 Course Status

### Active Courses (Edutainment v3.0 Complete)

| Course | ID | Status | Notes |
|--------|-----|--------|-------|
| AI Basics for Beginners | 1 | ✅ Active | 7 lessons, PIECE_OF_CAKE |
| Practical Prompt Engineering | 2 | ✅ Active | 4 lessons, LETS_ROCK |
| AI Engineering Deep Dive | 3 | 🚧 Construction | Placeholder, DAMN_IM_GOOD |
| Advanced AI Techniques | 4 | 🚧 Construction | Placeholder, COME_GET_SOME |

### Orphaned Content Cleanup
- Deleted: `01-patterns`, `02-context` (old placeholder lessons)
- content_loader now auto-cleans orphans on seed

---

## 📋 Next Actions (Low Priority)

1. **Create content for courses 3 & 4** when ready
2. **Create missing SVG diagrams** (Optional)
   - `ai-ml-dl-circles`
   - `attention-mechanism`
   - `sql-vs-prompt-injection`

---

## 📝 Mini Session Log (Last 5)

| Date | Agent | What |
|------|-------|------|
| 2025-12-10 | Claude | **XP Level System** - Full difficulty refactor, level-up modal |
| 2025-12-10 | Claude | **UI Updates** - Under Construction banner, page title |
| 2025-12-10 | Claude | **UX Polish** - About button pulsing AI icon, FeedbackFAB unified |
| 2025-12-09 | Claude | **Practical PE L01-L05 ALL DONE** - Full Edutainment upgrade |
| 2025-12-09 | Claude | **AI Basics L01-L07 ALL DONE** - Full Edutainment upgrade |

---

## 🔗 Quick Reference

| Need | Location |
|------|----------|
| Lesson upgrade plans | `.ai-context/LESSON_UPGRADE_GUIDE.md` |
| Edutainment vision | `.ai-context/core/VISION.md` |
| Content guidelines | `.ai-context/core/CONTENT_GUIDELINES.md` |
| Video System docs | `MEMORY.md` → "Video System Architecture" |
| AI Basics lessons | `content/courses/ai-basics-beginner/lessons/` |
| Practical PE lessons | `content/courses/practical-prompt-engineering/lessons/` |

---

_This file is the SINGLE SOURCE OF TRUTH for current project state._
_Updated by: Claude Code (2025-12-10 22:30)_
