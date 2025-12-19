# Task Brief Template

Use this template for delegating tasks to external agents (GPT-5.2, Gemini).

---

## Task Brief
## Task ID: [YYYY-MM-DD-short-name]

## Goal
[1-2 sentences describing what needs to be done]

## Context
- **Project:** ai-learning-platform
- **Current branch:** [branch name]
- **Related files:** [list key files]

## Acceptance Criteria
1. [ ] [First criterion]
2. [ ] [Second criterion]
3. [ ] [Third criterion]

## Constraints
- Time budget: [X minutes]
- Token budget: [approximate]
- DO NOT: [list restrictions]

## Files to Read
- `[path/to/relevant/file1]`
- `[path/to/relevant/file2]`

## Files to Modify
- `[path/to/file]` - [what change]

## Expected Outcome
[How will we know it's done? What should change?]

## Verification
```bash
# Command to verify success
[verification command]
```

---

## Usage Examples

### For GPT-5.2 (Codex)
```bash
cat << 'EOF' | codex exec -p orchestrator
[Paste task brief here]
EOF
```

### For Gemini
```bash
cat << 'EOF' | gemini -m gemini-3-pro-preview
[Paste task brief here]
EOF
```
