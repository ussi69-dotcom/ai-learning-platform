# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Boot Sequence (v3.0)

### ⚠️ STOP! PŘED JAKOUKOLIV AKCÍ UDĚLEJ TOTO:

**Krok 1:** Použij Read tool na tyto 3 soubory (POVINNÉ!):
```
Read: .ai-context/AGENT_PROTOCOL.md       ← 🔥 SPOLEČNÁ PRAVIDLA
Read: .ai-context/state/WORKING_CONTEXT.md ← KDE JSME, CO DĚLÁME
Read: .ai-context/state/MEMORY.md          ← Protokoly, lessons learned
```

**Krok 2:** Ověř synchronizaci:
```bash
git log -1 --oneline  # Porovnej s WORKING_CONTEXT
```

**Krok 3:** OKAMŽITĚ odpověz uživateli:
> "Jsem Claude. Pokračujeme od [task]. Stav: [status]. Další: [next step]."

**⛔ NIKDY nezačínej pracovat bez splnění kroků 1-3!**
**⛔ Ani continuation sessions nejsou výjimka!**

**Během práce:**
- Průběžně aktualizuj `WORKING_CONTEXT.md`

**Před context compactem (80%):**
- POVINNĚ aktualizuj `WORKING_CONTEXT.md`!

**Na konci session:**
- Aktualizuj `WORKING_CONTEXT.md` (stav pro příště)

**Role-based loading (dle typu úkolu):**
- Content → `core/CONTENT_GUIDELINES.md`
- Multi-agent → `workflows/MULTI_AGENT_WORKFLOW.md`
- Codebase exploration → `workflows/SUBAGENT_STRATEGY.md`

**NEČTI při startu:** `SESSION_LOG.md`, `history/*` (archiv)

---

## ⛔ KRITICKÁ PRAVIDLA (NEIGNORUJ!)

### Content Creation = DELEGUJ NA GEMINI
```
NIKDY nepiš content sám!
1. Vytvoř Task Brief s Persona + DoD
2. Zavolej Gemini přes BASH CLI (ne MCP tool!):
   cat << 'EOF' | gemini -m gemini-3-pro-preview 2>&1
   [prompt]
   EOF
3. Model: gemini-3-pro-preview (NE 2.5!)
4. Proveď QA review výsledku
```

### Hard Reasoning = KONZULTUJ GPT-5.2 (NOVÉ Dec 2025)
```
Kdy volat GPT-5.2:
✅ Komplexní architektonická rozhodnutí
✅ Debugging záhadných bugů (>2 hodiny stuck)
✅ "Second opinion" na kritická PR
✅ Multi-step planning s vysokou uncertainty

Jak volat:
1. ChatGPT Plus (chat.openai.com) → GPT-5.2 Thinking
2. Codex CLI: codex "Your question"

Kdy NEVOLAT:
❌ Běžné kódování (ty to zvládneš)
❌ Research (Gemini je levnější)
❌ Content generation (Gemini lepší)
```

### Research Selection Matrix
```
| Potřebuji...           | Nástroj              | Rychlost |
|------------------------|----------------------|----------|
| Rychlá fakta           | WebSearch            | ⚡ 5s    |
| Dokumentace knihovny   | Context7 MCP         | ⚡ 5s    |
| Quick research         | Perplexity MCP       | ⚡ 10s   |
| Deep research (short)  | Gemini CLI           | ⏱️ 2-5m  |
| Deep research (long)   | Gemini Deep Research | ⏱️ 20-60m|
```

### Gemini OAuth Fix (když nefunguje)
```bash
# MCP token konflikt - smaž tento soubor:
rm -f ~/.gemini/mcp-oauth-tokens-v2.json
# Pak normální volání přes Bash CLI funguje
```

### Gemini Model
```
VŽDY: gemini-3-pro-preview
NIKDY: gemini-2.5-pro, gemini-pro, nebo jiné
```

### Před KAŽDOU major akcí
```
□ Content? → Gemini (gemini-3-pro-preview)
□ Commit? → npm run verify MUSÍ projít
□ Velká změna? → Zeptej se uživatele
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
cp .env.example .env  # or create from template in CLAUDE.md

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
    └── state/                     # SESSION_LOG.md, CURRENT_TASK.md
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

## Agent Coordination Protocol (v3.0)

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

### Multi-Agent Strategy (v3.0)
| Agent | Entry Point | Role |
|-------|-------------|------|
| Claude Code | `CLAUDE.md` | Orchestrator, QA, Implementer |
| Gemini CLI | `GEMINI.md` | Researcher, Content Generator |
| Antigravity | `rules.md` | Full-stack Developer |

Všichni sdílí: `AGENT_PROTOCOL.md`, `WORKING_CONTEXT.md`, `MEMORY.md`

**Handoff:** Aktualizuj `WORKING_CONTEXT.md` před předáním.

### Code Quality Checklist (Before Commit)
```bash
cd frontend && npm run verify   # TypeScript + ESLint + Build
docker compose exec backend pytest  # Backend tests
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
