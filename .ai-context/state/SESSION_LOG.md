## Cycle 40 - December 4, 2025 (Gemini CLI - Deployment Fixes)

**Agent:** Gemini CLI
**Status:** ✅ COMPLETE
**Focus:** Production Deployment, Email Verification Fix, User Management

### What Was Done:

1.  **Email Verification Fix (Hotfix)** 🚑
    -   **Issue:** Verification emails linked to `localhost` instead of production domain.
    -   **Cause:** Backend config naively used `NEXT_PUBLIC_API_URL` (internal docker network URL) for public links.
    -   **Fix:**
        -   Updated `backend/app/config.py` with robust URL assembly logic (Smart Domain Replacement).
        -   Updated `docker-compose.prod.yml` to explicitly inject `DOMAIN_NAME=ai-teaching.eu`.
    -   **Outcome:** Emails now correctly point to `https://ai-teaching.eu/api/auth/verify...`.

2.  **Documentation & Processes** 📚
    -   Created `RCA_2025_12_04_email_verification_localhost.md` (Root Cause Analysis).
    -   Created `DOMAIN_CHANGE_GUIDE.md` (SOP for future domain migrations).
    -   Added these to `INDEX.md`.

3.  **User Management Tools** 🛠️
    -   Created `backend/manage_users.py`: CLI tool for listing/deleting users via Docker.
    -   Usage: `docker compose ... exec backend python manage_users.py delete <email>`.
    -   Executed user deletion request (`hornova.ve@seznam.cz`).

### Files Created/Modified:
-   `backend/app/config.py` (Fix)
-   `docker-compose.prod.yml` (Config)
-   `backend/manage_users.py` (New Tool)
-   `.ai-context/workflows/DOMAIN_CHANGE_GUIDE.md` (New Doc)
-   `.ai-context/history/incidents/RCA_2025_12_04_email_verification_localhost.md` (New Doc)
-   `.ai-context/state/LAST_SESSION.md` & `INDEX.md` (Updates)

### Next Steps:
1.  **Slash Commands:** Implement `/new-lesson` and `/validate-lesson` (deferred from Cycle 39).
2.  **Content:** Begin Prompt Engineering course generation.

### Handoff Notes:
-   Production is stable at `ai-teaching.eu`.
-   User management is now possible via CLI without Admin UI.