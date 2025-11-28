# 🚀 AI Learning Platform - Context

## 🛠️ Tech Stack
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Shadcn/ui.
- **Backend:** FastAPI (Python 3.11), Pydantic v2, SQLAlchemy.
- **Infra:** Docker Compose, PostgreSQL (v15), Redis.
- **Environment:** WSL2 (Linux paths only).

## 🔌 Ports & Services
- **Frontend:** `http://localhost:3000` (Docker: `ai-frontend`)
- **Backend:** `http://localhost:8000` (Docker: `ai-backend`)
- **DB:** Port `5432` (Docker: `ai-db`)

## 🎨 Design Philosophy
- **Style:** "Holographic Datapad" (Glassmorphism, Neon Accents).
- **Themes:** Dual-mode system: **Jedi (Light/Indigo)** vs **Sith (Dark/Red/Gold)**.
- **Assets:** No stock photos. Only code, CSS diagrams, or educational SVGs.
- **Reference:** See `CONTENT_GUIDELINES.md` for strict UI rules.

## 📂 Key Directories
- `/frontend`: Next.js app (run `npm run dev` locally for speed, or Docker).
- `/backend`: FastAPI app.
- `/content`: MDX lesson content (synced to containers).
