# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Boot Checklist v4.0 (POVINNÉ - VŽDY!)

⚠️ **PŘED JAKOUKOLIV AKCÍ projdi tyto kroky:**

```
1. □ PŘEČTI WORKING_CONTEXT.md     → Kde jsme? Co děláme?
     Read: .ai-context/state/WORKING_CONTEXT.md

2. □ URČI TYP ÚKOLU               → Content? Debug? Implementation?

3. □ ZKONTROLUJ CRITICAL_RULES    → Delegace? Thin protocol? (sekce níže)

4. □ PODMÍNĚNÉ LOADING            → Viz tabulka, přečti relevantní soubor

5. □ ODPOVĚZ UŽIVATELI            → "Pokračujeme od [X]. Další: [Y]."
```

**Sebe-verifikace:** Po přečtení souboru CITUJ jedno pravidlo které aplikuješ.

**Průběžně:** Aktualizuj `WORKING_CONTEXT.md` (před context compactem POVINNĚ!)

---

## 🔄 Context Recovery Protocol (Po komprimaci/resumption)

**⚠️ POKUD čteš toto po context compression nebo "conversation continued":**

Toto je seznam pravidel která se NEJČASTĚJI ztrácejí po komprimaci. Zkontroluj je!

### TOP 5 Survival Rules (NIKDY nezapomeň):

1. **📖 WORKING_CONTEXT.md FIRST** - Vždy přečti před akcí
2. **🔇 THIN PROTOCOL** - Do chatu jen summary + paths, ne dumps
3. **🎯 DELEGACE** - Content → Gemini, Hard bugs → GPT-5.2 (Codex)
4. **✅ VERIFY BEFORE COMMIT** - `npm run verify` MUSÍ projít
5. **❓ BIG CHANGES → ASK** - Velké změny bez souhlasu uživatele = zakázáno

### Self-Check After Resumption:
```
□ Vím co je aktuální task? (Pokud ne → Read WORKING_CONTEXT.md)
□ Pamatuji si pravidla delegace? (Pokud ne → Re-read sekci níže)
□ Vím jaký model použít pro Gemini? (gemini -m gemini-3-pro-preview)
□ Mám aktualizovat WORKING_CONTEXT.md? (Pokud brzy compact → ANO!)
```

**TIP:** Pokud si nejsi jistý, znovu přečti celý tento soubor od začátku.

---

## ⛔ CRITICAL_RULES (vždy viditelné - NEIGNORUJ!)

### 🎯 Delegace (PROAKTIVNÍ - nečekej až budeš stuck!)

| Trigger | Agent | Profile | Příklad |
|---------|-------|---------|---------|
| **Auth/permissions změna** | GPT-5.2 | `security` | "Enumerate authz pitfalls" |
| **SQLAlchemy/DB změna** | GPT-5.2 | `deep` | "Check transaction/cascade" |
| **Prod incident** | GPT-5.2 | `hotfix` | "Smallest fix + test" |
| **>2 modules změna** | GPT-5.2 | `orchestrator` | "Plan implementation" |
| **10-15 min bez hypotézy** | GPT-5.2 | `deep` | "Root cause analysis" |
| **Nový endpoint** | GPT-5.2 | `tests` | "Happy + failure path" |
| **Před implementací** | GPT-5.2 | `review` | "Review approach first" |
| **Visual QA** | Gemini | Pro | Screenshot → analyze |
| **Content/lekce** | Gemini | Pro | Task Brief → generate |
| **UX/copy review** | Gemini | Pro | "Is this confusing?" |

> ⚠️ **MODEL RULES (POVINNÉ!):**
> - **Gemini Content/Research/QA:** `gemini -m gemini-3-pro-preview`
> - **Gemini Quick tasks:** `gemini` bez flagu = Flash
> - **Codex:** `codex exec -p [profile]` (NIKDY interaktivní mód!)
> - **MACP (oba):** User-facing UI+logic, Security UX, Release candidate
>
> ❌ **ZAKÁZANÉ MODELY:** `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-exp-*`
> ⚠️ **SELHÁNÍ 2025-12-18:** Volán špatný model → přidán GEMINI CHECKLIST do WORKING_CONTEXT.md

### 🔇 Thin Protocol (VŽDY!)

```
❌ NIKDY: DOM snapshoty do chatu (14k+ tokenů!)
❌ NIKDY: Dlouhé logy do chatu
✅ VŽDY: Cesty k souborům + 2-3 věty summary
✅ VŽDY: Screenshot → .playwright-mcp/file.png → Gemini
```

### 🗳️ MACP Triggery (konzultuj GPT-5.2 + Gemini)

Aktivuj když: Security změny | DB migrace | Breaking API | >30min stuck + 2 failed attempts

### ✅ Před KAŽDOU major akcí

```
□ Content? → Gemini (`gemini -m gemini-3-pro-preview`)
□ Commit? → npm run verify MUSÍ projít
□ Velká změna? → Zeptej se uživatele
□ MACP trigger? → Blind Ballot oběma agentům
```

---

## 📚 Podmíněné Loading

| Když děláš... | Přečti PŘED akcí | Proč |
|---------------|------------------|------|
| Content/lekce | `.ai-context/core/CONTENT_GUIDELINES.md` | Formát, persona, QA checklist |
| Multi-agent/MACP | `.ai-context/AGENT_PROTOCOL.md` | Domain weights, handoff |
| Debug >30min | `.ai-context/state/MEMORY.md` → Lessons | Neopakuj stejné chyby |
| Architektura | `.ai-context/core/ARCHITECTURE.md` | Struktura systému |
| GPT-5.2 volání | `CODEX.md` | Debug Packet template |

---

## 🎯 Tvoje Role (v5.2)

- **Primary Implementer + QA gate:** změny v repo, integrace, ověření (`npm run verify`, backend testy)
- **Deleguj:** content + visual QA → Gemini CLI; quick research → Perplexity
- **Eskaluj:** hard reasoning / záhadné bugy → GPT‑5.2 přes Codex
- **Thin protocol:** do chatu jen shrnutí + cesty k artefaktům

---

## 🔧 Nástroje & Konfigurace

### Research Selection Matrix
| Potřebuji... | Nástroj | Rychlost |
|--------------|---------|----------|
| Rychlá fakta | WebSearch | ⚡ 5s |
| Dokumentace knihovny | Context7 MCP | ⚡ 5s |
| Quick research | Perplexity MCP | ⚡ 10s |
| Deep research (short) | Gemini CLI | ⏱️ 2-5m |
| Deep research (long) | Gemini Deep Research | ⏱️ 20-60m |

### Codex Profile Decision Tree (10-second rule)

| Situace | Profil | Příklad |
|---------|--------|---------|
| Quick question, simple task | `fast` | "What does this error mean?" |
| Code review, CI fix | `review` | "Review this PR diff" |
| Bug >30min, need root cause | `deep` | "Find why test fails" |
| Multi-component planning | `orchestrator` | "Plan auth system redesign" |
| Auth/permissions change | `security` | "Review this JWT change" |
| Production incident | `hotfix` | "Minimal fix for 500 error" |
| Writing/improving tests | `tests` | "Add edge case coverage" |
| Documentation update | `docs` | "Clarify this API endpoint" |

**Default:** `review` (balanced speed/quality)

### Codex CLI (GPT-5.2)

```bash
# ✅ VŽDY POUŽÍVEJ `codex exec -p [profile]`

# Profily:
codex exec -p fast "Quick question"           # low - triage
codex exec -p deep "Root cause analysis"      # high - bounded problem
codex exec -p orchestrator "Plan feature X"   # high - decompose work
codex exec -p review "Review this diff"       # medium - code review
codex exec -p security "Check for IDOR"       # high - threat model
codex exec -p hotfix "Minimal fix for bug"    # medium - prod incident
codex exec -p tests "Add coverage for /api"   # medium - test strategy
codex exec -p docs "Update README"            # low - documentation

# Dlouhé prompty přes heredoc:
cat << 'EOF' | codex exec -p orchestrator 2>&1
[Debug Packet]
## Symptom: ...
## Tried: ...
EOF

# S obrázky:
codex exec -i /path/to/screenshot.png "Analyze this error"
```

**Deep vs Orchestrator:**
- `deep` = bounded problem, concrete fix (shape is clear but hard)
- `orchestrator` = decompose work, delegation plan (shape is unclear)

**Reasoning Levels:** `low` → `medium` → `high` → **`xhigh`** (max kvalita)
- `xhigh`: deep, orchestrator, security (nejdůležitější úkoly)
- `high`: review, hotfix, tests
- `medium`: default, docs
- `low`: fast

**PROAKTIVNĚ deleguj** (nečekej až budeš stuck!) - viz tabulka Delegace výše.

### Gemini OAuth Fix
```bash
rm -f ~/.gemini/mcp-oauth-tokens-v2.json  # Pak CLI funguje
```

---

## 🧪 QA Workflow (POVINNÉ po content generation!)

**Po KAŽDÉM vytvoření/úpravě lesson obsahu MUSÍŠ provést:**

### 1. Backend Verification
```bash
# Restartuj backend pro načtení nového obsahu
docker compose restart backend

# Zkontroluj logy - hledej správný lab count a reading time
docker compose logs backend 2>&1 | grep -E "(Processing lesson|Error)"

# Očekávaný formát: "📖 Processing lesson: [Name] (XX min, Y labs)"
```

### 2. Visual QA (Playwright)
```bash
# Přihlaš se jako admin a ověř vizuálně
1. Otevři http://localhost:3000/cs/login
2. Přihlaš se: admin@ai-platform.com / admin123
3. Naviguj na kurz → ověř lab count a reading time v seznamu
4. Otevři lekci → zkontroluj:
   - ✅ Callout se renderuje správně
   - ✅ Tabulky mají správnou strukturu
   - ✅ Code blocks mají "Copy" tlačítko
   - ✅ Lab sekce má správné emoji a formátování
   - ✅ Navigace mezi stránkami funguje
```

### 3. Content Format Requirements
```markdown
# Header Callout MUSÍ obsahovat (pro správné parsování):
⏳ **Reading Time:** XX min | 🧪 **[N] Labs Included**

# Česká verze:
⏳ **Čas čtení:** XX min | 🧪 **[N] Laby součástí**

# ŠPATNĚ (backend neparsuje):
**Time:** ~35 min read | **Labs:** 2 practical exercises
```

### 4. QA Checklist před označením jako "hotovo"
```
□ Backend log ukazuje správný lab count
□ Vizuálně ověřeno v prohlížeči (přihlášen!)
□ Všechny sekce se renderují správně
□ Code blocks fungují
□ Quiz soubory existují (quiz.json + quiz.cs.json)
```

**⚠️ NIKDY neprohlašuj content jako "hotovo" bez provedení tohoto QA workflow!**

---

## Project Overview

Gamified AI learning platform with Czech localization (English/Czech). Features Star Wars theming (Jedi/Sith), XP progression, interactive labs, and MDX-based course content. Built with Next.js 16 (App Router), FastAPI, PostgreSQL, and Redis, deployed via Docker Compose.

## Architecture

**Frontend:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + next-intl
**Backend:** FastAPI + SQLAlchemy + Alembic (migrations)
**Database:** PostgreSQL 15 (persistent volume: `postgres_data`)
**Cache/Sessions:** Redis 7 (persistent volume: `redis_data`)
**Automation:** n8n (optional, shares PostgreSQL)
**Deployment:** Docker Compose (development + production configs)

## Development Prerequisites

### Required Tools
- **Node.js:** v20+ (check with `node --version`)
- **npm:** v10+ (comes with Node)
- **Docker & Docker Compose:** Latest stable
- **Git:** Latest stable

### First-Time Setup (Fresh Environment)
```bash
# 1. Clone repo
git clone <repo-url> && cd ai-learning-platform

# 2. Install root dependencies (husky pre-commit hooks)
npm install

# 3. Install frontend dependencies
cd frontend && npm install && cd ..

# 4. Copy environment file
cp .env.prod.example .env  # or create from template in CLAUDE.md

# 5. Start platform
make up
```

### After Git Pull
```bash
# Always run after pulling changes
cd frontend && npm install && cd ..
npm install  # root (for husky updates)
```

## Development Commands

### Quick Start
```bash
make up              # Start platform (build + detached mode)
make logs            # View all logs
make down            # Stop all containers
```

### Common Operations
```bash
make restart         # Restart all containers
make logs-backend    # Backend logs only
make logs-frontend   # Frontend logs only
make shell-backend   # Bash in backend container
make shell-frontend  # Shell in frontend container
make test-backend    # Run pytest
make reset          # ☢️ NUCLEAR: Delete DB/volumes, rebuild
```

### Manual Docker Commands
```bash
docker compose up -d --build              # Full build & start
docker compose down -v                    # Stop & delete volumes (DB reset)
docker compose exec backend bash          # Shell into backend
docker compose exec backend pytest        # Run tests
docker compose restart [service]          # Restart specific service
```

### Frontend Development
```bash
cd frontend
npm run dev          # Development server (hot reload)
npm run build        # Production build
npm run lint         # ESLint
```

### Backend Development
```bash
cd backend
python seed.py       # Seed database (auto-runs in entrypoint.sh)
pytest               # Run tests
```

### Running Single Tests
```bash
docker compose exec backend pytest tests/test_auth.py::test_register_user
docker compose exec backend pytest -k "test_login"
```

## Key Directory Structure

```
ai-learning-platform/
├── .github/workflows/ci.yml       # GitHub Actions CI pipeline
├── .husky/pre-commit              # Pre-commit TypeScript check
├── frontend/
│   ├── app/[locale]/              # Dynamic routing (en, cs)
│   │   ├── login/, register/      # Auth pages
│   │   ├── profile/               # User profile with avatar
│   │   ├── courses/[courseId]/    # Course listing
│   │   └── courses/[courseId]/lessons/[lessonId]/
│   ├── components/                # 27+ UI components
│   ├── messages/{en,cs}.json      # Translations
│   ├── i18n/                      # Locale routing config
│   └── middleware.ts              # Locale detection
├── backend/
│   ├── app/
│   │   ├── models.py              # SQLAlchemy DB models
│   │   ├── schemas.py             # Pydantic request/response
│   │   ├── main.py                # FastAPI app + auth endpoints
│   │   ├── routers/               # API endpoints (lessons, users, feedback, sandbox, health)
│   │   └── services/              # Business logic (content_loader, email, sandbox_service)
│   ├── alembic/                   # Database migrations
│   ├── tests/test_auth.py         # Authentication tests
│   └── seed.py                    # Auto-seed script (runs on startup)
├── content/courses/               # MDX lessons with metadata
│   └── [course-slug]/lessons/[lesson-id]/
│       ├── content.mdx            # English content
│       ├── content.cs.mdx         # Czech content
│       ├── meta.json              # Lesson metadata
│       ├── quiz.json              # English quiz
│       ├── quiz.cs.json           # Czech quiz
│       └── images/                # Lesson images
└── .ai-context/                   # AI agent documentation
    ├── core/                      # ARCHITECTURE.md, VISION.md, CONTENT_GUIDELINES.md
    └── state/                     # WORKING_CONTEXT.md, MEMORY.md
```

## Database Schema (Key Models)

**User:** email, hashed_password, difficulty_level, xp, avatar, is_verified, verification_token
**Course:** title (en/cs), description (en/cs), difficulty_level, slug, order
**Lesson:** title (en/cs), content (mdx en/cs), quiz (json), order, video_url, duration_minutes
**UserProgress:** user_id, lesson_id, current_page, completed_labs (JSON), quiz_score, last_accessed
**FeedbackItem:** user_id, feedback_text, metadata (JSON)

## Database Migrations

**Development (Quick Reset):**
```bash
make reset    # Nuclear option: deletes DB, rebuilds everything
```

**Production (Safe Migrations):**
```bash
docker compose exec backend alembic revision --autogenerate -m "Add xyz column"
docker compose exec backend alembic upgrade head
```

## Localization (EN/CZ)

- **Routing:** `/en/*` and `/cs/*` (handled by `middleware.ts`)
- **Frontend Translations:** `frontend/messages/{en,cs}.json`
- **Content Localization:** Each lesson has `content.mdx` + `content.cs.mdx`, `quiz.json` + `quiz.cs.json`
- **Backend:** Query param `?lang=cs` returns Czech content

## Content Guidelines

### Structure of a Lesson
1. **Header Callout:** Mission goal, reading time, lab count
2. **The Hook:** Why it matters (Star Wars analogy allowed)
3. **Core Concepts:** Sections with visual anchors
4. **Interactive Labs:** Copy-paste ready prompts
5. **The Holocron:** Summary ConceptCard at end

### Visual Rules
- **NO Raster Images:** Use SVG diagrams via `<Diagram type="...">` component
- **Check First:** Before creating new diagrams, check `frontend/components/mdx/diagrams/` for existing ones
- **Available Diagram Types:** `neural-network`, `training-loop`, `traditional-vs-ml`, `ai-timeline`, `dashboard-ui`, `data-analysis-chart`
- **Dark Mode:** Always use dark-mode-aware classes: `fill-slate-600 dark:fill-slate-400`

### Components
- **`<ConceptCard>`:** Key definitions, summaries (supports nested Markdown)
- **`<Steps>`:** Sequential instructions or lab analysis
- **`<Callout>`:** Warnings, tips, info (types: `info`, `warning`, `success`, `tip`)
- **`<Diagram>`:** SVG diagrams (scales perfectly, respects dark mode)

### Lab Standards
Labs must be "Copy-Paste" ready. Don't describe the prompt, write it exactly.

### Adding a New Lesson
1. Create directory: `content/courses/[course]/lessons/XX-name/`
2. Add files: `content.mdx`, `content.cs.mdx`, `meta.json`, `quiz.json`, `quiz.cs.json`
3. Restart backend: `docker compose restart backend`

## Environment Variables

Required in `.env` file:

```bash
# Database
POSTGRES_USER=ai_user
POSTGRES_PASSWORD=CHANGE_ME_SECURE_PASSWORD
POSTGRES_DB=learning_platform
DATABASE_URL=postgresql://ai_user:password@db:5432/learning_platform

# Redis
REDIS_URL=redis://redis:6379/0

# Security (generate with: openssl rand -hex 32)
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000  # Dev
# Production: https://yourdomain.com/api

# Email (SMTP)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=YOUR_SENDGRID_API_KEY
EMAILS_FROM_EMAIL=noreply@yourdomain.com

# Admin User (created on first seed)
FIRST_SUPERUSER=admin@ai-platform.com
FIRST_SUPERUSER_PASSWORD=admin123
```

## Default Credentials (Development)

- **Email:** admin@ai-platform.com
- **Password:** admin123

## Docker Services

1. **frontend** (port 3000) - Next.js app with hot reload in dev
2. **backend** (port 8000) - FastAPI with uvicorn reload in dev
3. **db** (port 5432) - PostgreSQL 15 (auto-seeded via `entrypoint.sh`)
4. **redis** (port 6379) - Caching and session storage
5. **n8n** (port 5678) - Optional workflow automation (shares PostgreSQL)
6. **nginx** (port 80) - Production only, reverse proxy

## API Structure

**Authentication:** JWT tokens (HS256), Argon2 password hashing
**Rate Limiting:** 5 req/min on login/register, configurable per router
**CORS:** Configured for specific origins
**API Docs:** http://localhost:8000/docs (Swagger UI)

**Key Endpoints:**
- `POST /register` - User registration with email verification
- `POST /login` - JWT token authentication
- `GET /courses` - List all courses
- `GET /lessons/{id}` - Get lesson content (supports `?lang=cs`)
- `PUT /lessons/{id}/progress` - Update user progress
- `POST /feedback` - Submit feedback

## Testing

**Backend:** pytest with SQLite in-memory database
```bash
docker compose exec backend pytest              # All tests
docker compose exec backend pytest tests/test_auth.py  # Specific file
```

**Frontend:** ESLint + TypeScript type checking
```bash
cd frontend
npm run lint         # ESLint
npm run typecheck    # TypeScript check (tsc --noEmit)
npm run verify       # Full verification: lint + typecheck + build
```

## CI/CD & Build Verification

### Automatic Checks (GitHub Actions)
Every PR and push to `main` triggers `.github/workflows/ci.yml`:
- **Frontend:** `npm ci` → `npm audit` → `npm run lint` → `tsc --noEmit` → `npm run build`
- **Backend:** `pip install` → `pytest`

PR cannot be merged if CI fails (including HIGH+ security vulnerabilities).

### Pre-commit Hooks (Husky)
Local TypeScript check runs before every commit:
```bash
# Installed via: npm install (in root)
# Hook: .husky/pre-commit
```
If typecheck fails, commit is blocked.

### Dependabot (Automated Dependency Updates)
GitHub Dependabot automatically monitors dependencies and creates PRs:
- **Config:** `.github/dependabot.yml`
- **Schedule:** Weekly (Monday 9:00 CET) for minor/patch updates
- **Security:** Immediate PRs for known vulnerabilities (CVEs)
- **Scope:** Frontend (npm), Backend (pip), GitHub Actions

**How it works:**
1. Dependabot detects outdated/vulnerable package → creates PR
2. CI runs automatically (build + tests + audit)
3. If CI passes ✅ → safe to merge
4. If CI fails ❌ → dependency breaks something, investigate before merge

**Agent responsibility:** Review and merge Dependabot PRs during regular dev cycles. No special agent instructions needed - Dependabot is fully automated by GitHub.

### End-of-Cycle Checklist
**IMPORTANT:** Before ending a development cycle, ALWAYS run:
```bash
cd frontend && npm run verify   # Must pass!
docker compose exec backend pytest  # Must pass!
```

This ensures:
1. No TypeScript errors
2. Production build works
3. Backend tests pass
4. Code is ready for deployment

### Manual Build Verification
```bash
# Frontend full check
cd frontend
npm run verify       # lint + typecheck + build

# Or step by step:
npm run lint         # ESLint
npm run typecheck    # TypeScript only
npm run build        # Production build
```

## Security Features

- JWT token authentication (HS256)
- Password hashing with Argon2
- Email verification required for new users
- CORS configured for specific origins
- Rate limiting on authentication endpoints
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)

## Content Loading

Backend's `ContentLoader` service:
1. Scans `content/courses/` directory for MDX files
2. Parses metadata from `meta.json`, quizzes from `quiz.json`
3. Stores in PostgreSQL on startup (via `seed.py` in `entrypoint.sh`)
4. Caches in memory for fast access

## Common Issues

### Frontend Restarts in Loop
Check logs: `docker logs ai-frontend --tail 50`
If missing dependency: `cd frontend && npm install <package> && docker compose restart frontend`

### Backend SQL Error (Missing Column)
DB schema is stale. Nuclear reset: `make reset`

### Lessons Don't Display
Backend is still seeding. Check: `docker logs ai-backend` for "✅ Hotovo! DB naplněna z content souborů."

### Port Already in Use
Change ports in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Frontend on 3001
```
Update `NEXT_PUBLIC_API_URL` in `.env` if changing backend port.

## Production Deployment

1. Clone repo on server (Ubuntu 24.04 + Docker)
2. Create `.env` with production secrets
3. Run: `docker compose -f docker-compose.prod.yml up -d --build`
4. Nginx routes traffic to frontend (3000) and backend (8000)
5. Configure SSL/TLS with Let's Encrypt (via reverse proxy)

## Component Patterns

**Difficulty Badge:** Fixed top-right, gradient background, 2px white border
**Jedi/Sith Toggle:** Fixed top-left, glass panel, active: colored + scale-105
**ConceptCard:** Grid layout (1-3 cols), solid background, 2px colored border
**Lab Section:** Solid background, 2px purple/red border, numbered steps with badges
**XP Progress Bar:** Fixed bottom, Clippy avatar (left), gradient progress bar (center)

## Key Dependencies

**Frontend:**
- next 16.0.3
- react 19.2.0
- next-intl 4.5.5 (localization)
- next-mdx-remote 5.0.0 (MDX rendering)
- tailwindcss 4 (styling)
- axios 1.13.2 (API calls)

**Backend:**
- fastapi (REST API)
- sqlalchemy (ORM)
- alembic (migrations)
- passlib[argon2] (password hashing)
- python-jose[cryptography] (JWT)
- slowapi (rate limiting)
- redis (caching)

## Agent Coordination Protocol (v5.1)

### Memory Architecture (v3.1)
| Typ | Soubor | Účel |
|-----|--------|------|
| **Working** | `WORKING_CONTEXT.md` | Aktuální task + mini log (aktualizuj průběžně!) |
| **Long-term** | `MEMORY.md` | Protokoly, lessons learned |

### Critical Rules
Kompletní pravidla: `.ai-context/AGENT_PROTOCOL.md`

1. **GENERATE → WRITE → VERIFY** - Nikdy neprohlašuj "hotovo" bez verifikace
2. **No Big Actions Without Permission** - Velké změny → ptej se uživatele
3. **Stay Current** - Použij systémové datum, pro verze/trendy → WebSearch
4. **Verify Before Commit** - `npm run verify` + `pytest` MUSÍ projít

### Multi-Agent Strategy (v5.1)
| Agent | Entry Point | Role |
|-------|-------------|------|
| Claude Code | `CLAUDE.md` | Primary Implementer + QA gate |
| GPT‑5.2 (Codex CLI) | `CODEX.md` | Situational Orchestrator (hard reasoning) |
| Gemini CLI | `GEMINI.md` | Content + Visual QA |
| Antigravity | `rules.md` | Full-stack Developer |

Všichni sdílí: `AGENT_PROTOCOL.md`, `WORKING_CONTEXT.md`, `MEMORY.md`

**Handoff:** Aktualizuj `WORKING_CONTEXT.md` před předáním.

### Code Quality Checklist (Before Commit)
```bash
cd frontend && npm run verify   # TypeScript + ESLint + Build
make test-backend  # Backend tests (pytest)
```

### Technical Debt Tracking
Known issues to address:
- [x] `ABTestShowcase.tsx` - ✅ Split into 4 modules (commit acce9d5)
- [ ] `MarkdownRenderer.tsx` - custom parser, consider next-mdx-remote
- [ ] Custom hook needed: `useProgressCheck()` for Quiz/LabSection
- [ ] Error boundary: `frontend/app/error.tsx` missing

## Additional Documentation

| Potřebuji... | Viz soubor |
|--------------|------------|
| Navigaci/mapu | `.ai-context/INDEX.md` |
| Společná pravidla | `.ai-context/AGENT_PROTOCOL.md` |
| Architekturu | `.ai-context/core/ARCHITECTURE.md` |
| Vizi projektu | `.ai-context/core/VISION.md` |
| Content pravidla | `.ai-context/core/CONTENT_GUIDELINES.md` |
| Multi-agent workflow | `.ai-context/workflows/MULTI_AGENT_WORKFLOW.md` |
| Subagent strategy | `.ai-context/workflows/SUBAGENT_STRATEGY.md` |
