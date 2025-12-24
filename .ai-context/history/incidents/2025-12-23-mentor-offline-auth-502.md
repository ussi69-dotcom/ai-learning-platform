# Incident Report: Mentor Offline + Auth 502
**Date:** 2025-12-23
**Severity:** Medium
**Status:** Resolved

## 💥 What Happened?
Mentor endpoints intermittently returned 500/503 after 1–2 queries, and frontend auth calls (`/users/me`) reported 502. Visual QA also failed because some pages returned 500 in the QA frontend.

## 🕵️ Root Cause Analysis (5 Whys)
1. Why did mentor chat fail? Backend timed out waiting for llama.cpp responses.
2. Why was timeout too low? Backend container still used old env values (25s timeout / 256 max tokens) after `.env` was updated.
3. Why was the container stale? It was restarted earlier but not force-recreated to reload the env file.
4. Why did visual QA show 500? `useAuth` threw when context was unavailable during dev/QA render.
5. Why did that surface now? Playwright hit a cold dev render and the hard throw caused a 500 response.

## 🔧 Resolution
- Force-recreated backend container to load updated mentor env (`MENTOR_TIMEOUT_FAST=60`, `MENTOR_MAX_TOKENS=320`).
- Added safe defaults in `AuthContext` to avoid hard crashes if provider is missing during dev/QA renders.
- Re-ran Playwright visual tests; all passed.

## 🛡️ Prevention (Action Items)
- [ ] Add a note to deployment/hotfix steps: use `docker compose up -d --force-recreate backend` after `.env` changes.
- [ ] Consider a lightweight health check on mentor chat to detect timeouts early.
- [ ] Monitor QA logs for repeated AuthProvider warnings.
