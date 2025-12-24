# GPT-5.2 Documentation Stack Review

**Datum:** 2025-12-23
**Trigger:** Workflow v5.3 - Superpowers integration
**Účel:** Audit celého doc stacku na zombie pravidla a konfliky

---

## Context

Claude právě přidal Superpowers plugin integration do workflow docs:
- Commit: `676679b` - docs: workflow v5.3 with Superpowers integration
- Změněno: `AGENT_PROTOCOL.md`, `UNIFIED_ORCHESTRATION.md`, `CODEX.md`

Uživatel chce aby GPT-5.2 zrevidoval celý documentation stack a identifikoval:
1. **Zombie pravidla** - pravidla která nikdo nepoužívá nebo jsou obsolete
2. **Protichůdné procesy** - konflikty mezi dokumenty
3. **Redundance** - duplicitní informace na více místech
4. **Missing links** - chybějící propojení mezi dokumenty

---

## Tvůj Úkol

### 1. Přečti tyto dokumenty (v tomto pořadí):

```bash
# Hlavní workflow docs
cat .ai-context/AGENT_PROTOCOL.md
cat .ai-context/workflows/UNIFIED_ORCHESTRATION.md
cat CODEX.md
cat CLAUDE.md
cat GEMINI.md  # pokud existuje

# State docs
cat .ai-context/state/WORKING_CONTEXT.md
cat .ai-context/state/MEMORY.md

# Core docs
cat .ai-context/core/ARCHITECTURE.md
cat .ai-context/core/CONTENT_GUIDELINES.md

# Other workflows
cat .ai-context/workflows/WORKFLOW_V6_MASTERPIECE.md
cat .ai-context/workflows/SUBAGENT_STRATEGY.md
cat .ai-context/INDEX.md
cat .ai-context/INIT_CARDS.md
```

### 2. Analyzuj a vytvoř report:

```markdown
## Documentation Stack Audit Report

### 🧟 Zombie Rules (pravidla která nikdo nepoužívá)
- [pravidlo] v [soubor:řádek] - důvod proč je zombie

### ⚔️ Conflicts (protichůdná pravidla)
- [pravidlo A] v [soubor A] vs [pravidlo B] v [soubor B]
- Doporučení: [které pravidlo zachovat]

### 📋 Redundance (duplicity)
- [co] je definováno v [soubor1] i [soubor2]
- Doporučení: [kam consolidovat]

### 🔗 Missing Links
- [soubor] odkazuje na [neexistující soubor]
- [koncept] není nikde definován ale je používán

### ✅ Consistency Check
- [ ] Všechny orchestration rules jsou konzistentní
- [ ] Superpowers integration je správně propojená
- [ ] MACP triggery jsou aktuální
- [ ] Codex profiles odpovídají popisu

### 🎯 Recommendations
1. [akce 1]
2. [akce 2]
...
```

### 3. Specifické otázky k zodpovězení:

1. **Orchestrator confusion:** Je jasné kdy orchestruje GPT vs Claude? Není tam konflikt s "Console = orchestrator by default"?

2. **Superpowers adoption:** Jsou nové skills správně namapované na existující playbooks?

3. **MACP vs Superpowers:** Jak interaguje MACP protokol s novým `/systematic-debugging` skill?

4. **Context saving rules:** Jsou "Thin Protocol" pravidla konzistentní napříč dokumenty?

5. **Gemini protocols:** Jsou "Inquisitor" a "Pixel Defense" dostatečně definované?

---

## Očekávaný Output

Markdown report uložený do: `.ai-context/reports/DOC_STACK_AUDIT_2025_12_23.md`

Plus stručné shrnutí (5-10 řádků) co je potřeba opravit.

---

## Jak Spustit

```bash
# Kopíruj tento prompt do Codex
cat GPT_REVIEW_PROMPT.md | codex exec -p orchestrator 2>&1
```

Nebo interaktivně:
```bash
codex -p orchestrator
# pak paste tento kontext
```
