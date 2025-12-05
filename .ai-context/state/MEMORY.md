# 🧠 Unified Agent Memory

**This file is the Single Source of Truth for all agents (Gemini CLI & Antigravity IDE).**
Read this first to understand the environment, preferences, and active protocols.

---

## 🖥️ Environment Context
- **OS:** Linux
- **Node.js:** v24.11.1 (Note: High version, watch for compatibility)
- **Stack:** Next.js 16 (App Router), FastAPI, PostgreSQL 15, Redis 7, Docker Compose.
- **Design System:** "Liquid Glass" (Holographic Datapad). Dark mode, `backdrop-blur`, `oklch` colors.
- **Localization:** Czech (CZ) + English (EN) via `next-intl`.

## 🏗️ Project Architecture
- **Frontend:** `/frontend` (Next.js 16, Tailwind 4, Shadcn/UI).
- **Backend:** `/backend` (FastAPI, SQLAlchemy, Pydantic v2).
- **Content:** `/content` (MDX lessons, `meta.json`, `quiz.json`).
- **Database:** PostgreSQL (Service `db`). Auto-seeded via `backend/entrypoint.sh`.
- **Sandbox:** Docker Sibling Containers. Backend mounts `/var/run/docker.sock` to spawn isolated `python:3.11-slim` containers for code execution.

## 🔑 Standard Operating Protocols (SOPs)

### 1. Database Changes 🗄️
-   **Development:** You CAN use "Nuclear Reset" (`docker-compose down -v`) for rapid iteration, OR use Alembic.
-   **Production:** You **MUST** use Alembic Migrations. **NEVER** use `down -v`.
-   **Workflow:** See `.ai-context/workflows/DATABASE_MIGRATIONS.md`.

### 2. Content Engineering ✍️
- **Format:** MDX. Use `<Diagram>`, `<ConceptCard>`, `<Callout>`, `<Steps>`, `<Sandbox>`.
- **Images:** Avoid raster. Use `<Diagram type="...">` (SVG) or CSS.
- **Quizzes:** Defined in `quiz.json` (not MDX).
- **Diagrams:** Use specific colors (`fill-slate-600 dark:fill-slate-400`) for dark mode compatibility.

### 3. Backend Development 🐍
- **Sandbox:** Code execution requires `docker-compose` with socket mount.
- **Testing:** Use `scripts/test_sandbox.py` to verify execution environment.
- **Security:**
    - Rate Limiting via `slowapi` and Redis for login/registration/sandbox.
    - Strong password validation for new user registrations.
    - Email verification for new users.
    - Security HTTP Headers (HSTS, X-Frame-Options, X-Content-Type-Options).

### 4. Frontend Development 🎨
- **Styling:** Tailwind 4. No solid backgrounds; use transparency (`bg-card/50`).
- **State:** `AuthContext` for user state.
- **Localization:** `next-intl` used in UI.
- **Interactive Components:** Use `<Sandbox defaultCode="..." />` for Python labs.
- **UI Patterns:**
    - **Teaser -> Deep Dive:** Use a lightweight "Teaser" component on Homepage (e.g., `ABTestTeaser`) to drive traffic to a detailed "Showcase" on inner pages (e.g., About).
    - **Glass Monitoring:** System status and metrics should be visible but unobtrusive (glassmorphism).

### 5. CI/CD & Code Quality 🔄
- **GitHub Actions:** `.github/workflows/ci.yml` - runs on PR/push to main
- **Pre-commit:** Husky in `.husky/pre-commit` - TypeScript check before commit
- **Verification:** `cd frontend && npm run verify` (lint + typecheck + build)
- **ESLint:** Configured in `frontend/eslint.config.mjs`
  - React Hooks v7 rules temporarily disabled (tech debt)
  - 195 warnings, 0 errors (acceptable)
- **Node Version:** v20 (see `frontend/.nvmrc`)
- **Learning:** See `.ai-context/learning/CI_AND_CODE_QUALITY.md` for sysadmin-friendly explanation

---

## 👨‍💻 Architecture Leadership
- **Senior Architect:** Claude 4.5 Sonnet (Assigned: 2025-12-02)
- **Responsibilities:**
    - Documentation architecture and quality
    - System design decisions and ADRs
    - Code review and best practices enforcement
    - Monthly documentation audits
- **Key Deliverables:**
    - [Documentation Audit Report](../core/DOCUMENTATION_AUDIT_2025_12_02.md)
    - [Implementation Plan - Doc Optimization](../IMPLEMENTATION_PLAN_DOC_OPTIMIZATION.md)
    - [CLAUDE.md](../../CLAUDE.md) - Onboarding guide for future AI agents

## 📊 Current State Snapshot
- **Cycle:** 38 (Stabilization & Planning) - **COMPLETE**
- **Status:** Ready for Content Generation Phase
- **Key Achievements:**
    - "Masterpiece Standard" achieved for Lessons 3-6.
    - Localization architecture (`[locale]` routing) fully implemented.
    - Secure Code Execution: Implemented via `SandboxService` + Docker + `<Sandbox>` UI.
    - **API Security:** Rate Limiting, Strong Passwords, Email Verification, Security Headers.
    - **Playwright Visual Testing:** 48 baseline snapshots, `npm run test:visual`
    - **Infrastructure:** Multi-stage Docker builds, Makefile for DX.
    - **All known bugs fixed** (avatars, navigation, scroll issues)

---

## 🎯 Master Execution Plan (EXECUTION_PLAN.md)

### Content Status
| Phase | Kurz | Lekce | Stav |
|-------|------|-------|------|
| 1 | AI Basics (Padawan) | 7 | ✅ DONE |
| 2 | Prompt Engineering (Jedi) | 8 | 🔴 PRIORITA |
| 3 | Advanced AI (Master) | 8 | 🟡 Další |
| 4 | AI Engineering (Sith) | 8 | 🔵 Budoucnost |

### Role Split
| Agent | Odpovědnost |
|-------|-------------|
| **Claude Code** | Backend, bugy, architektura, review, git, Playwright QA |
| **Gemini CLI** | MDX lekce, kvízy, překlady, kreativní obsah |

### Sprint Priorities
1. **Sprint 1:** ✅ Stabilizace (bugy opraveny)
2. **Sprint 2:** Content Foundation - Gemini generuje lekce 01-04
3. **Sprint 3:** Content Expansion - zbytek Phase 2+3
4. **Sprint 4:** Polish & Deploy

### Key Files
- **Full Plan:** `.ai-context/EXECUTION_PLAN.md`
- **Visual QA:** `.ai-context/workflows/VISUAL_INSPECTION.md`
- **Content Guide:** `.ai-context/core/CONTENT_GUIDELINES.md`

### Tomorrow's Focus
1. Review EXECUTION_PLAN.md - finalizovat priority
2. Create slash commands (`/new-lesson`, `/validate-lesson`)
3. Start content generation (Phase 2: Prompt Engineering)
4. Coordinate Claude (backend) + Gemini (content)

---

## 📝 Agent Coordination

### Multi-Agent Setup (2025-12-05)

```
┌─────────────────────────────────────────────────────────────┐
│  GEMINI 3 Pro (1M context)    │  CLAUDE Opus 4.5 (200K)     │
│  • Orchestrátor/Strategist    │  • Implementátor            │
│  • 91.9% reasoning benchmark  │  • 98.2% tool use benchmark │
├─────────────────────────────────────────────────────────────┤
│  Gemini → Claude:             │  Claude → Gemini:           │
│  claude -p "prompt"           │  mcp__gemini-cli__ask-gemini│
└─────────────────────────────────────────────────────────────┘
```

**Full workflow:** `.ai-context/workflows/MULTI_AGENT_WORKFLOW.md`

### Lessons Learned (2025-12-05)
- **MCP není nutný** pro cross-agent volání - shell příkazy stačí
- **Gemini = Strategist** (větší context 1M, lepší reasoning 91.9%)
- **Claude = Implementer** (lepší tool use 98.2%, precizní coding)
- **Over-engineering alert:** Před builděním infrastruktury vždy zkusit nejjednodušší řešení

### Legacy Notes
- **CLI:** Use for heavy lifting, file ops, git.
- **IDE:** Use for visual checks, deep debugging.
- **Handoff:** Write to `state/SESSION_LOG.md` before exiting.
- **Stability First:** 🛑 DO NOT break working environments (e.g., Port 3000) to fix minor issues in secondary ones (Port 3001). If a feature works in the primary environment, prioritize maintaining that stability.
-   **Architecture Alignment:** 🏛️ The `vps-deployment` branch represents the production architecture (monolithic `main.py`). Do not introduce split routers (`routers/lessons.py`) unless explicitly refactoring the entire platform to match. Always check `vps-deployment` before re-implementing existing features.

### 5. Critical Incident Lessons (2025-11-30) 🚨
-   **VPS Parity:** Local dev must match VPS architecture. If VPS is monolithic, Local must be too (until fully refactored).
-   **Deep Verification:** UI testing is insufficient. Use scripts like `verify_xp_deep.py` to verify backend logic (XP, Localization) independently of frontend.
-   **Localization:** Requires both Backend logic (field swapping) AND Frontend request params (`lang=...`).

### 6. Documentation Hygiene 🧹
-   **Regular Audit:** Periodically check for duplicates, obsolete files, and dead links.
-   **Ask First:** Before deleting or archiving large chunks of history, consult the user.
-   **Single Source of Truth:** If information exists in `.ai-context`, do not duplicate it in root files (link to it instead).

### 7. Git Commit Standards 📦
-   **Feat:** New features or content.
-   **Fix:** Bug fixes.
-   **Refactor:** Code cleanup.
-   **Docs:** Documentation updates.
-   **Milestone:** Major cycle completion.