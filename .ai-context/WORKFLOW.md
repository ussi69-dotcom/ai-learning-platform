# ⚡ Project Workflow

> **Philosophy:** Architect (User + AI) plans → Executor (Antigravity) builds.

## 🔄 The Cycle Process

### 1. Initialization (Architect)
- **You (User)** provide `implementation_plan.md` (created with another AI).
- This is the **only** file passed to start a new cycle.

### 2. Planning (Executor)
- **I (Antigravity)** read the plan.
- I create `task.md` (step-by-step checklist).
- I ask for your **approval** to start.

### 3. Execution (Executor)
- I execute tasks one by one.
- I mark them as `[x]` in `task.md`.
- I commit after each logical step.

### 4. Completion (Executor)
- When all tasks are `[x]`:
  1. **Archive:** Move `task.md` & `implementation_plan.md` to `.ai-context/completed_cycles/`.
  2. **Update:** Update `AGENT-STATE.md` (status & history).
  3. **Sync:** `git add . && git commit` then **Publish Branch** (`git push -u origin HEAD`).
  4. **Report:** "Cycle Complete. Ready for next."

---

## 🚨 Development Protocols (SOP)

**Follow these procedures strictly to avoid regression.**

### 1. Database Schema Changes (`models.py`)
When modifying SQL models (adding columns, tables):
1.  **The Nuclear Option:** You MUST reset the database volume.
    ```bash
    docker-compose down -v
    docker-compose up -d --build
    ```
2.  **Wait for Seed:** The backend has an `entrypoint.sh` that **automatically** waits for DB and runs `seed.py`.
    *   *DO NOT* run `seed.py` manually via `exec` (it causes race conditions).
    *   Check logs: `docker-compose logs -f backend` until you see "Application startup complete".
3.  **Login:** Admin credentials are reset to `admin@ai-platform.com` / `admin123`.

### 2. Frontend State & Caching
If UI changes (e.g., Tailwind classes, new components) do not appear:
1.  **Restart Container:**
    ```bash
    docker-compose restart frontend
    ```
2.  **Browser:** Clear Local Storage (`auth_token`) if login behaves weirdly.

### 3. Content Updates (`/content` folder)
The `content` folder is mounted to the backend at runtime.
1.  **Apply Changes:**
    ```bash
    docker-compose restart backend
    ```
    (This triggers `seed.py` again, which syncs MDX files to DB).

---

## 📂 File Roles

| File | Role | Maintained By |
|------|------|---------------|
| `implementation_plan.md` | The Blueprint | **User** (Architect) |
| `task.md` | The Checklist | **Antigravity** (Executor) |
| `AGENT-STATE.md` | The Memory | **Antigravity** |
| `PROJECT_CONTEXT.md` | The Facts | **Antigravity** |
| `STRATEGY.md` | The Vision | **User** (Architect) |
| `ARCHITECTURE.md` | The Structure | **Antigravity** |
| `IDEAS.md` | The Backlog | **User** (Architect) |

---

## 🧠 Rules of Engagement
- **Don't overthink:** If it's in the plan, build it.
- **Don't hallucinate:** If the plan is vague, ask.
- **Don't bureaucratic:** Skip "Task Boundaries" for trivial steps.