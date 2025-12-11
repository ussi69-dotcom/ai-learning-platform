# 🧑‍💻 Deployment & Development Guide

This guide outlines the recommended workflow for developing features locally and deploying them to your VPS. It follows 12-Factor App principles with environment-based configuration.

## 🚀 Local Development Workflow

Your local environment is configured for rapid iteration using Docker Compose.

1.  **Pull Latest Changes:**
    Always start by pulling the latest changes from `main` to ensure your local environment is up-to-date.
    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Create a Feature Branch:**
    For any new feature or bug fix, always create a new branch from `main`.
    ```bash
    git checkout -b feature/my-new-feature
    ```

3.  **Ensure `.env` is Set Up:**
    Make sure you have a `.env` file in the project root for local development specific configurations. This file is `.gitignore`d and will not be committed.
    ```
    # .env (example for local development)
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_platform_db"
    POSTGRES_USER="postgres"
    POSTGRES_PASSWORD="postgres"
    POSTGRES_DB="ai_platform_db"
    REDIS_URL="redis://localhost:6379/0"
    SECRET_KEY="your-super-secret-key-for-local-dev-change-it"
    ALGORITHM="HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    BACKEND_CORS_ORIGINS=["http://localhost:3000"]
    FRONTEND_URL="http://localhost:3000"
    NEXT_PUBLIC_API_URL="http://localhost:8000"
    SMTP_HOST="" # Leave empty for auto-verification on new registrations
    SMTP_PORT=587
    SMTP_USER=""
    SMTP_PASSWORD=""
    EMAILS_FROM_EMAIL="info@example.com"
    FIRST_SUPERUSER="admin@ai-platform.com"
    FIRST_SUPERUSER_PASSWORD="admin123"
    ```

4.  **Start/Restart Local Environment:**
    If you've made changes to `docker-compose.yml`, `Dockerfile`s, or `requirements.txt`, or if your DB state is inconsistent, perform a full reset:
    ```bash
    docker compose down -v && docker compose up -d --build
    ```
    For routine restarts (e.g., after Python code changes, or minor config adjustments):
    ```bash
    docker compose restart backend frontend # Restart specific services
    # Or just docker compose up -d # Docker will recreate/restart changed services
    ```
    *   Frontend: `http://localhost:3000`
    *   Backend API: `http://localhost:8000/docs`

5.  **Develop & Test:**
    Work on your feature. The Docker setup provides hot-reloading for both frontend and backend.

6.  **Commit Your Changes:**
    Commit frequently with descriptive messages.
    ```bash
    git add .
    git commit -m "feat: Add new awesome feature"
    ```

7.  **Push to Remote & Merge:**
    When your feature is complete and tested locally, push your branch and merge it into `main` (preferably via a Pull Request if you're working in a team, or directly if it's a personal project).
    ```bash
    git push origin feature/my-new-feature
    git checkout main
    git merge feature/my-new-feature
    git push origin main
    ```
    *Note: Ensure your `main` branch is always deployable.*

## ☁️ VPS Deployment Workflow

Your VPS environment should be configured for production.

1.  **Access Your VPS:**
    Connect to your VPS via SSH.

2.  **Navigate to Project Directory:**
    Go to your project's root directory on the VPS.

3.  **Ensure `.env.prod` is Set Up:**
    This file contains sensitive production credentials and URLs. It should **NOT** be committed to Git. Ensure it exists and is correctly configured.
    ```
    # .env.prod (example for production deployment)
    DATABASE_URL="postgresql://produser:prodpassword@db:5432/prod_db"
    POSTGRES_USER="produser"
    POSTGRES_PASSWORD="prodpassword"
    POSTGRES_DB="prod_db"
    REDIS_URL="redis://redis:6379/0"
    SECRET_KEY="YOUR_VERY_STRONG_PRODUCTION_SECRET_KEY" # MUST BE DIFFERENT FROM DEV!
    ALGORITHM="HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES=60 # Or longer
    BACKEND_CORS_ORIGINS=["https://ai-teaching.eu", "https://www.ai-teaching.eu"] # Your production domains
    FRONTEND_URL="https://ai-teaching.eu"
    NEXT_PUBLIC_API_URL="https://ai-teaching.eu/api" # Or your backend domain
    SMTP_HOST="smtp.your-provider.com" # Configure real SMTP for email verification
    SMTP_PORT=587
    SMTP_USER="smtp_user"
    SMTP_PASSWORD="smtp_password"
    EMAILS_FROM_EMAIL="noreply@ai-teaching.eu"
    FIRST_SUPERUSER="admin@ai-teaching.eu" # Production admin email
    FIRST_SUPERUSER_PASSWORD="VERY_STRONG_ADMIN_PASSWORD"
    ```
    *Make sure `docker-compose.prod.yml` references this file if not using direct environment variables in the host system.*

4.  **Pull Latest `main` Branch:**
    Pull the latest code from your `main` branch.
    ```bash
    git checkout main
    git pull origin main
    ```

5.  **Deploy New Version:**
    **ALWAYS use the Makefile.** Do not run docker compose commands manually on production.
    ```bash
    make deploy-prod
    ```
    *Note: If you changed `backend/app/models.py`, you must apply migrations.*
    ```bash
    docker compose -f docker-compose.prod.yml exec backend alembic upgrade head
    ```
    *WARNING: Do NOT use `down -v` on production!*

## ⚠️ Important Considerations

*   **Secrets Management:** Never commit `.env` or `.env.prod` to Git. Use environment variables on your production server directly, or secure tools like Docker Secrets/Vault for sensitive data.
*   **Database Migrations:** For production, use a proper database migration tool (like Alembic for SQLAlchemy) instead of `create_all()` in `seed.py` for schema changes, to avoid data loss. `create_all()` is suitable for development.
*   **Performance & Scaling:** The `docker-compose.prod.yml` and `Dockerfile`s might need further optimization for production performance and scalability (e.g., Gunicorn for FastAPI, proper Next.js build caching).
*   **Security:** Ensure all ports are properly firewalled on your VPS.

## 🛑 MANDATORY PRODUCTION PROTOCOLS (READ BEFORE DEPLOYING)

**CRITICAL: DO NOT MANUALLY EDIT `.env` ON PRODUCTION WITHOUT APPROVAL.**

### 1. The "Clean Shell" Rule
When deploying on the VPS, shell environment variables (e.g., `NEXT_PUBLIC_API_URL=http://localhost:8000`) can silently override your `.env` file configuration.
**SOLUTION:** ALWAYS use `make deploy-prod`. This command explicitly isolates the build process from polluted shell environments.

### 2. The "Single Source of Truth" Rule
*   **Development:** Uses `docker-compose.yml` (network: `default`, DB: `localhost`).
*   **Production:** Uses `docker-compose.prod.yml` (network: `ai-network`, DB: `ai-db` volume).
**FAILURE MODE:** Running `docker compose up` on production mixes these environments, causing "502 Bad Gateway" and database connection errors.
**SOLUTION:** ALWAYS use `make deploy-prod`.

### 3. The "Configuration Safety" Rule
*   **`.env` Integrity:** Do not "fix" configuration files by guessing. Restore from `backups/` if a configuration is corrupted.
*   **Secrets:** Never replace secure passwords with defaults like "admin" just to make a build pass. Ask the user.

### 4. How to Deploy (The Only Way)
```bash
git pull
make deploy-prod
```
If this fails, check `make logs-prod`. Do not attempt to fix it by editing config files or running manual docker commands.