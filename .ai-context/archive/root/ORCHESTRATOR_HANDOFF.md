# 📨 Orchestrator Handoff Prompt

**Role:** Orchestrator (Codex)
**Objective:** Triage findings from Gemini (Content/Visual QA) and assign tasks.

## 🚨 Critical Findings (Gemini)

1.  **INFRASTRUCTURE BLOCKER:**
    *   **Frontend/Backend Sync Failure:** Playwright tests confirm that while `05-ai-powered-development` exists on disk, the frontend returns "Lesson not found" (even when logged in as admin).
    *   **Implication:** We cannot deploy new content or verify Visual QA until this is fixed.

2.  **VISUAL REGRESSION:**
    *   **Mobile Diagram Failure:** `DiagramArchitecture.tsx` (`mcp-architecture`) implements a `hidden md:block` switch but the mobile alternative (div list) failed to render in tests.
    *   **SVG Scaling:** Default architecture diagrams (800px width) are unreadable on mobile (375px) without a proper mobile variant.

3.  **CONTENT DEBT (High Severity):**
    *   **Pricing Hallucinations:** `ai-engineering-deep-dive` claims GPT-4o-mini FT is $25/1M. **Reality: $3.00/1M.**
    *   **Model Obsolescence:** `advanced-ai-techniques` calls GPT-4 "current" and o3/Claude 4 "future". **Reality:** o3-pro and Claude 4 are released (in project timeline Dec 2025).
    *   **Missing DoD:** `practical-prompt-engineering/_archive_old_structure` contains raw MDX files without required metadata (Holocrons, Reading Time).

## 📋 Recommended Action Plan

**Phase 1: Unblock (Infrastructure)**
*   **Agent:** `codebase_investigator` / `sysadmin`
*   **Task:** Fix the "Lesson not found" 404 error.
    *   Investigate: Backend API response for `/api/v1/lessons/` vs Database content.
    *   Action: Re-seed database or fix API path mapping for new lessons.

**Phase 2: Visual Fixes**
*   **Agent:** `frontend_developer` (Claude)
*   **Task:** Fix `DiagramArchitecture.tsx` mobile rendering.
    *   Ensure `md:hidden` div actually renders content.
    *   Implement `isMobile` checks for all SVGs or ensure min-font-size 16px.

**Phase 3: Content Upgrade**
*   **Agent:** `content_generator` (Gemini)
*   **Task:** Execute `lessons_upgrade_proposal.md`.
    *   Batch 1: Fix Pricing & Model references (Search & Replace).
    *   Batch 2: Upgrade `advanced-ai-techniques` to Masterpiece standard.

## 🚀 Execute Now?
"Orchestrator, please evaluate these findings and generate the Task Queue."
