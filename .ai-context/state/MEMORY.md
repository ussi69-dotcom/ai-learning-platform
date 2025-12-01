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

---

## 📊 Current State Snapshot
- **Cycle:** 35 (Security Hardening).
- **Status:** Core security features implemented & verified.
- **Key Achievements:**
    - "Masterpiece Standard" achieved for Lessons 3-6.
    - Localization architecture (`[locale]` routing) fully implemented.
    - Secure Code Execution: Implemented via `SandboxService` + Docker + `<Sandbox>` UI.
    - **API Security:** Rate Limiting, Strong Passwords, Email Verification, Security Headers.
    - **Deployment Security:** Prepared `scripts/setup_security.sh` for VPS.

---

## 📝 Agent Coordination
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