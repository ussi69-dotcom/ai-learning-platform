# Multi-Agent Workflow

## Architektura

```
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR                             │
│              Claude Code (Opus/Sonnet)                      │
│         Architektura, validace, git, QA                     │
└─────────────────┬───────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┬─────────────┐
    ▼             ▼             ▼             ▼
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│ CODER  │  │   QA   │  │ CONTENT│  │SECURITY│
│ Sonnet │  │ Haiku  │  │ Gemini │  │ Sonnet │
│        │  │        │  │        │  │        │
│ Imple- │  │ Tests  │  │ MDX    │  │Red Team│
│ mentace│  │ Lint   │  │ Quiz   │  │ Audit  │
└────────┘  └────────┘  └────────┘  └────────┘
```

---

## 1. Claude Code Subagents (Task Tool)

### Haiku - Quick Tasks
```
Použij: model="haiku" v Task tool
Ideální pro:
- npm run verify
- Hledání souborů (Glob)
- Jednoduché grep
- Validace JSON struktury
```

### Sonnet - Implementation
```
Použij: model="sonnet" v Task tool
Ideální pro:
- Psaní kódu
- API změny
- Bugfixy
- Refactoring
```

### Opus - Architecture
```
Použij: model="opus" v Task tool (nebo default)
Ideální pro:
- Design decisions
- Complex refactoring
- Multi-file changes
- Code review
```

---

## 2. Gemini CLI pro Content Generation

### Setup
```bash
# Gemini CLI je samostatný nástroj
# Spouští se v terminálu, ne jako MCP

# Prompt template pro lekce:
gemini "Vytvoř lekci o [TÉMA] podle CONTENT_GUIDELINES.md"
```

### Workflow: Claude + Gemini

#### Krok 1: Claude připraví kontext
```bash
# Claude Code vytvoří prompt soubor
cat > /tmp/gemini-prompt.md << 'EOF'
# Zadání pro Gemini

## Cíl
Vytvoř lekci "Prompt Injection Attacks" pro kurz Advanced AI.

## Formát
- content.mdx (EN)
- content.cs.mdx (CZ)
- meta.json
- quiz.json + quiz.cs.json

## Požadavky
1. Struktura podle .ai-context/core/CONTENT_GUIDELINES.md
2. 3 interaktivní LABy (copy-paste ready)
3. Diagram typu "attack-flow" nebo použij existující
4. Quiz 5 otázek (mix single/multiple choice)

## Reference
- Existující lekce: content/courses/ai-basics/lessons/
- Komponenty: <ConceptCard>, <Callout>, <Steps>, <LabSection>
EOF
```

#### Krok 2: Gemini generuje
```bash
# Uživatel spustí Gemini CLI s promptem
gemini < /tmp/gemini-prompt.md > /tmp/gemini-output.md
```

#### Krok 3: Claude validuje a commituje
```bash
# Claude Code:
# 1. Parsuje Gemini output
# 2. Validuje strukturu (JSON, MDX)
# 3. Kopíruje do content/courses/
# 4. Spouští npm run verify
# 5. Commituje pokud OK
```

---

## 3. Pravidelné Cvičení: Blue/Red Team

### Weekly Security Audit (každý pátek)

#### Red Team (Sonnet)
```
Task: "Simuluj útočníka. Projdi kód a najdi:
1. XSS vulnerabilities v MDX renderingu
2. SQL injection v backend queries
3. CSRF v auth endpoints
4. Hardcoded secrets
5. Rate limiting bypasses

Reportuj jako penetration test."
```

#### Blue Team (Opus)
```
Task: "Analyzuj Red Team report. Pro každý finding:
1. Validuj severity
2. Navrhni fix
3. Implementuj a otestuj
4. Aktualizuj MEMORY.md s lessons learned"
```

### Monthly Code Health Check (první pondělí v měsíci)

```
Task tool s Explore agentem:
1. Najdi zombie soubory (nepoužívané exporty)
2. Identifikuj copy-paste kód
3. Zkontroluj messages sync (EN/CZ)
4. Měř velikost komponent (>300 řádků = refactor kandidát)
5. Reportuj tech debt
```

---

## 4. QA Pipeline

### Pre-commit (Automatic)
```bash
# .husky/pre-commit už běží:
cd frontend && npm run typecheck
```

### Post-PR (Manual trigger)
```bash
# Claude Code spustí:
Task tool (Haiku): "Spusť npm run verify a reportuj výsledek"
Task tool (Haiku): "Spusť pytest a reportuj failures"
Task tool (Sonnet): "Zkontroluj změny v PR a validuj best practices"
```

### Visual Testing
```bash
# Playwright MCP pro screenshoty
# Porovnání s baseline
npm run test:visual
```

---

## 5. Post-Task QA Validation (Developer ↔ QA Loop)

### Proces

```
┌─────────────────────────────────────────────────────────────┐
│                    TASK COMPLETED                           │
│              (Developer finished implementation)            │
└─────────────────────────┬───────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              STAGE 1: QA REVIEW                             │
│              Agent: Haiku nebo Gemini                       │
├─────────────────────────────────────────────────────────────┤
│  Pravidla:                                                  │
│  • Max 5 findings per review (prevence scope creep)         │
│  • Každý finding má kategorii + severity                    │
│                                                             │
│  Kategorie:                                                 │
│  🐛 BUG        - Funkční chyba                              │
│  🎨 UX         - User experience problém                    │
│  ⚡ PERF       - Performance issue                          │
│  🔒 SECURITY   - Bezpečnostní riziko                        │
│  ✨ NICE2HAVE  - Vylepšení (ne kritické)                    │
│                                                             │
│  Severity:                                                  │
│  P1 - Kritické (blokuje release)                            │
│  P2 - Důležité (mělo by se opravit)                         │
│  P3 - Nízká priorita (nice to have)                         │
└─────────────────────────┬───────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              STAGE 2: DEVELOPER TRIAGE                      │
│              Agent: Sonnet                                  │
├─────────────────────────────────────────────────────────────┤
│  Pro každý QA finding rozhodne:                             │
│                                                             │
│  ✅ ACCEPT                                                  │
│     → Přidá do tasklist                                     │
│     → Implementuje fix                                      │
│                                                             │
│  ❌ REJECT                                                  │
│     → Napíše důvod (technický/business)                     │
│     → Vrací na QA k posouzení                               │
│                                                             │
│  🏛️ ARCHITECTURE QUESTION                                   │
│     → Eskaluje na Opus (má veto právo)                      │
│     → Gemini může dát input jako "advisory"                 │
└─────────────────────────┬───────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              STAGE 3: QA RESPONSE                           │
│              Agent: Haiku/Gemini                            │
│              ⚠️ MAX 1 ITERACE (no ping-pong!)               │
├─────────────────────────────────────────────────────────────┤
│  Pro každý REJECTED finding:                                │
│                                                             │
│  👍 ACCEPT REJECTION                                        │
│     → Finding jde do "Declined" bucket                      │
│     → Dokumentuje se důvod pro budoucnost                   │
│                                                             │
│  👎 DISAGREE                                                │
│     → Finding + důvod jde do DECISION LIST                  │
│     → Taguje se severity (P1/P2/P3)                         │
│     → Čeká na rozhodnutí uživatele                          │
└─────────────────────────┬───────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              STAGE 4: ARCHITECT REVIEW (pokud potřeba)      │
│              Agent: Opus 4.5                                │
├─────────────────────────────────────────────────────────────┤
│  Spouští se pokud:                                          │
│  • Developer eskaloval arch otázku                          │
│  • QA a Developer se neshodli na design patternu            │
│                                                             │
│  Pravomoci:                                                 │
│  🔴 VETO POWER na architecture decisions                    │
│  🟡 Může overridenout Sonnet na design patterns             │
│  🟢 Bere Gemini input jako "advisory" (ne závazný)          │
│                                                             │
│  Output:                                                    │
│  • Finální rozhodnutí s odůvodněním                         │
│  • Aktualizace MEMORY.md (lessons learned)                  │
└─────────────────────────────────────────────────────────────┘
```

### Model Authority Hierarchy

```
┌────────────────────────────────────────────────────────────┐
│  DECISION AUTHORITY (od nejvyšší po nejnižší)              │
├────────────────────────────────────────────────────────────┤
│  1. 👤 USER              - Finální arbitr                  │
│  2. 🏛️ OPUS 4.5          - Architecture veto               │
│  3. 💻 SONNET            - Implementation decisions        │
│  4. 🔍 HAIKU             - QA findings (advisory)          │
│  5. 💡 GEMINI            - Creative input (advisory)       │
└────────────────────────────────────────────────────────────┘
```

### Output Buckets

| Bucket | Popis | Kdo rozhoduje |
|--------|-------|---------------|
| **Tasklist** | Accepted findings → implementovat | Developer (Sonnet) |
| **Declined** | Rejected + QA souhlasí | Developer + QA shoda |
| **Decision List** | Neshoda → čeká na User | User arbitráž |
| **Arch Decisions** | Eskalované otázky | Opus (veto) |

### Příklad QA Review Output

```markdown
## QA Review: Feature XYZ

### Findings

| # | Category | Severity | Finding | Developer Response |
|---|----------|----------|---------|-------------------|
| 1 | 🐛 BUG | P1 | Null check missing in handleSubmit | ✅ ACCEPT |
| 2 | ⚡ PERF | P2 | useEffect runs on every render | ✅ ACCEPT |
| 3 | 🎨 UX | P3 | Button should be larger on mobile | ❌ REJECT: Design spec says 40px |
| 4 | ✨ NICE | P3 | Add loading skeleton | ❌ REJECT: Scope creep |
| 5 | 🔒 SEC | P2 | Input not sanitized | 🏛️ ESCALATE: Arch question |

### QA Response to Rejections

| # | QA Decision | Outcome |
|---|-------------|---------|
| 3 | 👍 Accept | → Declined bucket |
| 4 | 👎 Disagree | → Decision List (P3) |
| 5 | - | → Opus review |

### Decision List for User

| Finding | Developer says | QA says | Severity |
|---------|---------------|---------|----------|
| Loading skeleton | Scope creep | Better UX | P3 |
```

---

## 6. Gemini MCP Integration

### Setup (OAuth - vyšší limity)
```bash
# Gemini MCP používá tvůj Gemini CLI s OAuth
claude mcp add gemini-cli -- npx -y gemini-mcp-tool
```

### Použití
```
"Použij Gemini k analýze celého frontend/ adresáře"
"Zeptej se Gemini na second opinion k tomuto designu"
"Ať Gemini vygeneruje MDX lekci podle CONTENT_GUIDELINES.md"
```

### @file syntax
```
# Reference soubory přímo v Gemini promptu:
@./CLAUDE.md - přečte soubor
@./frontend/ - analyzuje adresář
```

---

## 7. Příklady Delegování

### Příklad 1: Nová Lekce
```
User: "Vytvoř lekci o RAG (Retrieval Augmented Generation)"

Claude Code:
1. [Task Haiku] Zkontroluj existující lekce pro reference
2. [Vytvoř prompt pro Gemini] PROMPT_FOR_GEMINI.md
3. [User spustí Gemini]
4. [Task Sonnet] Validuj Gemini output, oprav chyby
5. [Task Haiku] npm run verify
6. [Commit]
```

### Příklad 2: Bug Fix
```
User: "Quiz se neukazuje správně na mobilu"

Claude Code:
1. [Task Explore] Najdi Quiz.tsx a související komponenty
2. [Čti kód] Identifikuj problém
3. [Fix] Implementuj responsive fix
4. [Task Haiku] typecheck
5. [Playwright MCP] Screenshot na mobile viewport
6. [Commit]
```

### Příklad 3: Security Audit
```
User: "Udělej security audit backendu"

Claude Code:
1. [Task Sonnet - Red Team] Simuluj útoky
2. [Review report]
3. [Task Sonnet - Blue Team] Navrhni fixy
4. [Implementuj kritické fixy]
5. [Task Haiku] pytest
6. [Commit]
7. [Update MEMORY.md]
```

---

## 8. Cost Optimization

| Model | Use Case | Est. Cost/Task |
|-------|----------|----------------|
| Haiku | Lint, search, simple validation | $0.001-0.01 |
| Sonnet | Code changes, moderate complexity | $0.05-0.20 |
| Opus | Architecture, complex decisions | $0.50-2.00 |
| Gemini | Content generation (free tier) | $0.00 |

### Strategy
1. **Default to Haiku** pro quick checks
2. **Sonnet** pro implementation
3. **Opus** jen pro architecture decisions
4. **Gemini** pro veškerý content (úspora ~80%)

---

## 9. Command Reference

### Task Tool s modelem
```
Task tool:
  - subagent_type: "Explore" | "Plan" | "general-purpose"
  - model: "haiku" | "sonnet" | "opus" (optional)
```

### Playwright MCP
```
mcp__playwright__browser_snapshot  # Accessibility tree
mcp__playwright__browser_take_screenshot  # Visual
mcp__playwright__browser_navigate  # Go to URL
```

### Context7 MCP
```
mcp__context7__resolve-library-id  # Find library
mcp__context7__get-library-docs    # Get docs
```

### GitHub MCP (nově přidáno)
```
gh mcp-server  # PR, issues, Actions
```

---

*Poslední update: 2025-12-05, Cycle 45*
