# Working Context

**Last Updated:** 2025-12-12 22:00 (Agent: Claude Opus 4.5)
**Last Commit:** `cc4d75c` feat(agents): upgrade to Multi-Agent Workflow v4.0
**Status:** 🟢 PROD DEPLOYED + Multi-Agent v4.0

---

## 🎯 Current State

### Latest Session (Dec 12, 2025 - Multi-Agent v4.0 + PROD Fixes)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **PROD Deployment Fixes**         |         |                                               |
| Trailing Slash 307 Fix            | ✅ Done | `news.py`, `digest.py`: `"/"` → `""`          |
| YouTube RSS Migration             | ✅ Done | No more API quota! 70+ videos via RSS         |
| Perplexity Hallucination Fix      | ✅ Done | Real URLs from citations (TIME, CNBC, etc.)   |
| Frontend API Calls Fix            | ✅ Done | Removed trailing slashes from fetch URLs      |
| CZ Filter Working                 | ✅ Done | `/news?lang=cs` returns 29 Czech articles     |
| **Multi-Agent v4.0 Integration**  |         |                                               |
| GPT-5.2 Research & Analysis       | ✅ Done | Benchmarks srovnány, role definována          |
| GPT-5.2 Added to AGENT_PROTOCOL   | ✅ Done | Reasoning specialist, NE orchestrátor         |
| Gemini Deep Research Added        | ✅ Done | 60-min autonomous research agent              |
| Agent Routing Matrix Updated      | ✅ Done | Decision tree v MEMORY.md                     |
| gemini_deep_research.py Created   | ✅ Done | `backend/scripts/gemini_deep_research.py`     |

### Multi-Agent Workflow v4.0 (Dec 2025)

```
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATION LAYER                      │
│                                                             │
│  Claude Opus 4.5 (Orchestrator)                             │
│  - Long sessions, CLI, safety, QA gate                      │
│  - Token-efficient (65% less than others)                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┬─────────────┐
        ▼             ▼             ▼             ▼
┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐
│ GPT-5.2   │  │ Gemini    │  │ Gemini    │  │ Perplexity│
│ Thinking  │  │ CLI       │  │ Deep Res. │  │ MCP       │
├───────────┤  ├───────────┤  ├───────────┤  ├───────────┤
│ Hard      │  │ Content   │  │ 60-min    │  │ Quick     │
│ reasoning │  │ generation│  │ research  │  │ research  │
│ Arch.     │  │ Research  │  │ Market    │  │ Facts     │
│ decisions │  │ 2M ctx    │  │ analysis  │  │ Trends    │
└───────────┘  └───────────┘  └───────────┘  └───────────┘
    $10/1M        $5/1M         TBD           $1/1k req
```

**Kdy volat koho:**
- **GPT-5.2**: Architektura, debugging >2h, "second opinion"
- **Gemini CLI**: Content generation, research 5-20 min
- **Gemini Deep Research**: Market research, due diligence 20-60 min
- **Perplexity**: Quick facts, trend check <5 min
- **Claude (já)**: Orchestrace, kódování, QA

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

---

## 📋 Next Actions (Low Priority)

1. **Test Gemini Deep Research** - `python backend/scripts/gemini_deep_research.py "Test"`
2. **News title translation** - Consider auto-translating EN titles to CS via API
3. **Create content for courses 3 & 4** when ready

---

## 📝 Mini Session Log (Last 5)

| Date       | Agent       | What                                                                                        |
| ---------- | ----------- | ------------------------------------------------------------------------------------------- |
| 2025-12-12 | Claude      | **Multi-Agent v4.0** - Added GPT-5.2 + Gemini Deep Research to workflow                    |
| 2025-12-12 | Claude      | **PROD Fixes** - Trailing slash, YouTube RSS, Perplexity real URLs                         |
| 2025-12-12 | Claude      | **Perplexity MCP Fix** - Replaced broken `@jschuller/perplexity-mcp` with official server  |
| 2025-12-12 | Claude      | **News Feed Fixes** - Fixed Sentdex ID, EN lang filter, Show All limit, verified Refresh   |
| 2025-12-12 | Claude      | **News CZ Filter** - Added Czech RSS feeds, CZ filter, Sith color fix, Netflix carousels   |

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
_Updated by: Claude Opus 4.5 (2025-12-12 22:00)_
