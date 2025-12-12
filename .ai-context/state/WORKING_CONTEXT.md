# Working Context

**Last Updated:** 2025-12-12 21:50 (Agent: Claude Opus 4.5)
**Last Commit:** `01326d2` fix(news): trailing slash redirects + YouTube RSS + Perplexity real URLs
**Status:** 🟢 PROD DEPLOYED - News feed fully working

---

## 🎯 Current State

### Latest Session (Dec 12, 2025 - PROD Deployment Fixes)

| Task                          | Status  | Notes                                         |
| ----------------------------- | ------- | --------------------------------------------- |
| Trailing Slash 307 Fix        | ✅ Done | `news.py`, `digest.py`: `"/"` → `""`          |
| YouTube RSS Migration         | ✅ Done | No more API quota! 70+ videos via RSS         |
| Perplexity Hallucination Fix  | ✅ Done | Real URLs from citations (TIME, CNBC, etc.)   |
| Frontend API Calls Fix        | ✅ Done | Removed trailing slashes from fetch URLs      |
| CZ Filter Working             | ✅ Done | `/news?lang=cs` returns 29 Czech articles     |

### Previous Session (Dec 12, 2025 - Perplexity Integration)

| Task                          | Status  | Notes                                         |
| ----------------------------- | ------- | --------------------------------------------- |
| Daily Digest Cron Script      | ✅ Done | `backend/scripts/daily_digest_cron.py`        |
| Citation Marker Fix           | ✅ Done | Removed `[1]`, `[2]` from displayed text      |
| Perplexity MCP Server         | ✅ Fixed | `server-perplexity-ask` (official MCP)        |
| Deep Research Workflow Docs   | ✅ Done | Added to AGENT_PROTOCOL.md                    |
| DailySummary Inline Links     | ✅ Done | Simplified component, hover effects           |

### Perplexity Integration Summary

**1. Daily Digest (Automated):**
- Script: `backend/scripts/daily_digest_cron.py`
- Runs via cron at 08:00 CET daily
- Uses Perplexity `sonar` model for AI news aggregation
- Posts to webhook → displays on homepage

**2. Deep Research (Interactive):**
- MCP Server: `perplexity-ask` in `~/.claude.json`
- Tool: `perplexity_ask` (messages-based API)
- Uses official `server-perplexity-ask` from modelcontextprotocol
- **Requires Claude Code restart to activate!**

**3. Shared API Key:**
- Stored in `.env` as `PERPLEXITY_API_KEY`
- Same key used by cron script and MCP server

### MCP Fix (Dec 12, 2025)

| Issue | Resolution |
|-------|------------|
| `@jschuller/perplexity-mcp` had invalid JSON Schema | Replaced with official `server-perplexity-ask` |
| Error: `tools.76.custom.input_schema` invalid | New server has valid schema (no `required: false` in properties) |
| Location | `/home/ussi/agent-orchestration/claude-code-mcp-enhanced/node_modules/server-perplexity-ask/` |

### WSL2 IPv4 Fix (Dec 12, 2025)

| Issue | Resolution |
|-------|------------|
| `fetch failed` / `ETIMEDOUT` on WSL2 | Node.js native `fetch()` has IPv6 issues on WSL2 |
| Root cause | WSL2 has broken IPv6, Node.js tries IPv6 first → timeout |
| **Fix** | Patched MCP server to use `https` module with `family: 4` |
| GitHub repo | **https://github.com/ussi69-dotcom/server-perplexity-ask-wsl2** |
| Local patch | `server-perplexity-ask/dist/index.js` - added `https` + `family: 4` |

⚠️ **Note:** Patch se ztratí při `npm update`. Použij GitHub verzi nebo znovu patchni.

### VPS Deployment Notes

**API klíče potřebné v `.env` na VPS:**
```bash
# Perplexity (pro daily digest cron)
PERPLEXITY_API_KEY=pplx-xxx

# YouTube Data API (pro video metadata)
YOUTUBE_API_KEY=AIza-xxx
```

**Kde je použít:**
- `backend/scripts/daily_digest_cron.py` - volá Perplexity API přímo (curl-style)
- `backend/app/services/news_aggregator.py` - volá YouTube API pro video info

**WSL2 fix NENÍ potřeba na VPS** - VPS je normální Linux bez IPv6 problémů.

### Previous Session (Dec 12, 2025 - News Feed Bug Fixes)

| Task                        | Status  | Notes                                         |
| --------------------------- | ------- | --------------------------------------------- |
| Fix Sentdex Channel ID      | ✅ Done | Wrong ID (K-pop) → Correct ML channel         |
| EN locale language filter   | ✅ Done | EN locale now shows only EN content           |
| HOT endpoint limit increase | ✅ Done | Default 20 items, expanded 50                 |
| Show All button fix         | ✅ Done | Now properly shows more items when expanded   |
| Refresh button verification | ✅ Done | Working correctly, re-fetches news + stats    |

### Previous Session (Dec 12, 2025 - News CZ Filter & UI)

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
- YouTube: 12 channels (Fireship, 3B1B, Yannic Kilcher, StatQuest, Sentdex, NetworkChuck, etc.)
- RSS: OpenAI, HuggingFace, Google AI, TechCrunch, MIT Tech Review
- Hacker News: AI/GPT/LLM tagged stories
- Papers: arXiv cs.AI, cs.LG, cs.CL

### Czech
- YouTube: Tomáš AI, David Strejc
- RSS: AI Novinky, AI Crunch CZ, Kapler o AI, Lupa.cz

### Channel ID Verification
- Sentdex: `UCfzlCWGWYyIQ0aLC5w48gBQ` (Harrison Kinsley - Python ML)
- StatQuest: `UCtYLUTtgS3k1Fg4y5tAhLbw` (Josh Starmer - ML/stats)

---

## 📋 Next Actions (Low Priority)

1. **YouTube API 403 errors** - API quota exceeded or disabled; need to check Google Cloud Console
2. **News title translation** - Consider auto-translating EN titles to CS via API
3. **Create content for courses 3 & 4** when ready

---

## 📝 Mini Session Log (Last 5)

| Date       | Agent       | What                                                                                        |
| ---------- | ----------- | ------------------------------------------------------------------------------------------- |
| 2025-12-12 | Claude      | **Perplexity MCP Fix** - Replaced broken `@jschuller/perplexity-mcp` with official server   |
| 2025-12-12 | Claude      | **News Feed Fixes** - Fixed Sentdex ID, EN lang filter, Show All limit, verified Refresh   |
| 2025-12-12 | Claude      | **News CZ Filter** - Added Czech RSS feeds, CZ filter, Sith color fix, Netflix carousels   |
| 2025-12-12 | Claude      | **Lab Modernization** - Fixed 3 at-risk labs + added Sycophancy Trap lab (EN+CS)            |
| 2025-12-11 | Antigravity | **Violet-Indigo Mix** - Re-aligned all fuchsia elements to Shiny Violet-Indigo as requested |

---

## 🔗 Quick Reference

| Need                 | Location                                  |
| -------------------- | ----------------------------------------- |
| Lesson upgrade plans | `.ai-context/LESSON_UPGRADE_GUIDE.md`     |
| Edutainment vision   | `.ai-context/core/VISION.md`              |
| Content guidelines   | `.ai-context/core/CONTENT_GUIDELINES.md`  |
| Video System docs    | `MEMORY.md` → "Video System Architecture" |
| **Perplexity Setup** | `backend/scripts/README.md`               |
| **Research Workflow**| `AGENT_PROTOCOL.md` → "Research Tools"    |

---

_This file is the SINGLE SOURCE OF TRUTH for current project state._
_Updated by: Claude Opus 4.5 (2025-12-12 16:45)_
