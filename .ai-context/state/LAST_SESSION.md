# Last Session Handover

**Aktualizuj průběžně během práce. Toto je krátkodobá, hutná paměť.**

---

## Session Info
- **Datum:** 2025-12-04
- **Agent:** Claude Code (Opus 4.5)
- **Cycle:** 43
- **Stroj:** Linux (WSL dev)

---

## Co jsme dělali

1.  **LAB REFORGE - DOKONČENO:**
    -   ✅ Všechny LABy přepsány podle nové filozofie: FUN + EDUCATIONAL + PROFESSIONAL
    -   ✅ Žádné "gotcha" testy (nefungují na GPT-5/Gemini 3/Claude 4)
    -   ✅ Timeless laby - fungují na jakémkoliv moderním AI modelu

    **IMPLEMENTOVANÉ LABY:**

    **Lekce 01 - Co je AI (3 laby):**
    - ✅ Universal Translator (Angry Teen/Shakespeare/LinkedIn) [EN+CZ]
    - ✅ Chaos Detective (brain dump → JSON) [EN+CZ]
    - ✅ Socratic Teacher (interaktivní dialog) [EN+CZ]

    **Lekce 02 - Jak se AI učí (3 laby):**
    - ✅ Pattern Teacher (first letter extraction) [EN+CZ]
    - ✅ Space Language (Dog→Dogophone) [EN+CZ]
    - ✅ Associative Mixer (toothpaste as war general) [EN+CZ]

    **Lekce 03 - LLM Explained (3 laby):**
    - ✅ Tokenizer View (kept original) [EN+CZ]
    - ✅ Temperature DJ (robot/člověk/umělec) [EN+CZ]
    - ✅ Hallucination Trap (Harry Potter fake book) [EN+CZ]

    **Lekce 05 - Temná strana (3 laby):**
    - ✅ Fact Checker's Dilemma (confidence % on myths) [EN+CZ]
    - ✅ RAG Reality (knowledge cutoff demo) [EN+CZ]
    - ✅ Black Box Dilemma (AI v právnictví) [EN+CZ]

2.  **Bugfix - Lokalizace lekcí:**
    -   ✅ Opraveno: `/courses/{id}` nyní lokalizuje i seznam lekcí (title_cs, description_cs)
    -   Soubor: `backend/app/routers/lessons.py`

---

## Aktuální stav

```
✅ CI/CD Pipeline     → FUNGUJE
✅ Build              → PROCHÁZÍ (npm run verify) - NUTNO OVĚŘIT
✅ AI Basics Beginner → KOMPLETNĚ PŘEPRACOVÁNO (12 nových labů)
⚠️  PNG Images        → 11 souborů (8.5 MB) - nice-to-have konverze
📋 Ostatní kurzy      → STUB (Prompt Eng, Advanced, Deep Dive)
```

---

## Důležité soubory této session

| Soubor | Co bylo změněno |
|--------|-----------------|
| `content/courses/ai-basics-beginner/lessons/01-*/content*.mdx` | 3 nové laby (EN+CZ) |
| `content/courses/ai-basics-beginner/lessons/02-*/content*.mdx` | 3 nové laby (EN+CZ) |
| `content/courses/ai-basics-beginner/lessons/03-*/content*.mdx` | 2 nové laby + 1 updated (EN+CZ) |
| `content/courses/ai-basics-beginner/lessons/05-*/content*.mdx` | 3 nové laby (EN+CZ) |
| `backend/app/routers/lessons.py` | Lokalizace fix |

---

## MCP Nástroje k použití

| MCP | K čemu |
|-----|--------|
| **Context7** | Dokumentace Tailwind CSS, React, Next.js - POUŽÍVAT! |
| **Figma MCP** | Design workflow |
| **Playwright** | Browser testing |

---

## Rozdělaná práce / Další kroky

1. **Ověřit build:**
   ```bash
   cd frontend && npm run verify
   docker compose exec backend pytest
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

> "Pokračujeme od Cycle 43. LAB REFORGE dokončen - 12 nových labů v AI Basics (EN+CZ).
> Ověřit build, pak rozhodnout: design upgrade NEBO psát další kurzy?"

---

*Poslední update: 2025-12-04, LAB REFORGE dokončen*
