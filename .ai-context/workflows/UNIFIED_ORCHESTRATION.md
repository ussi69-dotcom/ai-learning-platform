# Unified Orchestration Workflow v1.0

Goal: One practical workflow that works whether the user runs Claude Console or Codex,
and still guarantees multi-agent quality gates, MACP when needed, and maximal parallelism.

## 0) Core Rule
The console you are in is the active orchestrator by default. If the task is complex,
the orchestrator must pull in the other agent for review before closing.

## 0.1) User Directive Overrides

- "pouzij codex / kamoce" = Codex is orchestrator and final gate.
- "pouzij claude" = Claude is implementer; Codex reviews if task is complex.
- "MACP" = run MACP regardless of task size.
- "rychle" = prioritize Claude for implementation, Codex for review only.
- "bez HIL" = minimize questions; ask only when scope or risk is ambiguous.

## 0.1.1) "bez HIL" Guardrails (Always Ask)

- Always ask before:
  - Production deploy
  - Breaking API changes
  - DB schema/migrations
  - Security/auth changes
  - Deleting >10 files or deleting user data
- If a blocker appears in "bez HIL" mode:
  - Escalate to Codex or ask user immediately

## 0.2) "rychle" Mode Specifics

- Claude implements without Codex pre-consultation.
- Codex review is post-implementation (diff review), not blocking.
- User accepts higher risk of rework in exchange for speed.
- EXCEPTION: Security/auth changes still require Codex pre-review.

## 0.2.1) "rychle" Mode Hard Stops

| Condition | Action |
|-----------|--------|
| Auth/security touched | STOP: Codex pre-review required |
| DB schema change | STOP: Migration review required |
| >5 files modified | WARN: Consider Codex pre-review |
| Test suite fails | BLOCK: Fix before continuing |

## 0.3) Override Conflict Resolution

- If user requests "pouzij claude" but task hits Codex-orchestrator triggers:
  - Claude implements; Codex must review before "done".
- If user requests "pouzij codex", Codex always gatekeeps.

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

## 1.1) Role Decision Matrix (Risk-Based)

- Use Claude only (no Codex review) when:
  - Single-file, reversible change
  - No auth/DB/security implications
  - Low blast radius (UI copy, styles, safe refactor)

- Use Claude + Codex review when:
  - Multi-file changes, UI+logic coupling, or any regression risk
  - Any uncertainty in requirements or expected behavior

- Use Codex as orchestrator when:
  - Architecture, migrations, auth/security, release readiness
  - Debugging with 2+ failed attempts or >30 minutes unclear root cause

## 1.2) Context & Speed Heuristics

- If Claude context is getting tight:
  - Hand off decision-making to Codex
  - Keep Claude in short, bounded implementation loops

- If Codex is too slow for small changes:
  - Delegate implementation to Claude
  - Codex focuses on review + risks only

## 1.3) Context Recovery Protocol

If Claude receives "context will be summarized" warning:
□ WORKING_CONTEXT.md updated with: current task, blockers, next step
□ Uncommitted changes? → commit or stash with WIP note
□ Active subagents? → document status in WORKING_CONTEXT.md
□ Hand off to Codex with: "Context recovery. State: [X]. Blocker: [Y]. Need: [Z]."

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

## 2.1) MACP Weighting

- Codex opinion has higher weight on complex reasoning and risk trade-offs
- Gemini opinion has higher weight on content quality and visual QA
- Claude opinion has higher weight on implementation feasibility

## 2.2) MACP Deadlock Resolution

- Time-box MACP to 10 minutes.
- If no consensus, Codex decides and documents risks in WORKING_CONTEXT.md.
- If Codex unavailable, Claude decides and requests user confirmation.

## 2.3) MACP Risk Log Template

Location: WORKING_CONTEXT.md under "## MACP Decisions"
```
- Date: YYYY-MM-DD
- Decision: [what was decided]
- Dissent: [who disagreed and why]
- Risks Accepted: [documented trade-offs]
- Verify By: [how to confirm decision was correct]
```

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

## 4.1) Model Tiering (Speed vs Depth)

- Quick edits / small fixes:
  - Claude fast model (if available)
  - Codex only for final sanity check if needed

- Complex reasoning / critical changes:
  - Claude strong model for implementation
  - Codex for orchestration + final gate

## 4.2) Claude Prompting (Opus Default)

- Use Opus as the default Claude model (per user preference).
- Only downgrade for speed if user explicitly asks for it.
- For complex reasoning: provide explicit constraints and ask for step-by-step analysis.
- Keep the final output short even when reasoning is deep.

## 4.3) Codex Profiles (When to Go Deep)

- Use `fast` for triage and quick sanity checks.
- Use `review` before implementation when approach is uncertain.
- Use `tests` for new endpoints or risky behavior changes.
- Use `security` for auth/permissions changes.
- Use `deep` for root-cause analysis after 2 failed attempts.
- Use `hotfix` for prod incidents and smallest-safe fixes.
- Use `orchestrator` for multi-component planning and trade-offs.

## 5) Parallelization Strategy

Run in parallel when possible:
- Research (Perplexity/Gemini) + Implementation (Claude) + QA plan (Codex)
- Visual QA in parallel with test runs

Orchestrator merges results, resolves conflicts, and issues next tasks.

## 5.1) Scenario Playbooks (Role + Flow)

- Quick bugfix (single file, low risk):
  - Claude implements directly if single-file and <20 LOC
  - Codex review if 2+ files touched or behavior is ambiguous
  - Verify minimal tests

- Complex debugging (stuck or >30 min):
  - Codex orchestrates root-cause plan
  - Claude runs experiments/fixes
  - Codex validates and decides next step

- Content upgrade (MASTERPIECE):
  - Gemini drafts
  - Claude QA + integrates
  - Codex final gate
  - Visual QA required

- Visual regression:
  - Claude captures Playwright artifacts
  - Gemini reviews visuals by file path
  - Claude fixes, Codex verifies

- Release readiness:
  - Codex orchestrates checklist + risk review
  - Claude runs tests/build/visual
  - MACP if any security/auth/DB changes

- Research spike:
  - Perplexity fast pass
  - Gemini Deep Research if needed
  - Codex distills decisions + action plan

## 6) Claude Early-Exit Guard

Claude must:
- Ask Codex for review on complex tasks
- Provide status, test results, and open questions
- Ask "what next" before ending a complex task

Codex must:
- Provide critical feedback and risk notes
- Decide next action or closure

## 6.1) Rollback & Rework Protocol

- If Codex rejects post-review changes:
  - Revert or amend with smallest possible fix
  - Document the rejection reason and new plan
- If "rychle" mode caused regressions:
  - Prioritize rollback before new feature work
  - Note the regression in WORKING_CONTEXT.md

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
