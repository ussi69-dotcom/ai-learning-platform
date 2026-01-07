---
name: content-creation
description: Use when upgrading lessons to MASTERPIECE quality, creating new educational content, or reviewing content for the AI learning platform
---

# Content Creation (MASTERPIECE Workflow)

## When to Use

- User says "Upgrade [LESSON] na MASTERPIECE"
- Creating new lesson content
- Content QA or review tasks
- Visual QA for lesson pages

## Quick Reference: 6-Phase Workflow

| Phase | Agent | Output |
|-------|-------|--------|
| 0. Spec | Codex `orchestrator` | lesson_spec (outcomes, facts, rubric) |
| 1. Research | Gemini + YouTube MCP | Video transcripts, key insights |
| 2. Draft | Gemini → Claude opposition | Enhanced MDX + issue_ledger |
| 3. Implement | Codex | Apply changes, local QA |
| 4. Multi-Agent QA | Gemini + Codex | Rubric scores (≥59/60) |
| 5. Visual QA | Claude Playwright | Screenshots to files |
| 6. Final Gate | Gemini + Codex dual | MASTERPIECE or loop |

## Dual-Gate Rule

**MASTERPIECE = ALL conditions:**
- Hard gates green (build, links, MDX valid)
- Gemini ≥59/60 (no weak category <8/10)
- Codex ≥59/60 (independent verification)

## Key Commands

```bash
# Research - Gemini Pro
./scripts/llm/gemini_prompt.py -m pro "Research [topic] for lesson"

# Video transcripts
mcp__youtube-data__get_video_transcript video_input="VIDEO_ID"

# Spec creation
codex exec -p orchestrator "Create lesson_spec for: [topic]"

# Visual QA - save to file, not chat!
# Take screenshots → save to visual_tests/ → report paths only
```

## Content Rules (from CONTENT_GUIDELINES.md)

1. **30-Second Rule** - Bold HOOK in first paragraph
2. **VideoSwitcher** - Mandatory after intro Callout
3. **Visual Density** - Min 3 diagrams for <15min lesson
4. **Lab Philosophy** - Labs are MISSIONS with copy-paste prompts
5. **Holocron** - Summary ConceptCard at end

## Callout Format (CRITICAL for backend parsing)

```markdown
<Callout type="info">
⏳ **Reading Time:** 35 min | 🧪 **[2] Labs Included**
</Callout>
```

## Anti-Patterns

- ❌ Single-agent review (Gemini alone ≠ MASTERPIECE)
- ❌ browser_snapshot in main context (14k+ tokens!)
- ❌ Skipping Phase 0 spec
- ❌ Outdated model names (verify with WebSearch)

## Extended Docs

| Need | File |
|------|------|
| Full workflow | `.ai-context/workflows/WORKFLOW_V6_MASTERPIECE.md` |
| Content rules | `.ai-context/core/CONTENT_GUIDELINES.md` |
| Visual inspection | `.ai-context/workflows/VISUAL_INSPECTION.md` |
