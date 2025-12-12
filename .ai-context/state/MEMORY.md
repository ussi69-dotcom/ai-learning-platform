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
- **Stack:** Next.js 16.0.7, React 19.2.1, FastAPI, PostgreSQL 15, Redis 7, Docker Compose.
- **Agent Mode:** Claude CLI primary, Gemini via MCP (`ask-gemini`)
- **MCP Tools:** Playwright, GitHub, Context7, Figma, **Perplexity** (Deep Research)

## 🔑 Standard Operating Protocols (SOPs)

### 0. Research Tool Selection 🔍

**Kdy použít který nástroj:**

| Potřebuji... | Nástroj | Příklad |
|--------------|---------|---------|
| Rychlá fakta | `WebSearch` | "Nejnovější verze React?" |
| Dokumentace knihovny | `Context7 MCP` | "Jak použít useEffect?" |
| **Deep Research** | `Perplexity MCP` | "Srovnej AI code assistants" |
| Aktuální trendy | `Perplexity MCP` | "State-of-the-art RAG" |
| Content research | `Perplexity` → `Gemini` | Research → Content |

**Perplexity MCP nástroje (po restartu Claude):**
- `mcp__perplexity-search__perplexity_search` - rychlé hledání
- `mcp__perplexity-search__perplexity_research` - deep research

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
