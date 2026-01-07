---
name: debugging-escalation
description: Use when debugging bugs, encountering errors, or deciding whether to escalate to Codex GPT-5.2 for help
---

# Debugging Escalation

## When to Escalate to Codex

| Trigger | Action |
|---------|--------|
| **10-15 min without hypothesis** | `codex exec -p deep` |
| **2+ failed attempts same bug** | `codex exec -p deep` |
| **Auth/permissions change** | `codex exec -p security` |
| **SQLAlchemy/DB change** | `codex exec -p deep` |
| **Prod incident** | `codex exec -p hotfix` |
| **>2 modules touched** | `codex exec -p orchestrator` |
| **Architecture decision** | `codex exec -p orchestrator` |

## When to Use ultrathink Instead

| Prefer ultrathink | Prefer Codex |
|-------------------|--------------|
| Reasoning + implementation together | Pure analysis, external opinion |
| Architecture + immediate impl | Security audit, threat model |
| Stay in Claude context | Need GPT-5.2 specific strength |

**ultrathink keyword:** Add "ultrathink" to prompt for extended thinking (31,999 tokens).

## Codex Profiles Explained

| Profile | Use For | Reasoning |
|---------|---------|-----------|
| `fast` | Quick triage, simple questions | low |
| `review` | Code review, CI issues | high |
| `deep` | Root cause, bounded problems | **xhigh** |
| `orchestrator` | Decompose work, planning | **xhigh** |
| `security` | Threat model, authz | **xhigh** |
| `hotfix` | Minimal diff, prod incident | high |
| `tests` | Coverage, test strategy | high |

## Deep vs Orchestrator

| Aspect | `deep` | `orchestrator` |
|--------|--------|----------------|
| **When** | Shape is clear but hard | Shape is unclear |
| **Output** | Concrete fix, edge cases | Task breakdown, delegation |
| **Example** | "Find root cause from traceback" | "Plan auth system redesign" |

## Debug Packet Template (for Codex)

```markdown
## Symptom
[What's happening]

## Expected
[What should happen]

## Tried
1. [Attempt 1] → [Result]
2. [Attempt 2] → [Result]

## Files
[Relevant file paths]

## Traceback (if any)
[Error output]
```

## Self-Check Before Escalating

```
□ Did I run tests to reproduce?
□ Did I check logs for errors?
□ Did I try ultrathink first?
□ Is this truly stuck (>15 min)?
□ Do I have a clear symptom to describe?
```

## Anti-Patterns

- ❌ Escalating before trying yourself
- ❌ Using `fast` for complex bugs
- ❌ Forgetting to include traceback
- ❌ Escalating style/copy issues to Codex (use Gemini)
