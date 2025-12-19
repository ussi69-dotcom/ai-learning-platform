# Working Context

**Last Updated:** 2025-12-19 10:30 (Agent: Claude)
**Last Commit:** `beb9de8` fix(CourseCarousel): improve MS365 badge + fix left edge
**Status:** 🟢 UX Polish Session Complete

---

## 🚨 SURVIVAL RULES (Po komprimaci kontextu - VŽDY zkontroluj!)

| # | Pravidlo | Kontrola |
|---|----------|----------|
| 1 | **THIN PROTOCOL** - žádné dumps do chatu | □ |
| 2 | **Content → Gemini Pro** (`gemini -m gemini-3-pro-preview`) | □ |
| 3 | **Hard bugs → GPT-5.2** (`codex exec -p deep`) | □ |
| 4 | **VERIFY před commit** (`npm run verify`) | □ |
| 5 | **Velké změny → zeptej se uživatele** | □ |

> ⚠️ Po resumption VŽDY přečti celý CLAUDE.md!

---

## ⛔ GEMINI CALL CHECKLIST (POVINNÉ PŘED KAŽDÝM VOLÁNÍM!)

```
┌─────────────────────────────────────────────────────────────┐
│  🛑 STOP! Před voláním Gemini MUSÍŠ zkontrolovat:           │
│                                                             │
│  1. □ JE TO CONTENT TASK?                                   │
│      ANO → gemini -m gemini-3-pro-preview                   │
│      NE  → gemini (bez flagu = Flash)                       │
│                                                             │
│  2. □ SPRÁVNÝ PŘÍKAZ:                                       │
│      Content/Research/QA: gemini -m gemini-3-pro-preview    │
│      Quick tasks:         gemini                            │
│                                                             │
│  3. □ NIKDY NEVOLEJ:                                        │
│      ❌ gemini-2.5-pro                                      │
│      ❌ gemini-2.5-flash                                    │
│      ❌ gemini-exp-*                                        │
│      ❌ jakýkoliv jiný model než výše                       │
│                                                             │
│  POKUD SI NEJSI JISTÝ → ZEPTEJ SE UŽIVATELE                 │
└─────────────────────────────────────────────────────────────┘
```

**Selhání:** 2025-12-18 - Volán špatný model Gemini místo gemini-3-pro-preview

---

## 🖥️ Environment: Hetzner Dedicated Server (NEW!)

| Property | Value |
|----------|-------|
| **Hardware** | AMD EPYC 7401P (24 Cores), NVMe Storage |
| **OS** | Ubuntu 24.04 LTS (bare metal) |
| **User** | `deploy` |
| **Working Dir** | `/home/deploy/ai-learning-platform` |
| **Network** | Zero Trust (UFW + Cloudflare Tunnel) |

### Installed Toolchain

| Tool | Version | Status |
|------|---------|--------|
| Node.js | v20.19.6 (via NVM) | ✅ |
| npm | 10.8.2 | ✅ |
| Docker | 29.1.3 | ✅ |
| Python | 3.11 | ✅ | (Docker + CI aligned)
| Gemini CLI | 0.20.2 | ✅ |
| Codex CLI | 0.72.0 | ✅ |

### MCP Servers

| Server | Package | Status |
|--------|---------|--------|
| Playwright | `@playwright/mcp` | ✅ Connected |
| Context7 | `@upstash/context7-mcp` | ✅ Connected |
| Perplexity | `@modelcontextprotocol/server-perplexity-ask` | ✅ (API key set) |
| YouTube Data | `dannySubsense/youtube-mcp-server` | ✅ Installed (14 funkcí) |

**YouTube MCP capabilities:** playlist items, video details, search, transcripts, channel videos, engagement analysis

### Docker Services

| Container | Port | Status |
|-----------|------|--------|
| ai-frontend | 3000 | ✅ Running |
| ai-backend | 8000 | ✅ Running |
| ai-db | 5432 | ✅ Running |
| ai-redis | 6379 | ✅ Running |
| ai-n8n | 5678 | ✅ Running |

---

## 🎯 Current State

### Latest Session (Dec 19, 2025 - UX Polish + Security)

| Task | Status | Notes |
|------|--------|-------|
| **P0-P3 RECOMMENDATIONS** | | |
| Rate limiter IP detection | ✅ Done | `get_real_ip()` for Cloudflare/nginx proxy |
| Admin password block | ✅ Done | Rejects "admin123" in production |
| Sandbox security hardening | ✅ Done | read_only, no-new-privileges, cap_drop |
| Content sync dry-run | ✅ Done | `dry_run=True` parameter |
| Remove auto-create tables | ✅ Done | Rely on Alembic only |
| Slug-based identity | ✅ Done | Upsert by slug, not title |
| i18n hardcoded strings | ✅ Done | AIGlossary, CourseCarousel → next-intl |
| AIGlossary physics opt | ✅ Done | rAF stops when cubes sleeping |
| JediSithToggle a11y | ✅ Done | ARIA role/aria-checked/aria-label |
| Error boundary | ✅ Done | `frontend/app/error.tsx` |
| TypeScript any types | ✅ Done | `i18n/request.ts` proper interfaces |
| **FeedbackFAB Mobile UX** | | |
| Reduce touch target | ✅ Done | pointer-events-none on container |
| Simple Bug icon | ✅ Done | Replaced SplitBugEyeIcon with lucide Bug |
| Larger icon on mobile | ✅ Done | 36×36px icon in 44×44px button |
| Auto-hide after 2s | ✅ Done | Shows on scroll/touch, fades after inactivity |
| **Course Sections Split** | | |
| AI Learning Path section | ✅ Done | 4 core difficulty-based courses |
| MS 365 Productivity section | ✅ Done | Copilot course with special badge |
| MS365 badge styling | ✅ Done | Orange text, dark bg, works in Sith mode |
| Remove fade on single course | ✅ Done | No left/right fades for 1-course carousel |

### Commits This Session

| Hash | Message |
|------|---------|
| `3c9bbde` | feat: implement P0 + P1 security and architecture improvements |
| `0e0adcd` | feat: implement P2 + P3 performance and quality improvements |
| `e8310c6` | fix(FeedbackFAB): reduce touch target on mobile |
| `9d4d02c` | fix(FeedbackFAB): use simple Bug icon for clarity |
| `1fb27e3` | fix(FeedbackFAB): larger icon + lower position on mobile |
| `27fe11d` | fix(FeedbackFAB): much larger button and icon on mobile |
| `425e2d3` | fix(FeedbackFAB): tighter button around icon on mobile |
| `3cb86c7` | feat(FeedbackFAB): auto-hide on mobile after 2s inactivity |
| `3c81620` | feat: separate AI Learning Path from MS 365 Productivity courses |
| `beb9de8` | fix(CourseCarousel): improve MS365 badge + fix left edge |

### Previous Session (Dec 15, 2025 - Hetzner Migration)

| Task | Status | Notes |
|------|--------|-------|
| **Environment Setup** | | |
| Node.js upgrade (v18→v20) | ✅ Done | Via NVM |
| Gemini CLI install | ✅ Done | `@google/gemini-cli` v0.20.2 |
| Codex CLI install | ✅ Done | `@openai/codex` v0.72.0 |
| MCP servers config | ✅ Done | Playwright, Context7, Perplexity |
| Docker stack start | ✅ Done | All 5 containers healthy |
| .env creation | ✅ Done | Secure keys generated |

### Previous Session (Dec 14, 2025 - Star Wars Ship Images)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **Sith (Dark) Theme Ships**       |         |                                               |
| AI Basics → TIE Fighter           | ✅ Done | `ai-basics-course-cover_dark.png`             |
| Prompt Eng → Slave I              | ✅ Done | `practical-prompt-engineering_dark.png`       |
| Advanced AI → Star Destroyer      | ✅ Done | `advanced-ai-techniques_dark.png`             |
| AI Engineering → Death Star       | ✅ Done | `ai-engineering-deep-dive_dark.png`           |
| **Jedi (Light) Theme Ships**      |         |                                               |
| AI Basics → X-Wing                | ✅ Done | `ai-basics-course-cover_light.png`            |
| Prompt Eng → Y-Wing               | ✅ Done | `practical-prompt-engineering_light.png`      |
| Advanced AI → Falcon              | ✅ Done | `advanced-ai-techniques_light.png`            |
| AI Engineering → Venator          | ✅ Done | `ai-engineering-deep-dive_light.png`          |
| **Technical**                     |         |                                               |
| CourseIcon.tsx theme switching    | ✅ Done | `_dark.png` / `_light.png` suffix logic       |
| Source ships preserved            | ✅ Done | `frontend/public/images/ships/` folder        |
| Visual QA via Playwright          | ✅ Done | Screenshot verified correct mapping           |

### Ship → Difficulty Mapping (by visual order)

| Position | Course             | Difficulty     | Jedi Ship   | Sith Ship      |
|----------|--------------------|----------------|-------------|----------------|
| 1st      | AI Basics          | Piece of Cake  | X-Wing      | TIE Fighter    |
| 2nd      | Prompt Engineering | Let's Rock     | Y-Wing      | Slave I        |
| 3rd      | Advanced AI        | Come Get Some  | Falcon      | Star Destroyer |
| 4th      | AI Engineering     | Damn I'm Good  | Venator     | Death Star     |

### Previous Session (Dec 14, 2025 - Security Hardening + GPT-5.2 Review)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **GPT-5.2 Platform Review**       |         |                                               |
| Codex CLI debugging               | ✅ Done | `codex exec` for non-interactive mode         |
| Fine-Tuning Coming Soon banner    | ✅ Done | EN + CS content with preview                  |
| Comprehensive platform review     | ✅ Done | Architecture, content, security, debt         |
| All lessons review                | ✅ Done | 18 lessons scored, hooks + labs + quizzes     |
| Save findings to reports          | ✅ Done | `.ai-context/reports/GPT5.2_PLATFORM_REVIEW_2025_12_14.md` |
| **Security Hardening**            |         |                                               |
| Docker socket warning             | ✅ Done | Comment explaining dev-only risk              |
| JWT SECRET_KEY validation         | ✅ Done | Rejects 'changeme' in production              |
| .env.prod.example update          | ✅ Done | Added ENVIRONMENT=production                  |
| **Commits**                       |         |                                               |
| `c114ac7` Fine-Tuning banner      | ✅ Push | + Codex lesson learned                        |
| `2d2931b` CLAUDE.md Codex update  | ✅ Push | `codex exec` instructions                     |
| `27677d9` Security hardening      | ✅ Push | JWT validation + Docker warning               |

### GPT-5.2 Key Findings (Dec 14, 2025)

**Security Red Flags Fixed:**
- ✅ Docker socket → Added warning comment (prod doesn't have it)
- ✅ JWT secret → Added validation (rejects 'changeme' in prod)
- ⏳ localStorage tokens → Future (move to httpOnly cookies)

**Content Gaps Identified:**
- Fine-Tuning lesson (stub) - needs full content
- No capstone projects
- No evaluation track

**2025 Feature Ideas:**
- Agent Flight Simulator
- Adaptive Learning Path
- Autograded Labs

### Previous Session (Dec 13, 2025 - Boot Checklist v4.0)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| **CLAUDE.md Redesign**            |         |                                               |
| Consult Gemini on design          | ✅ Done | Sebe-verifikace, Boot Checklist               |
| Consult GPT-5.2 on design         | ✅ Done | Instrukční kolize, robustní struktura         |
| Implement Boot Checklist v4.0     | ✅ Done | 5-step checklist, inline CRITICAL_RULES       |
| Podmíněné Loading table           | ✅ Done | Context-specific file loading                 |
| **Chrome DevTools MCP**           |         |                                               |
| Add chrome-devtools MCP           | ✅ Done | `claude mcp add chrome-devtools`              |
| Test Chrome DevTools              | ❌ Fail | `Target closed` error v WSL                   |
| Remove Chrome DevTools            | ✅ Done | Puppeteer nemůže spustit Chrome v WSL         |
| Keep Playwright                   | ✅ Done | Funguje, kompaktní output když správně použit |
| **Commits**                       |         |                                               |
| `78af17a` Boot Checklist v4.0     | ✅ Push | -90 lines, inline critical rules              |

### Previous Session (Dec 13, 2025 - YouTube & Digest Fixes)

| Task                              | Status  | Notes                                         |
| --------------------------------- | ------- | --------------------------------------------- |
| YouTube channels fix              | ✅ Done | Matt Wolfe, Wes Roth, TheAIGRID added         |
| CZ translation fix                | ✅ Done | translate_to_czech() in daily_digest_cron.py  |
| ACTION CHECKPOINT docs            | ✅ Done | CLAUDE.md + MEMORY.md                         |

### Previous Session (Dec 13, 2025 - MACP v1.0)

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
- YouTube: 15 channels (Fireship, 3B1B, Yannic Kilcher, Matt Wolfe, Wes Roth, TheAIGRID, etc.)
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
| 2025-12-19 | Claude      | **UX Polish** - FeedbackFAB mobile (auto-hide, bigger icon), Course sections (AI Path + MS365), P0-P3 RECOMMENDATIONS implemented |
| 2025-12-19 | Claude+MACP | **L05 Restructure + L07 Creation** - 35min/2labs foundations, L07 Antigravity 25min/2labs, 6 new diagrams, MACP P0 improvements |
| 2025-12-18 | Claude      | **Claude Code Mastery v2.0** - EN+CS beginner-friendly, WSL+terminal, Lab 0, 60min/4labs, GEMINI CHECKLIST added |
| 2025-12-18 | Claude      | **YouTube MCP + MACP Cleanup** - Added YouTube transcript MCP, completed rate limit decision |
| 2025-12-18 | Claude+GPT  | **P0-P2 Workflow Fixes** - GEMINI.md, MCP paths, secrets rule, pip-audit, MACP runner, metrics |

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
