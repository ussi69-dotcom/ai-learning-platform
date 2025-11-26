# 🚀 Gemini Project Context - AI Learning Platform

## 📋 Project Overview
**Name:** AI Learning Platform (aka "Clippy Learns AI")
**Goal:** A gamified, interactive platform for learning AI concepts, featuring distinct difficulty levels (Rookie to Expert) and a "Liquid Glass" UI aesthetic.
**Architecture:** Full-stack web application using Next.js for the frontend and FastAPI for the backend, containerized with Docker.

## 🏗️ Tech Stack

### Frontend (`/frontend`)
*   **Framework:** Next.js 16 (App Router)
*   **Library:** React 19
*   **Styling:** Tailwind CSS 4, Shadcn/ui components
*   **Design System:** "Liquid Glass" (Dark mode, glassmorphism, `backdrop-blur`, no solid backgrounds)
*   **Key Libs:** `next-mdx-remote` (Content), `lucide-react` (Icons), `canvas-confetti` (Gamification)

### Backend (`/backend`)
*   **Framework:** FastAPI
*   **Language:** Python 3.11+
*   **Database ORM:** SQLAlchemy
*   **Validation:** Pydantic v2
*   **Auth:** JWT (python-jose), Passlib (Argon2)

### Infrastructure
*   **Containerization:** Docker & Docker Compose
*   **Database:** PostgreSQL 15 (Service: `db`)
*   **Cache:** Redis 7 (Service: `redis`)
*   **Reverse Proxy:** Traefik (implied by ports/setup usually, or direct exposure in dev)

## 🛠️ Building & Running

### Critical Workflows (READ THIS)

**1. Database Schema Changes = Nuclear Reset**
If you modify `backend/app/models.py`, you MUST reset the database volume:
```bash
docker-compose down -v && docker-compose up -d --build
```
*   **Seeding is AUTOMATED** via `backend/entrypoint.sh`.
*   **NEVER** run `python seed.py` manually unless debugging a specific issue in a running container.
*   **Default Login:** `admin@ai-platform.com` / `admin123`

**2. Frontend UI Updates**
If changes to `globals.css` or components don't show up:
```bash
docker-compose restart frontend
```
*   Next.js caching can be aggressive.
*   Clear Browser LocalStorage if Login fails after a DB reset.

**3. Content Updates**
The `/content` folder is mounted to the backend. To refresh lessons in DB:
```bash
docker-compose restart backend
```

### Using Docker (Recommended for Full Stack)
The entire stack can be spun up using Docker Compose.
```bash
# Start all services
docker-compose up --build

# Stop services
docker-compose down
```
*   **Frontend:** `http://localhost:3000`
*   **Backend API:** `http://localhost:8000` (Docs: `/docs`)
*   **Database:** `localhost:5432`

### Database Management
The project now uses an automated entrypoint script (`backend/entrypoint.sh`) to handle database readiness and seeding.

**To Reset the Database:**
1. Stop containers and remove volumes: `docker-compose down -v`
2. Start containers: `docker-compose up --build`
3. **Wait:** The backend container will automatically wait for the DB and run `seed.py`. Do NOT run seed manually.
4. **Login:** Default admin is `admin@ai-platform.com` / `admin123`.

### Local Development (Manual)

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

**Backend:**
```bash
cd backend
# Create/Activate venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run server
fastapi dev app/main.py
# Runs on http://localhost:8000
```

## 📂 Directory Structure
*   `frontend/`: Next.js application source code.
    *   `app/`: App Router pages and layouts.
    *   `components/`: UI components (Atomic design: `ui/` for Shadcn, others for app-specific).
    *   `lib/`: Utilities and API clients.
*   `backend/`: FastAPI application source code.
    *   `app/`: Main application logic (`models.py`, `schemas.py`, `main.py`).
    *   `tests/`: Pytest suites.
*   `content/`: Educational content in Markdown/MDX format.
    *   Structured by course and difficulty.
*   `.ai-context/`: Context and documentation for AI agents (Architecture, Patterns, Ideas).

## 📏 Development Conventions
*   **UI/UX:** Adhere strictly to the "Liquid Glass" aesthetic defined in `.ai-context/CONTENT_GUIDELINES.md`. No solid opaque cards; use transparency and blur.
*   **Content:** Lessons are written in MDX. Images should be avoided in favor of CSS diagrams (`<Diagram>`) or code blocks unless absolutely necessary.
*   **State Management:** React Context (`AuthContext`) for global state; local state for UI components.
*   **Type Safety:** TypeScript for frontend, Pydantic for backend. Strict typing is enforced.
*   **Gamification:** "Clippy" is the mascot. Experience points (XP) and badges are central to the user journey.

## 🧰 Capabilities & Tools
- **Visual Inspection Capability:** Established a workflow using Docker + Playwright to generate UI screenshots (`.ai-context/VISUAL_INSPECTION.md`), allowing me to "see" and verify frontend designs.
- **Cycle 27 (Beginner Golden Standard):** COMPLETED.
    -   Finalized Course 1 (AI Basics) Lessons 1-7.
    -   Implemented "SVG First" architecture (CourseIcon, LessonIcon, Diagrams).
    -   Removed external image dependencies.
    -   Verified Dark Mode "Liquid Glass" UI.
--- End of Context from: ../.gemini/GEMINI.md ---
