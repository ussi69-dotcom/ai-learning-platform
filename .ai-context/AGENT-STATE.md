# 🧠 Agent State & Memory

## 📍 Current Status
**Cycle:** 23 Completed (Gamification & Progress)
**Focus:** Stable, Gamified Learning Platform with "Holographic Datapad" UI.

## 🛠️ System Snapshot
- **Frontend:** Next.js 16 (App Router), Tailwind v4, Lucide Icons.
- **Backend:** FastAPI, SQLAlchemy (Async-ish logic but Sync DB driver `psycopg2`).
- **DB:** PostgreSQL 15. **Managed via `entrypoint.sh`**.
- **Theme:** Jedi (Light) / Sith (Dark). Semantic colors `oklch`.

## 🔑 Critical Knowledge (SOP)
1.  **DB Changes:** ALWAYS `docker-compose down -v && docker-compose up --build`. Never seed manually.
2.  **Progress:** Logic is in `UserProgress` (JSON `completed_labs`, `quiz_score`, `current_page`).
3.  **Content:** `content/` folder is mounted. Edits require backend restart.

## 📝 Recent Accomplishments
- Implemented "Smart Progress" (resume where left off).
- Fixed "XP Farming" (labs tracked individually).
- Polished UI (Holographic glass, mobile navigation).
- Documented everything in `CONTENT_GUIDELINES.md`.

## ⏭️ Next Steps (Backlog)
- **Content:** Create more lessons using the new template.
- **Mobile App:** Maybe wrap this in Capacitor?
- **AI Integration:** Connect real LLM for open-ended lab feedback (currently mocked).
