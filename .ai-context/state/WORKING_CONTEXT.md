# Working Context

**Last Updated:** 2025-12-10 00:30 (Agent: Claude Code)
**Last Commit:** `c9030ef` docs: Update MEMORY.md and artifact with Video System details
**Status:** 🟢 READY - About & Main Page Upgrade Complete

---

## 🎯 Current State

### Edutainment Implementation Progress

| Task                     | Status      | Notes                             |
| ------------------------ | ----------- | --------------------------------- |
| VISION.md update         | ✅ Done     | Edutainment Revolution v3.0       |
| CONTENT_GUIDELINES.md    | ✅ Done     | Edutainment section added         |
| LESSON_UPGRADE_GUIDE.md  | ✅ Done     | Detailed plans for both courses   |
| Video verification       | ✅ Done     | All videos verified               |
| **AI Basics L01-L07**    | ✅ **DONE** | Full Edutainment upgrade complete |
| **Practical PE L01-L05** | ✅ **DONE** | Full Edutainment upgrade complete |

### AI Basics Course Upgrade Summary (ALL 7 LESSONS DONE)

| Lesson                | Video                    | VideoSwitcher             | Hook                                      | Status |
| --------------------- | ------------------------ | ------------------------- | ----------------------------------------- | ------ |
| L01 What is AI?       | `IBe2o-cZncU` ColdFusion | ✅ IBM + CZ               | ✅ "Stop everything. That era is over."   | ✅     |
| L02 How AI Learns     | `aircAruvnKk` 3B1B       | ✅ Backpropagation        | ✅ "A neuron is just a number."           | ✅     |
| L03 LLMs Explained    | `wjZofJX0v4M` 3B1B       | ✅ Brief + Attention      | ✅ "ChatGPT doesn't understand anything." | ✅     |
| L04 Your First Prompt | `p3840QxlYzc` Jeff Su    | ✅ Formula + GenAI        | ✅ "90% of people use AI wrong."          | ✅     |
| L05 The Dark Side     | `cfqtFvWOfg0`            | ✅ Deepfakes + ColdFusion | ✅ "NYC lawyer fake cases"                | ✅     |
| L06 AI at Work        | `JbOJliF-Cn4`            | ✅ Excel + n8n            | ✅ "78% of your day"                      | ✅     |
| L07 Course Summary    | `S7xTBa93TX8`            | ✅ Two Minute Papers      | ✅ "Top 10% AI literacy"                  | ✅     |

### Practical PE Course Upgrade Summary (ALL 4 LESSONS DONE)

| Lesson                | Video                       | VideoSwitcher        | Hook                              | Labs       | Status |
| --------------------- | --------------------------- | -------------------- | --------------------------------- | ---------- | ------ |
| L01 Prompt Arch       | `EWFFaKxsz_s` theMITmonk    | ✅ XML Tags          | ✅ "Structure beats vocabulary"   | 3          | ✅     |
| L02 Red Teaming       | `2OPVViV-GQk` NetworkChuck  | ✅ Simon Willison    | ✅ "$10K question + SQLi analogy" | 4 +Gandalf | ✅     |
| L04 Local Intelligence| `Wjrdr0NU4Sk` NetworkChuck  | ✅ DeepSeek R1       | ✅ "AI Independence"              | 3          | ✅     |
| L05 AI-Powered Dev    | `iO1mwxPNP5A` Fireship      | ✅ MCP Tutorial      | ✅ "46% of code"                  | 3          | ✅     |

### Backend Verification (All Passing)

```
✅ AI Basics Course:
  ✅ What is Artificial Intelligence? (20 min, 3 labs)
  ✅ How Does AI Learn? (20 min, 3 labs)
  ✅ The Mind of the Machine: LLMs (20 min, 3 labs)
  ✅ Talking to AI - Your First Prompt (25 min, 6 labs)
  ✅ The Dark Side: Hallucinations & Bias (20 min, 3 labs)
  ✅ AI at Work: The Enterprise Era (25 min, 3 labs)
  ✅ Course Summary & Next Steps (10 min, 0 labs)

✅ Practical PE Course:
  ✅ Prompt Architecture Masterclass (25 min, 3 labs)
  ✅ Advanced Reasoning & Red Teaming (35 min, 4 labs)
  ✅ Local Intelligence (40 min, 3 labs)
  ✅ AI-Powered Development (45 min, 3 labs)
```

---

## 📋 Recent Session (Dec 10, 2025)

### About & Main Page Upgrade Complete ✅

**Changes Made:**
1. **About Page:**
   - Added Multi-Agent CLI Workflow section (Claude Opus 4.5 + Gemini 3 Pro cards)
   - Added Edutainment Philosophy section (HOOK, Cinematic, Labs pillars)
   - Enhanced Tech Stack with 9 detailed cards (Next.js, Tailwind, FastAPI, PostgreSQL, SQLAlchemy+Alembic, Docker, Redis, Claude, Gemini)
   - Updated timeline to reference Edutainment v3.0

2. **Main Page:**
   - Hero updated with "Multi-Agent CLI Workflow" badge
   - Benefits section redesigned with Edutainment focus
   - 4 primary cards: 30-Second Hooks, Curated Videos, Copy-Paste Labs, Multi-Agent Content
   - 4 secondary compact badges for remaining benefits

3. **Translation Files:**
   - Added ~30 new translation keys to `en.json` and `cs.json`
   - Full Czech localization for all new content

**Files Modified:**
- `frontend/app/[locale]/about/page.tsx`
- `frontend/app/[locale]/page.tsx`
- `frontend/messages/en.json`
- `frontend/messages/cs.json`

---

## 📋 Next Actions (Low Priority)

1. **Create missing SVG diagrams** (Optional)
   - `ai-ml-dl-circles` (priority)
   - `attention-mechanism`
   - `sql-vs-prompt-injection`

2. **Visual QA** - Manual testing in browser to verify all components render correctly

---

## 📝 Mini Session Log (Last 5)

| Date       | Agent  | What                                                         |
| ---------- | ------ | ------------------------------------------------------------ |
| 2025-12-09 | Claude | **Practical PE L01-L05 ALL DONE** - Full Edutainment upgrade |
| 2025-12-09 | Claude | NetworkChuck videos + Gandalf lab added to PE course         |
| 2025-12-09 | Claude | **AI Basics L01-L07 ALL DONE** - Full Edutainment upgrade    |
| 2025-12-09 | Claude | VideoSwitcher + HOOK sections for all lessons                |
| 2025-12-09 | Claude | LESSON_UPGRADE_GUIDE.md created with both courses            |

---

## 🔗 Quick Reference

| Need                   | Location                                               |
| ---------------------- | ------------------------------------------------------ |
| Lesson upgrade plans   | `.ai-context/LESSON_UPGRADE_GUIDE.md`                  |
| Edutainment vision     | `.ai-context/core/VISION.md`                           |
| Content guidelines     | `.ai-context/core/CONTENT_GUIDELINES.md`               |
| Video System docs      | `MEMORY.md` → "Video System Architecture"              |
| AI Basics lessons      | `content/courses/ai-basics-beginner/lessons/`          |
| Practical PE lessons   | `content/courses/practical-prompt-engineering/lessons/`|

---

_This file is the SINGLE SOURCE OF TRUTH for current project state._
_Updated by: Claude Code (2025-12-09 22:45)_
