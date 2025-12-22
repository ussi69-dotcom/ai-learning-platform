# Multi-Agent Workflow v5.1 (December 2025)

Praktický návod “jak spolupracujeme” pro tento repo. **SSOT pravidla jsou v**:
- `.ai-context/AGENT_PROTOCOL.md`
- `.ai-context/state/WORKING_CONTEXT.md`
- `.ai-context/state/MEMORY.md`

Pokud je konflikt mezi dokumenty, **SSOT vyhrává**.

---

## 0) Zlatá pravidla (Thin Protocol)

**Cíl:** nevyhazovat kontext a nezahltit modely.

**NIKDY neposílej do chatu:**
- Playwright DOM/AX snapshoty
- dlouhé logy (cca >50 řádků)
- celé soubory (cca >200 řádků)

**VŽDY posílej:**
- cesty k artefaktům (screenshoty v `.playwright-mcp/`, reporty v `frontend/playwright-report/`, logy jako soubor)
- 10–30 řádků shrnutí (pass/fail + co přesně je rozbité)

**Před přepnutím agenta / před context compactem:**
- aktualizuj `.ai-context/state/WORKING_CONTEXT.md` (co je hotovo, co zbývá, next step)

---

## 1) Role Assignment (v5.1)

| Agent | Role | Kdy použít |
|------|------|------------|
| **Claude Code** | Primary Implementer + QA gate | běžné kódování, integrace, testy, opravy |
| **GPT‑5.2 (Codex CLI)** | Situational Orchestrator | hard reasoning, root cause, arch trade-offs, “záhadný bug” |
| **Gemini 3 Pro (CLI)** | Content + Visual QA | generování lekcí, review screenshotů (2M context) |
| **Perplexity** | Quick Research | fakta a odkazy <5 min |
| **Gemini Deep Research** | 20–60 min autonomní research | dlouhá analýza, market/literature review |

---

## 2) Escalation → GPT‑5.2

Eskaluj na GPT‑5.2, když platí aspoň jedno:
- **2+ failed attempts** na stejný bug
- **>30 min stuck** bez jasné root cause
- rozhodnutí s **trade-offs** (architektura, bezpečnost, DB)
- potřebuješ “second opinion” na kritickou změnu

**Forma vstupu:** Debug Packet (viz `CODEX.md`).

---

## 3) Tool / Model Selection Matrix (rychlá volba)

| Potřebuji… | Použij | Poznámka |
|------------|--------|----------|
| Implementaci / refactor / testy | Claude Code | default |
| Hard reasoning | GPT‑5.2 (Codex) | Debug Packet, hypotézy + experimenty |
| Visual QA (screenshoty) | Gemini 3 Pro CLI | posílej jen file paths |
| Content generation | Gemini 3 Pro CLI | Claude dělá QA gate |
| Quick research | Perplexity | citace, rychlé odkazy |
| Deep research | Gemini Deep Research | 20–60 min, report |

---

## 4) Komunikační šablony (Thin Handoff)

### 4.1 Task Brief (Claude → Gemini / Claude → Claude)

```markdown
## Goal
[1 věta]

## Definition of Done
- [ ] [měřitelné kritérium]
- [ ] ...

## Context
- Relevant files: [paths]
- Constraints: [např. “neměnit API”, “bez DB resetu”]

## Output format
- [co přesně mám dostat zpět]
```

### 4.2 Task Result (Implementer → Orchestrator/User)

```markdown
## Status
[done | blocked | needs-review]

## Changes (max 5 řádků)
- [soubor]: [co]

## Tests
- [pass/fail + failures only]

## Artifacts (paths only)
- [paths]
```

### 4.3 Debug Packet (Claude → GPT‑5.2)

Použij šablonu v `CODEX.md` (posílej **cesty k logům/screenshotům**, ne dump).

### 4.4 Visual QA Request (Claude → Gemini)

```bash
# ✅ PRO model pro Visual QA (kvalita)
gemini -m gemini-3-pro-preview --file /path/to/before.png --file /path/to/after.png \
  "Task: Visual QA. Compare before/after. Focus: [navbar/spacing/dark mode]. Output: 10-20 bullets."
```

**Fallback (kdyz CLI neumi obrazky):**
- Spust `npm run test:visual` nebo lokalni screenshoty.
- Manual review (Claude + `view_image`) a **poznamka**, ze external visual QA nebyla dostupna.

---

## 5) Standardní flow

### 5.1 Debugging (default)

1. **Claude**: minimální repro, lokalizace problému, 1–2 nejlevnější pokusy.
2. Pokud stuck → **Debug Packet** → **GPT‑5.2 (Codex)**.
3. **GPT‑5.2** vrátí: hypotézy, rychlé experimenty, doporučený fix, rizika/rollback, verify checklist.
4. **Claude** implementuje fix + ověřuje podle verify checklistu.

### 5.2 Content (lesson) flow

1. **Claude** připraví Task Brief (cíl + DoD + file paths).
2. **Gemini 3 Pro CLI** vygeneruje draft (EN/CS podle zadání) + Task Report.
3. **Claude** udělá QA review (brutálně upřímně) + iterace.
4. **Claude** ověří render (frontend) + backend parsování + případně Playwright visual.
5. **Claude** integruje a commitne (pokud relevantní).

### 5.3 Visual QA flow

1. Vygeneruj screenshoty / Playwright report lokálně.
2. Pošli jen file paths Gemini (žádné snapshot dumpy).
3. **Gemini** dodá QA report (co je špatně, kde, priorita).
4. **Claude** opraví UI + znovu `npm run test:visual`.

### 5.4 Lesson Upgrade Golden Path (L2/L3 template)

1. **Orchestrator (Claude):** shrn cile lekce + DoD (hook, learning curve, vizualy, laby, Holocron).
2. **Research (Perplexity/Gemini):** najdi nove videa/perly; pokud nejsou, potvrdit existing set.
3. **Content delta:** dopln jen nove/posilujici veci, bez nafukovani.
4. **Visual mapping:** kazda sekce = diagram/MDXImage, mobile full-bleed, zadny overlap.
5. **Labs:** prompty EN-first (i v CS), s callout vysvetlenim.
6. **Localization parity:** EN/CS mirror, terminologie konzistentni.
7. **QA:** `node scripts/validate_mdx.js`, `npm run verify`.
8. **Visual QA:** login admin, screenshoty, iterace do "masterpiece".
9. **Finalize:** update WORKING_CONTEXT + commit; untracked vizualy nech jako artifacty.

---

## 6) Session & Handoff discipline

**Když střídáš agenty (Claude ↔ Codex ↔ Gemini):**
- update `.ai-context/state/WORKING_CONTEXT.md`
- přilož “Task Brief” pro dalšího agenta
- přilož cesty k artefaktům

**Cíl:** další agent naváže do 2 minut bez zpětného doptávání.
