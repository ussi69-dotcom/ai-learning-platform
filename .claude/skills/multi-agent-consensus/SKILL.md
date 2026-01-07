---
name: multi-agent-consensus
description: Use when making high-stakes decisions requiring multiple agent perspectives - security, architecture, breaking changes, or when explicitly asked for second opinion
---

# Multi-Agent Consensus Protocol (MACP v2.0)

## When to Activate MACP

```
□ Security/auth/permissions changes
□ DB schema/migrations (hard to reverse)
□ Architecture/multi-module refactors
□ Breaking API changes
□ Content strategy decisions
□ User-facing UI + logic changes
□ Release-candidate review
□ User says "get second opinion"
□ >30 min stuck + 2+ failed attempts
```

## When NOT to Activate

- Small, local, reversible fixes
- Routine coding tasks
- Clear implementation with tests

## Routing Rules

| Need | Agent | Profile/Model |
|------|-------|---------------|
| Code correctness, edge cases | **Codex** | `review` / `deep` |
| Architecture, CI issues | **Codex** | `orchestrator` |
| Security audit | **Codex** | `security` |
| UX/copy/content | **Gemini** | Pro |
| Visual QA, UI polish | **Gemini** | Pro + screenshots |
| Research, summaries | **Gemini** | Pro |

**Call BOTH when:**
- User-facing UI + logic
- Security-sensitive UX
- Release candidate

## Consensus Protocol

```
1. CLASSIFY: correctness | security | UX/product | style
   ↓
2. SEEK GROUND TRUTH: run test, reproduce, minimal example
   ↓
3. DOMAIN WEIGHT (if ambiguous):
   - Security/correctness → weight Codex higher
   - UX/copy/pedagogy → weight Gemini higher
   ↓
4. TIE-BREAKER:
   - UX disagreement → Gemini
   - Architecture disagreement → Codex orchestrator
   ↓
5. ESCALATE TO USER when:
   - Breaking API / data semantics
   - Permissions / billing impact
   - Neither option clearly dominates
```

## Domain Weights

| Domain | Codex | Gemini | Claude |
|--------|-------|--------|--------|
| Security/Logic | **70%** | 20% | 10% |
| Architecture | **60%** | 20% | 20% |
| UX/Visuals/Copy | 20% | **70%** | 10% |
| Content/Pedagogy | 30% | **60%** | 10% |
| Integration/Shipping | 30% | 30% | **40%** |

## Circuit Breaker

**Max 3 delegation hops WITHOUT new evidence → ask user**

New evidence = failing test, screenshot, traceback, metrics
NOT = another hypothesis, paraphrase

## Triad Consult ("pouzij kamose")

When user says "pouzij kamose":

```bash
# 1. Gemini (content/creative)
./scripts/llm/gemini_prompt.py -m pro "[TRIAD CONSULT] [task]. Top 3 ideas."

# 2. Claude Opus (implementation/opposition)
claude -p --model opus "[TRIAD CONSULT] [task]. Top 3 ideas."

# 3. Orchestrator consolidates → final top-3
```

## Decision Record Template

Save to `.ai-context/history/decisions/YYYY-MM-DD-topic.md`:

```markdown
## Decision: [Topic]
**Date:** YYYY-MM-DD
**Agents:** GPT-5.2, Gemini
**GPT-5.2:** [GO/NO-GO] @ X% - [reason]
**Gemini:** [GO/NO-GO] @ X% - [reason]
**Domain weights:** [which applied]
**Final decision:** [What]
**Rationale:** [Why]
**Verify:** [How to confirm]
```

## Anti-Patterns

- ❌ Echo Chamber (anchoring on first answer)
- ❌ Consensus Theater (MACP for trivial decisions)
- ❌ Analysis Paralysis (stuck on small decisions)
- ❌ Ping-Pong Loop (agents delegating back/forth)
