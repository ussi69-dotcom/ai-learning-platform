#!/bin/bash
# Debug Packet Generator - creates structured context for GPT-5.2
# Usage: ./scripts/debug-packet.sh "Bug description"
# Output: Formatted debug packet ready for codex exec

set -e

SYMPTOM="${1:-No symptom provided}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
OUTPUT_FILE="/tmp/debug-packet-${TIMESTAMP}.md"

# Gather context
COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
COMMIT_MSG=$(git log -1 --pretty=%s 2>/dev/null || echo "unknown")
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
CHANGED_FILES=$(git diff --name-only HEAD~1 2>/dev/null | head -10 || echo "none")
RECENT_LOGS=$(docker compose logs --tail=30 2>/dev/null || echo "N/A")

cat << EOF > "$OUTPUT_FILE"
## Debug Packet
Generated: $(date +"%Y-%m-%d %H:%M:%S")

## Context
**Branch:** $BRANCH
**Last Commit:** \`$COMMIT_HASH\` $COMMIT_MSG

## Symptom
$SYMPTOM

## Expected vs Observed
- **Expected:** [FILL IN]
- **Observed:** [FILL IN]

## Repro Steps (deterministic)
1. [FILL IN]
2. [FILL IN]
3. [FILL IN]

## Scope
- Files affected: [FILL IN]
- Impact: [low/medium/high]

## What I Tried (max 5)
1. [FILL IN]

## Recently Changed Files
\`\`\`
$CHANGED_FILES
\`\`\`

## Artifacts (paths only!)
- Logs: $OUTPUT_FILE.log
- Screenshot: .playwright-mcp/debug-$TIMESTAMP.png

## Question for GPT-5.2
[FILL IN specific question]

---
*Use with: cat $OUTPUT_FILE | codex exec -p deep*
EOF

# Save recent logs
echo "$RECENT_LOGS" > "${OUTPUT_FILE}.log"

echo "Debug packet created: $OUTPUT_FILE"
echo ""
echo "Next steps:"
echo "  1. Edit the [FILL IN] sections"
echo "  2. Run: cat $OUTPUT_FILE | codex exec -p deep"
echo ""
cat "$OUTPUT_FILE"
