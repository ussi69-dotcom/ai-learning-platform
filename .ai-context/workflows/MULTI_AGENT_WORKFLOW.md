# Multi-Agent Workflow v2.0

## ⚡ Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│                    ROLE ASSIGNMENT                          │
├─────────────────────────────────────────────────────────────┤
│  CLAUDE (CLI Primary)         │  GEMINI (via ask-gemini)    │
│  • ORCHESTRÁTOR               │  • RESEARCHER               │
│  • QA Gate (Senior Analyst)   │  • Content Generator        │
│  • Visual Check (Playwright)  │  • Brainstormer             │
│  • Git Operations             │  • Deep Analysis (1M ctx)   │
│  • Final Decision Maker       │  • Draft Creator            │
├─────────────────────────────────────────────────────────────┤
│  Sporné body → USER (finální arbitr)                        │
└─────────────────────────────────────────────────────────────┘
```

**Proč tento model:**
- Claude má spolehlivější tool use (98.2% benchmark)
- Claude má MCP pro visual check (Playwright)
- Menší context window = větší disciplína a přesnost
- Gemini má 1M context = perfektní pro research a analýzu materiálů

---

## 1. Paměť a Kontext

### Soubory (kdo čte co)

| Soubor | Účel | Primární |
|--------|------|----------|
| `CLAUDE.md` | Boot instrukce pro Claude | Claude |
| `.ai-context/state/MEMORY.md` | Sdílená paměť, protokoly | Oba |
| `.ai-context/state/LAST_SESSION.md` | Kde jsme skončili | Oba |
| `.ai-context/core/CONTENT_GUIDELINES.md` | Pravidla pro content | Oba |
| `.ai-context/workflows/MULTI_AGENT_WORKFLOW.md` | Tento soubor | Oba |

### Boot Sequence

**Claude při startu:**
```
1. Přečti CLAUDE.md (automaticky)
2. Přečti LAST_SESSION.md
3. Přečti MEMORY.md
4. Odpověz: "Pokračujeme od [X]. Stav: [Y]. Další: [Z]."
```

---

## 2. Content Creation Workflow (Hlavní proces)

### 🔄 The Excellence Loop

```
┌──────────────────────────────────────────────────────────────┐
│  PHASE 1: RESEARCH                                           │
│  [Claude] → Připraví task brief s persona pro Gemini         │
│  [Gemini] → Deep research (YouTube, docs, best practices)    │
│  [Claude] → Validuje research, přidá vlastní input           │
├──────────────────────────────────────────────────────────────┤
│  PHASE 2: GENERATION                                         │
│  [Gemini] → Generuje draft content                           │
│  [Claude] → QA jako "Senior QA Analyst" (viz Persona níže)   │
├──────────────────────────────────────────────────────────────┤
│  PHASE 3: ITERATION                                          │
│  Opakovat Phase 2 dokud není 99% quality                     │
│  Sporné body → User                                          │
├──────────────────────────────────────────────────────────────┤
│  PHASE 4: FINALIZATION                                       │
│  [Claude] → Visual check v browseru (Playwright MCP)         │
│  [Claude] → Ověří EN + CS soubory existují a jsou správné    │
│  [Claude] → Commit + update LAST_SESSION.md                  │
└──────────────────────────────────────────────────────────────┘
```

### Task Brief Template (Claude → Gemini)

```markdown
## 🎯 Task Brief

**Úkol:** [Konkrétní task]
**Persona:** [Role kterou má Gemini přijmout]
**Výstup:** [Co přesně očekávám]
**DoD (Definition of Done):**
- [ ] Kritérium 1
- [ ] Kritérium 2
- [ ] ...

**Kontext:**
[Relevantní informace, soubory, předchozí práce]

**Omezení:**
- [Co NESMÍ dělat]
- [Časový limit pokud relevantní]
```

---

## 3. QA Protocol (Claude jako Senior QA Analyst)

### Povinná Persona pro QA Review

Když Claude kontroluje Gemini output, MUSÍ použít tuto personu:

```
Jsi Senior QA Analyst s 15 lety zkušeností v tech dokumentaci.
Tvůj úkol je KRITICKY posoudit tento obsah.

Kontroluj:
1. FAKTICKÁ SPRÁVNOST - Jsou tvrzení pravdivá a přesná?
2. HLOUBKA - Je to dostatečně hluboké pro pokročilé uživatele?
3. STRUKTURA - Dodržuje CONTENT_GUIDELINES.md?
4. LABY - Jsou interaktivní, ne jen copy-paste?
5. LOKALIZACE - EN a CS soubory existují a jsou ve správném jazyce?
6. DIAGRAMY - Má každý komplexní koncept vizualizaci?

Buď BRUTÁLNĚ upřímný. "Dobré" není dost dobré.
Najdi 3 konkrétní věci k vylepšení, i když se zdá být perfektní.
```

### Verification Checklist (POVINNÝ po každém content tasku)

```markdown
## ✅ Content Verification Checklist

### Soubory
- [ ] EN soubor (`content.mdx`) existuje a obsahuje ANGLICKÝ text
- [ ] CS soubor (`content.cs.mdx`) existuje a obsahuje ČESKÝ text
- [ ] Žádný soubor není prázdný placeholder
- [ ] Oba soubory mají podobnou délku (±20%)

### Struktura
- [ ] Header Callout (cíl, čas čtení, počet labů)
- [ ] Video link (EN + ideálně CZ alternativa)
- [ ] Minimálně 1500 slov (pokud není čistě praktická lekce)
- [ ] Alespoň 1 interaktivní lab (ne copy-paste)
- [ ] Holocron summary na konci

### Vizuály
- [ ] Diagramy pro komplexní koncepty
- [ ] Dark mode kompatibilita

### Technické
- [ ] `npm run verify` prochází
- [ ] Visual check v browseru (EN i CS verze)
```

---

## 4. Handoff Protocol

### GENERATE → WRITE → VERIFY (Povinný pro Gemini)

**Zlaté pravidlo:** Nikdy neprohlásit "hotovo" bez verifikace.

```
1. GENERATE: Vytvoř obsah
2. WRITE: Zapiš do souborů
3. VERIFY: Přečti soubory zpět a ověř:
   - Není prázdný/placeholder
   - Je ve správném jazyce
   - Má očekávanou délku
```

### Claude → Gemini (ask-gemini)

```javascript
// Vždy specifikuj:
{
  prompt: `
    ## Task Brief
    [Viz template výše]

    ## Persona
    [Konkrétní role pro tento task]

    ## Definition of Done
    [Měřitelná kritéria]
  `,
  model: "gemini-2.5-pro"  // nebo flash pro rychlé tasky
}
```

### Gemini → Claude (reporting)

Gemini MUSÍ na konci každého tasku reportovat:
```markdown
## 📋 Task Report

**Status:** [DONE / PARTIAL / BLOCKED]
**Vytvořené soubory:**
- [cesta]: [krátký popis]

**Verifikace:**
- [x/✗] Soubor přečten zpět
- [x/✗] Obsah odpovídá zadání
- [x/✗] Správný jazyk

**Poznámky pro QA:**
[Co by měl Claude zkontrolovat]
```

---

## 5. Decision Authority

```
┌────────────────────────────────────────────────────────────┐
│  DECISION HIERARCHY                                        │
├────────────────────────────────────────────────────────────┤
│  1. 👤 USER              - Finální arbitr (vždy)           │
│  2. 🔵 CLAUDE            - Orchestrace, QA, Implementation │
│  3. 🔴 GEMINI            - Research, Drafts, Brainstorm    │
└────────────────────────────────────────────────────────────┘
```

### Kdy eskalovat k User

- **Architektonické rozhodnutí** s dlouhodobým dopadem
- **Sporný bod** kde Claude a Gemini nesouhlasí
- **Nejistota** o požadavcích nebo směru
- **Potenciálně destruktivní operace** (DB reset, force push)

---

## 6. Error Recovery

### Když Gemini selže

1. **Identifikuj typ chyby:**
   - Faktická chyba → Poskytni správná data a nech přegenerovat
   - Procesní chyba → Zpřesni task brief
   - Tool chyba → Zkontroluj cesty, zkus znovu

2. **Zapiš do Lessons Learned** (MEMORY.md) pokud je chyba systémová

3. **Nikdy neprohlašuj hotovo** dokud není verifikováno

### Recovery Checklist

```markdown
- [ ] Identifikována root cause
- [ ] Opraveno (ne jen workaround)
- [ ] Verifikováno že oprava funguje
- [ ] Zapsáno do MEMORY.md (pokud systémové)
```

---

## 7. Content-Specific Protocols

### Nová lekce (krok za krokem)

```
1. [Claude] Definuj topic a cíle
2. [Claude → Gemini] Task Brief: "Research top 3 resources on [topic]"
3. [Gemini] Dodá research s YouTube linky (EN + CZ)
4. [Claude] Validuje research, vybere nejlepší zdroje
5. [Claude → Gemini] Task Brief: "Draft lesson structure"
6. [Gemini] Dodá outline
7. [Claude] Review, úpravy, schválení struktury
8. [Claude → Gemini] Task Brief: "Write full EN content"
9. [Gemini] Dodá EN draft
10. [Claude] QA review (Senior Analyst persona)
11. [Iterace] Dokud není 99%
12. [Claude → Gemini] Task Brief: "Translate to CS"
13. [Gemini] Dodá CS verzi
14. [Claude] Verification Checklist
15. [Claude] Visual check (Playwright)
16. [Claude] Commit
```

### Oprava existující lekce

```
1. [Claude] Identifikuj problémy (QA review)
2. [Claude → Gemini] Task Brief: "Fix these specific issues: [...]"
3. [Gemini] Dodá opravený content
4. [Claude] Verify fixes + regression check
5. [Claude] Visual check + Commit
```

---

## 8. Session Management

### Start Session

```markdown
1. Claude čte LAST_SESSION.md
2. Claude odpovídá: "Pokračujeme od [X]. Stav: [Y]. Další: [Z]."
3. Pokud je pending task, pokračuj
4. Pokud ne, čekej na User input
```

### End Session

```markdown
1. Aktualizuj LAST_SESSION.md:
   - Co bylo dokončeno
   - Co zůstává (pending)
   - Blocker (pokud existuje)
2. Aktualizuj MEMORY.md pokud byly lessons learned
3. Commit změny (pokud relevantní)
```

---

## 9. Tool Matrix

| Tool | Claude | Gemini | Poznámka |
|------|--------|--------|----------|
| File read/write | ✅ | ✅ | Základní |
| Git operations | ✅ | ❌ | Claude only |
| Playwright (visual) | ✅ | ❌ | MCP |
| GitHub MCP | ✅ | ❌ | MCP |
| Web Search | ✅ | ✅ | Oba |
| ask-gemini | ✅ | - | Claude volá Gemini |
| brainstorm | ✅ | - | Gemini tool |

---

*Last updated: 2025-12-05 (v2.0)*
*Major change: Claude = Orchestrator, Gemini = Worker/Researcher*
