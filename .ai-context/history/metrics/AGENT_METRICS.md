# Agent Metrics Tracking

Track agent performance to optimize workflow over time.

---

## Weekly Summary Template

```markdown
## Week: YYYY-WXX

### Agent Calls
| Agent | Calls | Avg Time | Success Rate |
|-------|-------|----------|--------------|
| GPT-5.2 | X | Xm | X% |
| Gemini | X | Xm | X% |
| Claude | N/A | N/A | N/A |

### Profile Usage (Codex)
| Profile | Count | Avg Tokens |
|---------|-------|------------|
| fast | X | X |
| review | X | X |
| deep | X | X |
| orchestrator | X | X |
| security | X | X |

### MACP Decisions
| Date | Topic | Consensus | Outcome |
|------|-------|-----------|---------|
| YYYY-MM-DD | X | GO/SPLIT | success/fail |

### Post-Merge Defects
| Commit | Bug | Root Cause | Agent Involved |
|--------|-----|------------|----------------|
| abc123 | X | Y | Z |

### Insights
- [What worked well]
- [What to improve]
```

---

## Current Week: 2025-W51

### Agent Calls
| Agent | Calls | Avg Time | Success Rate |
|-------|-------|----------|--------------|
| GPT-5.2 | 2 | 3m | 100% |
| Gemini | 1 | 2m | 100% |

### Profile Usage (Codex)
| Profile | Count | Avg Tokens |
|---------|-------|------------|
| orchestrator | 1 | 64k |
| fast | 0 | - |

### MACP Decisions
| Date | Topic | Consensus | Outcome |
|------|-------|-----------|---------|
| 2025-12-18 | Workflow v2.0 | GO (unanimous) | success |

### Insights
- GPT-5.2 xhigh orchestrator produced thorough analysis
- No Gemini oponentura needed (full consensus)

---

## How to Update

After significant agent interaction:
1. Increment call count
2. Note approximate time
3. Record any failures
4. Add MACP decisions to table
5. Weekly: summarize insights

## Metrics to Track (Future)

- [ ] Automated token counting per session
- [ ] Time-to-resolution by task type
- [ ] Defect rate by change category
- [ ] Profile selection accuracy (did we pick right?)
