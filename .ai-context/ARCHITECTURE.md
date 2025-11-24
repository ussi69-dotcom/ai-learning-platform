# Architecture Overview

## 🏗️ Tech Stack & Infrastructure
- **Repo**: `ussi69-dotcom/ai-learning-platform`
- **Infrastructure**: VPS Hetzner CPX32 (Ubuntu 24.04 LTS).
- **Containerization**: Docker, Docker Compose (v2).

### Components
1.  **Frontend**: Next.js 16 (App Router)
    - **Port**: 3000
    - **Tech**: TypeScript, Tailwind CSS, Shadcn/ui.
    - **Role**: UI, Client-side logic, connects to Backend via generated client.
2.  **Backend**: FastAPI (Python 3.11)
    - **Port**: 8000 (Docs at `/docs`)
    - **Tech**: Pydantic v2, SQLAlchemy (Sync).
    - **Role**: REST API, Business logic, DB access.
### 3. Database: PostgreSQL 15
*   **Role:** Persistent storage.
*   **Key Models:**
    *   `User`: Auth & XP.
    *   `Course` / `Lesson` / `Quiz`: Content structure.
    *   `UserProgress`: Smart tracking of user journey.
        *   `current_page` (Int): Remembers the exact slide user left off.
        *   `completed_labs` (JSON): List of completed Lab IDs (e.g. `["intro-lab", "rag-setup"]`).
        *   `quiz_score` (Int): Best score achieved on the lesson's quiz.
        *   `last_accessed` (DateTime): For "Resume Learning" functionality.

### 4. Database Management (SOP)
*   **Entrypoint:** The backend container uses `entrypoint.sh` to automatically wait for DB readiness and run `seed.py`.
*   **Reset Protocol:** To apply schema changes, volumes must be destroyed: `docker-compose down -v && docker-compose up`. Manual seeding is forbidden.

## 🔄 Data Flow (Smart Progress)
1.  **Resume:** `GET /users/me/last-lesson` -> Frontend redirects to Lesson + Page.
2.  **Reading:** Frontend debounces page changes -> `POST /lessons/{id}/progress`.
3.  **Lab:** User clicks "Finish" -> `POST /lessons/{id}/lab/complete` -> Backend checks `completed_labs` JSON -> Awards XP only if new.
4.  **Quiz:** User submits -> `POST /lessons/{id}/quiz/complete` -> Backend stores score -> Awards XP if passed (>70%).

## 🔌 Integration Points
- **LLM Feedback**: Integrated via dedicated service or direct API call.

---

**Status:** Aktualizováno listopad 2025  
**Agent Architecture:** Perplexity (Architect) + Antigravity (Executor)  
**OSS/Gemini/ostatní agenti se NEpoužívají pro tento projekt**
