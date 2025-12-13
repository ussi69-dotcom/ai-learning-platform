---
trigger: always_on
---

# 🤖 Universal Agent Entry Point

**Tento soubor je první věc, kterou čte KAŽDÝ AI agent (IDE, CLI, subagent).**

---

## 🎯 Agent Detection

### Kdo jsi?
Identifikuj se podle svého interface a načti odpovídající konfiguraci:

| Pokud jsi... | Tvůj entry point | Pak načti... |
|--------------|------------------|--------------|
| **Claude Code** | `CLAUDE.md` (auto-loaded) | → `AGENT_PROTOCOL.md` |
| **GPT‑5.2 / Codex CLI** | `CODEX.md` | → `AGENT_PROTOCOL.md` |
| **Gemini CLI** | `GEMINI.md` (auto-loaded) | → `AGENT_PROTOCOL.md` |
| **Antigravity/IDE** | Tento soubor | → `AGENT_PROTOCOL.md` |
| **Subagent** | Task prompt | → Role-specific docs |

---

## 📖 Boot Sequence (IDE agenti - Antigravity, Cursor, etc.)

### IHNED po startu přečti:
```
1. .ai-context/AGENT_PROTOCOL.md     ← Společná pravidla (POVINNÉ!)
2. .ai-context/state/WORKING_CONTEXT.md  ← Kde jsme, co děláme
3. .ai-context/state/MEMORY.md       ← Protokoly, lessons learned
```

### Po načtení ODPOVĚZ:
```
"Jsem [agent]. Pokračujeme od [task]. Stav: [status]. Další: [next step]."
```

---

## ⚠️ Kritická Pravidla (Shrnutí)

Kompletní pravidla jsou v `AGENT_PROTOCOL.md`. Zde jen to nejdůležitější:

### 1. Verify Before Commit
```bash
cd frontend && npm run verify  # MUSÍ projít!
make test-backend  # MUSÍ projít! (pytest)
```

### 2. GENERATE → WRITE → VERIFY
Nikdy neprohlašuj "hotovo" bez přečtení zpět!

### 3. No Big Actions Without Permission
Velké změny (nová feature, refactor) → PTEJ SE uživatele!

### 4. Stay Current
Použij systémové datum. Pro verze/trendy → WebSearch.

### 5. Update Working Context
Průběžně aktualizuj `WORKING_CONTEXT.md`, zejména PŘED context compactem!

---

## 🗺️ Navigace

| Co hledáš | Kde najdeš |
|-----------|------------|
| Mapa dokumentace | `.ai-context/INDEX.md` |
| Společná pravidla | `.ai-context/AGENT_PROTOCOL.md` |
| Aktuální stav | `.ai-context/state/WORKING_CONTEXT.md` |
| Dlouhodobá paměť | `.ai-context/state/MEMORY.md` |
| Content guidelines | `.ai-context/core/CONTENT_GUIDELINES.md` |
| Tech stack | `.ai-context/core/ARCHITECTURE.md` |
| Multi-agent workflow | `.ai-context/workflows/MULTI_AGENT_WORKFLOW.md` |

---

## 🔧 Model Selection (Antigravity/IDE)

Pokud můžeš vybrat model:

| Typ úkolu | Doporučený model |
|-----------|------------------|
| Complex analysis, planning | Nejsilnější dostupný (hard reasoning) |
| Bulk operations | Nejrychlejší |
| Content generation | Kreativní model |
| Quick questions | Levnější/rychlejší |

---

*Version: 3.0*
*Created: 2025-12-06*
*This file: Universal entry point for all AI agents*
