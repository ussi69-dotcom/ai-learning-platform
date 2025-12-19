# Debug Packet Template

Use this template when escalating bugs to GPT-5.2 (Codex CLI).

---

## Debug Packet
## Context: [1 sentence - what are you working on]

## Expected vs Observed:
- Expected: [what should happen]
- Observed: [what actually happens]

## Repro (deterministic):
1. [exact step 1]
2. [exact step 2]
3. [exact step 3]

## Scope:
- Files: [list affected files]
- Impact: [low/medium/high]

## What tried (max 5):
1. [first thing tried]
2. [second thing tried]

## Artifacts (paths only!):
- Logs: [path to log file]
- Screenshot: [path to screenshot]
- Error: [path or inline if <10 lines]

## Question:
[Specific question for GPT-5.2]

---

## Usage

```bash
# Generate debug packet automatically:
./scripts/debug-packet.sh "Bug description"

# Send to GPT-5.2:
cat /tmp/debug-packet-*.md | codex exec -p deep
```

## Quick Generate (copy-paste)

```bash
./scripts/debug-packet.sh "$(read -p 'Symptom: ' s && echo $s)"
```
