# ⚡ Current Task Context

**Objective:** Cycle 35 - Security Hardening

## Active Goals (Cycle 35)
1.  [x] Add Redis service to `docker-compose.yml`.
2.  [x] Add `slowapi` and `redis` dependencies to `backend/requirements.txt`.
3.  [x] Implement Rate Limiting (`slowapi`) for critical endpoints (login, register, sandbox).
4.  [x] Enforce Strong Passwords in Pydantic schemas.
5.  [x] Add Security Headers Middleware (HSTS, X-Frame-Options, X-XSS-Protection, Content-Type-Options).
6.  [x] Implement Email Verification (model changes, registration flow, verification endpoint, login check).
7.  [x] Update `backend/seed.py` for verified admin user.
8.  [x] Create `scripts/setup_security.sh` for VPS security hardening.
9.  [x] Perform Database Nuclear Reset to apply schema changes.

## Completed Cycles
- **Cycle 34:** Frontend Sandbox Integration.
- **Cycle 33:** Python Sandbox Backend (Docker execution).
- **Cycle 32:** Documentation Optimization.
- **Cycle 31:** Localization.

## Next Steps
- Deploy to VPS and run `scripts/setup_security.sh`.
- Create a lesson that utilizes the new Sandbox feature.