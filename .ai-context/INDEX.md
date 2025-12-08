# 🗺️ AI Learning Platform - Documentation Index (v3.0)

**Welcome, Agent.** This is your navigation map.

---

## 🚀 Quick Start: Which Agent Are You?

| Agent | Entry Point | Then Read |
|-------|-------------|-----------|
| **Claude Code** | `CLAUDE.md` (auto) | → `AGENT_PROTOCOL.md` → `WORKING_CONTEXT.md` |
| **Gemini CLI** | `GEMINI.md` (auto) | → `AGENT_PROTOCOL.md` → `WORKING_CONTEXT.md` |
| **Antigravity/IDE** | `.agent/rules/rules.md` | → `AGENT_PROTOCOL.md` → `WORKING_CONTEXT.md` |

**Po načtení odpověz:**
> "Jsem [agent]. Pokračujeme od [task]. Stav: [status]. Další: [next step]."

---

## 📂 Directory Structure (v3.0)

### 🔴 Boot Files (Načíst při startu)
| Soubor | Účel | Kdo čte |
|--------|------|---------|
| `AGENT_PROTOCOL.md` | Společná pravidla všech agentů | Všichni |
| `state/WORKING_CONTEXT.md` | Kde jsme, co děláme | Všichni |
| `state/MEMORY.md` | Dlouhodobá paměť, protokoly | Všichni |

### 🟡 State Files (`/state`) - Simplified v3.1
> *Read/Write. Živá paměť projektu. POUZE 2 soubory.*

| Soubor | Účel | Kdy aktualizovat |
|--------|------|------------------|
| **WORKING_CONTEXT.md** | Aktuální task, progress, mini log | Průběžně, PŘED compactem! |
| **MEMORY.md** | Protokoly, lessons learned | Při nových poznatcích |

### 🟢 Core Files (`/core`)
> *Read-Only. Reference dokumenty.*

| Soubor | Obsah |
|--------|-------|
| **CONTENT_GUIDELINES.md** | Jak psát lekce (MDX, komponenty) |
| **CURRICULUM_ROADMAP.md** | Struktura kurzů, progress |
| **ARCHITECTURE.md** | Tech stack, infrastruktura |
| **VISION.md** | Vize projektu, design philosophy |
| **COMPONENT_PATTERNS.md** | UI komponenty specs |
| **GLOSSARY.md** | Terminologie |

### 🔵 Workflows (`/workflows`)
> *How-To Guides. Načti dle potřeby.*

| Soubor | Kdy načíst |
|--------|------------|
| **MULTI_AGENT_WORKFLOW.md** | Spolupráce Claude/Gemini |
| **SUBAGENT_STRATEGY.md** | Použití Task tool (Explore, Plan, etc.) |
| **MCP_SETUP.md** | MCP konfigurace |
| **VISUAL_INSPECTION.md** | Playwright visual testing |
| **DEV_AND_DEPLOYMENT_GUIDE.md** | Deployment, Docker |
| **DATABASE_MIGRATIONS.md** | Alembic workflow |
| **DOMAIN_CHANGE_GUIDE.md** | Změna domény |
| **INCIDENT_REPORTING.md** | Hlášení incidentů |

### 📚 Learning (`/learning`)
> *Knowledge Base.*

| Soubor | Obsah |
|--------|-------|
| **walkthrough.md** | Prohlídka codebase |
| **IDEAS.md** | Nápady, brainstorming |
| **CI_AND_CODE_QUALITY.md** | CI/CD, linting |

### 📦 Guides (`/guides`)
> *External research, reference materials.*

| Soubor | Obsah |
|--------|-------|
| **GITHUB_GUIDE.md** | GitHub workflow |
| **\*_2ndcourse.md** | Research pro Phase 2 kurzy |

### ⚫ Archive (`/history`)
> *NEČÍST při startu. Historické záznamy.*

- `completed_cycles/` - Staré cykly
- `incidents/` - Incident reports
- `archive/` - Archivované dokumenty

---

## 🔄 Memory Protocol (Simplified v3.1)

```
┌─────────────────────────────────────────────────┐
│  WORKING_CONTEXT.md (Short-term + Mini Log)     │
│  Aktualizuj: průběžně, před compactem           │
│  Obsah: current task, progress, posledních 5    │
└─────────────────┬───────────────────────────────┘
                  │ lessons learned
                  ▼
┌─────────────────────────────────────────────────┐
│  MEMORY.md (Long-term)                          │
│  Aktualizuj: při nových poznatcích              │
│  Obsah: protokoly, pravidla, patterns           │
└─────────────────────────────────────────────────┘
```

---

## 📋 Role-Based Loading

| Když děláš... | Načti dodatečně |
|---------------|-----------------|
| Content creation | `core/CONTENT_GUIDELINES.md`, `core/CURRICULUM_ROADMAP.md` |
| Coding/Tech | `core/ARCHITECTURE.md` |
| Multi-agent work | `workflows/MULTI_AGENT_WORKFLOW.md` |
| Codebase exploration | `workflows/SUBAGENT_STRATEGY.md` |
| Deployment | `workflows/DEV_AND_DEPLOYMENT_GUIDE.md` |
| Visual testing | `workflows/VISUAL_INSPECTION.md` |

---

*Version: 3.0*
*Updated: 2025-12-06*
*Previous: INDEX.md v2.0 (archived)*
