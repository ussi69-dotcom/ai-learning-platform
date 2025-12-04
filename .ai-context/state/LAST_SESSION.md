# Last Session Handover

**Aktualizuj průběžně během práce. Toto je krátkodobá, hutná paměť.**

---

## Session Info
- **Datum:** 2025-12-05
- **Agent:** Claude Code (Opus 4.5)
- **Cycle:** 43
- **Stroj:** Linux (WSL dev)

---

## Co jsme dělali

1.  **LAB REFORGE - DOKONČENO A DEPLOYOVÁNO:**
    -   ✅ Všechny LABy přepsány podle nové filozofie: FUN + EDUCATIONAL + PROFESSIONAL
    -   ✅ Žádné "gotcha" testy (nefungují na GPT-5/Gemini 3/Claude 4)
    -   ✅ Timeless laby - fungují na jakémkoliv moderním AI modelu
    -   ✅ CI/CD PASSED - commit `21e0aad`

    **IMPLEMENTOVANÉ LABY (12 celkem):**

    | Lekce | Lab 1 | Lab 2 | Lab 3 |
    |-------|-------|-------|-------|
    | **01 - Co je AI** | Universal Translator | Chaos Detective | Socratic Teacher |
    | **02 - Jak se AI učí** | Pattern Teacher | Space Language | Associative Mixer |
    | **03 - LLM Explained** | Tokenizer View | Temperature DJ | Hallucination Trap |
    | **05 - Temná strana** | Fact Checker's Dilemma | RAG Reality | Black Box Dilemma |

2.  **Bugfix - Lokalizace lekcí:**
    -   ✅ Opraveno: `/courses/{id}` nyní lokalizuje i seznam lekcí
    -   Soubor: `backend/app/routers/lessons.py`

3.  **Vizuální kontrola (Playwright MCP):**
    -   ✅ Všechny laby se renderují správně
    -   ✅ Code blocks, tabulky, emoji, LabComplete buttons fungují

---

## Aktuální stav

```
✅ CI/CD Pipeline     → SUCCESS (commit 21e0aad)
✅ Build              → PASSED (npm run verify)
✅ Backend Tests      → 3 passed, 6 skipped
✅ AI Basics Beginner → KOMPLETNĚ PŘEPRACOVÁNO (12 nových labů)
✅ Deploy Ready       → git pull && docker compose up -d --build
⚠️  PNG Images        → 11 souborů (8.5 MB) - nice-to-have konverze
📋 Ostatní kurzy      → STUB (Prompt Eng, Advanced, Deep Dive)
```

---

## MCP Nástroje k použití

| MCP | K čemu |
|-----|--------|
| **Context7** | Dokumentace Tailwind CSS, React, Next.js |
| **Figma MCP** | Design workflow |
| **Playwright** | Browser testing - POUŽITO pro vizuální kontrolu |

---

## Důležité soubory této session

| Soubor | Co bylo změněno |
|--------|-----------------|
| `content/courses/ai-basics-beginner/lessons/01-*/content*.mdx` | 3 nové laby (EN+CZ) |
| `content/courses/ai-basics-beginner/lessons/02-*/content*.mdx` | 3 nové laby (EN+CZ) |
| `content/courses/ai-basics-beginner/lessons/03-*/content*.mdx` | 3 nové laby (EN+CZ) |
| `content/courses/ai-basics-beginner/lessons/05-*/content*.mdx` | 3 nové laby (EN+CZ) |
| `backend/app/routers/lessons.py` | Lokalizace fix |

---

## Rozdělaná práce / Další kroky

1. **Deploy na produkci:**
   ```bash
   git pull origin main
   docker compose down && docker compose up -d --build
   ```

2. **Potenciální vylepšení (nice-to-have):**
   - Design upgrade lesson page (gradient blobs, animace)
   - PNG → SVG konverze (11 souborů)
   - Psát další kurzy (Prompt Engineering, Advanced AI)

---

## User kontext

- **Doména:** ai-teaching.eu
- **Role:** Sysadmin/Product Owner
- **Styl:** Chce věci rychle hotové, kurzy PERFEKTNÍ
- **Priority:** LABy musí být FUN + EDUCATIONAL + PROFESSIONAL

---

## Příští session - začít s

> "Pokračujeme od Cycle 43. LAB REFORGE dokončen a deployován (commit 21e0aad).
> 12 nových labů v AI Basics (EN+CZ), CI/CD PASSED.
> Další: design upgrade NEBO psát další kurzy?"

---

*Poslední update: 2025-12-05, LAB REFORGE dokončen a CI/CD PASSED*
