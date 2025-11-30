# Agent State - Synchronized with MEMORY.md

## Current Status
- **Cycle:** 35 (Security Hardening)
- **Focus:** Core security features implemented & verified.
- **Last Action:** Implemented Sandbox, Rate Limiting, Strong Passwords, Email Verification, Security Headers.

## Recent Changes (as per MEMORY.md)
1.  **Secure Code Execution**: Implemented via `SandboxService` + Docker + `<Sandbox>` UI.
2.  **API Security**: Rate Limiting (using Redis), Strong Password validation, Email Verification, Security HTTP Headers.
3.  **Deployment Security**: Prepared `scripts/setup_security.sh` for VPS.
4.  **Core Features**: "Masterpiece Standard" for Lessons 3-6, Localization architecture fully implemented.

## Context
- **Project**: AI Learning Platform (Next.js 16 + FastAPI).
- **Theme**: Dark mode, "Liquid Glass", Star Wars/Gamification elements.
- **Localization**: EN/CZ fully supported.

## Active Issues
- Authentication timeout issues (to be resolved by Docker restart).
- Discrepancy in `GEMINI.md` (CLI memory) needs to be fixed.

## Next Actions
- Update `GEMINI.md` to reflect current state and point to `MEMORY.md` as SSOT.
- Perform Docker Nuclear Reset (`docker-compose down -v && docker-compose up -d --build`).
- Verify local development workflow and `.env` usage.