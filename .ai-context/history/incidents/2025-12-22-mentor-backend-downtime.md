# Incident Report: Mentor/Backend Downtime
**Date:** 2025-12-22
**Severity:** Medium
**Status:** Resolved

## 💥 What Happened?
During mentor rollout, the backend and login became unavailable for users. Mentor endpoints intermittently returned 500/503 errors.

## 🕵️ Root Cause Analysis (5 Whys)
1. Why was login unavailable? Backend container was restarted and re-seeded during configuration changes.
2. Why did it restart? Environment updates required container recreate to pick up new mentor config.
3. Why did mentor/API return 500/503? The LLM client sometimes received malformed/empty responses and the backend did not retry or handle JSON decode errors; additionally nginx cached an old backend container IP after restart.
4. Why was this not caught earlier? No targeted mentor smoke checks were run immediately after restart.
5. Why were users impacted? No graceful fallback or retry was in place for mentor modes during warmup.

## 🔧 Resolution
- Added retry + safer response parsing in mentor client.
- Added bounded LRU cache for mentor RAG indexing to prevent memory growth.
- Fixed lesson ID resolution in frontend to avoid slug/ID mismatches.
- Updated visual tests to wait for locale navigation explicitly.
- Updated nginx to resolve backend/frontend DNS dynamically after container restarts; restarted nginx.

## 🛡️ Prevention (Action Items)
- [x] Add a post-restart mentor smoke check (fast/reasoning/deep) to the deploy checklist.
- [x] Add backend logging for mentor response parsing failures (without leaking content).
- [x] Consider a lightweight health endpoint for each mentor mode.
