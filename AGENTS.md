# Repository Guidelines

## Project Structure & Module Organization
- `backend/`: FastAPI with domain logic in `app/`, SQLAlchemy models in `app/models.py`, routes in `app/main.py`; migrations in `backend/alembic/`.
- `frontend/`: Next.js app router; routes in `app/[locale]/`, shared UI in `components/`, i18n in `i18n/`, messages in `messages/`.
- `content/`: Markdown/MDX lessons by course/lesson folders; backend seeds from here on startup.
- `.ai-context/`: agent workflows and project vision; skim before automation.
- Tests: API/auth in `backend/tests/`; Playwright visuals in `frontend/tests/visual/`.

## Build, Test, and Development Commands
- Start stack: `make up` (build + detach) or `docker compose up -d --build`.
- Stop/reset: `make down`, `make restart`, `make reset` (drops DB/volumes; confirm before use).
- Shells: `make shell-backend`, `make shell-frontend` to inspect containers.
- Backend tests: `make test-backend` (pytest).
- Frontend (in `frontend/`): `npm run verify` for lint+types+build; Playwright via `npm run test:visual` or `npm run test:visual:update`.

## Coding Style & Naming Conventions
- Backend: Python, PEP8, 4-space indent; use type hints and Pydantic schemas; snake_case functions/modules, PascalCase classes.
- Frontend: TypeScript/React with ESLint + strict TS; 2-space indent; PascalCase components, camelCase utilities/hooks, kebab-case route folders.
- Content: number lesson folders (e.g., `03-advanced-topic/`) with `content.mdx`, `meta.json`, `quiz.json`.
- Env vars live in `.env` derived from `.env.prod.example`; do not commit secrets.

## Testing Guidelines
- Backend: add `backend/tests/test_*.py` coverage for new endpoints; use fixtures and assert payload schemas.
- Frontend: visual snapshots in `frontend/tests/visual/`; update only when design intentionally changes with `npm run test:visual:update`.
- Try to pair backend changes with at least one happy-path UI or API test demonstrating the flow.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`; scopes like `ui`, `deps`, `news`).
- Keep one logical change per commit; include migrations or snapshot updates alongside the code that needs them.
- PRs: short summary, linked issue/Task ID, screenshots for UI work, and list executed checks (`make test-backend`, `npm run verify`, `npm run test:visual` when relevant).
- Call out config/env or port changes so ops can mirror `.env` and `docker-compose*.yml`.

## Agent Notes
- Skim `.ai-context/AGENT_PROTOCOL.md` and `.ai-context/state/WORKING_CONTEXT.md` before coding to align with current constraints.
- Prefer Makefile targets over ad-hoc Docker invocations; note any deviations in commits or PRs.
