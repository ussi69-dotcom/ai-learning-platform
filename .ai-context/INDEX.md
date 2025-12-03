# 🗺️ AI Learning Platform - Documentation Index

**Welcome, Intelligence.** This is your map.
Regardless of your interface (CLI or IDE), start here.

## 📂 Directory Structure

### 🧠 State (`/state`)
> *Read/Write. The living memory of the project.*
- [**LAST_SESSION.md**](./state/LAST_SESSION.md): **🔥 ČTI PRVNÍ!** Kde jsme skončili. Aktualizuj průběžně.
- [**MEMORY.md**](./state/MEMORY.md): Dlouhodobá paměť (stack, protokoly). Aktualizuj zřídka.
- [**CURRENT_TASK.md**](./state/CURRENT_TASK.md): Aktivní úkol.
- [**SESSION_LOG.md**](./state/SESSION_LOG.md): ⚠️ **ARCHIV - NEČÍST PŘI STARTU** (500+ řádků).

### 🧱 Core (`/core`)
> *Read-Only. The immutable laws.*
- [**ARCHITECTURE.md**](./core/ARCHITECTURE.md): Tech stack & patterns.
- [**CONTENT_GUIDELINES.md**](./core/CONTENT_GUIDELINES.md): How to write lessons (MDX).
- [**PROJECT_CONTEXT.md**](./core/PROJECT_CONTEXT.md): High-level goals.
- [**GLOSSARY.md**](./core/GLOSSARY.md): Terminology.
- [**COMPONENT_PATTERNS.md**](./core/COMPONENT_PATTERNS.md): UI Component usage.
- [**STRATEGY.md**](./core/STRATEGY.md): Long-term vision.
- [**VISION.md**](./core/VISION.md): High-level project vision and purpose.

### 🛠️ Workflows (`/workflows`)
> *How-To Guides.*
- [**AGENT_HANDOFF.md**](./workflows/AGENT_HANDOFF.md): Multi-agent coordination (Claude ↔ Gemini).
- [**MCP_SETUP.md**](./workflows/MCP_SETUP.md): Model Context Protocol server configuration.
- [**SUBAGENT_STRATEGY.md**](./workflows/SUBAGENT_STRATEGY.md): When and how to use Task tool (subagents).
- [**NEW-LESSON-PROMPT.md**](./workflows/NEW-LESSON-PROMPT.md): Prompt for generating lessons.
- [**VISUAL_INSPECTION.md**](./workflows/VISUAL_INSPECTION.md): How to see the UI.
- [**DATABASE_MIGRATIONS.md**](./workflows/DATABASE_MIGRATIONS.md): Alembic workflow.
- [**INCIDENT_REPORTING.md**](./workflows/INCIDENT_REPORTING.md): How to report failures.
- [**DEV_AND_DEPLOYMENT_GUIDE.md**](./workflows/DEV_AND_DEPLOYMENT_GUIDE.md): Deployment SOP.

### 📚 Learning (`/learning`)
> *Knowledge Base.*
- [**walkthrough.md**](./learning/walkthrough.md): Codebase tour.
- [**IDEAS.md**](./learning/IDEAS.md): Future concepts and improvements.
- [**CI_AND_CODE_QUALITY.md**](./learning/CI_AND_CODE_QUALITY.md): ESLint, CI/CD, warnings explained (sysadmin-friendly).

### 📜 History (`/history`)
> *Archives.*
- [**completed_cycles/**](./history/completed_cycles/): Past work.
- [**archive/**](./history/archive/): Ancient history.

---

## 🤖 Agent Protocols

### 1. Start of Session (Boot Sequence)
```
1. INDEX.md (toto) → navigace
2. LAST_SESSION.md → CO SE DĚLO NAPOSLEDY (krátkodobá paměť)
3. MEMORY.md → dlouhodobý kontext (stack, protokoly)
4. CURRENT_TASK.md → aktivní úkol
```

**Po načtení hned řekni:**
> "Pokračujeme od [poslední aktivita]. Stav: [status]. Další krok: [co teď]."

### 2. During Work
- **Průběžně aktualizuj** `LAST_SESSION.md` (co děláš, co je hotovo)
- Update `CURRENT_TASK.md` při změně úkolu
- Document new learnings in `learning/`

### 3. End of Session (Handoff)
- **LAST_SESSION.md** - aktualizuj s přesným stavem pro příští session
- **SESSION_LOG.md** - přidej záznam do archivu (stručně)
- **MEMORY.md** - aktualizuj JEN pokud je něco dlouhodobě důležitého
- Commit & push changes
