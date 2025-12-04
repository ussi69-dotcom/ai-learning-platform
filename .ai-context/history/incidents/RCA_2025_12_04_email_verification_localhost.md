# RCA: Email Verification Links Pointing to Localhost

**Date:** 2025-12-04
**Status:** Resolved
**Severity:** High (User Registration/Onboarding Blocked)
**Components:** Backend (Config), Email Service, Docker Composition

## 1. Incident Summary
After a domain change to `ai-teaching.eu`, users reported receiving email verification links starting with `http://localhost/api/auth/verify...` instead of the public domain. This prevented users from clicking the link to verify their accounts without manually editing the URL in their browser.

## 2. Root Cause Analysis (Technical)

### The Logic Flaw
The backend `backend/app/config.py` logic for generating `BACKEND_PUBLIC_URL` was overly reliant on the `NEXT_PUBLIC_API_URL` environment variable.

1.  **Docker Networking:** In our `docker-compose.prod.yml`, services often communicate internally or via Nginx. The environment might perceive the API URL as `http://localhost:8000` or a relative path `/api` to function correctly behind the reverse proxy.
2.  **Naive Configuration:** The application took this "internal" representation and used it to generate "external" emails.
3.  **Missing Override:** While there was a `DOMAIN_NAME` concept, it wasn't strictly enforced to override `localhost` detection in the URL generation logic.

### Why it happened now
We recently changed domains. The configuration on the VPS was likely updated in Nginx, but the backend environment variables in `.env` or `docker-compose` might have retained `localhost` or relative paths for internal connectivity, which the email service inadvertently leaked to the user.

## 3. Resolution

### Code Changes
We modified `backend/app/config.py` to implement a "Smart Domain Replacement" validator:
```python
@field_validator("BACKEND_PUBLIC_URL", mode="after")
def assemble_backend_public_url(cls, v: str, info) -> str:
    domain = info.data.get("DOMAIN_NAME", "localhost")
    
    # CASE 1: Relative URL (e.g., "/api") -> Prepend Domain
    if v.startswith("/"):
        protocol = "http" if "localhost" in domain else "https"
        return f"{protocol}://{domain}{v}"
        
    # CASE 2: Localhost URL but Production Domain Set -> Replace Host
    if "localhost" in v and domain != "localhost":
        # Logic to swap "http://localhost:8000/api" with "https://ai-teaching.eu/api"
        ...
```

### Configuration Changes
We updated `docker-compose.prod.yml` to explicitly inject the domain information, ensuring it takes precedence even if `.env` is stale:
```yaml
environment:
  - FRONTEND_URL=${FRONTEND_URL:-https://ai-teaching.eu}
  - DOMAIN_NAME=${DOMAIN_NAME:-ai-teaching.eu}
```

## 4. Prevention & Lessons Learned
*   **Never trust `API_URL` for emails:** Internal API routing paths often differ from external public links. Always explicitly configure a `PUBLIC_DOMAIN` or `DOMAIN_NAME` for generating user-facing links.
*   **Domain Change Checklist:** A specific checklist has been created (`.ai-context/workflows/DOMAIN_CHANGE_GUIDE.md`) to ensure all occurrences of the domain (CORS, Translations, Configs) are updated during a migration.
