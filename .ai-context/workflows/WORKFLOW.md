# ⚙️ Agent Workflow

## 1. Standard Development Loop
1.  **Plan:** Analyze requirements -> Check `STRATEGY.md`.
2.  **Code:** Implement features/content.
3.  **Verify (Unit):** Run backend tests (`pytest`).
4.  **Verify (Visual):** Run Playwright capture scripts.
5.  **Document:** Update context files.

## 2. Content Creation Workflow
1.  **Draft:** Write `content.mdx` following `CONTENT_GUIDELINES.md`.
2.  **Diagram:** If a visual is needed, implement a new type in `Diagram.tsx`.
3.  **Metadata:** Update `meta.json` with Video URL and Order.
4.  **Deploy:** `docker-compose restart backend` to refresh DB.
5.  **Inspect:** Run `visual_tests/capture_lesson_dark.js` to verify rendering.

## 3. Visual Inspection Protocol (Playwright)
We use Dockerized Playwright to "see" the UI.

**Command:**
```bash
docker run --rm --network host -v $(pwd)/visual_tests:/app -w /app mcr.microsoft.com/playwright:v1.57.0-jammy /bin/bash -c "npm install playwright && node <script_name>.js"
```

**Available Scripts:**
*   `capture_lesson_dark.js`: Captures a specific lesson in Sith mode.
*   `capture_dashboard_auth.js`: Captures the Dashboard as a logged-in user.

## 4. Git Commit Standards
*   **Feat:** New features or content.
*   **Fix:** Bug fixes.
*   **Refactor:** Code cleanup.
*   **Docs:** Documentation updates.
*   **Milestone:** Major cycle completion.
