# Agent Protocol v3.0

**Single Source of Truth for all AI agents working on this project.**

---

## 🤖 Agent Identification

| Agent | Entry Point | Role |
|-------|-------------|------|
| **Claude Code** | `CLAUDE.md` (auto) | Orchestrator, QA Gate, Implementer |
| **Gemini CLI** | `GEMINI.md` (auto) | Researcher, Content Generator |
| **Antigravity/IDE** | `.agent/rules/rules.md` | Full-stack Developer |
| **Subagents** | Via Task tool | Specialized workers |

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
