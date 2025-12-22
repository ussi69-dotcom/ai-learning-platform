# Unified Orchestration Workflow v1.0

Goal: One practical workflow that works whether the user runs Claude Console or Codex,
and still guarantees multi-agent quality gates, MACP when needed, and maximal parallelism.

## 0) Core Rule
The console you are in is the active orchestrator by default. If the task is complex,
the orchestrator must pull in the other agent for review before closing.

## 1) Orchestrator Selection (Dynamic)

- Claude Console active:
  - Claude is implementer and primary driver.
  - Codex is the critical reviewer and final gate for complex tasks.
  - Claude must ask Codex for review before "done" on complex work.

- Codex Console active:
  - Codex is orchestrator and gatekeeper.
  - Claude is the fast implementer.
  - Codex should keep Claude busy with clear sub-tasks.

Complex task = security/auth, migrations, architecture, breaking API, release-candidate,
or >30 min ambiguous debugging.

## 2) MACP (Multi-Agent Consensus Protocol)

Trigger when:
- Security/auth/permissions
- DB schema/migrations
- Architecture or cross-module refactor
- Breaking API
- Release-candidate review
- User explicitly requests "second opinion"

MACP format:
1) Codex + Gemini review in parallel
2) Claude implements + gathers artifacts
3) Codex decides final direction

## 3) Subagent Contract (No user-facing report)

Each subagent receives only:
- Task Brief
- Minimal relevant context
- Needed research inputs or links

They must return:
- Findings (bulleted)
- Patch or explicit change plan
- Test results
- Artifacts with file paths

They do NOT report to the user. Orchestrator reviews and reports.

## 4) Tool/Model Allocation (Strengths First)

- Fast code changes: Claude
- Hard reasoning or root-cause: Codex
- Content creation: Gemini 3 Pro (draft) -> Claude QA -> Codex gate
- Quick research: Perplexity (URLs + facts)
- Deep research: Gemini Deep Research
- Video evidence: YouTube MCP (metadata + transcript)
- Anti-bot browse: Camoufox (only if normal fetch fails)
- Visual QA: Playwright + Gemini (file paths only)

## 5) Parallelization Strategy

Run in parallel when possible:
- Research (Perplexity/Gemini) + Implementation (Claude) + QA plan (Codex)
- Visual QA in parallel with test runs

Orchestrator merges results, resolves conflicts, and issues next tasks.

## 6) Claude Early-Exit Guard

Claude must:
- Ask Codex for review on complex tasks
- Provide status, test results, and open questions
- Ask "what next" before ending a complex task

Codex must:
- Provide critical feedback and risk notes
- Decide next action or closure

## 7) MASTERPIECE Integration (Content)

Follow WORKFLOW_V6_MASTERPIECE.md with this enforcement:
- Codex is final MASTERPIECE gatekeeper
- Gemini >= 59/60 + Codex >= 59/60 + hard gates green
- Claude performs opposition review
- Visual QA required for lesson pages

## 8) Minimal Human-in-the-Loop

The system should:
- Maximize parallelization and cross-validation
- Avoid unnecessary user prompts
- Only ask the user when a decision or scope change is needed

## 9) Execution Template

Task Brief (Orchestrator -> Subagents):
```
Goal:
DoD:
Files:
Constraints:
Verify:
```

Task Result (Subagent -> Orchestrator):
```
Status:
Findings:
Patch/Plan:
Tests:
Artifacts:
```
