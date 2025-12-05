# Multi-Agent Workflow

## ⚡ Quick Reference (PŘEČTI JAKO PRVNÍ)

```
┌─────────────────────────────────────────────────────────────┐
│                    AGENT SETUP                              │
├─────────────────────────────────────────────────────────────┤
│  GEMINI 3 Pro (1M context)    │  CLAUDE Opus 4.5 (200K)     │
│  • Orchestrátor               │  • Implementátor            │
│  • Strategy & Analysis        │  • Coding & Tool use        │
│  • 91.9% reasoning            │  • 98.2% tool use           │
├─────────────────────────────────────────────────────────────┤
│  Gemini → Claude:             │  Claude → Gemini:           │
│  claude -p "prompt"           │  mcp__gemini-cli__ask-gemini│
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Paměť a Kontext

### Kde co hledat

| Soubor | Účel | Kdo čte |
|--------|------|---------|
| `CLAUDE.md` | Boot instrukce pro Claude | Claude |
| `~/.gemini/GEMINI.md` | Boot instrukce pro Gemini | Gemini |
| `.ai-context/state/MEMORY.md` | **SDÍLENÁ PAMĚŤ** - stack, protokoly, lessons learned | Oba |
| `.ai-context/state/LAST_SESSION.md` | Kde jsme skončili, co dělat dál | Oba |
| `.ai-context/core/ARCHITECTURE.md` | Technická architektura projektu | Oba |
| `.ai-context/core/CONTENT_GUIDELINES.md` | Pravidla pro MDX lekce | Oba |

### Boot Sequence

**Claude při startu:**
```
1. Přečti CLAUDE.md
2. Přečti .ai-context/state/LAST_SESSION.md
3. Přečti .ai-context/state/MEMORY.md
4. Odpověz: "Pokračujeme od [X]. Stav: [Y]. Další: [Z]."
```

**Gemini při startu:**
```
1. Přečti ~/.gemini/GEMINI.md (nebo @CLAUDE.md v projektu)
2. Přečti @.ai-context/state/LAST_SESSION.md
3. Přečti @.ai-context/state/MEMORY.md
4. Odpověz: "Pokračujeme od [X]. Stav: [Y]. Další: [Z]."
```

---

## 2. Role a Zodpovědnosti

### Gemini 3 Pro - STRATEGIST
```
Context: 1M tokenů
Reasoning: 91.9% (benchmark)

Zodpovědnosti:
✓ Analýza celého codebase najednou
✓ Architektonická rozhodnutí
✓ Content generation (MDX lekce)
✓ QA review (big picture)
✓ Red Team security audit
✓ Orchestrace komplexních tasků

Kdy použít Gemini:
- "Analyzuj celý projekt a najdi problémy"
- "Navrhni architekturu pro feature X"
- "Vytvoř lekci o Y"
- "Co je špatně na tomto designu?"
```

### Claude Opus 4.5 - IMPLEMENTER
```
Context: 200K tokenů
Tool use: 98.2% (benchmark)
Computer use: 66.3%

Zodpovědnosti:
✓ Implementace kódu
✓ Git operace (commit, PR)
✓ CI/CD pipeline
✓ Tool orchestrace (Playwright, GitHub MCP)
✓ Blue Team security fixes
✓ Precizní editing

Kdy použít Claude:
- "Implementuj feature X"
- "Oprav tento bug"
- "Udělej refactor komponenty Y"
- "Commitni a vytvoř PR"
```

### Claude Subagenti
```
Haiku  → Quick tasks (lint, grep, validation)
Sonnet → Standard coding (bugfixy, API)
Opus   → Complex decisions (architecture veto)
```

---

## 3. Jak se Volat Navzájem

### Gemini → Claude
```bash
# Přímé volání přes shell
claude -p "Implementuj funkci X v souboru Y"
claude --dangerously-skip-permissions -p "Oprav všechny TypeScript chyby"

# S work directory
cd ~/ai-learning-platform && claude -p "..."
```

### Claude → Gemini
```
# Přes MCP tool (v Claude Code)
mcp__gemini-cli__ask-gemini
  - prompt: "Analyzuj tuto architekturu"
  - model: "gemini-3-pro-preview"

# Pro brainstorming
mcp__gemini-cli__brainstorm
  - prompt: "Jak vyřešit problém X"
```

### Příklady

**Gemini orchestruje implementaci:**
```bash
gemini "Analyzuj ~/ai-learning-platform/frontend/components.
Pro každou komponentu > 300 řádků:
1. Identifikuj co refaktorovat
2. Použij 'claude -p' k provedení refactoru
3. Ověř že testy prochází"
```

**Claude žádá Gemini o review:**
```
Claude: "Implementoval jsem feature X. Zeptám se Gemini na review."
→ mcp__gemini-cli__ask-gemini(prompt="Review tento kód: ...")
→ Gemini: "Vidím 3 problémy: ..."
→ Claude: Opraví problémy
```

---

## 4. Authority Hierarchy

```
┌────────────────────────────────────────────────────────────┐
│  DECISION AUTHORITY (od nejvyšší po nejnižší)              │
├────────────────────────────────────────────────────────────┤
│  1. 👤 USER              - Finální arbitr (vždy)           │
│  2. 🔴 GEMINI 3 Pro      - Strategy, Architecture design   │
│  3. 🔵 CLAUDE Opus       - Implementation veto, Tool use   │
│  4. ⚡ CLAUDE Sonnet     - Standard coding decisions       │
│  5. 🔍 CLAUDE Haiku      - QA findings (advisory)          │
└────────────────────────────────────────────────────────────┘
```

### Kdo rozhoduje co

| Rozhodnutí | Primární | Může vetovat |
|------------|----------|--------------|
| "Jak strukturovat feature?" | Gemini | User |
| "Který pattern použít?" | Gemini | Claude Opus |
| "Jak implementovat detail?" | Claude Sonnet | Claude Opus |
| "Je kód kvalitní?" | Gemini + Haiku | User |
| "Security concern?" | Gemini (Red) + Claude (Blue) | User |
| "Novel problem?" | Všichni + User | User vždy |

---

## 5. Workflow Patterns

### Pattern A: Gemini-Led Analysis
```
User → Gemini: "Analyzuj projekt"
         │
         ▼
    ┌─────────────┐
    │ GEMINI      │ Analyzuje celý codebase (1M context)
    │ Analysis    │ Vytvoří report s findings
    └──────┬──────┘
           │
           ▼ claude -p "fix finding 1"
    ┌─────────────┐
    │ CLAUDE      │ Implementuje jednotlivé fixy
    │ Implementation
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │ GEMINI      │ Validuje výsledek
    │ Review      │
    └─────────────┘
```

### Pattern B: Claude-Led Implementation
```
User → Claude: "Implementuj feature X"
         │
         ▼
    ┌─────────────┐
    │ CLAUDE      │ Implementuje feature
    │ Coding      │
    └──────┬──────┘
           │ Potřebuji second opinion
           ▼
    ┌─────────────┐
    │ GEMINI      │ mcp__gemini-cli__ask-gemini
    │ Review      │ Dává feedback
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │ CLAUDE      │ Aplikuje feedback, commituje
    │ Finalize    │
    └─────────────┘
```

### Pattern C: Red/Blue Team Security
```
    ┌─────────────┐
    │ GEMINI      │ Red Team: Hledá vulnerabilities
    │ Red Team    │ "Simuluj útočníka..."
    └──────┬──────┘
           │ Report
           ▼
    ┌─────────────┐
    │ CLAUDE      │ Blue Team: Implementuje fixy
    │ Blue Team   │ "Oprav tyto vulnerabilities..."
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │ USER        │ Manual checkpoint (novel problems <40%)
    │ Validation  │
    └─────────────┘
```

---

## 6. Sdílená Paměť - MEMORY.md

### Co tam patří

```markdown
# MEMORY.md

## Stack
- Frontend: Next.js 16, TypeScript, Tailwind v4
- Backend: FastAPI, PostgreSQL, Redis
- Deploy: Docker Compose

## Active Protocols
- QA: Max 5 findings per review
- Security: Weekly Red/Blue team
- Commits: Conventional commits + emoji

## Lessons Learned
- [2025-12-05] MCP není potřeba pro cross-agent volání - stačí shell
- [2025-12-05] Gemini má lepší reasoning (91.9%), Claude lepší tool use (98.2%)

## Decisions Log
| Date | Decision | Reason | Who |
|------|----------|--------|-----|
| 2025-12-05 | Gemini = strategist | Benchmark data | User |
```

### Kdy aktualizovat

- Po každém **architektonickém rozhodnutí**
- Po každém **lessons learned**
- Po každém **novém protokolu**
- Když se **něco pokazí** (pro budoucnost)

---

## 7. QA Pipeline

### Pre-commit (Automatic)
```bash
# .husky/pre-commit
cd frontend && npm run typecheck
```

### Post-Implementation Review
```
1. Claude: Implementuje
2. Claude Haiku: npm run verify
3. Gemini: Code review (volitelné)
4. Claude: Commit
```

### QA Findings Format
```markdown
| # | Category | Severity | Finding | Response |
|---|----------|----------|---------|----------|
| 1 | 🐛 BUG | P1 | Null check missing | ✅ ACCEPT |
| 2 | ⚡ PERF | P2 | useEffect loop | ✅ ACCEPT |
| 3 | 🎨 UX | P3 | Button too small | ❌ REJECT |
```

---

## 8. Cost Optimization

| Agent | Cost/Task | Kdy použít |
|-------|-----------|------------|
| Gemini 3 Pro | ~$0.00 (free tier) | Analýza, content, review |
| Claude Haiku | $0.001-0.01 | Lint, grep, validation |
| Claude Sonnet | $0.05-0.20 | Standard coding |
| Claude Opus | $0.50-2.00 | Architecture only |

### Strategy
1. **Gemini first** pro analýzu (free)
2. **Haiku** pro quick checks (cheap)
3. **Sonnet** pro implementation (moderate)
4. **Opus** jen pro critical decisions (expensive)

---

## 9. Troubleshooting

### Gemini nevidí context
```bash
# Použij @ syntax pro soubory
gemini "@CLAUDE.md @.ai-context/state/MEMORY.md Analyzuj projekt"
```

### Claude volání z Gemini nefunguje
```bash
# Ověř že Claude CLI je v PATH
which claude
claude --version

# Použij plnou cestu
/home/ussi/.claude/local/claude -p "..."
```

### Agent neví kde je
```
# Vždy začni s boot sequence - odkaz na LAST_SESSION.md
"Přečti .ai-context/state/LAST_SESSION.md a pokračuj"
```

---

## 10. Checklist pro Novou Session

### Gemini Start
- [ ] `@.ai-context/state/LAST_SESSION.md` - kde jsme skončili
- [ ] `@.ai-context/state/MEMORY.md` - kontext a protokoly
- [ ] Odpovědět: "Pokračujeme od X. Další: Y."

### Claude Start
- [ ] CLAUDE.md boot sequence (automaticky)
- [ ] `LAST_SESSION.md` - kde jsme skončili
- [ ] `MEMORY.md` - kontext a protokoly
- [ ] Odpovědět: "Pokračujeme od X. Další: Y."

### End of Session
- [ ] Aktualizovat `LAST_SESSION.md` (co jsme udělali, co dál)
- [ ] Aktualizovat `MEMORY.md` pokud bylo lessons learned
- [ ] Commit pokud jsou změny

---

*Last updated: 2025-12-05*
*Setup: Gemini 3 Pro (strategist) + Claude Opus 4.5 (implementer)*
