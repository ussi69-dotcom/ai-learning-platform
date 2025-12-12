# 🚀 AI Learning Platform

Gamifikovaná platforma pro výuku AI konceptů s českou lokalizací.

## 📋 Požadavky

- **Docker** + **Docker Compose**
- **Git**

> **Poznámka:** Nepotřebuješ Node.js ani Python lokálně - vše běží v Dockeru!
>
> 🤖 **Pro AI Agenty:** Viz [.ai-context/workflows/MULTI_AGENT_WORKFLOW.md](.ai-context/workflows/MULTI_AGENT_WORKFLOW.md) pro workflow spolupráce (Claude = Orchestrator, Gemini = Researcher).
> 🌟 **Vize Projektu:** Viz [.ai-context/core/VISION.md](.ai-context/core/VISION.md).

---

## 🌟 Klíčové Funkce

- **AI-Native Workflow:** Platforma je spoluvytvářena agenty Claude (Orchestrace/QA) a Gemini (Research/Content).
- **Interactive AI Showcase:** Reálná demonstrace spolupráce Claude (Red Team) a Gemini (Blue Team) při řešení problémů.
- **Live System Status:** Transparentní monitoring infrastruktury (PostgreSQL + Redis) přímo na webu.
- **Gamifikace:** XP systém, úrovně obtížnosti (Piece of Cake až Damn I'm Good), vizuální progress.
- **Built in Public:** Celý vývoj je dokumentován a integrován do příběhu platformy.
- **Multi-stage Docker Build:** Optimalizované, bezpečné a malé production images.

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

## 🤖 Multi-Agent Workflow (v4.0) - December 2025

Projekt využívá **4 specializované AI modely** + subagenty pro optimální výkon:

### Architektura

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ORCHESTRATION LAYER                                 │
│                                                                          │
│                    Claude Opus 4.5 (Orchestrator)                        │
│                    - Long sessions, CLI, safety, QA gate                 │
│                    - Token-efficient (65% less than others)              │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GPT-5.2       │    │   Gemini 3 Pro  │    │   Perplexity    │
│   Thinking      │    │   + Deep Res.   │    │   Sonar         │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ Hard reasoning  │    │ Content gen.    │    │ Quick research  │
│ Architecture    │    │ Research        │    │ Fact-checking   │
│ Debugging       │    │ 2M context      │    │ Trends          │
│ $10/1M tokens   │    │ $5/1M tokens    │    │ $1/1k requests  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Kdy volat kterého agenta

| Typ úlohy | Agent | Proč |
|-----------|-------|------|
| **Hard reasoning** (architektura, debugging >2h) | GPT-5.2 | GPQA 93.2%, nejlepší reasoning |
| **Content generation** | Gemini CLI | 2M kontext, levný, kvalitní |
| **Deep research** (20-60 min) | Gemini Deep Research | Autonomní agent |
| **Quick research** (<5 min) | Perplexity MCP | Rychlé, s citacemi |
| **Kódování** | Claude Code | Token-efficient, bezpečný |
| **Codebase exploration** | Explore subagent | Systematické prohledání |
| **Plánování features** | Plan subagent | Architektonické rozhodnutí |

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
| `GEMINI.md` | Konfigurace pro Gemini CLI |
| `AGENTS.md` | Pravidla pro Codex CLI (GPT-5.2) |

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
3. Workflow: `.ai-context/workflows/MULTI_AGENT_WORKFLOW.md`

---

## 🆘 Podpora

Mrkni do `.ai-context/` pro:
- `INDEX.md` - mapa dokumentace
- `AGENT_PROTOCOL.md` - pravidla pro AI agenty
- `core/CONTENT_GUIDELINES.md` - jak psát lekce
- `core/ARCHITECTURE.md` - tech stack a struktura
- `state/WORKING_CONTEXT.md` - aktuální stav projektu

---


