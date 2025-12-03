# CI/CD & Code Quality Guide

**Pro:** Sysadmins, tech enthusiasts, non-coders
**Audience:** Vysvětlení pro lidi co nemusí programovat ale chtějí rozumět systému

---

## ESLint - "Spell Checker pro Kód"

**Co to je:**
- Jako Word podtrhne překlepy, ESLint podtrhne "špatné návyky" v kódu
- Nekontroluje jestli kód **funguje** (to dělá TypeScript)
- Kontroluje jestli je kód **čistý a bezpečný**

**Warnings vs Errors:**
| Typ | Analogie | Dopad |
|-----|----------|-------|
| **Error** | Červená kontrolka v autě | Build NEPROJDE, kód se nenasadí |
| **Warning** | Oranžová kontrolka | Build projde, ale "měl bys to opravit" |

**Běžné warnings a co znamenají:**
| Warning | Význam | Dopad na výkon |
|---------|--------|----------------|
| `no-explicit-any` | Používáš `any` typ (= "dej tam cokoliv") | Žádný - jen čitelnost |
| `no-unused-vars` | Máš proměnnou co nikde nepoužíváš | Žádný - jen balast |
| `exhaustive-deps` | Hook nezahrnuje všechny závislosti | Potenciální bug |
| `no-unescaped-entities` | Uvozovky co můžou zmást parser | Žádný |

**Ovlivní warnings výkon aplikace?**
- **NE** - warnings jsou o údržbě a čitelnosti
- Prohlížeč dostane stejný JavaScript
- Jsou to "doporučení pro programátory", ne runtime problémy

---

## React Hooks v7 - Proč ignorujeme některá pravidla?

**Co jsou React Hooks:**
- Pravidla jak React komponenty mají pracovat s daty
- Zajišťují že UI se správně aktualizuje když se změní data

**v7 je nová verze (React 19):**
- Extrémně striktní
- Zakazuje vzory které fungují, ale "nejsou ideální"
- Náš kód funguje, jen není "dokonalý" podle nových standardů

**Analogie:**
> Jako kdyby nová verze silničních pravidel říkala "nesmíš brzdit v zatáčce" - technicky lepší, ale naše auta na to nejsou stavěná.

**Aktuální stav:**
- `react-hooks/set-state-in-effect`: OFF (5 výskytů)
- `react-hooks/immutability`: OFF (2 výskyty)
- `react-hooks/purity`: OFF

**Plán nápravy:**
1. Teď: vypnuto → build funguje
2. Postupně: opravíme vzory jeden po druhém
3. Pak: zapneme zpět

---

## CI/CD Pipeline

**GitHub Actions (`.github/workflows/ci.yml`):**
```
Push/PR → GitHub Actions → Build Check → ✅/❌
```

**Co kontroluje:**
- Frontend: `npm ci` → `npm run lint` → `tsc --noEmit` → `npm run build`
- Backend: `pip install` → `pytest`

**Husky Pre-commit (`.husky/pre-commit`):**
```
git commit → Husky → TypeScript Check → ✅ commit / ❌ blocked
```

---

## Praktické příkazy

```bash
# Kontrola před deployem
cd frontend && npm run verify

# Jen type check (rychlé)
npm run typecheck

# Jen lint (warnings)
npm run lint

# Celý build
npm run build
```

---

## Tech Debt Tracker

| Oblast | Počet | Priorita |
|--------|-------|----------|
| `no-explicit-any` | ~50 | Low - čitelnost |
| `no-unused-vars` | ~20 | Low - cleanup |
| React Hooks v7 rules | 7 | Medium - refactor postupně |
| `no-unescaped-entities` | ~100 | Low - kosmetické |

**Celkem:** 195 warnings, 0 errors

---

*Vytvořeno: 2025-12-03 po incidentu build failure*
*Viz také: `.ai-context/learning/INCIDENT_2025_12_03_BUILD_FAILURE.md`*
