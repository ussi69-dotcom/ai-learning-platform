# 🌐 Domain Change Checklist & Guide

This document outlines the critical locations and configurations that must be updated when changing the deployment domain of the AI Learning Platform (e.g., changing from `localhost` to `ai-learning.eu`, or switching domains entirely).

## 🚨 Critical Configuration (Backend & Infrastructure)

### 1. Environment Variables (`.env` / `.env.prod`)
The primary source of truth. Ensure these are updated on the VPS.

*   **`DOMAIN_NAME`**: Set to the bare domain (e.g., `ai-teaching.eu`). Used by the backend config to construct absolute URLs for emails.
*   **`FRONTEND_URL`**: The full URL of the frontend (e.g., `https://ai-teaching.eu`). Used for CORS and redirect links.
*   **`NEXT_PUBLIC_API_URL`**: The URL the frontend uses to reach the backend (e.g., `https://ai-teaching.eu/api`).
*   **`BACKEND_CORS_ORIGINS`**: **Crucial.** Must match the new domain to allow frontend requests.
    *   Format: `["https://ai-teaching.eu", "https://www.ai-teaching.eu"]`

### 2. Docker Compose (`docker-compose.prod.yml`)
We explicitly inject fallbacks here. Check the `backend` service section:

```yaml
environment:
  - FRONTEND_URL=${FRONTEND_URL:-https://YOUR_NEW_DOMAIN.eu}
  - DOMAIN_NAME=${DOMAIN_NAME:-YOUR_NEW_DOMAIN.eu}
```

### 3. Nginx Configuration (`nginx/nginx.conf`)
The reverse proxy must know which incoming `Host` header to accept.

```nginx
server {
    listen 80;
    server_name YOUR_NEW_DOMAIN.eu www.YOUR_NEW_DOMAIN.eu;
    ...
}
```
*Note: If using Certbot/SSL, you must re-run Certbot to generate new certificates for the new domain.*

## 📦 Application Code (Hardcoded Values)

### 1. Backend Logic (`backend/app/config.py`)
Contains the logic that assembles `BACKEND_PUBLIC_URL`.
*   *Check:* Ensure the `assemble_backend_public_url` validator is present. It handles the swap from `localhost` to the production domain for email links.

### 2. Frontend Translations (`frontend/messages/*.json`)
We often mention the domain name in the welcome text or footer.
*   **Search for:** The old domain string (e.g., `grep -r "old-domain.com" .`)
*   **Files to check:**
    *   `frontend/messages/en.json` (Keys: `intro_desc`, etc.)
    *   `frontend/messages/cs.json`

### 3. SEO & Metadata (`frontend/app/layout.tsx` / `metadata`)
Check the `metadata` export in Next.js root layout or `robots.txt`.
*   `metadataBase`: Often set to the production URL.

## 🧪 Verification Steps

After changing the domain:

1.  **Update `.env`** on the server.
2.  **Rebuild Containers:** `docker compose -f docker-compose.prod.yml up -d --build`
3.  **Verify CORS:** Open the browser console on the new domain. Ensure no "CORS Policy" errors appear when fetching `/api`.
4.  **Verify Auth:** Log out and log in.
5.  **Verify Emails:** Register a new user. **Check the link in the email.** It must start with `https://YOUR_NEW_DOMAIN.eu`, NOT `localhost`.
