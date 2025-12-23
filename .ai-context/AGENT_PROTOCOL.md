# Agent Protocol v5.1 / v6.0

**Single Source of Truth for all AI agents working on this project.**

---

## 🔀 Workflow Selection

| Workflow | Default Orchestrator | When to Use |
|----------|----------------------|-------------|
| **v5.1** | GPT-5.2 (Codex), unless active console/user override | Hard debugging, architecture decisions, security audits |
| **v6.0** | Claude Code, unless active console/user override | Long autonomous sessions, implementation-heavy, minimal user interaction |

**Default orchestrator:** The console you are actively using.
**v6.0 Details:** See `workflows/WORKFLOW_V6_CLAUDE_FIRST.md`
**Unified Orchestration (Codex + Claude consoles):** See `workflows/UNIFIED_ORCHESTRATION.md`
**User directives:** "pouzij codex", "pouzij claude", "pouzij gemini" (content/visual orchestrator), "pouzij kamose" triggers a triad consult (Codex + Claude + Gemini) with independent top-3 ideas and a quick vote for final top-3.

**Codex Accounts:**
```bash
codex2    # Team (primary) - higher limits
codex1    # Plus (fallback)
```

---

## 🧭 Codex Profile Cheat Sheet

| Situation | Profile | Intent |
|-----------|---------|--------|
| Quick triage, small fix | `fast` | Speed, minimal overhead |
| Pre-implementation review | `review` | Sanity check approach |
| New endpoint / risky behavior | `tests` | Happy + failure paths |
| Auth/permissions change | `security` | Enumerate authz pitfalls |
| Bug >30 min / unclear root cause | `deep` | Root-cause analysis |
| Multi-component planning | `orchestrator` | Decompose + plan |
| Production incident | `hotfix` | Smallest safe fix |

Claude model default: Opus (downgrade only if user asks for speed).

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
│  │ GPT-Researcher│  │ Gemini Deep   │                           │
│  │  (optional)   │  │ (60min Res.)  │                           │
│  └───────────────┘  └───────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

### 📊 Role Assignment Matrix

| Agent | Primární Role | Context | Subscription |
|-------|---------------|---------|--------------|
| **GPT-5.2** | Orchestrátor + Reasoning | ~128k | OpenAI Pro |
| **Claude Code** | Implementer + Git + Daily Ops | ~200k | Claude Code |
| **Gemini 3 Pro** | Visual QA + Content + Research | **2M** | Google AI Plus |
| **Gemini Deep Research** | 60-min Autonomous Research | N/A | Google AI Plus |
| **GPT-Researcher** | Optional self-hosted research runner | N/A | Local |

### 🎯 Situational Orchestration

| Situace | Orchestrátor | Implementer | QA |
|---------|--------------|-------------|-----|
| **Záhadný bug** (>30 min stuck) | GPT-5.2 | Claude | Claude |
| **Clear implementation** | Claude | Claude | GPT-5.2 (review) |
| **Content creation** | Claude | Gemini 3 | Claude |
| **Architecture decision** | GPT-5.2 | Claude | Gemini (alternatives) |
| **Visual QA** | Claude | Claude | **Gemini** (2M ctx!) |
| **Quick research** | Claude | Gemini 3 Pro (CLI) | Claude |
| **Deep research** | Claude | Gemini Deep Research (script) | Claude |

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

### 🔐 Secrets & PII Redaction (KRITICKÉ!)

**NIKDY neposílej do promptů:**
- JWT tokeny, API keys, passwords
- Email adresy uživatelů
- Database connection strings s credentials
- Reset/verification links
- Cookies, session tokens
- Osobní údaje (jména, telefony, adresy)

**PŘED sdílením logů/screenshots:**
1. Maskuj tokeny: `eyJ...` → `[JWT_REDACTED]`
2. Maskuj emaily: `user@example.com` → `[EMAIL_REDACTED]`
3. Maskuj URLs s tokeny: `?token=abc123` → `?token=[REDACTED]`
4. Ověř že screenshot neobsahuje citlivá data

**Příklad sanitizace:**
```bash
# Před sdílením logu:
sed -E 's/eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/[JWT_REDACTED]/g' log.txt
```

### 📋 Communication Templates

**Task Brief (Orchestrátor → Implementer):**
```markdown
## Task ID: [YYYY-MM-DD-short-name]
## Goal: [1 věta]
## Acceptance criteria:
- [ ] [criterion 1]
- [ ] [criterion 2]
- [ ] [criterion 3]
## Files to modify: [seznam]
## Expected outcome: [jak poznat success]
## Verify: [konkrétní test/command k ověření]
```

**Task Result (Implementer → Orchestrátor):**
```markdown
## Task ID: [YYYY-MM-DD-short-name]
## Status: [done/blocked/needs-review]
## Changes: [git diff summary - 5 řádků max]
## Acceptance criteria met:
- [x] [criterion 1] - verified by [how]
- [x] [criterion 2] - verified by [how]
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

## 🗳️ Multi-Agent Consensus Protocol (MACP) v2.0

**Purpose:** For high-stakes decisions, Claude consults GPT-5.2 and Gemini for diverse perspectives before deciding.
**Updated:** 2025-12-18 (MACP consensus between GPT-5.2 + Gemini)

### ⚡ Consensus Triggers (Kdy aktivovat)

```
AKTIVUJ MACP když:
□ Security/auth/permissions changes
□ DB schema/migrations (hard to reverse)
□ Architecture/multi-module refactors
□ Breaking API changes
□ Content strategy decisions
□ User-facing UI + logic changes
□ Release-candidate review
□ User explicitly asks "get second opinion"
□ >30 min stuck + 2+ failed attempts (escalation)

NEAKTIVUJ pro:
□ Small, local, reversible fixes
□ Routine coding tasks
□ Clear implementation with tests
```

### 🔀 Routing Rules (Codex vs Gemini)

| Potřebuji... | Agent | Profile/Model |
|--------------|-------|---------------|
| Code correctness, edge cases | **Codex** | `review` / `deep` |
| Architecture, CI issues | **Codex** | `review` / `orchestrator` |
| Security audit | **Codex** | `security` |
| UX/copy/content generation | **Gemini** | `gemini-3-pro-preview` |
| Visual QA, UI polish | **Gemini** | `gemini-3-pro-preview` + screenshots |
| Localization, tone | **Gemini** | `gemini-3-pro-preview` |
| Research, broad summaries | **Gemini** | `gemini-3-pro-preview` |

**Volej OBA (MACP) když:**
- User-facing UI + logic: Codex (correctness) + Gemini (UX/visual)
- Security-sensitive UX: Codex `security` + Gemini (confusing UI check)
- Release candidate: Codex `review` + Gemini (content/i18n)

### 🎯 Consensus Protocol (při disagreement)

**Stepwise protocol:**
```
1. CLASSIFY: correctness/bug | security | UX/product | style
   ↓
2. SEEK GROUND TRUTH: run test, reproduce, minimal example
   ↓
3. DOMAIN WEIGHT (if still ambiguous):
   - Security/correctness → weight Codex higher
   - UX/copy/pedagogy → weight Gemini higher
   - Product intent → weight User/Claude highest
   ↓
4. TIE-BREAKER:
   - UX/copy disagreement → call Gemini
   - Architecture disagreement → call Codex orchestrator
   ↓
5. ESCALATE TO USER when:
   - Externally visible behavior change
   - Breaking API / data semantics
   - Permissions / billing impact
   - Neither option clearly dominates
```

### 🛑 Circuit Breaker v2.0 (Evidence-Based)

**PRAVIDLO:** Max 3 delegation hops **BEZ nové evidence** před user escalation.

```
Claude → Codex → Gemini → STOP (ask user)
         ↓         ↓
    [new evidence?] [new evidence?]
         ↓ YES      ↓ YES
    Counter reset  Counter reset
```

**Co je "new evidence":**
- Failing test s konkrétním output
- Screenshot ukazující bug
- Minimal repro steps
- Traceback/log s root cause
- Benchmark/metrics data

**Co NENÍ "new evidence":**
- Další hypotéza bez ověření
- Parafráze předchozího zjištění
- "Myslím že problém je v X" bez testu

Prevents: infinite ping-pong, token bloat, analysis paralysis.

### ⚖️ Weighted Domain Authority

| Conflict Domain | GPT-5.2 | Gemini | Claude |
|-----------------|---------|--------|--------|
| **Security/Logic/Algorithm** | **70%** | 20% | 10% |
| **Codebase Impact/Architecture** | **60%** | 20% | 20% |
| **UX/Visuals/Copy** | 20% | **70%** | 10% |
| **Content/Pedagogy** | 30% | **60%** | 10% |
| **Integration/Shipping** | 30% | 30% | **40%** |

### ⚠️ Anti-Patterns to Avoid

| Anti-Pattern | Risk | Mitigation |
|--------------|------|------------|
| **Echo Chamber** | Anchoring bias | Independent "blind ballot" queries |
| **Consensus Theater** | Latency without value | Strict triggers + 10 min time-box |
| **Analysis Paralysis** | Stuck on trivial decisions | Circuit breaker (max 3 hops) |
| **Decision Churn** | Re-litigating closed decisions | Decision log, reopen only with new evidence |
| **Ping-Pong Loop** | Agents delegating back and forth | Circuit breaker + user escalation |

### 📝 Decision Record Template

**POVINNÉ:** Po každém MACP decision, vytvoř záznam.

**Location:** `.ai-context/history/decisions/YYYY-MM-DD-topic.md`

**Naming:** `2025-12-18-circuit-breaker-update.md`

```markdown
## Decision: [Topic]
**Date:** YYYY-MM-DD
**Agents consulted:** GPT-5.2, Gemini
**GPT-5.2:** [GO/NO-GO/NEEDS-DECISION] @ [X]% confidence - [brief reason]
**Gemini:** [GO/NO-GO/NEEDS-DECISION] @ [X]% confidence - [brief reason]
**Domain weights applied:** [which domain, who weighted higher]
**Final decision:** [What was decided]
**Rationale:** [Why]
**Verify:** [How to confirm decision was correct]
```

**Index:** Keep running list in `.ai-context/history/decisions/INDEX.md`

---

## 🦸 Claude Superpowers Integration (v5.3)

**Plugin:** `obra/superpowers` - Strukturované workflow skills pro Claude Code

### Skill → Task Mapping (GPT-5.2 VŽDY doporučí v Task Briefu)

| Task Type | Claude Skills | Popis |
|-----------|---------------|-------|
| Bug/Incident | `/systematic-debugging` + `/verification-before-completion` | 4-phase root cause + checklist |
| Feature/Refactor | `/writing-plans` → `/executing-plans` | Detailed plans → batch execution |
| Codebase Discovery | `/dispatching-parallel-agents` | Coordinate parallel subagents |
| Content Creation | `/subagent-driven-development` | Two-stage review (spec → quality) |
| Any Completion | `/verification-before-completion` | Always verify before "done" |

### Workflow Hierarchy (v5.3)

```
┌─────────────────────────────────────────────────────────────────┐
│  GPT-5.2 (MAKRO-ORCHESTRACE)                                    │
│  - Cíle, rizika, acceptance criteria, "done" definice          │
│  - Trade-offs, scope minimalizace, finální code review          │
│  - VŽDY doporučí 1-2 skills v Task Briefu                       │
│                              ↓                                  │
├─────────────────────────────────────────────────────────────────┤
│  Claude + Superpowers (MIKRO-ORCHESTRACE + EXECUTION)           │
│  - Aktivuje doporučené skills                                   │
│  - Strukturovaná implementace s checkpointy                     │
│  - State Summary (10 řádků max) po dokončení                    │
│                              ↓                                  │
├─────────────────────────────────────────────────────────────────┤
│  Gemini (QA GATE)                                               │
│  - "Inquisitor Protocol" = Socratic content review              │
│  - "Pixel Defense" = Binary visual QA (PASS/FAIL)               │
└─────────────────────────────────────────────────────────────────┘
```

### Gemini Handoff Formats

**Pro Content Review:**
```markdown
**TASK:** Content Review
**TARGET:** `content/courses/[course]/lessons/[id]/content.mdx`
**AUDIENCE:** [Beginner/Intermediate/Advanced]
**FOCUS:** [Specific aspect to review]
```

**Pro Visual QA:**
```markdown
**TASK:** Visual Inspection
**SNAPSHOT:** `path/to/screenshot.png`
**CONTEXT:** [What the screen shows]
**EXPECTED:** [Specific elements to verify]
```

### Context Saving Rules (pro Claude)

| Pravidlo | Proč |
|----------|------|
| Plán max 3-6 kroků | Méně ping-pong |
| Žádné code dumps | Odkazuj na soubory/symboly |
| State summary na konci | 10 řádků: hotovo/zbývá/rizika |
| Explicit skill v promptu | Deterministické chování |

---

## 🤖 Agent-Specific Instructions

### GPT-5.2 (Codex CLI)

**Model:** `gpt-5.2` s reasoning effort levels: `low` → `medium` → `high` → `xhigh`

**Profily (v ~/.codex/config.toml):**
| Profil | Reasoning | Kdy použít |
|--------|-----------|------------|
| `fast` | low | Quick triage, jednoduché dotazy |
| `default` | medium | Běžné úkoly |
| `deep` | **xhigh** | Komplexní debugging, bounded problems |
| `orchestrator` | **xhigh** | Decompose work, delegation plan, multi-component |
| `review` | high | Code review, CI issues |
| `security` | **xhigh** | Threat model, authz, IDOR, injection, SSRF |
| `hotfix` | high | Minimal diff, rollback-safe, prod incident |
| `tests` | high | Coverage, deterministic, boundary cases |
| `docs` | medium | Clarity, operability, brief |

**Reasoning Effort Levels:** `none` → `minimal` → `low` → `medium` → `high` → **`xhigh`**

**Deep vs Orchestrator (KRITICKÉ!):**
| Aspekt | `deep` (solver) | `orchestrator` (manager) |
|--------|-----------------|--------------------------|
| **Účel** | Max correctness na bounded problem | Decompose ambiguous work |
| **Output** | Concrete fix, edge-case analysis | Task breakdown, risk matrix, delegation plan |
| **Kdy** | Shape je clear ale hard | Shape je unclear |
| **Příklad** | "Find root cause from traceback" | "Plan course certificates end-to-end" |

**Jak volat:**
```bash
# ⚡ Quick triage
codex exec -p fast "Quick question"

# 🔍 Deep analysis (bounded problem)
codex exec -p deep "Given this traceback, find root cause..."

# 🎯 Orchestration (multi-component)
codex exec -p orchestrator "Plan implementation of feature X"

# 🔒 Security review
codex exec -p security "Review auth changes for IDOR/bypass"

# 🚨 Hotfix (prod incident)
codex exec -p hotfix "CI failing with error X, minimal fix"

# 🧪 Test strategy
codex exec -p tests "Add pytest coverage for /endpoint"

# 📝 Code review
codex exec -p review "Review this PR diff"

# 📚 Documentation
codex exec -p docs "Update README for new env var"

# S obrázky
codex exec -i /path/to/screenshot.png "Analyze this error"
```

**Claude PROAKTIVNĚ deleguje na Codex když:**
| Trigger | Profile | Příklad |
|---------|---------|---------|
| Auth/permissions změna | `security` | "Enumerate authz pitfalls for new endpoint" |
| SQLAlchemy/DB změna | `deep` | "Check transaction/cascade behavior" |
| Prod incident | `hotfix` | "Smallest fix + regression test" |
| >2 modules změna | `orchestrator` | "Plan implementation, identify risks" |
| 10-15 min bez hypotézy | `deep` | "Root cause from traceback + files" |
| Nový endpoint | `tests` | "Happy path + failure path tests" |
| Před implementací | `review` | "Review approach before coding" |

### Gemini 3 Pro (Google AI Plus)

**Kdy volat:**
```
✅ Content generation (lekce, dokumentace)
✅ Visual QA (2M context = 100+ screenshots!)
✅ Research (5-20 min)
✅ Code review / oponentura
```

**Jak volat:**
```bash
# ✅ PRO (content, research, oponentura) - kvalita a hloubka
gemini -m gemini-3-pro-preview "Your prompt"
cat << 'EOF' | gemini -m gemini-3-pro-preview 2>&1
[prompt]
EOF

# ✅ PRO s obrázky (Visual QA)
gemini -m gemini-3-pro-preview --file /path/to/screenshot.png "Analyze this UI"

# ⚡ FLASH (quick tasks) - rychlý, levný
gemini "Simple question"  # bez -m = Flash

# ❌ NIKDY: gemini-2.5 (zastaralý)
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

### Perplexity (MCP) - Disabled

**Status:** Dočasně vypnuto (kredity). Nepoužívat v workflow.

---

## 📖 Boot Sequence (POVINNÉ pro všechny)

### 1. Načti společný protokol
```
READ: .ai-context/AGENT_PROTOCOL.md (tento soubor)
READ: .ai-context/INDEX.md           ← Aktivní mapování dokumentů
READ: .ai-context/INIT_CARDS.md      ← Always-on vs situational
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
| Multi-agent work | `workflows/UNIFIED_ORCHESTRATION.md` |
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
- Pro **Deep Research** (komplexní analýzy, srovnání, trendy) → použij **Gemini Deep Research**
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

## 🔧 Subagent Usage (Doporučeno)

**Před použitím subagenta přečti:** `workflows/SUBAGENT_STRATEGY.md`
**Fallback když nejsou dostupní:** Viz sekce "Fallback Strategy" ve SUBAGENT_STRATEGY.md

### PREFERUJ subagenta když (pokud je dostupný):
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
| **Deep Research, analýzy, srovnání** | `Gemini Deep Research` | "Srovnej AI code assistants 2025" |
| **Aktuální trendy, state-of-the-art** | `Gemini Deep Research` | "Nejnovější techniky pro RAG" |
| **Content research před generací** | `Gemini Deep Research` → `Gemini` | Research → Content pipeline |

**Poznámka (Perplexity vypnuto):**
- Primární research = **Gemini Deep Research**.
- Rychlé faktické dotazy → **Context7 MCP** nebo krátký Gemini prompt.
- **GPT-Researcher** lze použít jako self-hosted fallback (vyžaduje konfiguraci + API klíče).

### 📋 Deep Research Workflow

**Kdy MUSÍŠ použít Gemini Deep Research:**
1. **Content creation** - Před psaním lekce/článku → zjisti aktuální stav tématu
2. **Technologická rozhodnutí** - "Jaký framework použít pro X?"
3. **Competitive analysis** - Srovnání produktů, knihoven, přístupů
4. **Trend analysis** - "Co je nového v oblasti Y?"
5. **Fact-checking** - Ověření aktuálnosti informací před publikací

**Příklad workflow:**
```
1. Uživatel: "Napiš lekci o RAG"
2. Claude: Použiju Gemini Deep Research pro aktuální stav RAG technologií
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
❌ Low-latency chatbot interakce
❌ Jednoduché extrakce faktů (raději Context7/short prompt)
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

**Pravidlo:** Pokud nevíš kde něco je → **preferuj** Explore agenta (nebo Grep+Read fallback).

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

*Version: 5.1*
*Created: 2025-12-06*
*Last Updated: 2025-12-18*
*Maintained by: All agents*
*Next review: Monthly or at major changes*
