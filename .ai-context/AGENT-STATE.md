# 🧠 Agent State & Memory

Current Cycle: 31 (Visual Polish & Content Refinement) - COMPLETED
**Focus:** Diagram readability, code block rendering, lesson summary design.

## 🛠️ System Snapshot
- **Frontend:** Next.js 16, Tailwind v4, "Holographic Datapad".
- **Backend:** FastAPI, PostgreSQL (Auto-seed via `entrypoint.sh`).
- **Content:** 
    - Lesson 3: **Gold Standard**.
    - Lesson 4: **Masterpiece** (13 pages, 6 Labs, **Fixed Summary**).
    - Lesson 5: **Masterpiece** (10+ pages, 3 Labs).
    - Lesson 6: **Masterpiece** (20+ pages, RAG Diagram, Video Integration).

## 🔑 Critical Protocols (SOP)
1.  **Content Generation:** Follow `CONTENT_GUIDELINES.md`. **Quiz in JSON, not MDX.**
2.  **DB Changes:** Nuclear reset only. `docker-compose down -v`.
3.  **Visuals:** No walls of text. Use `<Diagram>`, `<ConceptCard>`, or Emoji.
4.  **Diagram Colors:** ALWAYS use `fill-slate-600 dark:fill-slate-400` for text (not `fill-slate-400`).
5.  **Code Blocks:** Supported everywhere. Parser properly skips closing ``` marker.

## ⏭️ Next Steps (Backlog)
- **Lesson 7:** Course Summary & Final Exam (The Grand Trial).
- **Phase 2 (Coding):** Setup Python sandbox environment.
