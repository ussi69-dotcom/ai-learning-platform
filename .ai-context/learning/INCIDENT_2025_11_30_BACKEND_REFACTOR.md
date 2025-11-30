# Incident Report: Backend Refactor & Environment Divergence
**Date:** 2025-11-30
**Severity:** High (Development Stalled)
**Status:** Resolved

## 🚨 The Problem
The local development environment (`localhost:3000`) stopped correctly awarding XP and localizing content, despite these features reportedly working on the VPS. Attempts to fix it locally led to "Network Errors" and further instability.

## 🕵️ Root Cause Analysis
1.  **Environment Divergence**: The local `backend` had been partially refactored into routers (`lessons.py`, `feedback.py`), while the **VPS production code was still a monolith** (`main.py` contained everything).
2.  **False Assumption**: We assumed the local code was "ahead" or "correct", but it was actually broken compared to the stable VPS monolith.
3.  **Missing Frontend Logic**: The frontend was not sending the `lang` parameter for Quizzes, causing them to remain in English even when the backend was fixed.

## 🛠️ Resolution Steps
1.  **Nuclear Reset (Stability First)**:
    -   We stopped trying to "fix forward".
    -   We fetched the `vps-deployment` branch and **reverted the local backend to the monolithic `main.py`**.
    -   This restored XP and basic functionality immediately.

2.  **Controlled Refactor (v2)**:
    -   Once stable, we created `feature/backend-refactor-v2`.
    -   We extracted routers one by one (`lessons`, `feedback`, `users`) *starting from the working monolith*.
    -   **Critical Step**: We wrote `verify_xp_deep.py` to verify XP (50 pts) and Localization (Czech text) at every step.

3.  **Full Stack Fix**:
    -   Backend: Added missing localization logic to `get_lesson_quizzes`.
    -   Frontend: Added `params: { lang: locale }` to the quiz fetch call.

## 🧠 Lessons Learned (The Outcome)
1.  **VPS Parity is King**: Never assume local is "better". If it works on VPS, that is the Source of Truth. Always check `vps-deployment` before major refactors.
2.  **Monolith First**: If a refactor breaks things, revert to the monolith. It is easier to split a working monolith than to fix broken micro-modules.
3.  **Deep Verification**: UI testing is not enough. The `verify_xp_deep.py` script was essential to prove the backend was working before we blamed the frontend.
4.  **Localization requires Two Hands**: If the backend translates, the frontend must ask for the translation (`lang` param).

## ✅ Action Items
-   [x] Merge `feature/backend-refactor-v2` (Clean, Modular, Verified).
-   [x] Keep `verify_xp_deep.py` for future regression testing.
