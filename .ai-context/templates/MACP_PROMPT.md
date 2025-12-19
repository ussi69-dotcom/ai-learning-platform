# MACP Prompt Template

Use this template for Multi-Agent Consensus Protocol (MACP) decisions.

---

## MACP Ballot
## Decision: [Short title]
## Date: [YYYY-MM-DD]

## Context
[2-3 sentences explaining the situation]

## Question for Consensus
[Clear, answerable question requiring judgment]

## Options Being Considered
1. **Option A:** [Description]
   - Pros: [list]
   - Cons: [list]

2. **Option B:** [Description]
   - Pros: [list]
   - Cons: [list]

## Constraints
- Must be: [requirements]
- Cannot be: [restrictions]
- Timeline: [urgency]

## Your Task (as reviewer)
1. Analyze both options independently
2. Score each option (0-10) with reasoning
3. Recommend one option with confidence level (0-1)
4. List any concerns or alternatives missed

## Response Format
```markdown
## My Analysis

### Option A Score: X/10
[Reasoning]

### Option B Score: X/10
[Reasoning]

### Recommendation
**Choice:** [A/B]
**Confidence:** [0-1]
**Reasoning:** [2-3 sentences]

### Concerns
- [Any issues with recommended approach]

### Alternatives Considered
- [Any other options worth mentioning]
```

---

## Usage

```bash
# Run MACP with both agents:
./scripts/macp.sh "Your MACP question"

# Or manually:
# 1. Send to GPT-5.2
codex exec -p orchestrator < macp-prompt.md > gpt-response.md

# 2. Send to Gemini (in parallel)
gemini -m gemini-3-pro-preview < macp-prompt.md > gemini-response.md

# 3. Compare and decide
```

## When to Use MACP

- Security-related changes
- Database migrations
- Breaking API changes
- Stuck >30min with 2+ failed attempts
- User-facing UX decisions
