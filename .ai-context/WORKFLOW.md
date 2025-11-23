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
