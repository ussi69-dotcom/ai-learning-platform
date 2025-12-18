# MACP Decision Log Index

Running list of all Multi-Agent Consensus Protocol decisions.

---

## 2025

### December

| Date | Topic | Agents | Outcome | File |
|------|-------|--------|---------|------|
| 2025-12-18 | Workflow v2.0 Improvements | Claude + GPT-5.2 | GO | [Link](./2025-12-18-workflow-improvements.md) |

---

## How to Add Entry

1. Create decision file: `YYYY-MM-DD-topic.md` using template from `AGENT_PROTOCOL.md`
2. Add row to this INDEX
3. Link to file

## Query Decisions

```bash
# Find all decisions about security
grep -l "security" .ai-context/history/decisions/*.md

# Recent decisions
ls -lt .ai-context/history/decisions/*.md | head -10
```
