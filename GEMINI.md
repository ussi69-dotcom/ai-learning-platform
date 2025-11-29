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

## 🔑 Standard Operating Protocols (SOPs)

### 1. Database Changes = Nuclear Reset ☢️
If you modify `backend/app/models.py` or seed data:
```bash
docker-compose down -v && docker-compose up -d --build
```
*Never run `python seed.py` manually.*

### 2. Content Engineering ✍️
- **Format:** MDX. Use `<Diagram>`, `<ConceptCard>`, `<Callout>`, `<Steps>`.
- **Images:** Avoid raster. Use `<Diagram type="...">` (SVG) or CSS.
- **Quizzes:** Defined in `quiz.json` (not MDX).
- **Diagrams:** Use specific colors (`fill-slate-600 dark:fill-slate-400`) for dark mode compatibility.

### 3. Frontend Development 🎨
- **Styling:** Tailwind 4. No solid backgrounds; use transparency (`bg-card/50`).
- **State:** `AuthContext` for user state.
- **Localization:** `next-intl` used in UI.

### 4. Infrastructure & Deployment 🚀
- **Nginx Caching:** Nginx caches container IPs at startup.
- **Protocol:** ALWAYS restart Nginx after recreating backend/frontend containers:
  ```bash
  docker restart ai-nginx
  ```
  *Failure to do this results in 502 Bad Gateway / Connection Refused.*

### 5. Dependency Management 📦
- **Rule:** Do NOT improvise complex replacements for missing standard libraries/components (e.g., Shadcn, Radix, Pydantic).
- **Action:** Install the missing dependency (e.g., `npm install`, `pip install`) instead of hacking a custom solution.
- **Context:** Improvised code creates technical debt. Standard libraries are preferred.

---

## 📊 Current State Snapshot
- **Cycle:** 31 (Completed).
- **Status:** Lessons 1-7 localized to Czech. UI fully localized.
- **Key Achievements:**
    - "Masterpiece Standard" achieved for Lessons 3-6.
    - Localization architecture (`[locale]` routing) fully implemented.
    - Diagram component architecture robust.

---

## 📝 Agent Coordination
- **CLI:** Use for heavy lifting, file ops, git.
- **IDE:** Use for visual checks, deep debugging.
- **Handoff:** Write to `state/SESSION_LOG.md` before exiting.