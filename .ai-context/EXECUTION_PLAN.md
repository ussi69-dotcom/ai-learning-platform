# AI Learning Platform - Master Execution Plan

**Verze:** 1.0
**Datum:** 2025-12-02
**Autoři:** Claude Code (Opus 4.5) + User

---

## Executive Summary

Tento dokument definuje komplexní plán pro dokončení AI Learning Platform. Zahrnuje:
- Opravy existujících bugů
- Generování obsahu lekcí (Phase 2 + Phase 3)
- Optimalizaci workflow a nástrojů
- Rozdělení rolí mezi agenty (Claude, Gemini, Subagenty)

---

## Část 1: Aktuální Stav Projektu

### Content Completion

| Kurz | Obtížnost | Lekce | Stav | Lokalizace |
|------|-----------|-------|------|------------|
| **AI Basics** | Padawan | 7/7 | ✅ 100% | EN + CS |
| **Prompt Engineering** | Jedi Knight | 2/? | 🔴 STUB | EN only |
| **Advanced AI** | Master | 2/? | 🔴 STUB | EN only |
| **AI Engineering** | Sith Lord | 2/? | 🔴 STUB | EN only |

**Celkový stav obsahu:** ~25% (pouze 1 ze 4 kurzů kompletní)

### Známé Bugy (K Opravě)

| Bug | Priorita | Odhadovaný čas |
|-----|----------|----------------|
| Avatar uncommitted changes | 🔴 High | 15 min |
| Profile page mock data (needs API) | 🟡 Medium | 2-3 hod |
| Debug logging cleanup | 🟡 Medium | 30 min |
| i18n hardcoded strings | 🟢 Low | 1 hod |
| GradientDefs.tsx orphaned | 🟢 Low | 5 min |

---

## Část 2: Role Agentů

### Claude Code (Senior Architect)
**Odpovědnost:**
- ✅ Backend implementation (FastAPI, SQLAlchemy)
- ✅ Bug fixing (root cause analysis)
- ✅ Database migrations
- ✅ Architecture decisions
- ✅ Code review & integration
- ✅ Git workflows
- ✅ Testing
- ✅ Documentation structure
- ✅ Koordinace workflow

**Nástroje:**
- Task tool (Explore, Plan, General subagents)
- MCP: context7, playwright, sequential-thinking
- Read/Edit/Write/Bash

### Gemini CLI (Content Lead)
**Odpovědnost:**
- ✅ Psaní MDX lekcí (content.mdx, content.cs.mdx)
- ✅ Vytváření kvízů (quiz.json, quiz.cs.json)
- ✅ Lokalizace EN ↔ CS
- ✅ Kreativní writing (marketingové texty)
- ✅ SVG diagram návrhy
- ✅ Lab prompty

**Nevhodné:**
- ❌ Backend logic
- ❌ Multi-file refactoring
- ❌ Database changes
- ❌ Git workflows

### Specializovaní Subagenti (Doporučení k vytvoření)

| Agent | Účel | Model | Trigger |
|-------|------|-------|---------|
| `@visual-qa` | Playwright screenshot testing | haiku | Po UI změnách |
| `@content-validator` | Validace MDX struktury | haiku | Po lesson creation |
| `@i18n-checker` | Kontrola lokalizace | haiku | Před release |
| `@build-tester` | npm build + pytest | haiku | Před commit |

---

## Část 3: Nový Learning Plan (Optimalizovaný)

### Phase 1: Padawan (AI Basics) ✅ COMPLETE
- 7 lekcí, plně lokalizováno
- "Golden Standard" - vzor pro další kurzy

### Phase 2: Jedi Knight (Prompt Engineering) - PRIORITA #1

**Navrhovaná struktura (6-8 lekcí):**

| # | Lesson ID | Téma | Labs | Obtížnost |
|---|-----------|------|------|-----------|
| 1 | `01-prompt-anatomy` | Anatomie promptu (role, context, task, format) | 3 | 🎸 |
| 2 | `02-patterns-templates` | Prompt patterns (Zero-shot, Few-shot, CoT) | 4 | 🎸 |
| 3 | `03-context-management` | Kontext & Memory management | 3 | 🎸 |
| 4 | `04-output-control` | Output formátování (JSON, Markdown, CSV) | 4 | 🎸 |
| 5 | `05-personas-roles` | Personas & System prompts | 3 | 🎸 |
| 6 | `06-debugging-prompts` | Debugging & Iterativní vylepšování | 4 | 🎸 |
| 7 | `07-real-world-cases` | Real-world use cases | 5 | 🎸 |
| 8 | `08-course-project` | Mini-projekt: Build your prompt library | 1 mega-lab | 🎸 |

**Lab complexity:** 3-5 labs per lesson, copy-paste ready, intermediate difficulty

### Phase 3: Master (Advanced AI) - PRIORITA #2

**Navrhovaná struktura (6-8 lekcí):**

| # | Lesson ID | Téma | Labs | Obtížnost |
|---|-----------|------|------|-----------|
| 1 | `01-chain-of-thought` | Chain-of-Thought prompting | 4 | 💪 |
| 2 | `02-few-shot-learning` | Few-shot learning strategies | 4 | 💪 |
| 3 | `03-self-consistency` | Self-consistency & Voting | 3 | 💪 |
| 4 | `04-rag-basics` | RAG - Retrieval Augmented Generation | 5 | 💪 |
| 5 | `05-function-calling` | Function calling & Tool use | 5 | 💪 |
| 6 | `06-agents-intro` | AI Agents introduction | 4 | 💪 |
| 7 | `07-evaluation` | Evaluace a metriky | 3 | 💪 |
| 8 | `08-course-project` | Projekt: Build a RAG chatbot | 1 mega-lab | 💪 |

### Phase 4: Sith Lord (AI Engineering) - BUDOUCNOST

**Navrhovaná struktura (6-8 lekcí):**

| # | Lesson ID | Téma | Labs | Obtížnost |
|---|-----------|------|------|-----------|
| 1 | `01-fine-tuning` | Fine-tuning fundamentals | 4 | 🔥 |
| 2 | `02-vector-databases` | Vector databases (Pinecone, Chroma) | 5 | 🔥 |
| 3 | `03-local-llms` | Running local LLMs (Ollama, llama.cpp) | 4 | 🔥 |
| 4 | `04-scaling` | Scaling & Production deployment | 3 | 🔥 |
| 5 | `05-monitoring` | Monitoring & Observability | 4 | 🔥 |
| 6 | `06-security` | AI Security & Safety | 3 | 🔥 |
| 7 | `07-cost-optimization` | Cost optimization strategies | 3 | 🔥 |
| 8 | `08-capstone` | Capstone project | 1 mega-lab | 🔥 |

---

## Část 4: Exekuční Workflow

### Sprint 1: Stabilizace (Odhadovaný čas: 4-6 hodin)

**Claude Code:**
1. ✅ Commit avatar fixes
2. ✅ Delete orphaned GradientDefs.tsx
3. ✅ Clean up debug logging (backend)
4. ✅ Visual QA přes Playwright
5. ✅ Implementace Profile stats API endpoints

**Očekávaný výstup:** Čistý, stabilní codebase

### Sprint 2: Content Foundation (Odhadovaný čas: 2-3 dny)

**Claude Code:**
1. Vytvoření lesson skeletonů pro Phase 2 (meta.json, prázdné content.mdx)
2. Aktualizace course meta.json s CS lokalizací
3. Vytvoření custom slash commands pro content generation

**Gemini CLI:**
1. Psaní lekcí 01-04 (Prompt Engineering)
2. Vytvoření kvízů pro každou lekci
3. Czech překlady

**Handoff cycle:** Claude → Gemini → Claude review

### Sprint 3: Content Expansion (Odhadovaný čas: 1 týden)

**Gemini CLI:**
- Dokončení Phase 2 (lekce 05-08)
- Začátek Phase 3 (lekce 01-04)

**Claude Code:**
- Code review všech lekcí
- Vytvoření nových MDX komponent (pokud potřeba)
- Testování quiz logic
- Integration testing

### Sprint 4: Polish & Launch (Odhadovaný čas: 2-3 dny)

**Claude Code:**
- i18n audit (všechny hardcoded strings)
- Performance optimization
- Security audit (remove any remaining debug logs)
- Documentation finalization

**Gemini CLI:**
- Final content polish
- Marketing copy update

---

## Část 5: Nástroje & Automatizace

### Navrhované Custom Slash Commands

**`/new-lesson`** - Vytvoří skeleton pro novou lekci
```markdown
---
description: Create new lesson skeleton with all required files
allowed-tools: Write, Bash
---
Create a new lesson skeleton in content/courses/{{course}}/lessons/{{lesson-id}}/:
- meta.json (with EN + CS titles)
- content.mdx (English template)
- content.cs.mdx (Czech template)
- quiz.json (English quiz template)
- quiz.cs.json (Czech quiz template)
```

**`/validate-lesson`** - Validuje strukturu lekce
```markdown
---
description: Validate lesson structure and content completeness
allowed-tools: Read, Glob, Grep
---
Validate lesson at {{path}}:
1. Check all required files exist
2. Verify meta.json has all fields
3. Check content follows CONTENT_GUIDELINES.md
4. Verify quiz has minimum 5 questions
5. Check both EN and CS versions exist
```

**`/visual-test`** - Spustí Playwright visual test
```markdown
---
description: Run visual regression test with Playwright MCP
allowed-tools: mcp__playwright__*
---
Take screenshots of key pages and compare to baselines:
1. Homepage (both themes)
2. Course listing
3. Lesson page
4. Profile page
```

### MCP Optimization

**Aktuální:**
- ✅ context7 - documentation lookup
- ✅ playwright - visual testing
- ✅ sequential-thinking - complex analysis

**Doporučeno přidat:**
- ❓ **postgres** - přímý DB access pro debugging
- ❓ **github** - PR creation, issue tracking

---

## Část 6: Quality Gates

### Před Merge Lekce

- [ ] Content follows CONTENT_GUIDELINES.md
- [ ] Všechny labs jsou copy-paste ready
- [ ] Quiz má min. 5 otázek
- [ ] EN + CS verze existují
- [ ] Žádné raster images (SVG only)
- [ ] Dark mode compatible
- [ ] Mobile responsive

### Před Release

- [ ] npm run build passes
- [ ] pytest passes
- [ ] No TypeScript errors
- [ ] No debug logs in production code
- [ ] All i18n strings in messages/*.json
- [ ] Visual regression tests pass
- [ ] Performance benchmarks met

---

## Část 7: Metriky Úspěchu

| Metrika | Cíl | Jak měřit |
|---------|-----|-----------|
| **Content Completion** | 100% Phase 2 | Lessons complete / Total planned |
| **Localization Coverage** | 100% EN+CS | Files with both languages |
| **Lab Quality** | 100% copy-paste | Manual review |
| **Build Success** | 100% | CI/CD pipeline |
| **User Satisfaction** | TBD | Feedback system |

---

## Část 8: Risk Assessment

| Risk | Pravděpodobnost | Impact | Mitigace |
|------|-----------------|--------|----------|
| Content quality inconsistency | Medium | High | Strict code review, templates |
| Localization delays | Medium | Medium | Parallel translation workflow |
| Technical debt accumulation | Low | High | Regular refactoring sprints |
| Agent handoff confusion | Low | Medium | Clear HANDOFF.md protocol |

---

## Další Kroky (Immediate Actions)

### Pro uživatele k rozhodnutí:

1. **Schválení Learning Plan** - Je navrhovaná struktura kurzů OK?
2. **Priorita bugů** - Začít stabilizací nebo rovnou content?
3. **Gemini setup** - Máš Gemini CLI připravený pro content generation?
4. **Custom agents** - Chceš vytvořit navrhované slash commands?
5. **Timeline** - Jaké jsou tvoje časové preference?

### Pro Claude Code (po schválení):

1. Commit pending changes (avatar fix)
2. Create slash commands
3. Setup lesson skeletons
4. Prepare first handoff to Gemini

---

**Status:** DRAFT - Čekám na schválení a feedback
**Maintainer:** Claude Code (Opus 4.5)
