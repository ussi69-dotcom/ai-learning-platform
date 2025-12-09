# 🧠 Unified Agent Memory

**This file is the Single Source of Truth for all agents (Claude CLI primary, Gemini via ask-gemini).**
Read this first to understand the environment, preferences, and active protocols.

---

## 🚨 WORKFLOW v2.0 (Active since 2025-12-05)

### Role Assignment

```
CLAUDE = ORCHESTRÁTOR (Primary CLI agent)
- Řídí workflow, QA gate, visual check, git operations
- Rozhoduje, iteruje, eskaluje sporné body k User

GEMINI = RESEARCHER/WORKER (via ask-gemini)
- Deep research (1M context), content generation, brainstorming
- VŽDY dostává Task Brief s Persona + DoD
```

### The Excellence Loop (Content Creation)

```
PHASE 1: Research → PHASE 2: Generation → PHASE 3: Iteration → PHASE 4: Finalization
```

**Full protocol:** See `.ai-context/workflows/MULTI_AGENT_WORKFLOW.md`

---

## 🖥️ Environment Context

- **OS:** Linux (WSL2)
- **Node.js:** v24.11.1
- **Stack:** Next.js 16, FastAPI, PostgreSQL 15, Redis 7, Docker Compose.
- **Agent Mode:** Claude CLI primary, Gemini via MCP (`ask-gemini`)
- **MCP Tools:** Playwright (visual check), GitHub, Context7, Figma

## 🔑 Standard Operating Protocols (SOPs)

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

### 3. GENERATE → WRITE → VERIFY 📝

**Povinný protokol pro každý content task:**

1. Vygeneruj obsah
2. Zapiš do souborů
3. PŘEČTI ZPĚT a ověř (není placeholder, správný jazyk, očekávaná délka)

---

## 📊 Current State Snapshot

### Cycle: 48 (Lesson 01 Complete)

**Status:** 🟢 READY - Čekám na pokyn pro další akci

### Completed

| Item                            | Status                   |
| ------------------------------- | ------------------------ |
| Lesson 01: Prompt Architecture  | ✅ Committed (`9f0ef99`) |
| Gemini MCP OAuth                | ✅ Fixed (user re-auth)  |
| Course Restructure (11 lessons) | ✅ Done                  |

### Pending

| Item                              | Status                   |
| --------------------------------- | ------------------------ |
| Lesson 02-11                      | ⏳ Awaiting instructions |
| Diagram `prompt-architecture` SVG | ⚠️ Tech debt             |

### Recent Changes (2025-12-06)

- [FEAT] Lesson 01 complete (EN + CS + quiz)
- [FIX] Gemini MCP OAuth restored
- [RULE] Big actions require explicit user permission

---

## 📝 Lessons Learned

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

### General

- **Don't hold back.** User wants engineering depth, not generic tutorials.
- **Verify file paths.** Check if you are writing to `.cs.mdx` or `.mdx`.
- **Never trust "done" without verification.** Always read back what was written.

---

## 🎯 Priority Queue

1. ~~**C1 (Critical):** Opravit dokumentaci a workflow~~ ✅ DONE
2. ~~**C1 (Critical):** Course restructure~~ ✅ DONE (11 lessons)
3. ~~**C1:** Lesson 01~~ ✅ COMMITTED
4. ~~**C1:** Content Research~~ ✅ DONE (Perplexity + Gemini synthesis)

### NEXT: Implementace lekcí (dle CONTENT_FOUNDATION)

| Priorita    | Lekce | Co                              | Podklady                                            |
| ----------- | ----- | ------------------------------- | --------------------------------------------------- |
| 🔴 CRITICAL | 02    | Prompt Injection Defense        | `Perplexity_assist/CONTENT_FOUNDATION_SYNTHESIS.md` |
| 🔴 CRITICAL | 04    | Update Models (Llama 4, Qwen 3) | VRAM tabulka v CONTENT_FOUNDATION                   |
| 🔴 CRITICAL | 07    | MCP Lab                         | FastMCP kód v CONTENT_FOUNDATION                    |
| 🟡 HIGH     | 06    | GraphRAG                        | comprehensive_research_report.md                    |
| 🟡 HIGH     | 10    | LangGraph Focus                 | executive_brief.md                                  |

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

_Last updated: 2025-12-06 (Cycle 50 - Content Research Complete)_
