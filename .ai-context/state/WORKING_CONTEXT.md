# Working Context

**Last Updated:** 2025-12-13 (Agent: Claude)
**Last Commit:** `cf0d646` fix(nav): hash navigation now works with ScrollToTop
**Status:** 🟢 MACP v1.0 Formalized + Workflow v5.2

---

## 🎯 Current State

### Latest Session (Dec 13, 2025 - MACP v1.0)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **Multi-Agent Consensus Protocol**|         |                                               |
| Consult GPT-5.2 on MACP design    | ✅ Done | Resolution ladder, domain-weighted, 0-1 conf  |
| Consult Gemini on MACP design     | ✅ Done | Blind Ballot, Weighted Authority, echo-chamber|
| Synthesize into final protocol    | ✅ Done | Combined best of both approaches              |
| Update AGENT_PROTOCOL.md          | ✅ Done | New "MACP v1.0" section with full spec        |
| Update MEMORY.md                  | ✅ Done | Lessons learned + domain weights table        |
| Update CLAUDE.md                  | ✅ Done | MACP triggers checklist for orchestrator      |

### Previous Session (Dec 13, 2025 - Multi-Agent Workflow v5.1)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **Workflow v5.1 Documentation**   |         |                                               |
| Multi-agent consultation          | ✅ Done | GPT-5.2 + Gemini provided economic analysis   |
| Update AGENT_PROTOCOL.md          | ✅ Done | New v5.1 "Asymmetric Context Segregation"     |
| Update MEMORY.md                  | ✅ Done | Tool matrix, lessons learned                  |
| Update WORKING_CONTEXT.md         | ✅ Done | Current session status                        |
| **GPT-5.2 Onboarding**            |         |                                               |
| Boot Codex with new role          | ✅ Done | GPT-5.2 reviewed workflow, gave feedback      |
| Create CODEX.md                   | ✅ Done | Entry point + Debug Packet templates          |
| Fix inconsistencies               | ✅ Done | >30 min (not >2h), removed "NE orchestrátor"  |
| Update INDEX.md                   | ✅ Done | Added GPT-5.2/Codex row                       |
| Configure Codex profiles + MCP    | ✅ Done | `~/.codex/config.toml`: profiles `fast`/`orchestrator`, MCP: filesystem/git/context7 |

### Previous Session (Dec 13, 2025 - Hash Navigation Fix)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **Hash Navigation Fix**           |         |                                               |
| Debug teaser → about#cycle-XX     | ✅ Done | GPT-5.2 identified ScrollToTop as culprit     |
| Fix ScrollToTop.tsx race condition| ✅ Done | 50ms delay allows hash to be set first        |
| Verify #cycle-35 navigation       | ✅ Done | ABTestTeaser → About page works               |
| Verify #cycle-49 navigation       | ✅ Done | PhysicsOptTeaser → About page works           |

### Previous Session (Dec 13, 2025 - PhysicsOptShowcase)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **PhysicsOptShowcase**            |         |                                               |
| Create showcase component         | ✅ Done | 4-phase animation: Report→Consult→Impl→Results|
| Add 4 agent avatars               | ✅ Done | Claude, Gemini, Perplexity, GPT-5.2           |
| Create homepage teaser            | ✅ Done | PhysicsOptTeaser.tsx with orange/amber theme  |
| EN/CS translations                | ✅ Done | cycle49_*, teaser2_* keys                     |
| Fix .ts → .tsx                    | ✅ Done | JSX syntax requires .tsx extension            |

### Previous Session (Dec 12, 2025 - Multi-Agent v4.0 + PROD Fixes)

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

### Multi-Agent Workflow v5.1 (Dec 2025) - "Asymmetric Context Segregation"

```
┌─────────────────────────────────────────────────────────────────┐
│  GPT-5.2 (Situational Orchestrátor) ←→ Claude (Implementer)     │
│  OpenAI Pro (~$20/mo)                   Claude Code (~$20/mo)   │
│         ↓                                      ↓                │
│  Gemini 3 Pro (Visual QA + Content)    Playwright (local files) │
│  Google AI Plus (2M context!)          Thin output only!        │
│         ↓                                                       │
│  Perplexity MCP        Gemini Deep Research                     │
│  (Quick <5min)         (60-min autonomous)                      │
└─────────────────────────────────────────────────────────────────┘
```

**Situational Orchestration:**
| Situace | Orchestrátor | Implementer |
|---------|--------------|-------------|
| Záhadný bug (>30 min) | **GPT-5.2** | Claude |
| Clear implementation | Claude | Claude |
| Visual QA | Claude | **Gemini** (2M ctx!) |
| Architecture decision | **GPT-5.2** | Claude |

**Context Segregation (KRITICKÉ!):**
- ❌ NIKDY: Playwright snapshoty do chatu (14k+ tokenů!)
- ✅ VŽDY: Cesty k souborům + stručné summary

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
| 2025-12-13 | All 3       | **GPT-5.2 Onboarding** - CODEX.md created, Debug Packet templates, inconsistencies fixed   |
| 2025-12-13 | All 3       | **Workflow v5.1** - "Asymmetric Context Segregation", Gemini=Visual QA, thin protocol      |
| 2025-12-13 | Claude+GPT  | **Hash Nav Fix** - ScrollToTop race condition fixed, teasers→#cycle-XX now work            |
| 2025-12-13 | Claude      | **PhysicsOptShowcase** - Created showcase for About page + Teaser for Homepage              |
| 2025-12-13 | Claude      | **AIGlossary Perf** - useRef+DOM physics: 51.9→60.1 FPS, 86→1 frames >20ms                 |

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
