# 🚀 AI Learning Platform

Gamifikovaná platforma pro výuku AI konceptů s českou lokalizací.

## 📋 Požadavky

- **Docker** + **Docker Compose**
- **Git**

> **Poznámka:** Nepotřebuješ Node.js ani Python lokálně - vše běží v Dockeru!
>
> 🤖 **Pro AI agenty (SSOT):** Začni v `.ai-context/AGENT_PROTOCOL.md` + `.ai-context/state/WORKING_CONTEXT.md`. Workflow v5.2: orchestrátor = aktivní konzole (agent, se kterým mluvíš), Claude Code = implementace/QA + Slack notifikace, GPT‑5.2 (Codex) = reasoning/architektura, Gemini 3 Pro = content + visual QA, research přes Context7 / Gemini Deep Research / Perplexity (manual).
> 🌟 **Vize Projektu:** Viz [.ai-context/core/VISION.md](.ai-context/core/VISION.md).

---

## 🌟 Klíčové Funkce

- **AI-Native Workflow:** Multi-agent triáda (Codex = reasoning, Claude Code = implementace/QA, Gemini 3 Pro = content/visual QA) s human‑in‑the‑loop přes Slack a Perplexity pro manuální research + daily digest.
- **Interactive AI Showcase:** Reálná demonstrace spolupráce Claude (Red Team) a Gemini (Blue Team) při řešení problémů.
- **Live System Status:** Transparentní monitoring infrastruktury (PostgreSQL + Redis) přímo na webu.
- **Gamifikace:** XP systém, úrovně obtížnosti (Piece of Cake až Damn I'm Good), vizuální progress.
- **Built in Public:** Celý vývoj je dokumentován a integrován do příběhu platformy.
- **Multi-stage Docker Build:** Optimalizované, bezpečné a malé production images.

---

## 🤝 Multi-Agent Workflow (pro začátečníky)

Orchestrátor je vždy **agent, se kterým právě mluvíš v CLI**. Když chceš přepnout, řekni to explicitně. Bez klíčových slov orchestrátor rozhodne sám.

### 1) Role v týmu

| Role | Co dělá | Kdy ho použít |
|------|---------|---------------|
| **GPT‑5.2 (Codex)** | Reasoning, architektura, složité debugování | Když potřebuješ tvrdé rozhodnutí nebo rozpad problému |
| **Claude Code** | Implementace, QA, git operace, Slack notifikace | Když potřebuješ doručit změnu nebo ověřit funkčnost |
| **Gemini 3 Pro** | Content, vizuální QA, brainstorming | Když jde o lekce, copy, vizuál nebo research |
| **Perplexity** | Manuální rychlý research | Když chceš rychle ověřit fakta (šetřit API) |
| **Gemini Deep Research** | Dlouhý výzkum (20–60 min) | Když potřebuješ hlubokou rešerši |

### 2) Jak to běží krok za krokem

1. **Definuj cíl + DoD** (hotovo znamená co přesně?).
2. **Orchestrátor navrhne plán** nebo si vyžádá upřesnění.
3. **Delegace úkolů**: kód → Claude, content/vizuál → Gemini, rozhodnutí → Codex.
4. **Implementace + QA** (testy, vizuální kontrola, sanity check).
5. **Shrnutí + rozhodnutí** (GO/NO‑GO/NEEDS‑DECISION) a případná Slack notifikace.

### 3) Klíčová slova (routing)

- `pouzij gemini` → přepne orchestrátora na Gemini
- `pouzij claude` → přepne orchestrátora na Claude
- `prober s kamosi` → triad consult (Codex + Claude + Gemini)
- `Notify: ...` → Slack notifikace přes Claude (viz níže)

---

## 👥 Human‑in‑the‑loop (Slack notifikace)

Slack je náš **asynchronní dohled**. Pouze Claude Code má přímý Slack MCP; ostatní agenti delegují notifikace přes Claude.

```
Codex / Gemini / Claude
        │ "Notify: ..."
        ▼
   Claude Code (Slack MCP)
        ▼
      Slack → 📱 User
```

**Konfigurace:**
- **Workspace:** AI Notifications
- **Team ID:** T0A5BQ6N3MG
- **Channel ID:** C0A4WBKJU7R
- **MCP Server:** @modelcontextprotocol/server-slack
- **Config:** `.mcp.json` (gitignored)

**Kdy notifikovat:**
- Task dokončený (>10 min práce)
- Testy failed
- Deploy complete
- Blocked / potřeba rozhodnutí
- Research hotový (delegovat přes Claude)

**Kdy nenotifikovat:**
- Triviální změny (<5 min)
- Průběžné status updatey (patří do `WORKING_CONTEXT.md`)
- Běžné commity

**Formát delegace:**
```
Pošli Slack notifikaci:
- Typ: task_done | error | blocked | info | research_done
- Summary: [1-2 věty co se stalo]
- Detail: [optional - cesta k souboru nebo context]
```

---

## 🏁 Quick Start (Nový Počítač)

### 1. Naklonuj Repozitář

```bash
git clone https://github.com/ussi69-dotcom/ai-learning-platform.git
cd ai-learning-platform
```

### 2. Vytvoř Environment File

> **Důležité**: Projekt má `.env` soubor gitignorovaný (odděluje dev/prod prostředí).

Pro rychlý start zkopíruj přiklád:
```bash
cp .env.prod.example .env
```

Výchozí hodnoty fungují pro lokální vývoj. Uprav podle potřeby.

### 3. Spusť Platformu

```bash
docker compose up -d --build
```

**To je vše!** Docker automaticky:
- Nainstaluje všechny závislosti
- Vytvoří databázi
- Naseeduje obsah lekcí
- Spustí všechny služby

### 3. Počkej ~2 minuty

Backend čeká na databázi a pak automaticky seeduje data.

### 4. Otevři v Prohlížeči

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8000/docs](http://localhost:8000/docs)

### 5. Přihlaš Se

- **Email:** `admin@ai-platform.com`
- **Heslo:** `admin123`

---

## 🛠️ Vývojářské Příkazy (Makefile)

Pro zjednodušení vývoje používáme `make`.

| Příkaz | Popis |
|--------|-------|
| `make up` | 🚀 Spustí platformu (build + detach) |
| `make logs` | 📋 Zobrazí logy všech služeb |
| `make down` | 🛑 Zastaví platformu |
| `make reset` | ☢️ **Nuclear Reset:** Smaže DB a volumes, znovu postaví |
| `make shell-backend` | 🐚 Otevře terminál v backendu |
| `make test-backend` | 🧪 Spustí testy (pytest) |

> **Tip:** Pokud nemáš `make`, můžeš stále používat `docker compose` příkazy (viz Makefile pro inspiraci).

---

## 🏗️ Manuální Docker Příkazy (Legacy)

### Zastavit Platformu

```bash
docker compose down
```

### Restartovat Frontend (po změnách v kódu)

```bash
docker compose restart frontend
```

### Restartovat Backend (po změnách v contentu)

```bash
docker compose restart backend
```

### Nuclear Reset (smaže DB, vyresetuje vše)

⚠️ **Použij POUZE když změníš `models.py` nebo potřebuješ čistou DB!**

```bash
docker compose down -v
docker compose up -d --build
```

---

## 🎬 Edutainment v3.0 (Filozofie Obsahu)

Platforma využívá **Edutainment** přístup - kombinaci vzdělávání a zábavy inspirovanou YouTube tvůrci jako ColdFusion a NetworkChuck.

### Klíčové principy

| Princip | Popis |
|---------|-------|
| **30-Second Hook** | Každá lekce začíná provokativním tvrzením nebo otázkou |
| **Cinematic Storytelling** | Narativní struktura s "bombami" (překvapivými momenty) |
| **Video Switcher** | Alternativní videa pro různé styly učení |
| **Visual Density** | Minimum 1 diagram na 5 minut čtení |
| **Copy-Paste Labs** | Hotové prompty, žádné "zkuste si..." |
| **Holocron Summary** | Každá lekce končí shrnutím v ConceptCard |

### Příklad struktury lekce

```
1. Header Callout (cíl mise, čas, počet labů)
2. VideoSwitcher (hlavní + alternativy)
3. ⚡ HOOK (bold claim - 30 sekund)
4. 📜 Historie ("bomby" - překvapivé momenty)
5. 🔬 Labs (copy-paste ready prompty)
6. 🏆 Holocron (shrnutí)
```

📚 **Detaily:** Viz `.ai-context/core/CONTENT_GUIDELINES.md` (sekce Edutainment Bible)

---

## 🌍 Lokalizace (EN/CZ)

Platforma podporuje **2 jazyky**: English (`/en`) a Čeština (`/cs`).

**Routing:**
- `/en` - anglická verze
- `/cs` - česká verze

**Překlady:**
- Frontend: `frontend/messages/en.json`, `frontend/messages/cs.json`
- Content: Každý lesson má `meta.json` s `title_cs` a `description_cs`

---\n\n## \ud83e\udd16 n8n Automation (Advanced)\n\nPlatforma zahrnuje **n8n** pro workflow automation.\n\n- **Web UI**: [http://localhost:5678](http://localhost:5678)\n- **Login**: `admin` / `password` (zm\u011b\u0148 v `.env`)\n- **Datab\u00e1ze**: Sd\u00edl\u00ed PostgreSQL s hlavn\u00ed aplikac\u00ed\n\n**Pl\u00e1novan\u00e9 pou\u017eit\u00ed:**\n- \ud83d\udce7 Email notifikace\n- \ud83d\udcca Monitoring & alerting (integrace s Grafana)\n- \ud83c\udf93 Budouc\u00ed labs: \"Building AI Automation Workflows\"\n\n> **Pro za\u010d\u00e1te\u010dn\u00edky**: n8n m\u016f\u017ee\u0161 zat\u00edm ignorovat. Nen\u00ed nutn\u00e9 pro z\u00e1kladn\u00ed funkci platformy.\n\n---

## 📂 Struktura Projektu

```
ai-learning-platform/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── models.py     # DB modely
│   │   ├── main.py       # API endpoints
│   │   └── services/
│   │       └── content_loader.py  # Načítání lekcí z MDX
│   └── entrypoint.sh     # Auto-seed skript
├── frontend/             # Next.js frontend
│   ├── app/
│   │   ├── [locale]/     # Lokalizované routy
│   │   └── ...
│   ├── components/       # UI komponenty
│   ├── i18n/             # Lokalizační konfigurace
│   └── messages/         # Překlady (en.json, cs.json)
├── content/              # Markdown/MDX lekce
│   └── courses/
│       └── ai-basics-beginner/
│           └── lessons/
│               ├── 01-what-is-ai/
│               ├── 02-how-does-ai-learn/
│               └── ...
├── .ai-context/          # Dokumentace pro AI agenty
└── docker-compose.yml    # Orchestrace služeb
```

---

## 🔧 Troubleshooting

### Frontend se restartuje pořád dokola

**Problém:** Chybí závislost nebo špatná konfigurace.

**Řešení:**
```bash
docker logs ai-frontend --tail 50
```

Pokud vidíš `Cannot find module 'next-intl'`:
```bash
cd frontend
npm install next-intl
docker compose restart frontend
```

### Backend vypisuje SQL chybu o neexistujícím sloupci

**Problém:** DB schéma je staré (změny v `models.py`).

**Řešení:**
```bash
docker compose down -v
docker compose up -d --build
```

### Lekce se nezobrazují

**Problém:** Backend ještě neseedoval data.

**Řešení:**
1. Zkontroluj logy: `docker logs ai-backend`
2. Počkej na `✅ Hotovo! DB naplněna z content souborů.`
3. Refresh prohlížeč

### Port 3000 nebo 8000 je obsazený

**Problém:** Jiná aplikace používá stejný port.

**Řešení:**
- Zastavit tu aplikaci, nebo
- Změnit porty v `docker-compose.yml`:
  ```yaml
  ports:
    - "3001:3000"  # Frontend na 3001
  ```

**Po změně portů:**
```bash
docker compose down
docker compose up -d --build
```

Také aktualizuj `NEXT_PUBLIC_API_URL` v `.env` pokud měníš port backendu.

---

## 🏗️ Vývoj

### Přidání Nové Lekce

1. Vytvoř složku: `content/courses/[course]/lessons/XX-lesson-name/`
2. Přidej `content.mdx`, `meta.json`, `quiz.json`
3. Restartuj backend: `docker compose restart backend`

📚 **Detaily:** Viz `.ai-context/CONTENT_GUIDELINES.md`

### Změna DB Schématu

**Development (Quick & Dirty):**
1. Uprav `backend/app/models.py`
2. Nuclear reset:
   ```bash
   docker compose down -v
   docker compose up -d --build
   ```

**Production (Safe Migrations):**
1. Uprav `backend/app/models.py`
2. Generate migration:
   ```bash
   docker compose exec backend alembic revision --autogenerate -m "Description"
   ```
3. Apply migration:
   ```bash
   docker compose exec backend alembic upgrade head
   ```

📚 **Detaily**: Viz `.ai-context/workflows/DATABASE_MIGRATIONS.md`

---

## 🚢 Deployment

### Lokální Produkční Build

```bash
# Frontend
cd frontend
npm run build

# Backend (používá Uvicorn, není potřeba build)
```

### Deploy na Server

1. Nainstaluj Docker na serveru
2. Klonuj repo
3. Nastav environment variables (pokud potřebuješ)
4. Spusť: `docker compose up -d --build`

---

## 📝 Poznámky

### Default Login

- **Admin:** `admin@ai-platform.com` / `admin123`

Vytvořeno při prvním seedování (`backend/seed.py`).

### Automatické Seedování

**Backend automaticky seeduje DB při startu** pokud:
- Tabulka `courses` je prázdná
- Nebo se spouští poprvé

**Soubory:**
- `backend/entrypoint.sh` - čeká na DB, pak spustí `seed.py`
- `backend/seed.py` - vytváří uživatele a načítá lekce

---

## 🤖 Multi-Agent Workflow (v5.2) - December 2025

Projekt běží na **aktivní orchestraci**: orchestrátor je vždy agent, se kterým právě mluvíš v CLI.

### Architektura (zjednodušeně)

```
┌─────────────────────────────────────────────────────────────────┐
│ Active Console = Orchestrator (Codex / Claude / Gemini)          │
└───────────────┬───────────────────────────────┬─────────────────┘
                │                               │
                ▼                               ▼
     Claude Code (implementace/QA + Slack)   Gemini 3 Pro (content/visual QA)
                │
                ▼
          Slack MCP → 📱 User Mobile
     Codex (GPT‑5.2) = reasoning/arch (na vyžádání)
```

Perplexity používáme pro manuální quick research a daily digest (šetříme API volání).

### Kdy volat kterého agenta

| Typ úlohy | Agent/Tool | Proč |
|-----------|------------|------|
| **Hard reasoning** (architektura, debugging >30 min / 2+ failed) | GPT‑5.2 (Codex) | Nejlepší reasoning, root cause |
| **Kódování** (implementace, refactor, QA gate) | Claude Code | Primární implementer + QA + git |
| **Visual QA / content** | Gemini 3 Pro (CLI) | Vizuální kontrola, edutainment, copy |
| **Docs research** | Context7 MCP | Rychlé a přesné API reference |
| **Quick research (manual)** | Perplexity MCP | Rychlé ověření, používat střídmě |
| **YouTube research** | YouTube Data MCP | 14 funkcí pro video research |
| **Deep research** (20-60 min) | Gemini Deep Research | Autonomní dlouhý výzkum |
| **Slack notifikace** | Claude Code (Slack MCP) | Jediný agent s přímým Slack přístupem |

### Memory systém (2-tier)

```
WORKING_CONTEXT.md (Working memory)
       │
       │ lessons learned
       ▼
MEMORY.md (Long-term)
```

### Klíčové soubory

| Soubor | Účel |
|--------|------|
| `.ai-context/AGENT_PROTOCOL.md` | Společná pravidla + routing matrix |
| `.ai-context/state/WORKING_CONTEXT.md` | Aktuální task a stav |
| `.ai-context/state/MEMORY.md` | Dlouhodobá paměť, protokoly |
| `CLAUDE.md` | Entry point pro Claude Code |
| `CODEX.md` | Entry point pro Codex CLI (GPT‑5.2 orchestrator) |
| `GEMINI.md` | Konfigurace pro Gemini CLI |
| `AGENTS.md` | Repo guidelines pro všechny agenty |

### MCP Servery (Model Context Protocol)

| Server | Účel | Klíčové funkce |
|--------|------|----------------|
| **Playwright** | Visual QA, browser automation | `browser_navigate`, `browser_take_screenshot`, `browser_click` |
| **Context7** | Dokumentace knihoven | `resolve-library-id`, `get-library-docs` |
| **Slack MCP** | Notifikace pro human‑in‑the‑loop | Delegace přes Claude Code |
| **Perplexity** | Quick research / Daily digest | `perplexity_ask`, `perplexity_search` |
| **YouTube Data** | Video research | `get_video_details`, `get_transcript`, `search_videos` (14 funkcí) |

### Scripts

```bash
# Gemini Deep Research (20-60 min autonomní research)
python backend/scripts/gemini_deep_research.py "Your research question"

# Daily Digest (Perplexity AI news aggregation)
python backend/scripts/daily_digest_cron.py

```

### Pro vývojáře

1. Přečti `.ai-context/INDEX.md` pro navigaci
2. Aktuální stav: `.ai-context/state/WORKING_CONTEXT.md`
3. Pravidla/workflow: `.ai-context/AGENT_PROTOCOL.md` (+ doplňky v `.ai-context/workflows/`)

---

## 🆘 Podpora

Mrkni do `.ai-context/` pro:
- `INDEX.md` - mapa dokumentace
- `AGENT_PROTOCOL.md` - pravidla pro AI agenty
- `core/CONTENT_GUIDELINES.md` - jak psát lekce
- `core/ARCHITECTURE.md` - tech stack a struktura
- `state/WORKING_CONTEXT.md` - aktuální stav projektu

---
