# Last Session Handover

**Aktualizuj průběžně během práce. Toto je krátkodobá, hutná paměť.**

---

## Session Info
- **Datum:** 2025-12-05
- **Agent:** Claude Code (Opus 4.5)
- **Cycle:** 45
- **Stroj:** Linux (WSL dev)

---

## Co jsme dělali

1.  **MEGA-AUDIT KÓDU:**
    -   ✅ Hloubkový audit duplicit, zombie souborů, monolitů
    -   ✅ Nalezeny 2 zombie komponenty (CalloutBox, TryItYourself)
    -   ✅ Nalezeno 8 DEBUG prints v main.py (security risk!)
    -   ✅ Identifikovány monolity: ABTestShowcase (614), MarkdownRenderer (490)

2.  **SECURITY FIX:**
    -   ✅ Odstraněny DEBUG prints z `backend/app/main.py:121-157`
    -   ✅ Včetně kritického `print(hash[:20])` - leakoval password hash prefix!

3.  **ZOMBIE CLEANUP:**
    -   ✅ Smazán `frontend/components/CalloutBox.tsx` (65 řádků, nahrazen Callout.tsx)
    -   ⚠️ `TryItYourself.tsx` - zvážit smazání (79 řádků, nepoužívaný)

4.  **DOKUMENTACE:**
    -   ✅ CLAUDE.md - přidán Agent Coordination Protocol
    -   ✅ CLAUDE.md - přidán Multi-Agent Strategy
    -   ✅ CLAUDE.md - přidán Technical Debt Tracking

5.  **MCP SERVERY:**
    -   ✅ GitHub MCP přidán (`gh mcp-server`)
    -   ✅ Stav: Playwright, Context7, Figma, GitHub

---

## Aktuální stav

```
✅ Security Fix        → DEBUG prints odstraněny (commit f306fa0)
✅ Zombie Cleanup      → CalloutBox.tsx smazán
✅ CLAUDE.md           → Agent Protocol + Tech Debt tracking
✅ GitHub MCP          → Přidán do user config
✅ TypeScript          → PASSED
⚠️  Backend Tests      → Import error (pre-existing, ne tato session)
```

---

## MCP Nástroje použité

| MCP | K čemu |
|-----|--------|
| **Context7** | Tailwind/Next.js dokumentace |
| **Playwright** | Dostupný pro vizuální testy |
| **GitHub** | Nově přidán - PR workflow |

---

## Důležité soubory této session

| Soubor | Co bylo změněno |
|--------|-----------------|
| `backend/app/main.py` | Odstraněny DEBUG prints (security) |
| `frontend/components/CalloutBox.tsx` | SMAZÁN (zombie) |
| `CLAUDE.md` | Agent Coordination Protocol, Tech Debt |

---

## Rozdělaná práce / Další kroky

### Technický dluh k řešení:
1. **ABTestShowcase.tsx** - 614 řádků → rozdělit na animation/state/UI
2. **MarkdownRenderer.tsx** - 490 řádků → zvážit next-mdx-remote
3. **Custom hook `useProgressCheck()`** - deduplikace Quiz + LabSection
4. **Error boundary** - přidat `frontend/app/error.tsx`
5. **TryItYourself.tsx** - smazat nebo revive

### Backend test fix:
- `tests/test_api.py` - ModuleNotFoundError - import path issue

### Multi-agent strategie (připraveno):
- Haiku pro lint/typecheck
- Sonnet pro implementaci
- Opus pro architekturu
- Gemini CLI pro content generování

---

## User kontext

- **Doména:** ai-teaching.eu
- **Role:** Sysadmin/Product Owner
- **Styl:** Preferuje systematický přístup, dokumentaci
- **Priority:** Efektivita, best practices, multi-agent workflow

---

## Příští session - začít s

> "Pokračujeme od Cycle 45. Security fix + zombie cleanup HOTOVO (commit f306fa0).
> CLAUDE.md má Agent Protocol + Tech Debt tracking.
> GitHub MCP přidán. Další: refactor ABTestShowcase NEBO fix backend tests NEBO content polish?"

---

*Poslední update: 2025-12-05, Security cleanup + Agent Protocol DEPLOYED*
