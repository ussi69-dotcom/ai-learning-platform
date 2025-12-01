# 🗄️ Database Migrations (Alembic)

This project uses **Alembic** for database migrations. This allows us to safely update the database schema in production without losing data.

## 🔄 Workflow

### 1. Make Changes to Models
Modify `backend/app/models.py` as needed (e.g., add a new table or column).

### 2. Generate Migration Script
Run the following command to auto-generate a migration script based on your changes:

```bash
docker-compose exec backend alembic revision --autogenerate -m "Description of changes"
```

### 3. Review the Script
**CRITICAL:** Always review the generated script in `backend/alembic/versions/`.
-   Ensure it only contains changes you intended.
-   Check for accidental drops (especially if sharing DB with n8n).
-   *Note: We have configured `env.py` to ignore tables not defined in our models, but vigilance is still required.*

### 4. Apply Migration (Local)
Apply the changes to your local database:

```bash
docker-compose exec backend alembic upgrade head
```

### 5. Commit
Commit the new migration file (in `backend/alembic/versions/`) to Git.

## 🚀 Production Deployment

When deploying to production:

1.  **Backup Database:** Always backup before applying migrations.
2.  **Pull Changes:** `git pull origin main`
3.  **Rebuild:** `docker compose -f docker-compose.prod.yml up -d --build`
4.  **Apply Migrations:**
    ```bash
    docker compose -f docker-compose.prod.yml exec backend alembic upgrade head
    ```

## 🛠️ Common Commands

-   **Check Current Status:**
    ```bash
    docker-compose exec backend alembic current
    ```
-   **Show History:**
    ```bash
    docker-compose exec backend alembic history
    ```
-   **Downgrade (Undo last migration):**
    ```bash
    docker-compose exec backend alembic downgrade -1
    ```

## ⚠️ Troubleshooting

-   **"Target database is not up to date":** Run `alembic upgrade head`.
-   **"Can't load plugin: sqlalchemy.dialects:driver":** Ensure `DATABASE_URL` is set correctly in environment.
-   **n8n Tables Detected:** If Alembic tries to drop `workflow_entity` etc., check `env.py` `include_object` logic. It should be configured to ignore them.
