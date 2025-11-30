# 🚀 Deployment & Configuration Strategy

## 🎯 Core Philosophy
**"Code is the same everywhere. Configuration defines the environment."**

We adhere strictly to the [12-Factor App](https://12factor.net/) methodology. We do **not** maintain separate git branches for environment-specific code (e.g., NO `vps-deployment` branch for changing DB URLs).

## 🌍 Environments

### 1. Local Development (`dev`)
*   **Context:** Running on local machine (Linux/Windows/Mac).
*   **Configuration:** defined in `.env` (not committed to git).
*   **Docker:** Uses `docker-compose.yml`.
*   **Agent Behavior:** Focuses on code iteration, testing, and adding features.

### 2. Production / VPS (`prod`)
*   **Context:** Running on the remote VPS.
*   **Configuration:** defined in `.env.prod` or Docker environment variables.
*   **Docker:** Uses `docker-compose.prod.yml`.
*   **Agent Behavior:** Focuses on stability, deployment commands, and hotfixes via `main`.

## 🔄 Git Workflow

1.  **Main Branch (`main`):**
    *   Contains production-ready code.
    *   **MUST** be agnostic to the environment (no hardcoded `localhost` or `https://ai-teach.me`).
    *   All configuration is injected via Environment Variables.

2.  **Feature Branches (`feature/...`, `fix/...`):**
    *   Created from `main`.
    *   Merged back to `main` via Pull Request (or local merge after test).

3.  **Deployment Process:**
    *   **Local:** `git push origin main`
    *   **VPS:**
        ```bash
        git checkout main
        git pull origin main
        docker-compose -f docker-compose.prod.yml down
        docker-compose -f docker-compose.prod.yml up -d --build
        ```

## ⚙️ Configuration Implementation

We use **Pydantic Settings** (`backend/app/config.py`) to validate and load configuration.

### Critical Environment Variables
The application will fail to start if these are missing in Prod:

| Variable | Description | Example (Dev) |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL Connection | `postgresql://user:pass@db/dbname` |
| `SECRET_KEY` | JWT Signing Key | `openssl rand -hex 32` |
| `BACKEND_CORS_ORIGINS` | Allowed Frontend URLs (CSV) | `["http://localhost:3000"]` |
| `NEXT_PUBLIC_API_URL` | Frontend -> Backend URL | `http://localhost:8000` |

## 🤖 Agent Instructions
When asking Gemini to perform tasks:
1.  **Check Environment:** Look for `.env` or `docker-compose.prod.yml` active usage.
2.  **Respect Config:** Never hardcode URLs in Python/TS files. Use `config.py` (Backend) or `process.env` (Frontend).
3.  **Database Changes:** If `models.py` changes, remind user about the "Nuclear Reset" protocol.
