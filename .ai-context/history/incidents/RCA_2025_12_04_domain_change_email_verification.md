# RCA: Email Verification URL Issue after Domain Change

**Date:** 2025-12-04
**Status:** Resolved
**Severity:** Medium (User Registration Blocked)

## 1. Incident Summary
After changing the domain to `ai-learning.eu`, users received email verification links with relative paths (e.g., `/api/auth/verify?token=...`) instead of absolute URLs. This prevented users from clicking the link to verify their accounts. Manually prepending the domain worked, indicating the token and endpoint were correct, but the URL construction was flawed.

## 2. Root Cause Analysis
The issue stemmed from the configuration logic in `backend/app/config.py`.
- The `BACKEND_PUBLIC_URL` setting, used to generate email links, defaulted to the value of `NEXT_PUBLIC_API_URL`.
- In the production environment (and likely Nginx setup), `NEXT_PUBLIC_API_URL` is often set to a relative path like `/api` to handle proxying correctly.
- Consequently, `BACKEND_PUBLIC_URL` became `/api`, resulting in relative links in emails.

## 3. Resolution
We modified `backend/app/config.py` to ensure `BACKEND_PUBLIC_URL` is always an absolute URL.

**Key Changes:**
1.  Introduced a `DOMAIN_NAME` environment variable (defaults to `localhost`).
2.  Added a Pydantic validator to `BACKEND_PUBLIC_URL`:
    - If the value starts with `/` (relative), it prepends `https://{DOMAIN_NAME}` (or `http` if localhost).
    - If the value is already absolute, it remains unchanged.

```python
    # DOMAIN NAME (for constructing absolute URLs if needed)
    DOMAIN_NAME: str = os.getenv("DOMAIN_NAME", "localhost")

    # BACKEND PUBLIC URL (for email links)
    BACKEND_PUBLIC_URL: str = os.getenv("NEXT_PUBLIC_API_URL", "http://localhost:8000")

    @field_validator("BACKEND_PUBLIC_URL", mode="after")
    def assemble_backend_public_url(cls, v: str, info) -> str:
        if v.startswith("/"):
            domain = info.data.get("DOMAIN_NAME", "localhost")
            protocol = "http" if "localhost" in domain else "https"
            return f"{protocol}://{domain}{v}"
        return v
```

## 4. Verification
- **Code Review:** Confirmed logic handles both relative and absolute inputs.
- **Manual Test:** Verified that setting `NEXT_PUBLIC_API_URL=/api` and `DOMAIN_NAME=ai-learning.eu` results in `https://ai-learning.eu/api`.

## 5. Side Effect: Invalid Domain Registrations
During investigation, we noticed bounced emails to `example.com` (e.g., `newuser@example.com`, `loginuser@example.com`).
- **Cause:** `backend/tests/test_auth.py` was running against the production SMTP configuration without mocking the email service.
- **Fix:** Updated `test_auth.py` to mock `send_verification_email`, preventing tests from sending real emails.

## 6. Follow-up Actions
- [x] Apply code fix for URL generation.
- [x] Apply fix for test email leaks.
- [ ] **User Action:** Add `DOMAIN_NAME=ai-learning.eu` to `.env` on VPS.
- [ ] **User Action:** Restart backend service.

## 7. Related Checks
We also scanned the codebase for other hardcoded `localhost` or `https://` references.
- **Frontend:** Correctly uses `NEXT_PUBLIC_API_URL` for API calls.
- **Backend:** Other references were mostly in tests, comments, or fallback defaults which are overridden by env vars.
- **Conclusion:** No other critical domain-related issues found.
