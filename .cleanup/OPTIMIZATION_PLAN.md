# 🏗️ Agent Optimization Plan & Coordination Protocol

**Objective:** Streamline project documentation to reduce context overhead, eliminate duplicates, and enable seamless coordination between Gemini CLI and Antigravity IDE agents.

---

## 📂 1. New Directory Structure (`.ai-context/`)

We are moving from a flat structure to a categorized domain structure.

| Directory | Description | Contents |
| :--- | :--- | :--- |
| **root** | Entry point | `INDEX.md` (The Map) |
| **core/** | Static / Read-Only | `ARCHITECTURE.md`, `CONTENT_GUIDELINES.md`, `PROJECT_CONTEXT.md`, `GLOSSARY.md` |
| **state/** | Dynamic / Read-Write | `MEMORY.md` (Long-term), `CURRENT_TASK.md` (Short-term), `SESSION_LOG.md` (Handoff) |
| **workflows/** | How-To Guides | `WORKFLOW.md`, `NEW-LESSON-PROMPT.md`, `VISUAL_INSPECTION.md` |
| **history/** | Archives | `completed_cycles/`, `archived_docs/` |
| **learning/** | Knowledge Base | `walkthrough.md`, `concepts.md` (extracted from solutions) |

---

## 🤝 2. Coordination Protocol (CLI vs IDE)

### Identity
We are the **Same Intelligence**. The interface changes, but the mission does not.

### When to use which?
*   **Gemini CLI (Default):**
    *   Fast file operations, refactoring, content generation, git ops.
    *   **Reason:** Higher token limit, faster execution.
*   **Antigravity IDE (Specialist):**
    *   Visual verification (screenshots), complex debugging, heavy reading.
    *   **Reason:** Better rendering, visual tools.

### The Handoff (Token Limit Reached)
1.  **Writer (Exiting Agent):**
    *   Update `.ai-context/state/SESSION_LOG.md` with: "What I did", "What is next", "Known issues".
    *   Commit changes: `git commit -m "handoff: [reason]"`
2.  **Reader (Entering Agent):**
    *   Read `.ai-context/INDEX.md`.
    *   Read `.ai-context/state/SESSION_LOG.md`.
    *   Resume work.

---

## 🧠 3. Unified Memory Strategy

*   **Old:** `GEMINI.md` (CLI only), `agent_state.txt` (Duplicate).
*   **New:** `.ai-context/state/MEMORY.md`.
    *   Contains: User preferences, Environment details (Linux, Node v24), Critical project facts.
    *   **Both agents read/write to this file.**

---

## ⚡ Implementation Steps

1.  **Create Directories:** `core`, `state`, `workflows`, `history`, `learning`.
2.  **Move Files:**
    *   `ARCHITECTURE.md`, `CONTENT_GUIDELINES.md` -> `core/`
    *   `GEMINI.md` content -> Merge into `state/MEMORY.md`
    *   `agent_state.txt` -> Merge into `state/MEMORY.md` (then delete original)
    *   `AGENT-STATE.md` -> Rename to `state/CURRENT_TASK.md`
    *   `walkthrough.md` -> `learning/walkthrough.md`
3.  **Create Index:** Generate `.ai-context/INDEX.md`.
4.  **Update Rules:** Point `.agent/rules/rules.md` to the new structure.
