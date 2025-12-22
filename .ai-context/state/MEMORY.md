# 🧠 Unified Agent Memory

**This file is the Single Source of Truth for all agents (Claude Code primary implementer, Gemini via CLI, GPT‑5.2 via Codex).**
Read this first to understand the environment, preferences, and active protocols.

---

## 🚨 WORKFLOW v5.1 (Active since 2025-12-13)

### "Asymmetric Context Segregation" Model

```
┌─────────────────────────────────────────────────────────────────┐
│  GPT-5.2 (Orchestrátor) ←→ Claude (Implementer)                 │
│         ↓                         ↓                             │
│  Gemini 3 Pro (Visual QA)    Playwright (local files)           │
│  Perplexity (Quick Research)  Gemini Deep (60min Research)      │
└─────────────────────────────────────────────────────────────────┘
```

### Role Assignment v5.1

| Agent | Primární Role | Context | Kdy použít |
|-------|---------------|---------|------------|
| **GPT-5.2** | Orchestrátor + Hard Reasoning | ~128k | Debugging, architecture, root cause |
| **Claude Code** | Implementer + Git + Daily Ops | ~200k | Coding, QA, file ops |
| **Gemini 3 Pro** | Visual QA + Content | **2M** | Screenshots (100+!), content gen |
| **Perplexity** | Quick Research | N/A | Facts <5 min |
| **Gemini Deep Research** | Autonomous Research | N/A | 20-60 min deep analysis |

### Escalation Rules

```
ESKALUJ na GPT-5.2 když:
□ 2+ failed attempts na bug
□ Pattern-based řešení nefungují
□ >30 min stuck bez root cause
□ Architektura s trade-offs
```

### Economic Model (~$40/měsíc fixed)

| Service | Náklad | Typ |
|---------|--------|-----|
| Claude Code | ~$20 | Fixed (unlimited) |
| OpenAI Pro | ~$20 | Fixed (GPT-5.2) |
| Google AI Plus | Included | Fixed (Gemini 3 + Deep Research) |

**Full protocol:** See `.ai-context/AGENT_PROTOCOL.md`

---

## 🖥️ Environment Context

- **OS:** Ubuntu 24.04 LTS (Hetzner Dedicated - AMD EPYC 24C, NVMe)
- **Node.js:** v20.19.6 (via NVM)
- **Stack:** Next.js 16.0.7, React 19.2.1, FastAPI, PostgreSQL 15, Redis 7, Docker Compose.
- **Agent Mode:** Claude Code primary, Gemini CLI for content/visual QA, GPT‑5.2 via Codex CLI for hard reasoning
- **MCP Tools:** Playwright (`@playwright/mcp`), Context7 (`@upstash/context7-mcp`), Perplexity
- **Network:** Zero Trust (UFW + Cloudflare Tunnel) - bind ports to `127.0.0.1:PORT`

### Dev Access Note (as of 2025-12-20)

- User reports frontend "Failed to connect to backend" from Cloudflare dev access. Check `NEXT_PUBLIC_API_URL` inside the frontend container (may be stale, e.g., `http://localhost:8000`) and restart if needed.
- **CLI usage:** Call **Gemini and Claude via bash** (heredoc/pipe workflow).
- **Change safety:** Do not adjust `.env` or restart containers unless explicitly asked; avoid breaking dev access.
- **Visual QA login:** User explicitly wants normal login for visual checks. Use admin creds from `.env` (e.g., `FIRST_SUPERUSER`/`FIRST_SUPERUSER_PASSWORD`), never print them. Do not skip auth. Prefer local `http://localhost:3000` or QA frontend `http://localhost:3001` if Cloudflare access is flaky.
- **QA frontend (local only):** `docker compose -f docker-compose.yml -f docker-compose.qa.yml up -d frontend-qa`, then use `http://localhost:3001` for Playwright/Gemini QA.
- **Playwright auth tests:** Load admin credentials from `.env` (`FIRST_SUPERUSER`/`FIRST_SUPERUSER_PASSWORD`), avoid hardcoded credentials and never log them.

### Subagent Orchestration Standard (Always On) v2.0

**Core Principle:** Give each subagent the content + research it needs. Orchestrate them. Tell them NOT to report back. Check their work instead.

**Workflow:**
1. **Prepare context** - Gather all needed content + research before spawning subagent
2. **Spawn with full brief** - Include task, context, constraints, expected output format
3. **Instruct: "Draft only, do not report"** - Subagent writes to file, does not surface to user
4. **Check work** - You review output before applying or reporting
5. **Parallelize** - Run independent subagent tasks concurrently

**Subagent Types:**
| Agent | Use For | Command |
|-------|---------|---------|
| Gemini CLI | Content generation, Visual QA | `gemini -m gemini-3-pro-preview` |
| Codex CLI | Planning, Hard reasoning | `codex exec -p orchestrator` |
| Claude Subagent | Code exploration, Implementation | Task tool with subagent_type |

**Anti-Patterns:**
- ❌ Spawning subagent without full context
- ❌ Letting subagent report directly to user
- ❌ Not verifying subagent output
- ❌ Using wrong model (e.g., gemini-2.5-pro instead of gemini-3-pro-preview)

**GPT-5.2 as Orchestrator:**
- Use Codex for planning: `codex exec -p orchestrator "Shrn kontext a řekni co dál"`
- After task completion: `codex exec -p orchestrator "Ověř výsledek, shrň a řekni co dál"`
- Pattern: **Plan → Execute → Verify → Ask "co dál?"**

### Visual QA Loop (Always On)

1. **Login** as admin (from `.env`) before any visual inspection.
2. **Capture** targeted screenshots to `/tmp/lesson-visual-check`.
3. **Delegate** visual review to Gemini (CLI) with file paths only.
4. **Apply fixes**, re-capture, repeat until consensus = “masterpiece”.

### UI Screenshot Rule (Always On)

- Když popisuješ konkrétní konzoli, obrazovku nebo krok v UI, přidej **reálný screenshot** do lekce.
- **Priorita zdrojů:** oficiální dokumentace → veřejný web → (poslední možnost) generovaný screenshot.
- Ukládej do `content/.../images/` a vkládej přes `<MDXImage ... />` (EN + CS parity).

### Camoufox Transcript Extraction SOP (Always On)

- **Use Camoufox when MCP transcripts fail** (YouTube captions blocked or missing via APIs).
- **Do not paste transcripts into chat**. Save to `/tmp/transcripts/<videoId>.vtt` and summarize from file.
- **Flow:** open video URL → read `ytInitialPlayerResponse` → extract `captionTracks[].baseUrl` → download VTT/SRT → store to `/tmp/transcripts` → parse for timestamps.
- **Delegation:** Claude/Gemini summarizes only from files; outputs delta notes + timestamped cites to `/tmp/transcripts/<videoId>.summary.md`. I review before reporting.
- **Cookies only if needed:** request Netscape-format cookies for age/region gating; store to `/tmp/cookies.txt` and never commit.

### Orchestration Policy (Always On)

**Decision matrix**
- Small localized change: implement directly; run narrow verification.
- Multi-file/behavior change: write short plan; implement in slices; verify each slice.
- Bug with repro: reproduce first; fix; add regression test when feasible.
- Ambiguous requirements: ask 1–3 clarifying questions before editing.
- Risky domains (auth/data/migrations/infra): invoke Codex extra-high; require explicit go/no-go.

**Parallelism rules**
- Parallelize independent, read-only discovery; keep batches small.
- Never run `apply_patch` in parallel with other tools.
- Avoid parallel commands sharing state (same files/dirs, DB, ports).
- If one output gates next step, run it first, then parallelize.

**Codex extra-high triggers**
- Data-loss risk, security-sensitive paths, deps/CI/ops changes.
- Large refactors or concurrency/perf hotspots.
- Low-test-coverage areas where failure is costly.

**Always-on checklist (<=8 lines)**
- [ ] Restate goal + constraints (sandbox/network/approval)
- [ ] Identify minimal files/symbols to touch
- [ ] Decide: direct fix vs short plan
- [ ] Implement smallest safe diff first
- [ ] Add/run the narrowest verification available
- [ ] Re-check edge cases + rollback path
- [ ] Summarize changes, risks, next steps

## 🔑 Standard Operating Protocols (SOPs)

### 0. Agent & Tool Selection Matrix 🎯 (v5.1)

**Hlavní rozhodovací strom:**

```
Potřebuji help?
│
├─ Je to HARD REASONING / ZÁHADNÝ BUG?
│  └─ ✅ GPT-5.2 (Codex CLI) = ORCHESTRÁTOR
│     └─ Claude implementuje fix
│
├─ Je to VISUAL QA (screenshots, UI check)?
│  └─ ✅ Gemini 3 Pro (2M context!)
│     └─ Posílej jen cesty k souborům, NE snapshoty do chatu!
│
├─ Je to RESEARCH?
│  ├─ Rychlé (<5 min) → Perplexity MCP
│  ├─ Střední (5-20 min) → Gemini 3 Pro CLI
│  └─ Hluboké (20-60 min) → Gemini Deep Research
│
├─ Je to CONTENT GENERATION?
│  └─ ✅ Gemini 3 Pro (gemini-3-pro-preview)
│
├─ Je to KÓDOVÁNÍ?
│  └─ ✅ Claude Code (já)
│     └─ Při 2+ failed attempts → eskaluj na GPT-5.2
│
├─ Je to EXPLORATION codebase?
│  └─ ✅ Subagent (Explore)
│
└─ Je to PLÁNOVÁNÍ?
   └─ ✅ GPT-5.2 (architecture) nebo Subagent (Plan)
```

**Tool Selection Matrix (v5.1):**

| Potřebuji... | Nástroj | Subscription | Rychlost |
|--------------|---------|--------------|----------|
| Rychlá fakta | `WebSearch` | Free | ⚡ Instant |
| Dokumentace | `Context7 MCP` | Free | ⚡ Instant |
| Quick research | `Perplexity MCP` | MCP | ⚡ 10s |
| Deep research | `Gemini Deep Research` | Google AI Plus | ⏱️ 20-60 min |
| Content generation | `Gemini 3 Pro CLI` | Google AI Plus | ⏱️ 1-3 min |
| **Visual QA** | `Gemini 3 Pro CLI` | Google AI Plus | ⏱️ 30s |
| Hard reasoning | `GPT-5.2 (Codex)` | OpenAI Pro | ⏱️ 30s-2min |
| Implementation | `Claude Code` | Claude Code | ⚡ Instant |

**⚠️ Context Segregation (KRITICKÉ!):**
```
NIKDY neposílej do chatu:
❌ Playwright browser_snapshot (14k+ tokenů!)
❌ Dlouhé logy (>50 řádků)
❌ Full DOM/AX snapshoty

VŽDY posílej:
✅ Cesty k souborům (.playwright-mcp/screenshot.png)
✅ Pass/fail + stručné summary (10-30 řádků)
```

**Gemini 3 Pro (Google AI Plus):**
```bash
# Content generation / Research
cat << 'EOF' | gemini -m gemini-3-pro-preview 2>&1
[prompt]
EOF

# Visual QA s obrázkem
gemini -m gemini-3-pro-preview --file /path/to/screenshot.png "Analyze UI"
```

**Claude CLI (Anthropic):**
```bash
# Use bash heredoc/pipe (same pattern as Gemini)
cat << 'EOF' | claude
[prompt]
EOF
```

**Gemini Deep Research (Google AI Plus):**
```bash
python backend/scripts/gemini_deep_research.py "Research question"
```

**GPT-5.2 (OpenAI Pro via Codex CLI):**
- ChatGPT Plus ($20/měsíc) → chat.openai.com
- Codex CLI: `codex "Your question"`
- Role: **Situational Orchestrator** (debugging, architecture, root cause)

**Konfigurace:** `~/.claude.json` → `perplexity-search` MCP server
**API klíč:** Sdílený s Daily Digest cron (`.env` → `PERPLEXITY_API_KEY`)
**Docs:** `backend/scripts/README.md`

### 1. Content Engineering (Masterpiece v2) ✍️

- **Guidelines:** `.ai-context/core/CONTENT_GUIDELINES.md` (MUSÍ se dodržovat)
- **Validation:** `scripts/validate_mdx.js` (Must pass before commit)
- **Diagrams:** SVG only. Register in `frontend/components/mdx/Diagram.tsx`
- **Localization:** EN (`content.mdx`) + CS (`content.cs.mdx`) - VŽDY OVĚŘIT JAZYK!

### 2. QA Protocol 🔍

Claude MUSÍ použít "Senior QA Analyst" personu při review:

- Faktická správnost
- Hloubka obsahu
- Dodržení struktury
- Interaktivita labů
- Verifikace EN/CS souborů

### 3. Dependency Management (LCM) 🔒

**Automatizace (žádná manuální práce):**
- **Dependabot** hlídá závislosti automaticky (config: `.github/dependabot.yml`)
- **Schedule:** Weekly (pondělí 9:00 CET) pro minor/patch
- **Security:** Okamžité PR pro CVE zranitelnosti

**Agent workflow při Dependabot PR:**
1. Dependabot vytvoří PR → CI se spustí automaticky
2. CI projde ✅ → bezpečné mergovat
3. CI failne ❌ → dependency něco rozbila, investigovat

**Manuální akce (jen při urgentní CVE):**
```bash
# Check vulnerabilities
npm audit

# Update specific package
npm update <package-name>

# Nuclear option (regenerate lock)
rm package-lock.json && npm install
docker compose build --no-cache frontend
```

**⚠️ KRITICKÉ:** Po CVE-2025-55182 (React2Shell) - Next.js/React musí být na patchovaných verzích!

### 4. GENERATE → WRITE → VERIFY 📝

**Povinný protokol pro každý content task:**

1. Vygeneruj obsah
2. Zapiš do souborů
3. PŘEČTI ZPĚT a ověř (není placeholder, správný jazyk, očekávaná délka)

---

## 📊 Current State Snapshot

### Cycle: 49 (XP Level System Complete)

**Status:** 🟢 READY - XP-based leveling deployed

### Completed

| Item | Status |
|------|--------|
| XP-Based Level System | ✅ Committed (`3cfb14a`) |
| Content Loader Orphan Cleanup | ✅ Committed (`ba46cb1`) |
| Under Construction Banner | ✅ Committed (`85794eb`) |
| Page Title Update | ✅ Committed (`7f44f73`) |
| Edutainment v3.0 (11 lessons) | ✅ Done |

### Pending

| Item | Status |
|------|--------|
| Courses 3 & 4 content | 🚧 Under Construction |
| SVG Diagrams | ⚠️ Tech debt (optional) |

### Recent Changes (2025-12-10)

- [FEAT] XP-based automatic leveling (no manual difficulty selection)
- [FEAT] Level-up celebration modal with confetti
- [FEAT] "Recommended" badge for courses matching level
- [FEAT] "Under Construction" banner for courses 3 & 4
- [FIX] Content loader auto-cleans orphaned lessons
- [FIX] Pre-commit hook uses Docker for typecheck

---

## 📝 Lessons Learned

### 2025-12-20: NotebookLM Extraction Request 🔎

**Rule:** When new "must-use" videos are found, provide the user a NotebookLM extraction prompt + expected outputs (summary, key takeaways, timestamps, pitfalls) so they can pre-digest content.

### 2025-12-19: ID/Slug Resolution & MDXImage URL - Two Critical Bugs 🐛

**Kontext:** L07 Antigravity Mastery - obrázek agent-manager.png se nezobrazoval.

**Problém 1: API 422 Error (ID/Slug mismatch)**
- Frontend posílá `GET /lessons/07-antigravity-mastery` (slug)
- Backend očekával `lesson_id: int` → 422 Unprocessable Entity
- Stávalo se často s různými lekcemi

**Root cause:** Backend endpoint `def read_lesson(lesson_id: int, ...)` nepodporoval slugy.

**Řešení:** FastAPI Dependencies v `backend/app/dependencies.py`:
```python
def get_lesson(lesson_id: str = Path(...)) -> models.Lesson:
    if lesson_id.isdigit():
        lesson = db.query(models.Lesson).filter(models.Lesson.id == int(lesson_id)).first()
    else:
        lesson = db.query(models.Lesson).filter(models.Lesson.slug == lesson_id).first()
    return lesson
```
Všechny lesson/course endpointy teď používají `Depends(get_lesson)` / `Depends(get_course)`.

---

**Problém 2: MDXImage hardcoded localhost**
- `MDXImage.tsx` měl: `const API_BASE_URL = "http://localhost:8000";`
- Browser na `learnai.cz` nemohl dosáhnout `localhost:8000`
- Výsledek: obrázky měly jen úzký pruh (broken image)

**Root cause:** Hardcoded URL místo environment variable.

**Řešení:** `frontend/components/MDXImage.tsx`:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
```

**Checklist při nových endpoint/komponentách:**
- [ ] Backend: Podporuje endpoint jak numeric ID, tak slug?
- [ ] Frontend: Používá komponenta `NEXT_PUBLIC_API_URL` pro API calls?

---

### 2025-12-19: VideoSwitcher Parsing Reliability 🧩

**Kontext:** VideoSwitcher občas nezobrazoval alternativní videa bez refresh.

**Root cause:** Nekonzistentní regex + JSON parsing v `MarkdownRenderer` a `video-parsing`, greedy matching a trailing commas v MDX.

**Řešení:**
- Sdílený parser `parseVideoSwitcherTag` v `frontend/lib/video-parsing.ts`
- Non-greedy regex: `(\[[\s\S]*?\])`
- Sanitizace: quoted keys + odstranění trailing commas před `JSON.parse`
- Jednotné použití v rendereru i extrakci

**Checklist pro budoucí úpravy:**
- [ ] Parser je sdílený (ne duplikovaný) v obou místech.
- [ ] Regex je non-greedy a odolný vůči multi-line props.
- [ ] Trailing commas a unquoted keys jsou ošetřené.

---

### 2025-12-19: MACP Content Workflow - Critical Reviewer ≠ Better Writer 🎭

**Kontext:** MACP review L05 - Gemini dal 9/10, GPT-5.2 dal 7/10. Otázka: Neměl by psát lekce ten kritičtější?

**Insight:** Ne nutně. Kritičtější agent je lepší jako *reviewer*, ne jako *writer*.

**Optimální workflow:**
| Role | Agent | Proč |
|------|-------|------|
| Content creation | Gemini 3 Pro | 2M context, kreativní, edutainment focus |
| Critical review | GPT-5.2 | Přísný, technicky přesný, varuje před over-engineering |
| Implementation | Claude | Kód, integrace, Git |

**Proč funguje "tension" mezi agenty:**
1. **Blind spot prevention** - Kdyby stejný agent psal i reviewoval, měl by vlastní slepá místa
2. **Optimist vs Pessimist** - Gemini píše optimisticky, GPT strhává → výsledek je vyvážený
3. **Different strengths** - Gemini exceluje v engagement, GPT v technické rigoróznosti

**Rozhodnutí:** Zachovat současný workflow. Případný experiment (GPT jako writer) odložen.

---

### 2025-12-18: Claude Code Mastery Lesson - Diagram & DB Pitfalls 🎨

**Kontext:** Vytváření lekce 06-claude-code-mastery s 3 novými SVG diagramy.

**Problém 1: Diagramy se nerendrovaly**
- Přidal jsem `claude-approval-loop`, `context-bucket`, `claude-md-anatomy` do `DiagramArchitecture.tsx`
- Ale ZAPOMNĚL jsem je přidat do routeru `Diagram.tsx`
- Výsledek: `<Diagram type="claude-approval-loop" />` vrátil `null`

**Root cause:** `Diagram.tsx` má 2 místa která je třeba aktualizovat:
1. TypeScript interface (řádek ~13) - pro type checking
2. Routing podmínka (řádek ~48) - pro skutečné routování

**Řešení:** Přidán "DIAGRAM REGISTRATION CHECKLIST" do CONTENT_GUIDELINES.md

---

**Problém 2: Duplicitní lekce v DB**
- Změnil jsem title z "From User to Orchestrator" na "From Beginner to Orchestrator"
- ContentLoader vytvořil NOVÝ záznam místo update
- Výsledek: 2× lekce 6 v seznamu

**Root cause:** ContentLoader používá `title` jako identifikátor, ne `slug` nebo `order`.

**Řešení:**
1. Dokumentováno v CONTENT_GUIDELINES.md (sekce F)
2. SQL příkaz pro cleanup duplicit

---

**Problém 3: Přeskočená visual verifikace**
- User musel připomenout: "vubec nedelas uz visual check"
- Diagramy byly přidány ale nikdo neověřil že se renderují

**Řešení:** Visual QA MUSÍ být součást workflow, ne volitelný krok.

**Best Practice pro nové diagramy:**
```
1. □ Implementuj v DiagramXxx.tsx
2. □ Registruj v Diagram.tsx (interface + routing)
3. □ Restart frontend
4. □ Visual check v prohlížeči
5. □ Screenshot pro důkaz
```

---

### 2025-12-18: YouTube Video Metadata Extraction 📺

**Problém:** Potřeboval jsem zjistit názvy videí z YouTube playlist. YouTube.com je blokovaný pro WebFetch.

**Co NEFUNGUJE:**
```bash
# ❌ WebFetch na youtube.com - blokováno
WebFetch("https://www.youtube.com/watch?v=VIDEO_ID") → ERROR

# ❌ Web Search na video ID - neindexováno
WebSearch("youtube VIDEO_ID title") → generic results only

# ❌ YouTube API key v .env - nemáme funkční MCP server pro metadata
# YOUTUBE_API_KEY existuje, ale youtube-transcript MCP je jen pro transkripty
```

**Co FUNGUJE:**
```bash
# ✅ Noembed.com - FREE, no auth, vrací JSON s title
WebFetch("https://noembed.com/embed?url=https://www.youtube.com/watch?v=VIDEO_ID")
# → {"title": "Video Title Here", "author_name": "Channel", ...}

# ✅ Pro transkripty: youtube-transcript MCP (yt-dlp based)
# Configured in ~/.claude.json jako "youtube-transcript"
```

**Best Practice pro YouTube research:**

| Potřebuji | Řešení |
|-----------|--------|
| Video title/metadata | `noembed.com/embed?url=YOUTUBE_URL` |
| Video transcript | YouTube Transcript MCP (po restartu Claude Code) |
| Playlist obsah | Uživatel → NotebookLM → summary pro mě |
| Channel info | `curl + grep` nebo Gemini screenshot |

**YouTube API key:** ✅ VYŘEŠENO (2025-12-18)

Nainstalován `dannySubsense/youtube-mcp-server` s 14 funkcemi:
- `get_video_details` - metadata videa
- `get_playlist_items` - seznam videí v playlistu
- `get_playlist_details` - metadata playlistu
- `search_videos` - vyhledávání
- `get_video_transcript` - transkripty
- `get_channel_videos` - videa z kanálu
- ...a další

**Konfigurace:**
```bash
# Repo: /home/deploy/youtube-mcp-server
# Venv: /home/deploy/youtube-mcp-server/venv
# Credentials: /home/deploy/youtube-mcp-server/credentials.yml
# MCP v Claude Code: youtube-data (project-specific)
```

**Po restartu Claude Code** budou dostupné nástroje:
- `mcp__youtube-data__get_playlist_items`
- `mcp__youtube-data__get_video_details`
- `mcp__youtube-data__search_videos`
- atd.

---

### 2025-12-13: Playwright Snapshot Context Burn - OPAKOVANÝ FAIL 🔥

**Co se stalo:** Při hledání YouTube channel IDs jsem použil Playwright MCP a dumpnul 4× snapshots (~56k tokenů) do kontextu. Přitom jsem měl pravidla jasně napsaná!

**Root Cause:** Autopilot mode - pravidla přečtena ale neaplikována. Boot sequence je "read only", chybí **action checkpoint**.

**Správné řešení bylo:**
```bash
# Možnost A: curl (nejrychlejší, <100 tokenů)
curl -s "https://www.youtube.com/@WesRoth" | grep -o 'channel/UC[^"]*' | head -1

# Možnost B: Gemini s thin protocol
# 1. Ulož screenshot: mcp__playwright__browser_take_screenshot → file.png
# 2. Gemini: "Najdi channel ID na screenshotu .playwright-mcp/file.png"
```

**Oprava - Boot Sequence Enhancement:**

```markdown
## 🚦 ACTION CHECKPOINT (před MCP tools!)

Před voláním `mcp__playwright__*`:
□ Je to Visual QA? → DELEGUJ na Gemini
□ Je to scraping? → Použij curl/wget nebo Gemini thin protocol
□ Opravdu potřebuji DOM snapshot? → Pokud ANO, použij browser_evaluate pro targeted extraction

⚠️ NIKDY: browser_snapshot → dump do chatu
✅ VŽDY: browser_take_screenshot → soubor → Gemini
```

**Chrome DevTools MCP:** ~~Zvážit nahrazení Playwright~~ → TESTOVÁNO, nefunguje v WSL (viz níže).

**Meta-lesson:** Orchestrátor MUSÍ aktivně checkovat pravidla před akcí, ne jen pasivně číst při bootu. Pokud pravidla nedávají smysl → diskutuj s uživatelem, NE ignoruj.

---

### 2025-12-13: Chrome DevTools MCP vs Playwright v WSL 🔧

**Co se stalo:** Testovali jsme Chrome DevTools MCP jako náhradu za Playwright (sliboval lightweight output).

**Výsledek:** ❌ Nefunguje v WSL
- Error: `Protocol error (Target.setDiscoverTargets): Target closed`
- Puppeteer (který Chrome DevTools MCP používá) nemůže správně spustit Chrome v WSL
- Ani `--headless` + `PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome` nepomohlo

**Playwright funguje v WSL:** ✅
- Automatický headless mode
- Správná detekce Chrome binárky
- **Kompaktní output** když se používá správně:
  - `browser_navigate` → ~10 řádků YAML
  - `browser_take_screenshot` → soubor pro Gemini
  - ❌ `browser_snapshot` → 14k+ tokenů (NIKDY do chatu!)

**Rozhodnutí:** Zůstáváme u Playwright, Chrome DevTools MCP odstraněn.

**Správné použití Playwright:**
```
✅ browser_navigate → kompaktní YAML snapshot
✅ browser_take_screenshot → .playwright-mcp/file.png → Gemini
✅ browser_click, browser_fill → interakce
❌ browser_snapshot → NIKDY přímo do chatu
```

---

### 2025-12-13: CLAUDE.md Boot Checklist v4.0 📋

**Co:** Redesign boot sequence po konzultaci s GPT-5.2 a Gemini (MACP).

**Problém:** Boot sequence říkala "přečti 3 soubory" ale při continuation sessions se to přeskakovalo. Pravidla byla napsaná ale ne aplikovaná.

**Řešení - Inline Critical Rules:**
- Kritická pravidla (delegace, thin protocol) přímo v CLAUDE.md
- Podmíněné loading tabulka (kdy co číst)
- Sebe-verifikace: po přečtení souboru CITUJ pravidlo

**Konzultace (MACP Blind Ballot):**
- Gemini: Sebe-verifikace, Boot Checklist, WORKING_CONTEXT téměř bezpodmínečný
- GPT-5.2: Instrukční kolize, robustní struktura, citované reference

**Výsledek:** -90 řádků z CLAUDE.md, kompaktnější ale efektivnější boot sequence.

---

### 2025-12-13: Multi-Agent Consensus Protocol (MACP) v1.0 🗳️

**Co:** Formalizace "blind ballot" protokolu pro důležitá rozhodnutí - Claude konzultuje GPT-5.2 a Gemini nezávisle.

**Multi-Agent Consultation:**
- GPT-5.2: "Resolution ladder + domain-weighted tie-breaks. Structured template s confidence 0-1."
- Gemini: "Blind Ballot to avoid echo chamber. Weighted Domain Authority - GPT=logic, Gemini=codebase."

**Klíčové principy:**
1. **Trigger-based** - NE vždy, jen pro security/migrations/architecture/content strategy
2. **Blind Ballot** - nezávislé dotazy bez sdílení odpovědi druhého (anti echo-chamber)
3. **Weighted Authority** - domain expert má přednost před hlasováním
4. **Resolution Ladder** - identify facts → experiment → escalate
5. **Time-boxed** - max 10 min, jinak consensus theater

**Domain Weights:**
| Domain | GPT-5.2 | Gemini | Claude |
|--------|---------|--------|--------|
| Security/Logic | 70% | 20% | 10% |
| Codebase/Visual | 20% | 70% | 10% |
| Content | 30% | 60% | 10% |
| Integration | 30% | 30% | 40% |

**Dokumentace:** `AGENT_PROTOCOL.md` → sekce "Multi-Agent Consensus Protocol (MACP) v1.0"

### 2025-12-13: Multi-Agent Workflow v5.1 - "Asymmetric Context Segregation" 🧠

**Důvod změny:** Playwright MCP snapshoty sežraly 14.3k tokenů za jeden `wait`, způsobily context compacting a ztrátu kontextu.

**Multi-Agent Consultation:**
- GPT-5.2: "Problém není model, ale co MCP vrací. Použij thin protocol."
- Gemini: "S 2M kontextem pojmu 100+ screenshotů. Dej mi Visual QA."

**Klíčové změny:**
1. **GPT-5.2 = Situational Orchestrator** (pro debugging, architecture)
2. **Claude = Primary Implementer** (coding, git, daily ops)
3. **Gemini 3 Pro = Visual QA** (2M context!)
4. **Context Segregation** - NIKDY neposílat snapshoty do chatu

**Economic Model:**
- Claude Code: ~$20/měsíc (unlimited)
- OpenAI Pro: ~$20/měsíc (GPT-5.2)
- Google AI Plus: Included (Gemini 3 + Deep Research)
- **Total: ~$40/měsíc fixed**

**Lesson:** Nepřesouvej roli orchestrátora kvůli jednomu úspěchu. Místo toho optimalizuj nástroje (thin protocol) a využij silné stránky každého modelu (Gemini 2M context pro visual data).

### 2025-12-13: Hash Navigation Race Condition Fix 🔗

**Problém:** Teasery na homepage (`/about#cycle-35`, `/about#cycle-49`) navigovaly na About page, ale nescrollovaly k sekci.

**Root Cause (GPT-5.2):** `ScrollToTop.tsx` component běžel synchronně při změně `pathname` a volal `window.scrollTo(0,0)` PŘED tím, než se nastavil hash v URL.

**Race Condition:**
```
1. User clicks teaser
2. intlRouter.push('/about') → pathname changes
3. ScrollToTop.tsx fires: scrollTo(0,0) ← TOO EARLY!
4. setTimeout(0) sets hash: /about#cycle-49
5. Hash is ignored, page at top
```

**Řešení:** 50ms delay v ScrollToTop.tsx:
```typescript
const scrollTimeout = setTimeout(() => {
    if (window.location.hash) return; // Skip if hash exists
    window.scrollTo(0, 0);
}, 50);
```

**Multi-Agent Debugging Pattern:**
1. Gemini suggested MutationObserver → FAILED (too complex)
2. Perplexity suggested dual router → FAILED (still race condition)
3. GPT-5.2 identified root cause: ScrollToTop.tsx → SUCCESS

**Lesson:** For mysterious navigation bugs, consult GPT-5.2 (superior reasoning) instead of trying multiple iterations with research-focused models.

### 2025-12-10: XP-Based Level System (Difficulty Refactor) 🎮

**Co se změnilo:**
- Uživatelé si už nevybírají difficulty při registraci (automaticky PIECE_OF_CAKE)
- Level se počítá automaticky z XP: 0/500/2000/5000
- Všechny kurzy jsou viditelné pro všechny (žádné zamykání)
- "Recommended" badge ukazuje kurzy odpovídající úrovni
- Level-up celebration modal s confetti při povýšení

**Technické detaily:**
```python
# backend/app/models.py
XP_THRESHOLDS = {
    PIECE_OF_CAKE: 0,      # 0 - 499 XP
    LETS_ROCK: 500,        # 500 - 1999 XP
    COME_GET_SOME: 2000,   # 2000 - 4999 XP
    DAMN_IM_GOOD: 5000,    # 5000+ XP
}
```

**Pydantic computed fields:**
```python
@computed_field
@property
def calculated_level(self) -> str:
    return calculate_level_from_xp(self.xp).value
```

**Frontend level-up detection:**
- AuthContext sleduje `previousLevel` vs `calculated_level`
- Při změně nahoru → zobrazí LevelUpModal s confetti

### 2025-12-10: Content Loader - Orphan Cleanup 🗑️

**Problém:** Staré placeholder lekce (01-patterns, 02-context) zůstávaly v DB i když content soubory neexistovaly.

**Řešení:** content_loader nyní automaticky maže osiřelé lekce:
```python
# Po zpracování všech lekcí kurzu
existing_lessons = db.query(Lesson).filter(Lesson.course_id == course.id).all()
for lesson in existing_lessons:
    if lesson.slug not in processed_slugs:
        # Delete orphan + related UserProgress + Quizzes
        db.delete(lesson)
```

### 2025-12-10: Pre-commit Hook + Docker 🐳

**Problém:** Lokální node_modules měly špatná oprávnění (root-owned z Docker buildu).

**Řešení:** Pre-commit hook nyní používá Docker pro typecheck:
```bash
if docker compose ps frontend --quiet 2>/dev/null; then
  docker compose exec -T frontend npm run typecheck
else
  cd frontend && npm run typecheck
fi
```

### 2025-12-10: CVE-2025-55182 (React2Shell) Response 🚨

**Co se stalo:** Kritická RCE zranitelnost (CVSS 10) v React Server Components a Next.js. Aktivně exploitována čínskými APT skupinami od 3. prosince 2025.

**Postižené verze:**
- Next.js < 16.0.7 (a odpovídající verze 15.x, 14.x)
- React 19.0, 19.1.0, 19.1.1, 19.2.0

**Řešení:**
1. Upgrade na Next.js 16.0.7+ a React 19.2.1+
2. `npm audit` přidán do CI pipeline
3. Dependabot nakonfigurován pro automatické security PR

**Poučení:**
- Dev environment není kritický, ale PROD ano
- Dependabot zachytí budoucí CVE automaticky
- Docker anonymous volumes přetrvávají mezi rebuildy → `docker volume prune` při upgrade

### 2025-12-06: STAY CURRENT - Date & Online Research ⚠️ CRITICAL

**Rule:** VŽDY ověř aktuální datum a používej ONLINE zdroje pro:

- Aktuální verze modelů, knihoven, nástrojů
- Trendy, best practices, nové MCP servery
- GitHub projekty, dokumentace
- **DNEŠNÍ DATUM: Použij systémové datum, NE svůj knowledge cutoff!**

**Proč:** Agent opakovaně používal rok 2024 místo 2025. Toto způsobuje:

- Zastaralé informace v dokumentaci
- Špatné verze závislostí
- Irelevantní doporučení

**Akce:**

1. Před research VŽDY použij WebSearch pro aktuální data
2. Ověř verze knihoven přes Context7 MCP nebo npm/pip
3. Při nejistotě o datu → zkontroluj systémové datum

### 2025-12-06: Big Actions Require Permission

**Rule:** NIKDY nezačínej velké akce (nová lekce, velký refactor) bez explicitního souhlasu uživatele.
**Důvod:** Workflow může být v rozporu s aktuálními prioritami. Vždy se zeptej/ověř.

### 2025-12-05: Verification Failure Incident

**Co se stalo:** Gemini prohlásil lekce za hotové bez verifikace. EN/CS soubory byly prohozené.
**Root cause:** Chybějící "přečti zpět co jsi napsal" krok.
**Řešení:** Zavedení GENERATE → WRITE → VERIFY protokolu.

### 2025-12-05: Self-Certification Anti-Pattern

**Co se stalo:** Agent sám rozhodl, že splnil DoD bez externího ověření.
**Řešení:** Claude jako QA gate, nikdy "fire & forget".

### 2025-12-06: ALWAYS USE NEWEST MODELS ⚠️ CRITICAL

**Rule:** Pro research a generování VŽDY používej NEJNOVĚJŠÍ dostupné modely:

- **Gemini:** `gemini-3-pro-preview` (NE 2.5-pro!)
- **Claude:** `claude-opus-4-5-20251101` (aktuální)
- Pokud nejsi jistý verzí → nech na AUTO nebo se zeptej

**Proč:** Starší modely mají zastaralé znalosti a horší výkon.

**V obsahu kurzu:**

- Zmiňuj aktuální modely: Claude Opus 4.5, Gemini 3, GPT-4o
- NE: Gemini 2.0, Claude 3.5, GPT-4 (zastaralé)

### 2025-12-07: Video Embed Format ⚠️ CRITICAL

**Rule:** Video URL v `meta.json` MUSÍ být ve formátu embed!

```
ŠPATNĚ: https://www.youtube.com/watch?v=XXX
SPRÁVNĚ: https://www.youtube.com/embed/XXX
```

**Proč:** `watch?v=` URL nefunguje v iframe (X-Frame-Options block).

### 2025-12-07: Diagnóza PŘED opravou

**Rule:** Vždy nejdřív zjisti KDE je problém, pak teprve opravuj.
**Příklad:** Video nefungovalo → měnil jsem `<YouTube>` v MDX, ale problém byl v `meta.json`.
**Postup:**

1. Konzole browseru → najít chybu
2. `grep -r "hledaný_text"` → najít zdroj dat
3. Ověřit API response / meta.json
4. Teprve pak opravit

### 2025-12-07: Reference existující lekce

**Rule:** Před úpravou lekce se VŽDY podívat na existující lekce STEJNÉHO kurzu.
**Proč:** Konzistence formátu (Holocron, emojis, struktury).
**Příklad:** Holocron v Lesson 01 měl mít stejný styl jako beginner kurz.

### 2025-12-07: Backend restart po změně content

**Rule:** Po změně `content/*` nebo `meta.json` → `docker compose restart backend`
**Proč:** Backend cachuje data z content souborů.

### 2025-12-09: 🎥 Video System Architecture

- **Dual-Source Strategy:**
  - **Main Video:** Defined in `meta.json` -> `video_url`. Must be 100% embed-safe (prefer IBM, reputable tech channels).
  - **Alt Videos:** Defined in `content.mdx` -> `<VideoSwitcher />`. Can include recaps, local AI guides, etc.
- **Failover Logic:** content_loader loads content (with Switcher) but `meta.json` drives the primary player.
- **Localization:** `meta.json` supports distinct `en`/`cs` URLs. Switcher supports unlimited videos with `lang` tag.
- **Lessons Learned:**
  - YouTube blocks embeds for many "viral" videos (Computerphile, etc.). ALWAYS Verify/Test embed!
  - `VideoSwitcher` regex parser in `MarkdownRenderer` is sensitive to JSON formatting. Use strictly valid JSON in props.

### 🔄 Content Sync Workflow

- **MDX/Meta Changes:** Require manual DB sync.
- **Command:** `docker compose exec backend python -c "from app.services.content_loader import ContentLoader; from app.database import SessionLocal; loader = ContentLoader('/app/content'); db = SessionLocal(); loader.sync_to_db(db, 1)"`

### 2025-12-09: Video System (VideoSwitcher + VideoPlayer) 🎬

**Architektura:**

```
meta.json (video_url)  →  VideoPlayer (hlavní video)
                              ↑
MDX (VideoSwitcher)    →  window.__videoRegistry (global)
```

**Kde se definují videa:**

1. **Hlavní video** → `meta.json`

   ```json
   "video_url": {
     "en": "https://www.youtube.com/embed/VIDEO_ID",
     "cs": "https://www.youtube.com/embed/VIDEO_ID_CS"
   }
   ```

2. **Alternativní videa** → `content.mdx` (VideoSwitcher v MDX)
   ```jsx
   <VideoSwitcher
     videos={[
       { id: "VIDEO_ID", title: "Název", author: "Autor", lang: "en" },
       { id: "VIDEO_ID_2", title: "Jiné video", author: "Autor 2", lang: "cs" },
     ]}
   />
   ```

**Jak to funguje:**

- `VideoPlayer` (v page layout) zobrazuje hlavní video z `meta.json`
- `VideoSwitcher` (v MDX) registruje alternativní videa do `window.__videoRegistry`
- VideoPlayer naslouchá na změny registru a zobrazuje "Další doporučená videa"
- Uživatel může přepínat mezi videi + použít PIN pro sticky positioning

**Soubory:**

- `frontend/components/VideoPlayer.tsx` - hlavní přehrávač s PIN
- `frontend/components/mdx/VideoSwitcher.tsx` - registrace alternativ
- `frontend/components/MarkdownRenderer.tsx` - parser pro VideoSwitcher v MDX

**Kdy přidat nové video:**

1. Najdi lekci v `content/courses/.../lessons/XX-name/`
2. Otevři `content.cs.mdx` a `content.mdx`
3. Přidej objekt do `VideoSwitcher videos` pole
4. Nemusíš restartovat backend (MDX se parsuje na frontendu)

### 2025-12-09: WORKING_CONTEXT Drift Prevention ⚠️ CRITICAL

**Co se stalo:** WORKING_CONTEXT.md zůstával 8 commitů pozadu. Agent (Claude) načetl zastaralé informace a byl dezorientovaný o skutečném stavu projektu.

**Root cause:** Agenti commitovali změny, ale neaktualizovali WORKING_CONTEXT.md po každém commitu.

**Řešení (přidáno do AGENT_PROTOCOL.md):**
1. **PO KAŽDÉM COMMITU** → Aktualizuj WORKING_CONTEXT.md
2. **Při boot sequence** → Porovnej `git log -1` s commits v WORKING_CONTEXT
3. Pokud se neshodují → Nedůvěřuj WORKING_CONTEXT, nejdřív aktualizuj

**Checksum pravidlo:**
```
WORKING_CONTEXT.md MUSÍ obsahovat hash posledního relevantního commitu!
Při neshodě = zastaralý kontext!
```

### 2025-12-09: Edutainment v3.0 Mass Upgrade - Lessons Learned 🎬

**Kontext:** Upgrade 11 lekcí (2 kurzy) na Edutainment standard během jedné session.

**Co fungovalo skvěle:**

1. **LESSON_UPGRADE_GUIDE.md jako checklist**
   - Vytvořil jsem detailní plán PŘED začátkem práce
   - Každá lekce měla: video ID, HOOK text, změny k provedení
   - Mohl jsem systematicky odškrtávat a neztratit se

2. **Paralelní EN/CS úpravy**
   - Vždy jsem upravoval oba soubory najednou (content.mdx + content.cs.mdx)
   - Eliminace "zapomněl jsem CS verzi" chyb

3. **Backend verification po každém bloku**
   - `docker compose logs backend | grep "Processing lesson"`
   - Okamžitě vidím, zda backend parsuje správně (lab count, reading time)

**VideoSwitcher formát (KRITICKÉ):**
```mdx
# SPRÁVNĚ - single-line JSON, alternatives (ne videos!)
<VideoSwitcher alternatives={[{"id":"VIDEO_ID","title":"Title"}]} />

# ŠPATNĚ - multi-line, videos prop
<VideoSwitcher videos={[
  { id: "VIDEO_ID", title: "Title" }
]} />
```

**⚠️ FIX 2025-12-09:** MarkdownRenderer regex nyní podporuje OBOJÍ:
- `videos={...}` (legacy)
- `alternatives={...}` (nový formát)

Regex: `/(?:videos|alternatives)=\{(\[.*\])\}/`

**HOOK Section Pattern:**
```mdx
## ⚡ [Provokativní název]

**[Šokující tvrzení nebo otázka v první větě.]**

[2-3 věty rozvíjející téma, budující napětí...]
```

**Časté chyby k vyhnutí:**
- ❌ Zapomenout aktualizovat lab count v header Callout po přidání labu
- ❌ Duplikovat content (HOOK + původní intro = redundance)
- ❌ Použít `videos={...}` místo `alternatives={...}`
- ❌ Nechat prázdné řádky uvnitř VideoSwitcher JSON

**Video výběr - kvalitativní kritéria:**
| Typ | Příklad | Použití |
|-----|---------|---------|
| High Energy | NetworkChuck, Fireship | HOOK, motivace |
| Deep Technical | 3Blue1Brown | Koncepty, vizualizace |
| Storytelling | ColdFusion | Historie, kontext |
| Practical | Jeff Su, All About AI | Tutoriály, how-to |

**Efektivita:**
- 11 lekcí upgradováno za ~2 hodiny
- Klíč: Dobrá příprava (LESSON_UPGRADE_GUIDE) + systematický přístup

### 2025-12-09: Edutainment Bible - Skalopevná pravidla 📜

**Co:** Dokumentace Edutainment v3.0 standardu rozšířena o "Bible" sekci s absolutními pravidly.

**Klíčové pravidla:**

1. **30-SECOND RULE** - Každá lekce MUSÍ mít HOOK v prvních 30 sekundách
   - ❌ "V této lekci se naučíte..."
   - ✅ "**Stop everything.** Look at your screen..."

2. **CINEMATIC STORYTELLING** - Inspirace ColdFusion, NetworkChuck, 3Blue1Brown
   - "Bombs" = historické momenty, překvapivá fakta
   - Narrative Arc = Setup → Conflict → Resolution
   - Emotional Language = "The eye opened." / "That era is over."

3. **VISUAL DENSITY** - Minimální počet diagramů podle délky lekce
   - <15 min: 2 diagramy
   - 15-30 min: 3-4 diagramy
   - 30-45 min: 5-6 diagramů

4. **LAB PHILOSOPHY** - Labs jsou MISE, ne cvičení
   - Každý lab má "💡 Aha Moment"
   - Copy-paste ready prompts
   - Očekávaný výstup dokumentován

**Soubor:** `.ai-context/core/CONTENT_GUIDELINES.md` (sekce "🔥 EDUTAINMENT BIBLE")

### 2025-12-14: Codex CLI - Interactive vs Non-Interactive Mode 🤖

**Problém:** `codex "prompt"` vrací "stdin is not a terminal" z Claude Code.

**Root cause:** Codex má dva módy:
1. **Interactive** (default) - potřebuje TTY/terminál
2. **Non-interactive** (`codex exec`) - funguje z automatizace

**Řešení:**
```bash
# ❌ ŠPATNĚ - nefunguje z Claude Code
codex "Your question"
codex -p fast "Your question"

# ✅ SPRÁVNĚ - funguje z Claude Code
codex exec "Your question"
```

**Výstup `codex exec`:**
- Model info (workdir, model, sandbox mode)
- Full reasoning output
- Token usage

**Poučení:** Když včera "fungovalo" interaktivní codex, bylo to pravděpodobně z terminálu. Z Claude Code VŽDY používej `codex exec`.

---

### 2025-12-12: WSL2 IPv4 Fix for Node.js MCP Servers 🔧

**Problém:** Perplexity MCP server vracel `fetch failed` / `ETIMEDOUT` na WSL2, ale `curl` fungoval.

**Root cause:**
1. WSL2 má broken IPv6 konektivitu
2. Node.js native `fetch()` zkouší IPv6 první → čeká na timeout
3. `curl` funguje protože zkouší IPv4/IPv6 paralelně

**Diagnostika:**
```bash
# curl funguje
curl -X POST "https://api.perplexity.ai/chat/completions" -H "Authorization: Bearer $KEY" ...

# Node.js fetch selhává
node -e "fetch('https://api.perplexity.ai/...').then(...)"
# ERROR: ETIMEDOUT 104.18.26.48:443
```

**Řešení - patch MCP serveru:**
```javascript
// Změna z fetch() na https module s family: 4
import https from 'https';
https.request({
  hostname: 'api.perplexity.ai',
  family: 4,  // Force IPv4
  ...
})
```

**Publikováno:** https://github.com/ussi69-dotcom/server-perplexity-ask-wsl2

**Poučení:**
- `NODE_OPTIONS="--dns-result-order=ipv4first"` NEFUNGUJE s native `fetch()`
- `dns.setDefaultResultOrder('ipv4first')` NEFUNGUJE s native `fetch()`
- Jediné řešení = použít `https` modul s explicitním `family: 4`

### 2025-12-12: Makefile - Build Automation 101 🔧

**Co je `make`?**
GNU Make je build automation tool z roku 1976. Definuješ "recepty" (targets) v souboru `Makefile` a spouštíš je příkazem `make <target>`.

**Proč ho používáme?**
```
BEZ MAKE:
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml restart nginx

S MAKE:
make deploy-prod
```

**Výhody:**
1. **Zkrácené příkazy** - místo 50 znaků napíšeš 15
2. **Dokumentace** - `make help` ukáže všechny dostupné příkazy
3. **Konzistence** - všichni v týmu používají stejné příkazy
4. **Prevence chyb** - `make reset` má potvrzovací dialog

**Anatomie Makefile:**
```makefile
target: ## Popis příkazu (pro make help)
	příkaz_1
	příkaz_2
```

**Naše příkazy (ai-learning-platform):**

| Příkaz | Popis | Kdy použít |
|--------|-------|------------|
| `make up` | Spustí DEV stack | Lokální vývoj |
| `make down` | Zastaví kontejnery | Konec práce |
| `make restart` | Restartuje vše | Po změně kódu |
| `make logs` | Sleduje logy | Debugging |
| `make logs-backend` | Jen backend logy | API problémy |
| `make logs-frontend` | Jen frontend logy | UI problémy |
| `make reset` | ☢️ Smaže DB + volumes | Čistý start |
| `make shell-backend` | Bash do backendu | Ruční příkazy |
| `make test-backend` | Spustí pytest | Před commitem |
| **`make deploy-prod`** | 🚀 **Produkční deploy** | Na VPS |
| `make down-prod` | Zastaví produkci | Maintenance |
| `make logs-prod` | Produkční logy | Debugging na VPS |

**Deploy flow na VPS:**
```bash
git pull origin main
make deploy-prod      # Automaticky: down → build → up → nginx reload
make logs-prod        # Ověř že běží
```

**Rozdíl DEV vs PROD:**
```
make up         → docker-compose.yml (dev, hot reload, port 3000/8000)
make deploy-prod → docker-compose.prod.yml (nginx, SSL, optimized build)
```

**Tip:** `.PHONY` na začátku Makefile říká, že target není soubor (jinak by make hledal soubor s tím jménem).

### 2025-12-09: Multi-Agent Workflow v3.0 Architecture 🤖

**Aktuální setup:**
```
CLAUDE OPUS 4.5 (Orchestrator)
├── Řídí workflow, QA gate, git operace
├── Visual verification (Playwright)
└── Rozhoduje o dalších krocích

GEMINI 3 PRO (Researcher/Content Creator)
├── Deep research (1M context)
├── Content generation
└── Dostává Task Brief s Persona + DoD

PERPLEXITY (Deep Research)
├── Real-time webový výzkum
├── Fact-checking
└── 90+ citací na výzkumný cyklus

ANTIGRAVITY (Full-Stack Builder)
├── Gemini-powered VS Code agent
├── Rychlé prototypování
└── Same-day integrace nových AI modelů
```

**Memory System:**
- `WORKING_CONTEXT.md` = Working memory (aktuální task)
- `MEMORY.md` = Long-term memory (protokoly, lessons learned)
- `CLAUDE.md` / `GEMINI.md` = Instructions (boot sequence, SOPs)

**CI/CD Pipeline:**
- Pre-commit: TypeScript check (Husky)
- GitHub Actions: Lint → Type → Build → Test + npm audit
- Dependabot: Weekly security scans + auto-PR (`.github/dependabot.yml`)
- `npm run verify` povinný před každým commitem

### General

- **Don't hold back.** User wants engineering depth, not generic tutorials.
- **Verify file paths.** Check if you are writing to `.cs.mdx` or `.mdx`.
- **Never trust "done" without verification.** Always read back what was written.
- **Update WORKING_CONTEXT after every commit!** (New Dec 2025)
- **Edutainment Bible je SKALOPEVNÁ.** Žádné výjimky z 30-second rule, visual density, lab philosophy.

---

## 🎯 Priority Queue (Updated Dec 9, 2025)

### Completed
| Item | Status |
|------|--------|
| Documentation & workflow | ✅ DONE |
| Course restructure | ✅ DONE |
| Content Research | ✅ DONE |
| VideoSwitcher + PIN feature | ✅ DONE |
| **Edutainment v3.0 - AI Basics (7 lessons)** | ✅ DONE |
| **Edutainment v3.0 - Practical PE (4 lessons)** | ✅ DONE |

### Current Courses (Fully Upgraded)

**AI Basics (7 lessons):**
```
content/courses/ai-basics-beginner/lessons/
├── 01-what-is-ai/           ✅ ColdFusion + IBM
├── 02-how-ai-learns/        ✅ 3B1B + Backprop
├── 03-llms-explained/       ✅ 3B1B + Attention
├── 04-talking-to-ai/        ✅ Jeff Su + GenAI
├── 05-dark-side/            ✅ Deepfakes + ColdFusion
├── 06-ai-at-work/           ✅ Excel + n8n
└── 07-course-summary/       ✅ Two Minute Papers
```

**Practical PE (4 lessons):**
```
content/courses/practical-prompt-engineering/lessons/
├── 01-prompt-architecture/  ✅ theMITmonk + XML Tags
├── 02-prompt-injection/     ✅ NetworkChuck + Gandalf Lab
├── 04-local-intelligence/   ✅ NetworkChuck + DeepSeek
└── 05-ai-powered-development/ ✅ Fireship + MCP
```

### Low Priority (Optional)
| Item | Notes |
|------|-------|
| SVG Diagrams | ai-ml-dl-circles, attention-mechanism, sql-vs-prompt-injection |
| Visual QA | Manual browser testing |

---

## 📚 Research Repository (Dec 2025)

**Location:** `.ai-context/Perplexity_assist/`

| File                               | Content                          | Lines |
| ---------------------------------- | -------------------------------- | ----- |
| `CONTENT_FOUNDATION_SYNTHESIS.md`  | **MASTER** - 11 lekcí, laby, kód | 301   |
| `comprehensive_research_report.md` | Perplexity 6-part analysis       | 431   |
| `executive_brief.md`               | Executive summary                | 272   |
| `Lessons_content_research.md`      | Video recommendations            | 425   |

**Sources:** 90+ citations, Perplexity + Gemini 3 Pro synthesis

**Key Data Points:**

- Claude Opus 4.5: 80.9% SWE-bench (best coding)
- Llama 4 8B: ~6GB VRAM (recommended local)
- MCP: Production-ready Dec 2025
- LangGraph: #1 agent framework

---

_Last updated: 2025-12-10 22:30 (XP Level System + UI Updates)_
