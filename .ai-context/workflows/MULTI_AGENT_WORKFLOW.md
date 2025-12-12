# Multi-Agent Workflow v4.0 (December 2025)

## ⚡ Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ORCHESTRATION LAYER                                 │
│                                                                          │
│                    Claude Opus 4.5 (Orchestrator)                        │
│                    - Long sessions, CLI, safety, QA gate                 │
│                    - Token-efficient (65% less than others)              │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GPT-5.2       │    │   Gemini 3 Pro  │    │   Perplexity    │
│   Thinking      │    │   + Deep Res.   │    │   Sonar         │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ Hard reasoning  │    │ Content gen.    │    │ Quick research  │
│ Architecture    │    │ Research        │    │ Fact-checking   │
│ Debugging       │    │ 2M context      │    │ Trends          │
│ $10/1M tokens   │    │ $5/1M tokens    │    │ $1/1k requests  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Agent Selection Matrix

| Typ úlohy | Agent | Proč | Jak volat |
|-----------|-------|------|-----------|
| **Hard reasoning** | GPT-5.2 | GPQA 93.2% | `codex "question"` nebo chat.openai.com |
| **Content generation** | Gemini CLI | 2M ctx, levný | `gemini -m gemini-3-pro-preview` |
| **Deep research (20-60 min)** | Gemini Deep Research | Autonomní | `python scripts/gemini_deep_research.py` |
| **Quick research (<5 min)** | Perplexity MCP | Rychlé | `mcp__perplexity-ask__perplexity_ask` |
| **Fact check** | WebSearch | Instant | Built-in tool |
| **Library docs** | Context7 MCP | Accurate | `mcp__context7__get-library-docs` |
| **Kódování** | Claude Code | Token-efficient | Já (orchestrátor) |
| **Codebase exploration** | Explore subagent | Systematické | `Task(subagent_type="Explore")` |
| **Planning** | Plan subagent | Architektura | `Task(subagent_type="Plan")` |
| **Bulk operations** | general-purpose | Autonomní | `Task(subagent_type="general-purpose")` |

## 🆕 GPT-5.2 Integration (December 2025)

### Kdy volat GPT-5.2
```
✅ Komplexní architektonická rozhodnutí
✅ Debugging záhadných bugů (>2 hodiny stuck)
✅ "Second opinion" na kritická PR
✅ Reasoning tasks s vysokou uncertainty
```

### Kdy NEVOLAT GPT-5.2
```
❌ Běžné kódování (Claude stačí)
❌ Research (Gemini je levnější a má 2M kontext)
❌ Bulk operations (drahé, $10/1M input)
❌ Content generation (Gemini lepší)
```

### Jak volat
```bash
# ChatGPT Plus ($20/měsíc)
1. Otevři chat.openai.com
2. Vyber GPT-5.2 Thinking
3. Paste context + otázku

# Codex CLI
codex "Analyze this architecture decision: [context]"
```

## 🆕 Gemini Deep Research (December 2025)

### Co to je
Autonomní výzkumný agent (Gemini 3 Pro) který:
- Plánuje výzkumnou strategii
- Provádí web search (až 60 minut)
- Čte a syntetizuje zdroje
- Vrací detailní report s citacemi

### Kdy použít
```
✅ Rozsáhlé market research (konkurence, trendy)
✅ Due diligence / investigative research
✅ Literature review (akademické zdroje)
✅ Comparative landscape analysis
✅ Když potřebuješ 20-60 min autonomního výzkumu
```

### Jak volat
```bash
# CLI
gemini -m deep-research-pro-preview-12-2025 "Your question"

# Python script (doporučeno)
python backend/scripts/gemini_deep_research.py "Your research question"
```

### Limity
- Max runtime: 60 minut (většina hotová za 20)
- Nelze přidat custom tools/MCP
- Beta status - API se může měnit
- Google Search zdarma do 5. ledna 2026

**Proč tento model:**
- Claude má spolehlivější tool use (98.2% benchmark)
- Claude má MCP pro visual check (Playwright)
- Token-efficient = 65% méně tokenů než GPT-5.2
- Gemini má 2M context = perfektní pro research a analýzu materiálů
- GPT-5.2 má nejlepší reasoning (GPQA 93.2%) = specialista na hard problems

---

## 1. Paměť a Kontext (v3.1)

### Soubory (kdo čte co)

| Soubor | Účel | Primární |
|--------|------|----------|
| `CLAUDE.md` / `GEMINI.md` | Boot instrukce | Claude / Gemini |
| `.ai-context/state/WORKING_CONTEXT.md` | Aktuální stav + mini log | Oba |
| `.ai-context/state/MEMORY.md` | Sdílená paměť, protokoly | Oba |
| `.ai-context/core/CONTENT_GUIDELINES.md` | Pravidla pro content | Oba |

> ⚠️ **SESSION_LOG a LAST_SESSION zrušeny** (Dec 2025)

### Boot Sequence

**Každý agent při startu:**
```
1. Přečti svůj entry point (CLAUDE.md / GEMINI.md / rules.md)
2. Přečti WORKING_CONTEXT.md
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
  model: "gemini-3-pro-preview"  // nebo flash pro rychlé tasky
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

| Tool | Claude CLI | Gemini CLI | Antigravity (IDE) | Poznámka |
|------|------------|------------|-------------------|----------|
| File read/write | ✅ | ✅ | ✅ | Základní |
| Git operations | ✅ | ❌ | ✅ | CLI příkazy |
| Playwright (visual) | ✅ | ❌ | ⚠️ | IDE via CLI workaround |
| GitHub MCP | ✅ | ❌ | ❌ | MCP only |
| Web Search | ✅ | ✅ | ✅ | Všichni |
| ask-gemini | ✅ | - | ❌ | Claude only MCP |
| generate_image | ❌ | ❌ | ✅ | IDE only |
| browser_subagent | ❌ | ❌ | ⚠️ | Nefunguje ve WSL |

---

## 10. IDE Agent Mode (Antigravity ve WSL)

### Setup Requirements
Antigravity ve WSL má specifická omezení kvůli network boundary WSL ↔ Windows.

**browser_subagent NEFUNGUJE** - používejte Playwright CLI workaround.

### Visual Check Workaround (Playwright CLI)

```bash
# Screenshot
npx playwright screenshot http://localhost:3000 ./screenshot.png --wait-for-timeout=3000

# S konkrétní stránkou
npx playwright screenshot http://localhost:3000/courses/slug/lesson ./lesson.png
```

### Kdy Antigravity může pracovat samostatně

| Task | Samostatně? | Jak |
|------|-------------|-----|
| Content generation | ✅ | Full file access |
| Research | ✅ | Web search tool |
| Visual check | ⚠️ | `npx playwright screenshot` |
| npm verify | ✅ | Command execution |
| Diagram creation | ✅ | generate_image tool |
| Git commit | ✅ | Run command |
| PR creation | ❌ | Needs GitHub MCP → přepnout na Claude |

### Manual Handoff Protocol (IDE ↔ CLI)

**Před přepnutím na jiného agenta:**
1. Aktualizuj `WORKING_CONTEXT.md`:
   - Co je hotovo
   - Co zbývá
   - Task Brief pro dalšího agenta (pokud relevantní)
2. Oznám: *"Handoff připraven. Další agent: přečti WORKING_CONTEXT.md"*

**Po přepnutí (nový agent):**
1. Přečti `WORKING_CONTEXT.md`
2. Přečti `MEMORY.md`
3. Pokračuj od posledního bodu

### Kdy přepnout na Claude CLI

- [ ] Potřebuji GitHub MCP (PR, issues, code review)
- [ ] Potřebuji komplexní Playwright test (ne jen screenshot)
- [ ] Potřebuji "Senior QA" second opinion
- [ ] Konfliktní architektonické rozhodnutí

---

*Last updated: 2025-12-07 (v2.1)*
*Added: IDE/Antigravity WSL workflow, Playwright CLI workaround*
