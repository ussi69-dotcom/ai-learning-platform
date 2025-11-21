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
## 📅 Session: Cycle 9 Refactor & Cycle 10 Prep (Date: 2025-11-21)

### 🧠 Strategic Decisions (Why we did what we did)
1.  **Content Engine Refactor**: Rozhodli jsme se opustit hardcoded `seed.py` a přejít na file-based systém (`/content` složka). Důvodem je škálovatelnost (až 50+ lekcí), lokalizace a oddělení kódu od obsahu.
2.  **Workflow Update**: Definovali jsme role.
    * **Gemini**: Architekt & Content Creator.
    * **Antigravity**: Coder (Dělník).
    * **User**: Lead Developer & Bridge.
3.  **Context Automation**: Vytvořili jsme `context_builder.py` pro bezztrátový přenos kontextu mezi chaty.
4.  **Docker & WSL Fix**: Vyřešili jsme problémy s Windows paths v Antigravity (`.cursorrules` vynucuje Bash) a mountování volumes pro content (`docker-compose.yml`).

### 🚧 Current Focus (Cycle 10)
* Původně jsme chtěli dělat Gamifikaci, ale priorita se změnila na **UX/UI Polish**.
* **Feedback k řešení**:
    * Modrý banner lekce je zastaralý -> Chceme "Liquid Glass" design.
    * Navigace je na mobilu malá -> Chceme velká tlačítka.
    * Chybějící video v Lekci 4.
* **Assets**: Obrázky se musí generovat a ukládat do `public/images`.

### 💡 Next Steps
1.  Dokončit Cyklus 10 (Design).
2.  Vrátit se k obsahu (přepsat texty do nových MDX souborů).
3.  Teprve poté Gamifikace.