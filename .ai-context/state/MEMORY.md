# 🧠 Unified Agent Memory

**This file is the Single Source of Truth for all agents (Gemini CLI & Antigravity IDE).**
Read this first to understand the environment, preferences, and active protocols.

---

## 🖥️ Environment Context
- **OS:** Linux
- **Node.js:** v24.11.1 (Note: High version, watch for compatibility)
- **Stack:** Next.js 16 (App Router), FastAPI, PostgreSQL 15, Docker Compose.
- **Design System:** "Liquid Glass" (Holographic Datapad). Dark mode, `backdrop-blur`, `oklch` colors.
- **Localization:** Czech (CZ) + English (EN) via `next-intl`.

## 🏗️ Project Architecture
- **Frontend:** `/frontend` (Next.js 16, Tailwind 4, Shadcn/UI).
- **Backend:** `/backend` (FastAPI, SQLAlchemy, Pydantic v2).
- **Content:** `/content` (MDX lessons, `meta.json`, `quiz.json`).
- **Database:** PostgreSQL (Service `db`). Auto-seeded via `backend/entrypoint.sh`.
- **Sandbox:** Docker Sibling Containers. Backend mounts `/var/run/docker.sock` to spawn isolated `python:3.11-slim` containers for code execution.

## 🔑 Standard Operating Protocols (SOPs)

### 1. Database Changes = Nuclear Reset ☢️
If you modify `backend/app/models.py` or seed data:
```bash
docker-compose down -v && docker-compose up -d --build
```
*Never run `python seed.py` manually.*

### 2. Content Engineering ✍️
- **Format:** MDX. Use `<Diagram>`, `<ConceptCard>`, `<Callout>`, `<Steps>`, `<Sandbox>`.
- **Images:** Avoid raster. Use `<Diagram type="...">` (SVG) or CSS.
- **Quizzes:** Defined in `quiz.json` (not MDX).
- **Diagrams:** Use specific colors (`fill-slate-600 dark:fill-slate-400`) for dark mode compatibility.

### 3. Backend Development 🐍
- **Sandbox:** Code execution requires `docker-compose` with socket mount.
- **Testing:** Use `scripts/test_sandbox.py` to verify execution environment.

### 4. Frontend Development 🎨
- **Styling:** Tailwind 4. No solid backgrounds; use transparency (`bg-card/50`).
- **State:** `AuthContext` for user state.
- **Localization:** `next-intl` used in UI.
- **Interactive Components:** Use `<Sandbox defaultCode="..." />` for Python labs.

---

## 📊 Current State Snapshot
- **Cycle:** 34 (Frontend Sandbox Integration).
- **Status:** Full Stack Sandbox (Backend + UI) implemented.
- **Key Achievements:**
    - "Masterpiece Standard" achieved for Lessons 3-6.
    - Localization architecture (`[locale]` routing) fully implemented.
    - **Secure Code Execution:** Implemented via `SandboxService` + Docker + `<Sandbox>` UI.

---

## 📝 Agent Coordination
- **CLI:** Use for heavy lifting, file ops, git.
- **IDE:** Use for visual checks, deep debugging.
- **Handoff:** Write to `state/SESSION_LOG.md` before exiting.
