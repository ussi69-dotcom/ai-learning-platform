# Workflow v6.0 "Claude-First Orchestration"

**Status:** Active (alternative to v5.1)
**Created:** 2025-12-21
**Reviewed by:** Codex GPT-5.2 (xhigh reasoning)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     WORKFLOW v6.0                                │
│              "Claude-First Orchestration"                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────┐      │
│  │            CLAUDE OPUS 4.5                             │      │
│  │  (Orchestrator + Implementer + QA Gate)               │      │
│  │                                                        │      │
│  │  • Planning & task breakdown (TodoWrite)              │      │
│  │  • Implementation (frontend/backend)                  │      │
│  │  • Git operations                                     │      │
│  │  • Visual QA via Playwright → Gemini                 │      │
│  │  • Final quality gate (npm run verify)               │      │
│  └───────────────────┬───────────────────────────────────┘      │
│                      │                                           │
│     ┌────────────────┼────────────────┐                         │
│     │                │                │                         │
│     ▼                ▼                ▼                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐                  │
│  │ Codex    │  │ Gemini   │  │ Perplexity   │                  │
│  │ (GPT-5.2)│  │ 3 Pro    │  │              │                  │
│  │          │  │          │  │              │                  │
│  │ Reasoning│  │ Content  │  │ Research     │                  │
│  │ Validator│  │ Generator│  │ Quick facts  │                  │
│  │ Arch.    │  │ Visual QA│  │              │                  │
│  │ decisions│  │ (2M ctx) │  │              │                  │
│  └──────────┘  └──────────┘  └──────────────┘                  │
│                                                                  │
│  Codex fallback: codex2 (Team) → codex1 (Plus)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## How to Invoke Codex

```bash
# Primary (Team account - higher limits)
CODEX_HOME=~/.codex2 codex exec -p <profile> "<prompt>"

# Fallback (Plus account)
CODEX_HOME=~/.codex1 codex exec -p <profile> "<prompt>"

# Aliases (after source ~/.bashrc)
codex2 exec -p deep "prompt"
codex1 exec -p deep "prompt"
```

---

## Risk Scoring Matrix

| Risk Level | Criteria | Codex Calls |
|------------|----------|-------------|
| **LOW** | Single file, reversible, has tests | 0 |
| **MEDIUM** | 2-5 files, FE or BE only, no auth | 1 (design OR pre-merge) |
| **HIGH** | >5 files, FE↔BE, auth, migrations, caching | 2 (design + pre-merge) |
| **CRITICAL** | Security, payments, data loss risk | 2 + security profile |

### Risk Triggers (→ escalate to higher level)
- Auth/permissions changes → HIGH minimum
- DB schema/migrations → HIGH minimum
- OAuth/session/cookies → CRITICAL
- Payments/billing logic → CRITICAL
- Touches >8 files → HIGH minimum
- Diff >400 lines → HIGH minimum

---

## Mandatory Codex Checkpoints

### ALWAYS call Codex when:

| Trigger | Profile | Purpose |
|---------|---------|---------|
| **Before implementing HIGH/CRITICAL risk** | `orchestrator` | Design sanity check |
| **FE↔BE contract change** | `deep` | API compatibility |
| **Auth/security change** | `security` | Threat model |
| **DB migration** | `deep` | Data integrity |
| **Before merge (HIGH+ risk)** | `review` | Final code review |
| **Stuck >15 min** | `deep` | Root cause analysis |
| **2+ failed fix attempts** | `deep` | RCA + alternative approach |
| **Tests pass but "feels wrong"** | `review` | Sanity check |

---

## Self-Blindness Mitigations

### 1. Disconfirming Pass (REQUIRED before implementation)
Before implementing any MEDIUM+ risk change, Claude MUST document:
```markdown
## Pre-Implementation Check
1. What could break this approach?
2. What's my biggest uncertainty?
3. What edge cases am I not handling?
4. Is there a simpler solution?
5. What would I need to rollback?
```

### 2. Mechanical Reality Signals
Trust these over intuition:
- Tests (pytest, Jest)
- TypeScript errors
- ESLint warnings
- Playwright visual diffs
- `npm run verify` output

### 3. Stop Conditions (→ trigger Codex)
- 2+ failed attempts at same fix
- 30+ min without clear progress
- "Fix A breaks B, fix B breaks C" loop
- No tests for behavior change

---

## Rate Limiting & Budget

### Per-Task Budget
| Risk | Max Codex Calls | Notes |
|------|-----------------|-------|
| LOW | 0 | Direct implementation |
| MEDIUM | 1 | Design OR pre-merge |
| HIGH | 2 | Design + pre-merge |
| CRITICAL | 3 | Design + security + pre-merge |

### Daily Budget (soft limits)
- codex2 (Team): ~20 calls/day
- codex1 (Plus): ~10 calls/day (fallback only)

### Context Efficiency
Send to Codex:
- **DO:** Diff, goals, risks, specific questions
- **DON'T:** Full repo, all logs, irrelevant files

### Fallback Logic
```
IF codex2 rate limited OR error:
    TRY codex1
    IF both fail:
        WAIT 5 min OR ask user
```

---

## Autonomous Loop

```
┌─────────────────────────────────────────────────────┐
│ 1. RECEIVE task from user                           │
│    ↓                                                │
│ 2. ASSESS risk level (LOW/MEDIUM/HIGH/CRITICAL)    │
│    ↓                                                │
│ 3. PLAN (TodoWrite) + disconfirming pass           │
│    ↓                                                │
│ 4. IF HIGH+: VALIDATE design with Codex            │
│    ↓                                                │
│ 5. IMPLEMENT (code changes)                        │
│    ↓                                                │
│ 6. VERIFY (npm run verify, tests)                  │
│    ├─ FAIL: fix → retry (max 3x)                   │
│    ├─ STILL FAIL: Codex RCA                        │
│    └─ PASS: continue                               │
│    ↓                                                │
│ 7. VISUAL CHECK (Playwright)                       │
│    ├─ If unclear: delegate to Gemini              │
│    ↓                                                │
│ 8. IF HIGH+: PRE-MERGE review with Codex          │
│    ↓                                                │
│ 9. COMMIT + update WORKING_CONTEXT                 │
│    ↓                                                │
│ 10. NEXT task (loop) OR report to user            │
└─────────────────────────────────────────────────────┘
```

---

## Agent Delegation

### Codex (GPT-5.2)
**When:** Architecture, debugging, security, validation
**How:** `codex exec -p <profile> "<focused question>"`
**Profiles:** `deep`, `orchestrator`, `security`, `review`, `hotfix`

### Gemini 3 Pro
**When:** Content generation, visual QA, long-context analysis
**How:** `gemini -m gemini-3-pro-preview "<prompt>"` or with `--file`

### Perplexity
**When:** Quick facts, current trends, documentation
**How:** `mcp__perplexity__perplexity_ask` or `perplexity_research`

---

## Success Metrics

### Quality
- Bug-escape rate (bugs found after merge)
- Revert rate
- Hotfix count
- Security findings

### Productivity
- Lead time per task
- % tasks completed without user intervention
- Iterations per task (implement→fix cycles)

### Multi-Agent Efficiency
- Codex calls per task
- "Disagreement rate" (calls that led to changes)
- Wasted calls (no actionable output)
- Cost per task

### Stability
- Playwright flake rate
- Time to green
- False positive rate in visual checks

---

## Switching Between Workflows

### Use v6.0 (Claude-First) when:
- Long autonomous sessions
- Implementation-heavy tasks
- User wants minimal interaction
- Codex as validator, not driver

### Use v5.1 (Codex-First) when:
- Hard debugging (stuck >30 min)
- Architecture decisions
- User explicitly requests GPT-5.2 orchestration
- Security audits

---

*Version: 6.0*
*Created: 2025-12-21*
*Reviewed by: Codex GPT-5.2 (xhigh)*
