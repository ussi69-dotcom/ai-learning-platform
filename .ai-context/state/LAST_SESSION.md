# Last Session Handover

**Aktualizuj průběžně během práce. Toto je krátkodobá, hutná paměť.**

---

## Session Info
- **Datum:** 2025-12-03
- **Agent:** Claude Code (Opus 4.5)
- **Cycle:** 39
- **Stroj:** WSL2 Linux (zimmel@...)

---

## Co jsme dělali

1. **CI/CD Pipeline** - GitHub Actions + Husky pre-commit
2. **CORS fix** - hardcoded domény → env proměnné
3. **ESLint** - 143 errors → 0 errors (195 warnings = tech debt)
4. **Dokumentace** - Boot sequence, learning docs, MEMORY update
5. **Git** - přepnuto na SSH, push funguje

---

## Aktuální stav

```
✅ npm run verify     → PASS (0 errors)
✅ git push           → FUNGUJE (SSH)
✅ MCP config         → context7 ready
✅ Pre-commit hooks   → aktivní
```

---

## Rozdělaná práce

**ŽÁDNÁ** - vše commitnuto a pushnuto.

---

## Další krok

Dle EXECUTION_PLAN.md:
1. **Vytvořit slash commands** (`/new-lesson`, `/validate-lesson`)
2. **Vytvořit lesson skeletons** pro Prompt Engineering kurz
3. **Gemini CLI** začne generovat content

---

## Quick Commands

```bash
# Spustit platformu
make up

# Ověřit build
cd frontend && npm run verify

# Git status
git status && git log --oneline -3
```

---

## Důležité soubory této session

| Soubor | Co tam je |
|--------|-----------|
| `.github/workflows/ci.yml` | CI pipeline |
| `.husky/pre-commit` | Pre-commit hook |
| `frontend/eslint.config.mjs` | ESLint pravidla |
| `.ai-context/learning/CI_AND_CODE_QUALITY.md` | Vysvětlení pro sysadminy |

---

## User kontext

- Přepíná mezi PC (vlak → domov)
- Preferuje české odpovědi
- Sysadmin/tech enthusiast, ne programátor
- Chce jasné vysvětlení, ne kód

---

*Poslední update: 2025-12-03, před přepnutím na jiné PC*
