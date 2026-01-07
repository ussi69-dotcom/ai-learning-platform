---
name: tool-routing
description: Use when deciding which agent, tool, or MCP server to use for a task - prevents wrong tool usage and sandbox failures
---

# Tool Routing (Capability Matrix)

## When to Use

- Before calling Gemini, Codex, or any external tool
- When uncertain which agent handles a task type
- When Codex sandbox fails (OAuth, Playwright, network)
- When delegating work between agents

## Strict Capability Matrix

| Task | Tool | NEVER Use |
|------|------|-----------|
| **Content/Research** | `./scripts/llm/gemini_prompt.py -m pro` | Perplexity for content |
| **Quick facts** | Context7 MCP or WebSearch | - |
| **Visual QA** | Claude Playwright → Gemini analyze | Perplexity |
| **Code review** | Codex `review` profile | - |
| **Security audit** | Codex `security` profile | - |
| **Slack notifications** | Claude Slack MCP | Codex (no MCP) |
| **Hard bugs (>15min)** | Codex `deep` profile | - |
| **Architecture decisions** | Codex `orchestrator` profile | - |
| **Library docs** | Context7 MCP | - |

## Codex Sandbox Limitations

**Codex CANNOT do these - delegate to Claude:**
- OAuth (use `gemini_prompt.py` wrapper instead)
- Playwright (delegate visual QA to Claude)
- Slack MCP (delegate notifications to Claude)
- Network without flag (`-s danger-full-access`)

## Gemini Model Selection

```bash
# Content/Research/QA - quality and depth
./scripts/llm/gemini_prompt.py -m pro "prompt"

# Quick tasks - fast
gemini "prompt"  # without -m = Flash

# ❌ NEVER USE (outdated):
# gemini-2.5-pro, gemini-2.5-flash, gemini-exp-*
```

## Codex Profile Selection

| Situation | Profile | Reasoning Level |
|-----------|---------|-----------------|
| Quick triage | `fast` | low |
| Pre-implementation | `review` | high |
| New endpoint | `tests` | high |
| Auth/permissions | `security` | xhigh |
| Bug >30 min | `deep` | xhigh |
| Multi-component | `orchestrator` | xhigh |
| Prod incident | `hotfix` | high |

## Commands Quick Reference

```bash
# Gemini Pro (content, research)
./scripts/llm/gemini_prompt.py -m pro "prompt"

# Codex profiles
codex exec -p fast "Quick question"
codex exec -p deep "Root cause analysis"
codex exec -p orchestrator "Plan feature X"
codex exec -p security "Review auth changes"
codex exec -p hotfix "Minimal fix for bug"

# With images
codex exec -i /path/to/image.png "Analyze this"
```

## Delegation Pattern (Codex → Claude)

When Codex needs Claude to do something:
```
"Pošli Slack notifikaci:
- Typ: [task_done|error|blocked|info]
- Summary: [1-2 věty]"
```
