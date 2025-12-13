# Agent Protocol v5.1

**Single Source of Truth for all AI agents working on this project.**

---

## 🤖 Multi-Agent Workflow v5.1 (Dec 2025)

### "Asymmetric Context Segregation" Model

```
┌─────────────────────────────────────────────────────────────────┐
│                     WORKFLOW v5.1                                │
│                "Asymmetric Context Segregation"                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────┐     Short specs      ┌───────────────┐       │
│  │   GPT-5.2     │ ──────────────────→  │    Claude     │       │
│  │ (Orchestrátor)│ ←────────────────── │ (Implementer) │       │
│  │  Codex CLI    │   Diff + summary     │  Claude Code  │       │
│  └───────┬───────┘                      └───────┬───────┘       │
│          │                                      │                │
│          │ QA report                            │ Screenshots    │
│          │ (text only)                          │ (files only)   │
│          │                                      ▼                │
│  ┌───────┴───────┐                      ┌───────────────┐       │
│  │    Gemini     │ ←─────────────────── │  Playwright   │       │
│  │  (Visual QA)  │   before.png         │   (local)     │       │
│  │  2M context   │   after.png          │   Thin output │       │
│  └───────────────┘   (file paths)       └───────────────┘       │
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐                           │
│  │  Perplexity   │  │ Gemini Deep   │                           │
│  │  (Quick Res.) │  │ (60min Res.)  │                           │
│  └───────────────┘  └───────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

### 📊 Role Assignment Matrix

| Agent | Primární Role | Context | Subscription |
|-------|---------------|---------|--------------|
| **GPT-5.2** | Orchestrátor + Reasoning | ~128k | OpenAI Pro |
| **Claude Code** | Implementer + Git + Daily Ops | ~200k | Claude Code |
| **Gemini 3 Pro** | Visual QA + Content + Research | **2M** | Google AI Plus |
| **Perplexity** | Quick Research + Facts | N/A | MCP |
| **Gemini Deep Research** | 60-min Autonomous Research | N/A | Google AI Plus |

### 🎯 Situational Orchestration

| Situace | Orchestrátor | Implementer | QA |
|---------|--------------|-------------|-----|
| **Záhadný bug** (>30 min stuck) | GPT-5.2 | Claude | Claude |
| **Clear implementation** | Claude | Claude | GPT-5.2 (review) |
| **Content creation** | Claude | Gemini 3 | Claude |
| **Architecture decision** | GPT-5.2 | Claude | Gemini (alternatives) |
| **Visual QA** | Claude | Claude | **Gemini** (2M ctx!) |
| **Quick research** | Claude | Perplexity | Claude |
| **Deep research** | Claude | Gemini Deep / Perplexity | Claude |

### ⚡ Escalation Triggers (→ GPT-5.2)

```
ESKALUJ na GPT-5.2 orchestraci když:
□ 2+ failed attempts na stejný bug
□ Pattern-based solutions nefungují
□ Nejasná root cause po 30 min
□ Architektonické rozhodnutí s trade-offs
□ "Second opinion" na kritické změny
```

### 💰 Economic Model

| Service | Měsíční náklad | Typ | Poznámka |
|---------|----------------|-----|----------|
| Claude Code | ~$20 | Fixed | Unlimited coding |
| OpenAI Pro | ~$20 | Fixed | GPT-5.2 orchestration |
| Google AI Plus | Included | Fixed | Gemini 3 + Deep Research |
| **Total** | **~$40/měsíc** | | |

---

## 📡 Context Segregation Protocol (KRITICKÉ!)

### ⚠️ Problém (co se stalo):
- Playwright MCP `browser_snapshot` = **14,300 tokenů** za jeden `wait`
- 3-4 akce = context compacting = ztráta důležitého kontextu

### ✅ Řešení: "Thin Protocol"

**NIKDY neposílej do chatu:**
- Full DOM/AX snapshoty
- Dlouhé logy (>50 řádků)
- Celé soubory (>200 řádků)

**VŽDY posílej:**
- Cesty k artefaktům (`.playwright-mcp/screenshot.png`)
- Stručné summary (10-30 řádků)
- Pass/fail + seznam chyb

### 📋 Communication Templates

**Task Brief (Orchestrátor → Implementer):**
```markdown
## Goal: [1 věta]
## Acceptance criteria: [3-5 bodů]
## Files to modify: [seznam]
## Expected outcome: [jak poznat success]
```

**Task Result (Implementer → Orchestrátor):**
```markdown
## Status: [done/blocked/needs-review]
## Changes: [git diff summary - 5 řádků max]
## Test results: [pass/fail + failures only]
## Artifacts: [cesty k souborům]
```

**Visual QA Request (→ Gemini):**
```markdown
## Task: [co ověřit]
## Screenshots: [cesty k before/after.png]
## Focus areas: [na co se zaměřit]
```

---

## 🗳️ Multi-Agent Consensus Protocol (MACP) v1.0

**Purpose:** For high-stakes decisions, Claude consults GPT-5.2 and Gemini for diverse perspectives before deciding.

### ⚡ Consensus Triggers (Kdy aktivovat)

```
AKTIVUJ MACP když:
□ Security/auth/permissions changes
□ DB schema/migrations (hard to reverse)
□ Architecture/multi-module refactors
□ Breaking API changes
□ Content strategy decisions
□ User explicitly asks "get second opinion"
□ >30 min stuck + 2+ failed attempts (escalation)

NEAKTIVUJ pro:
□ Small, local, reversible fixes
□ Routine coding tasks
□ Clear implementation with tests
```

### 🎯 Blind Ballot Protocol

**Step 1:** Claude sends SAME prompt to both agents INDEPENDENTLY (no sharing of other's response)

**Step 2:** Each agent responds in structured format:
```markdown
## Agent: [GPT-5.2/Gemini]
**Recommendation:** GO / NO-GO / MODIFY
**Confidence:** 0-100%
**Why:** [3 bullets max]
**Risks:** [3 bullets max]
**Validation:** [specific tests/checks to run]
**Assumptions:** [what must be true]
```

**Step 3:** Claude synthesizes, applies domain weights, decides (or escalates to user if high-stakes + disagreement)

### ⚖️ Weighted Domain Authority

| Conflict Domain | GPT-5.2 | Gemini | Claude |
|-----------------|---------|--------|--------|
| **Security/Logic/Algorithm** | **70%** | 20% | 10% |
| **Codebase Impact/Visuals** | 20% | **70%** | 10% |
| **Content/Pedagogy** | 30% | **60%** | 10% |
| **Integration/Shipping** | 30% | 30% | **40%** |

### 🪜 Resolution Ladder (při disagreement)

```
1. Identify missing facts/assumptions
   ↓
2. Propose smallest experiment/test to settle
   ↓
3. If still ambiguous + high stakes → ESCALATE to user
   (present 2-3 options + trade-offs)
```

### ⚠️ Anti-Patterns to Avoid

| Anti-Pattern | Risk | Mitigation |
|--------------|------|------------|
| **Echo Chamber** | Anchoring bias | Independent "blind ballot" queries |
| **Consensus Theater** | Latency without value | Strict triggers + 10 min time-box |
| **Analysis Paralysis** | Stuck on trivial decisions | Clear trigger criteria |
| **Decision Churn** | Re-litigating closed decisions | Decision log, reopen only with new evidence |

### 📝 Decision Record Template

After MACP, record outcome:
```markdown
## Decision: [Topic]
**Date:** YYYY-MM-DD
**Agents consulted:** GPT-5.2, Gemini
**GPT-5.2:** [GO/NO-GO] @ [X]% confidence
**Gemini:** [GO/NO-GO] @ [X]% confidence
**Final decision:** [What was decided]
**Rationale:** [Why, including domain weights applied]
```

---

## 🤖 Agent-Specific Instructions

### GPT-5.2 (Codex CLI)

**Kdy volat:**
```
✅ Komplexní architektonická rozhodnutí
✅ Debugging záhadných bugů (>30 min stuck)
✅ "Second opinion" na kritická PR
✅ Reasoning tasks (nejlepší benchmark skóre)
✅ Root cause analysis
```

**Kdy NEVOLAT:**
```
❌ Běžné kódování (Claude stačí)
❌ Content generation (Gemini lepší)
❌ Visual QA (Gemini má 2M context)
❌ Quick research (Perplexity rychlejší)
```

**Jak volat:**
```bash
# Přes Codex CLI
codex "Analyze: [context + otázka]"

# Rychlá triage (nižší reasoning effort)
codex -c 'model_reasoning_effort="medium"' "Triage: [context + otázka]"

# Doporučeno: profily (fast vs orchestrator)
codex -p fast "Triage: [context + otázka]"
codex -p orchestrator "Analyze: [context + otázka]"

# Jednorázově přepnout model
codex -m gpt-5.2 "Analyze: [context + otázka]"

# Nebo cat + pipe pro delší prompty
cat << 'EOF' | codex exec 2>&1
[dlouhý prompt]
EOF
```

### Gemini 3 Pro (Google AI Plus)

**Model:** `gemini-3-pro-preview` (NIKDY 2.5!)

**Kdy volat:**
```
✅ Content generation (lekce, dokumentace)
✅ Visual QA (2M context = 100+ screenshots!)
✅ Research (5-20 min)
✅ Code review / alternatives
```

**Jak volat:**
```bash
# Přes Gemini CLI
cat << 'EOF' | gemini -m gemini-3-pro-preview 2>&1
[prompt]
EOF

# Pro Visual QA s obrázky
gemini -m gemini-3-pro-preview --file /path/to/screenshot.png "Analyze this UI"
```

### Gemini Deep Research (Google AI Plus)

**Kdy volat:**
```
✅ Rozsáhlé market research (20-60 min)
✅ Due diligence / investigative research
✅ Literature review
✅ Comparative landscape analysis
```

**Jak volat:**
```bash
# Python script
python backend/scripts/gemini_deep_research.py "Research question"

# Nebo přímé API
gemini -m deep-research-pro-preview-12-2025 "Research question"
```

### Perplexity (MCP)

**Kdy volat:**
```
✅ Quick facts (<5 min)
✅ Dokumentace ověření
✅ Aktuální trendy
✅ Citace potřeba
```

**MCP Tools:**
- `mcp__perplexity-ask__perplexity_ask` - Conversational research

---

## 📖 Boot Sequence (POVINNÉ pro všechny)

### 1. Načti společný protokol
```
READ: .ai-context/AGENT_PROTOCOL.md (tento soubor)
```

### 2. Načti working state
```
READ: .ai-context/state/WORKING_CONTEXT.md  ← Kde jsme, co děláme
READ: .ai-context/state/MEMORY.md           ← Protokoly, lessons learned
```

### 2b. ⚠️ OVĚŘ AKTUÁLNOST (NOVÉ - Dec 2025!)
```bash
git log -1 --oneline  # Porovnej s commits v WORKING_CONTEXT
```
Pokud se neshodují → **NEČTI WORKING_CONTEXT jako pravdu!** Místo toho:
1. Podívej se na `git log --oneline -10` pro skutečný stav
2. Aktualizuj WORKING_CONTEXT.md
3. Až pak pokračuj

### 3. Odpověz uživateli
```
"Jsem [agent]. Pokračujeme od [task]. Stav: [status]. Další: [next step]."
```

### 4. Načti role-specific docs (dle typu úkolu)
| Když děláš... | Načti dodatečně... |
|---------------|---------------------|
| Content creation | `core/CONTENT_GUIDELINES.md`, `core/CURRICULUM_ROADMAP.md` |
| Coding/Tech | `core/ARCHITECTURE.md` |
| Multi-agent work | `workflows/MULTI_AGENT_WORKFLOW.md` |
| Codebase exploration | `workflows/SUBAGENT_STRATEGY.md` (a USE Explore agent!) |
| Deployment | `workflows/DEV_AND_DEPLOYMENT_GUIDE.md` |
| Visual testing | `workflows/VISUAL_INSPECTION.md` |

---

## ⚠️ Absolutní Pravidla (NIKDY neporušuj)

### 1. Verify Before Commit
```bash
cd frontend && npm run verify  # TypeScript + ESLint + Build
docker compose exec backend pytest  # Backend tests
```
**Nikdy necommituj pokud testy neprojdou!**

### 2. GENERATE → WRITE → VERIFY
Pro KAŽDÝ content/code output:
1. Vygeneruj obsah
2. Zapiš do souborů
3. **PŘEČTI ZPĚT** a ověř (není placeholder, správný jazyk/syntax)

### 3. No Big Actions Without Permission
**NIKDY** nezačínej velké akce (nová lekce, velký refactor, architektonické změny) bez explicitního souhlasu uživatele.

### 4. Stay Current
- **VŽDY** ověř aktuální datum (dnes: použij systémové datum!)
- Pro research, verze, trendy → použij **WebSearch** nebo **Context7 MCP**
- Pro **Deep Research** (komplexní analýzy, srovnání, trendy) → použij **Perplexity MCP**
- **NIKDY** nepoužívej zastaralé informace z knowledge cutoff

### 5. No Placeholder Code
```
❌ // TODO: implement later
❌ // FIXME
❌ pass  # placeholder
✅ Kompletní, funkční implementace
```

---

## 🧠 Memory Protocol (Simplified v3.1)

### Pouze 2 soubory:

| Soubor | Účel | Kdy aktualizovat |
|--------|------|------------------|
| **WORKING_CONTEXT.md** | Aktuální task, stav, mini log | Průběžně + před compactem |
| **MEMORY.md** | Dlouhodobé poznatky, pravidla | Při lessons learned |

> ⚠️ **SESSION_LOG.md zrušen** (Dec 2025) - Mini log je nyní součástí WORKING_CONTEXT

---

## ⚡ Incremental Save Protocol (KRITICKÉ!)

### ⚠️ NOVÉ PRAVIDLO (Dec 2025): WORKING_CONTEXT MUSÍ být aktuální!

**Lesson Learned:** WORKING_CONTEXT.md zůstával 8 commitů pozadu, což způsobovalo dezorientaci agentů.

**Nové striktní pravidlo:**
```
PO KAŽDÉM COMMITU → Aktualizuj WORKING_CONTEXT.md!
```

### POVINNÉ triggery:

| Kdy | Co udělat |
|-----|-----------|
| ✅ **PO KAŽDÉM COMMITU** | Update `WORKING_CONTEXT.md` (NOVÉ!) |
| ✅ Po dokončení sub-tasku | `git commit -m "feat: ..."` |
| ✅ Po ~30 min práce | Update `WORKING_CONTEXT.md` |
| ✅ Před odpovědí uživateli | Update `WORKING_CONTEXT.md` |
| ✅ Před context compactem | Update `WORKING_CONTEXT.md` (KRITICKÉ!) |
| ✅ Po úspěšném verify | `git commit` pokud necommitováno |

### Automatický check:
Při boot sequence VŽDY porovnej:
1. Poslední commit hash v WORKING_CONTEXT
2. Aktuální `git log -1 --oneline`
Pokud se neshodují → **WORKING_CONTEXT je zastaralý!**

### Pravidlo malých commitů:
```
✅ SPRÁVNĚ: "feat(lesson-01): add AIM framework section"
❌ ŠPATNĚ: "feat: complete entire lesson" (na konci dne)
```

---

### 📝 "Zapiš si pravidlo" Protocol
Když uživatel řekne "zapiš si" nebo "pamatuj si":

| Typ informace | Kam zapsat | Příklad |
|---------------|------------|---------|
| Nové pravidlo (trvalé) | `MEMORY.md` → Lessons Learned | "Nikdy nedělej X" |
| Aktuální kontext | `WORKING_CONTEXT.md` | "Pracujeme na Y" |
| Změna protokolu | `AGENT_PROTOCOL.md` | Nový SOP |
| Změna workflow | Příslušný workflow soubor | Multi-agent změna |

**DŮLEŽITÉ:** Po zápisu VŽDY potvrď uživateli kam jsi to zapsal!

---

## 🔄 Context Compacting Protocol

### Před compactem (80% context):
1. **Aktualizuj WORKING_CONTEXT.md** s aktuálním stavem
2. Informuj uživatele: "Ukládám kontext před compactem..."

### Po compactu:
1. Znovu proveď Boot Sequence (viz výše)
2. Načti WORKING_CONTEXT.md
3. Pokračuj kde jsi skončil
4. Odpověz: "Obnovuji kontext. Pracoval jsem na [X]..."

---

## 📋 Handoff Protocol (Mezi agenty)

### Když předáváš práci jinému agentovi:
1. Aktualizuj `WORKING_CONTEXT.md`:
   - Co je hotovo
   - Co zbývá
   - Důležité detaily
2. Commit změny (pokud relevantní)
3. Řekni: "Handoff připraven. Další agent: přečti WORKING_CONTEXT.md"

### Když přebíráš práci:
1. Přečti `WORKING_CONTEXT.md`
2. Přečti `MEMORY.md`
3. Pokračuj od bodu kde předchozí agent skončil

---

## 🗺️ Navigace

Pro kompletní přehled dokumentace viz:
→ `.ai-context/INDEX.md`

### Klíčové adresáře:
```
.ai-context/
├── state/           ← Živá paměť (read/write)
├── core/            ← Architektura, guidelines (read-only)
├── workflows/       ← How-to guides
├── learning/        ← Knowledge base
└── history/         ← Archiv (nečíst při boot)
```

---

## 🔧 Subagent Usage (POVINNÉ!)

**Před použitím subagenta přečti:** `workflows/SUBAGENT_STRATEGY.md`

### MUSÍŠ použít subagenta když:
| Situace | Agent | Proč |
|---------|-------|------|
| "Kde je X v kódu?" | `Explore` | Prozkoumá celý codebase, ne jen první match |
| "Jak funguje systém Y?" | `Explore` (thorough) | Najde všechny souvislosti |
| Plánování velké feature | `Plan` | Architektonické rozhodnutí |
| 10+ souborů ke změně | `general-purpose` | Autonomní bulk operace |

---

## 🔍 Research Tools Selection (POVINNÉ!)

### Kdy použít který nástroj:

| Potřebuji... | Nástroj | Příklad |
|--------------|---------|---------|
| **Rychlá fakta, jednoduché dotazy** | `WebSearch` | "Jaká je nejnovější verze React?" |
| **Dokumentace knihovny** | `Context7 MCP` | "Jak použít useEffect v React 19?" |
| **Deep Research, analýzy, srovnání** | `Perplexity MCP` | "Srovnej AI code assistants 2025" |
| **Aktuální trendy, state-of-the-art** | `Perplexity MCP` | "Nejnovější techniky pro RAG" |
| **Content research před generací** | `Perplexity MCP` → `Gemini` | Research → Content pipeline |

### 🔬 Perplexity MCP Tools

Po restartu Claude Code session jsou dostupné:

| Tool | Kdy použít |
|------|------------|
| `mcp__perplexity-search__perplexity_search` | Rychlé vyhledávání s citacemi |
| `mcp__perplexity-search__perplexity_research` | Deep Research - komplexní analýzy |

### 📋 Deep Research Workflow

**Kdy MUSÍŠ použít Perplexity Deep Research:**
1. **Content creation** - Před psaním lekce/článku → zjisti aktuální stav tématu
2. **Technologická rozhodnutí** - "Jaký framework použít pro X?"
3. **Competitive analysis** - Srovnání produktů, knihoven, přístupů
4. **Trend analysis** - "Co je nového v oblasti Y?"
5. **Fact-checking** - Ověření aktuálnosti informací před publikací

**Příklad workflow:**
```
1. Uživatel: "Napiš lekci o RAG"
2. Claude: Použiju perplexity_research pro aktuální stav RAG technologií
3. Claude: Předám research Gemini pro generování obsahu
4. Claude: QA review výsledku
```

### 🆕 Gemini Deep Research Agent (Dec 2025)

**Co to je:**
Autonomní výzkumný agent od Google (Gemini 3 Pro), který:
- Plánuje výzkumnou strategii
- Provádí web search (až 60 minut)
- Čte a syntetizuje zdroje
- Vrací detailní report s citacemi

**Kdy použít Gemini Deep Research:**
```
✅ Rozsáhlé market research (konkurence, trendy)
✅ Due diligence / investigative research
✅ Literature review (akademické zdroje)
✅ Comparative landscape analysis
✅ Když potřebuješ 20-60 min autonomního výzkumu
```

**Kdy NEPOUŽÍVAT:**
```
❌ Rychlé dotazy (použij Perplexity nebo WebSearch)
❌ Low-latency chatbot interakce
❌ Jednoduché extrakce faktů
```

**Jak volat (CLI):**
```bash
# Varianta 1: Gemini CLI s deep-research flag (pokud podporuje)
gemini -m deep-research-pro-preview-12-2025 "Research question"

# Varianta 2: Python script (doporučeno)
python backend/scripts/gemini_deep_research.py "Your research question"
```

**API volání (Python):**
```python
from google import genai

client = genai.Client()
interaction = client.interactions.create(
    input="Your research question here",
    agent='deep-research-pro-preview-12-2025',
    background=True  # POVINNÉ - async execution
)

# Poll for completion
while interaction.status == 'in_progress':
    time.sleep(30)
    interaction = client.interactions.get(interaction.id)

print(interaction.output)  # Detailed research report
```

**Limity:**
- Max runtime: 60 minut (většina hotová za 20)
- Nelze přidat custom tools/MCP
- Beta status - API se může měnit
- Google Search zdarma do 5. ledna 2026

### ⚠️ Důležité poznámky:
- **API klíč:** Sdílený s Daily Digest cron scriptem
- **Náklady:** sonar ~$1/1000 req, sonar-pro ~$5/1000 req
- **MCP restart:** Nové MCP nástroje vyžadují restart Claude Code session

### NESMÍŠ použít subagenta když:
| Situace | Použij místo toho |
|---------|-------------------|
| Znám přesný soubor | `Read` tool |
| Hledám konkrétní třídu/funkci | `Grep` tool |
| Jednoduchá změna | `Edit` tool |

**Pravidlo:** Pokud nevíš kde něco je → **VŽDY** použij Explore agenta!

---

## 🔄 Documentation Maintenance Protocol

### Kdo aktualizuje co:
| Dokument | Kdo | Kdy |
|----------|-----|-----|
| `WORKING_CONTEXT.md` | Aktivní agent | Průběžně |
| `MEMORY.md` | Kdo najde lessons learned | Při nových poznatcích |
| `AGENT_PROTOCOL.md` | Po dohodě s uživatelem | Při změně workflow |
| `CONTENT_GUIDELINES.md` | Při změně content pravidel | Po schválení |
| `INDEX.md` | Při přidání/odebrání souborů | Ihned |

### Pravidla údržby:
1. **Při přidání nového souboru** → Přidej do INDEX.md
2. **Při odebrání souboru** → Odeber z INDEX.md + přesuň do archive
3. **Při změně pravidla** → Aktualizuj VŠECHNY odkazující soubory
4. **Při konfliktu pravidel** → Eskaluj k uživateli

### Review trigger:
- **Každý měsíc:** Quick audit - jsou všechny odkazy funkční?
- **Při velkém redesignu:** Full audit + archivace starého

---

## 🛡️ Best Practices (Anti-Patterns)

### ❌ NIKDY nedělej:
1. **Fire & forget** - Neprohlašuj hotovo bez verifikace
2. **Self-certification** - Nerozhoduj sám o kvalitě (QA gate = Claude/User)
3. **Zombie docs** - Nevytvářej dokumenty které nikdo nečte
4. **Duplicate info** - Nepiš to samé na 2 místa (link instead)
5. **Skip reading** - Neignoruj boot sequence po compactu

### ✅ VŽDY dělej:
1. **Read before write** - Přečti soubor než ho editneš
2. **Verify after write** - Přečti zpět co jsi napsal
3. **Link don't duplicate** - Odkazuj místo kopírování
4. **Ask when unsure** - Zeptej se uživatele při nejistotě
5. **Update context** - Průběžně aktualizuj WORKING_CONTEXT

---

*Version: 3.0*
*Created: 2025-12-06*
*Maintained by: All agents*
*Next review: Monthly or at major changes*
