# Project History & Lessons Learned

## 📜 Context Memory (What we learned)

### ✅ Best Practices (Keep doing)
- **Multi-stage Docker builds**: Reduces image size (FE ~200MB, BE ~180MB).
- **Docker Compose Orchestration**: Use `depends_on` and healthchecks.
- **VS Code + WSL2**: Primary dev environment.
- **Client Generation**: `openapi-typescript-codegen` keeps FE/BE in sync.

### ⚠️ Past Issues & Fixes (Avoid repeating)
- **Heredoc in Terminal**: Breaks formatting -> Write code in VS Code.
- **Docker Compose Version**: Use `docker compose` (v2), not `docker-compose`.
- **Next.js Standalone**: Requires Node 20+ in Dockerfile.
- **DB Persistence**: Docker Volumes held old passwords. Fix: `docker compose down -v`.
- **Pydantic Email**: Missing `email-validator` caused crashes.
- **Backend Imports**: Needs `__init__.py` in `backend/app`.
- **Networking**: Frontend (SSR) must call `http://backend:8000`, Browser calls `localhost:8000`.
- **React `asChild`**: Shadcn `Button` inside `Link` cannot have `asChild`.
- **Dynamic Routes**: Case sensitivity matters (`[courseId]` vs `[courseld]`).

## 🏁 Milestones

### Day 2: Core Data Flow
- **Done**: VPS, Docker orchestration, Basic Models, Homepage, n8n.
- **Debt**: Manual data entry (fixed in Day 3).

### Day 3: Lesson Engine
- **Done**: DB Seeding (`seed.py`), Dynamic Routes (`/courses/[id]`, `/lessons/[id]`), MDX Rendering, Video Embeds, API Client generation.
- **Debt**: Missing Prev/Next buttons, Payments (moved to Day 5).
