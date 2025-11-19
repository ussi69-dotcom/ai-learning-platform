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
3.  **Database**: PostgreSQL 15
    - **Port**: 5432
    - **Role**: Persistent storage (Users, Courses, Lessons, Progress).
4.  **Cache/Queue**: Redis 7
    - **Port**: 6379
5.  **Automation**: n8n
    - **Port**: 5678
    - **Role**: Background workflows, DB connection.

## 🔄 Data Flow (MVP)
1.  **Lesson Retrieval**: User -> Frontend -> `GET /api/lessons/{id}` -> Backend -> DB.
2.  **Quiz Submission**: User -> Frontend -> `POST /api/quiz/submit` -> Backend -> DB (Store) -> AI Service (Feedback) -> DB (Update).
3.  **Docker Networking**: Frontend calls Backend via `http://backend:8000` (Server-side) or `localhost:8000` (Client-side/Browser).

## 🔌 Integration Points
- **LLM Feedback**: Integrated via dedicated service or direct API call.
- **Stripe**: (Planned) Payment processing.
