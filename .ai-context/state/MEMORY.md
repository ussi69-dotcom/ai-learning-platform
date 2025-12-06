# 🧠 Unified Agent Memory

**This file is the Single Source of Truth for all agents (Claude CLI primary, Gemini via ask-gemini).**
Read this first to understand the environment, preferences, and active protocols.

---

## 🚨 WORKFLOW v2.0 (Active since 2025-12-05)

### Role Assignment
```
CLAUDE = ORCHESTRÁTOR (Primary CLI agent)
- Řídí workflow, QA gate, visual check, git operations
- Rozhoduje, iteruje, eskaluje sporné body k User

GEMINI = RESEARCHER/WORKER (via ask-gemini)
- Deep research (1M context), content generation, brainstorming
- VŽDY dostává Task Brief s Persona + DoD
```

### The Excellence Loop (Content Creation)
```
PHASE 1: Research → PHASE 2: Generation → PHASE 3: Iteration → PHASE 4: Finalization
```

**Full protocol:** See `.ai-context/workflows/MULTI_AGENT_WORKFLOW.md`

---

## 🖥️ Environment Context
- **OS:** Linux (WSL2)
- **Node.js:** v24.11.1
- **Stack:** Next.js 16, FastAPI, PostgreSQL 15, Redis 7, Docker Compose.
- **Agent Mode:** Claude CLI primary, Gemini via MCP (`ask-gemini`)
- **MCP Tools:** Playwright (visual check), GitHub, Context7, Figma

## 🔑 Standard Operating Protocols (SOPs)

### 1. Content Engineering (Masterpiece v2) ✍️
- **Guidelines:** `.ai-context/core/CONTENT_GUIDELINES.md` (MUSÍ se dodržovat)
- **Validation:** `scripts/validate_mdx.js` (Must pass before commit)
- **Diagrams:** SVG only. Register in `frontend/components/mdx/Diagram.tsx`
- **Localization:** EN (`content.mdx`) + CS (`content.cs.mdx`) - VŽDY OVĚŘIT JAZYK!

### 2. QA Protocol 🔍
Claude MUSÍ použít "Senior QA Analyst" personu při review:
- Faktická správnost
- Hloubka obsahu
- Dodržení struktury
- Interaktivita labů
- Verifikace EN/CS souborů

### 3. GENERATE → WRITE → VERIFY 📝
**Povinný protokol pro každý content task:**
1. Vygeneruj obsah
2. Zapiš do souborů
3. PŘEČTI ZPĚT a ověř (není placeholder, správný jazyk, očekávaná délka)

---

## 📊 Current State Snapshot

### Cycle: 48 (Lesson 01 Complete)
**Status:** 🟢 READY - Čekám na pokyn pro další akci

### Completed
| Item | Status |
|------|--------|
| Lesson 01: Prompt Architecture | ✅ Committed (`9f0ef99`) |
| Gemini MCP OAuth | ✅ Fixed (user re-auth) |
| Course Restructure (11 lessons) | ✅ Done |

### Pending
| Item | Status |
|------|--------|
| Lesson 02-11 | ⏳ Awaiting instructions |
| Diagram `prompt-architecture` SVG | ⚠️ Tech debt |

### Recent Changes (2025-12-06)
- [FEAT] Lesson 01 complete (EN + CS + quiz)
- [FIX] Gemini MCP OAuth restored
- [RULE] Big actions require explicit user permission

---

## 📝 Lessons Learned

### 2025-12-06: Big Actions Require Permission
**Rule:** NIKDY nezačínej velké akce (nová lekce, velký refactor) bez explicitního souhlasu uživatele.
**Důvod:** Workflow může být v rozporu s aktuálními prioritami. Vždy se zeptej/ověř.

### 2025-12-05: Verification Failure Incident
**Co se stalo:** Gemini prohlásil lekce za hotové bez verifikace. EN/CS soubory byly prohozené.
**Root cause:** Chybějící "přečti zpět co jsi napsal" krok.
**Řešení:** Zavedení GENERATE → WRITE → VERIFY protokolu.

### 2025-12-05: Self-Certification Anti-Pattern
**Co se stalo:** Agent sám rozhodl, že splnil DoD bez externího ověření.
**Řešení:** Claude jako QA gate, nikdy "fire & forget".

### General
- **Don't hold back.** User wants engineering depth, not generic tutorials.
- **Verify file paths.** Check if you are writing to `.cs.mdx` or `.mdx`.
- **Never trust "done" without verification.** Always read back what was written.

---

## 🎯 Priority Queue

1. ~~**C1 (Critical):** Opravit dokumentaci a workflow~~ ✅ DONE
2. ~~**C1 (Critical):** Course restructure~~ ✅ DONE (11 lessons)
3. ~~**C1:** Lesson 01~~ ✅ COMMITTED
4. **NEXT:** Lesson 02 (čeká na pokyn uživatele)

---

*Last updated: 2025-12-06 (Cycle 48)*
