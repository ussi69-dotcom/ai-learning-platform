# Working Context

**Last Updated:** 2025-12-12 01:00 (Agent: Claude Opus 4.5)
**Last Commit:** `bc1e0fa` feat(news): add CZ locale filter and Czech RSS sources
**Status:** 🟢 READY - News CZ Filter Complete

---

## 🎯 Current State

### Latest Session (Dec 12, 2025 - News CZ Filter & UI)

| Task                        | Status  | Notes                                         |
| --------------------------- | ------- | --------------------------------------------- |
| Remove ABTestShowcase       | ✅ Done | Kept only on About page                       |
| Netflix Carousel for News   | ✅ Done | Horizontal scroll, Show All expand            |
| Netflix Carousel for Courses| ✅ Done | New CourseCarousel component                  |
| Sith Mode Color Fix         | ✅ Done | Purple/violet → Red in dark mode              |
| CZ RSS Sources Research     | ✅ Done | AI Novinky, AI Crunch CZ, Kapler o AI         |
| Add Language Field to DB    | ✅ Done | Migration + language filtering                |
| CZ Filter Button            | ✅ Done | Shows 🇨🇿 Česky only in CS locale             |
| DateTime TZ Fix             | ✅ Done | Fixed offset-naive vs aware comparison        |

### Previous Session (Dec 12, 2025 - Lab Modernization)

| Task                          | Status  | Notes                                   |
| ----------------------------- | ------- | --------------------------------------- |
| Lab Analysis                  | ✅ Done | 34 labs reviewed, 3 at-risk identified  |
| ChatGPT Browser Testing       | ✅ Done | Plenum wrench + sycophancy tested       |
| lab-rag-reality Fix (EN+CS)   | ✅ Done | FIFA 2026 → Knowledge boundaries        |
| lab-hallucination-trap Fix    | ✅ Done | Harry Potter → Plenum wrench            |
| lab-tokenizer-view Fix        | ✅ Done | AI guess → Official tool link           |
| New Sycophancy Trap Lab       | ✅ Done | Churchill/radar test (EN+CS)            |

### Key Changes

**News Feed (`frontend/components/NewsFeed.tsx`):**
- Netflix-style horizontal carousel with scroll buttons
- "Show All" expand/collapse functionality
- CZ filter support via `?lang=cs` API parameter
- Stats include `cs_total` for Czech content count

**News Filter (`frontend/components/NewsFilter.tsx`):**
- Added CZ filter (🇨🇿 Česky) visible only in Czech locale
- Shows count of Czech articles (17 at time of testing)

**Course Carousel (`frontend/components/CourseCarousel.tsx`):**
- New component with Netflix-style horizontal scroll
- "Doporučeno" badge for recommended courses
- "Ve výstavbě" overlay for under-construction courses

**Backend News Aggregator:**
- Added Czech RSS feeds: AI Novinky, AI Crunch CZ, Kapler o AI
- Language field (`en`/`cs`) in NewsItem model
- Migration: `28c8f428443e_add_language_column_to_news_items.py`
- Fixed datetime timezone comparison bug

**Sith Mode Color Fix:**
- All violet/purple colors in dark mode → red
- Affected: NewsCard, NewsFeed, NewsFilter, CourseCarousel

---

## 🎨 Theme Colors

### Jedi (Light Mode)
- Primary: `violet-600` / `indigo-600` gradient
- Text: `text-violet-600`
- Borders: `border-violet-500/30`

### Sith (Dark Mode)
- Primary: `red-600` / `red-700` gradient
- Text: `dark:text-red-400`
- Borders: `dark:border-red-500/30`

---

## 📡 News Sources

### English
- YouTube: 10 channels (Fireship, 3B1B, Yannic Kilcher, etc.)
- RSS: OpenAI, HuggingFace, Google AI, TechCrunch, MIT Tech Review
- Hacker News: AI/GPT/LLM tagged stories
- Papers: arXiv cs.AI, cs.LG, cs.CL

### Czech (New)
- AI Novinky (ainovinky.cz)
- AI Crunch CZ (aicrunch.cz)
- Kapler o AI (kapler.cz)

---

## 📋 Next Actions (Low Priority)

1. **Add Czech YouTube channels** - Need to verify channel IDs for @tomas-ai-cz, @bartosmarek, @davidstrejc
2. **News title translation** - Consider auto-translating EN titles to CS via API
3. **Create content for courses 3 & 4** when ready

---

## 📝 Mini Session Log (Last 5)

| Date       | Agent       | What                                                                                        |
| ---------- | ----------- | ------------------------------------------------------------------------------------------- |
| 2025-12-12 | Claude      | **News CZ Filter** - Added Czech RSS feeds, CZ filter, Sith color fix, Netflix carousels   |
| 2025-12-12 | Claude      | **Lab Modernization** - Fixed 3 at-risk labs + added Sycophancy Trap lab (EN+CS)            |
| 2025-12-11 | Antigravity | **Violet-Indigo Mix** - Re-aligned all fuchsia elements to Shiny Violet-Indigo as requested |
| 2025-12-11 | Antigravity | **Jedi Violet (About)** - Extended Jedi Violet theme to About Page                          |
| 2025-12-11 | Antigravity | **Sith Strict Mode** - Removed Orange traces from Avatars, Toggles, and Icons               |

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
_Updated by: Claude Opus 4.5 (2025-12-12 01:00)_
