#!/bin/bash
# MACP - Multi-Agent Consensus Protocol Runner
# Runs GPT-5.2 and Gemini in parallel (blind ballot) and archives outputs
#
# Usage: ./scripts/macp.sh "Your question or decision to evaluate"
# Or:    ./scripts/macp.sh -f prompt.md  (read from file)

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Config
DECISIONS_DIR=".ai-context/history/decisions"
ARTIFACTS_DIR=".ai-context/history/agent-runs"
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H%M)
TASK_ID="${DATE}-${TIME}"

# Parse arguments
PROMPT=""
if [ "$1" = "-f" ] && [ -f "$2" ]; then
    PROMPT=$(cat "$2")
    TASK_ID="${DATE}-$(basename "$2" .md)"
elif [ -n "$1" ]; then
    PROMPT="$1"
else
    echo -e "${RED}Usage: $0 \"prompt\" or $0 -f prompt.md${NC}"
    exit 1
fi

# Create artifacts directory
ARTIFACT_PATH="${ARTIFACTS_DIR}/${TASK_ID}"
mkdir -p "$ARTIFACT_PATH"

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}🗳️  MACP Blind Ballot - Task: ${TASK_ID}${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Save prompt
echo "$PROMPT" > "${ARTIFACT_PATH}/prompt.md"
echo -e "${GREEN}✓ Prompt saved to ${ARTIFACT_PATH}/prompt.md${NC}"

# MACP Prompt wrapper
MACP_PROMPT="You are participating in a Multi-Agent Consensus Protocol (MACP).
Provide your independent assessment. Be specific and actionable.

Format your response as:
## Assessment
[Your analysis]

## Recommendation: [GO / NO-GO / CONDITIONAL]

## Confidence: [X]%

## Key Concerns (if any):
- [concern 1]
- [concern 2]

## Suggested Next Steps:
- [step 1]
- [step 2]

---
TOPIC TO EVALUATE:

$PROMPT"

echo -e "${BLUE}🚀 Starting parallel agent calls...${NC}"
echo ""

# Run both agents in parallel (blind ballot)
echo -e "${YELLOW}📡 Calling GPT-5.2 (Codex orchestrator)...${NC}"
(
    codex exec -p orchestrator "$MACP_PROMPT" 2>&1 > "${ARTIFACT_PATH}/gpt5.2-response.md"
    echo -e "${GREEN}✓ GPT-5.2 complete${NC}"
) &
GPT_PID=$!

echo -e "${YELLOW}📡 Calling Gemini 3 Pro...${NC}"
(
    echo "$MACP_PROMPT" | gemini -m gemini-3-pro-preview 2>&1 > "${ARTIFACT_PATH}/gemini-response.md"
    echo -e "${GREEN}✓ Gemini complete${NC}"
) &
GEMINI_PID=$!

# Wait for both
wait $GPT_PID
GPT_STATUS=$?
wait $GEMINI_PID
GEMINI_STATUS=$?

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}📊 RESULTS${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Show GPT-5.2 response
echo -e "${BLUE}═══ GPT-5.2 Response ═══${NC}"
if [ $GPT_STATUS -eq 0 ] && [ -s "${ARTIFACT_PATH}/gpt5.2-response.md" ]; then
    head -50 "${ARTIFACT_PATH}/gpt5.2-response.md"
    echo ""
    echo -e "${GREEN}[Full response: ${ARTIFACT_PATH}/gpt5.2-response.md]${NC}"
else
    echo -e "${RED}✗ GPT-5.2 call failed${NC}"
fi

echo ""

# Show Gemini response
echo -e "${BLUE}═══ Gemini 3 Pro Response ═══${NC}"
if [ $GEMINI_STATUS -eq 0 ] && [ -s "${ARTIFACT_PATH}/gemini-response.md" ]; then
    head -50 "${ARTIFACT_PATH}/gemini-response.md"
    echo ""
    echo -e "${GREEN}[Full response: ${ARTIFACT_PATH}/gemini-response.md]${NC}"
else
    echo -e "${RED}✗ Gemini call failed${NC}"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}📁 Artifacts saved to: ${ARTIFACT_PATH}/${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Create decision record template
DECISION_FILE="${DECISIONS_DIR}/${TASK_ID}-macp.md"
cat > "$DECISION_FILE" << DECISION_EOF
## Decision: [FILL IN TOPIC]
**Date:** ${DATE}
**Task ID:** ${TASK_ID}
**Agents consulted:** GPT-5.2 (orchestrator), Gemini 3 Pro

## GPT-5.2 Assessment
$(grep -A1 "Recommendation:" "${ARTIFACT_PATH}/gpt5.2-response.md" 2>/dev/null || echo "[See full response]")
$(grep -A1 "Confidence:" "${ARTIFACT_PATH}/gpt5.2-response.md" 2>/dev/null || echo "")

## Gemini Assessment
$(grep -A1 "Recommendation:" "${ARTIFACT_PATH}/gemini-response.md" 2>/dev/null || echo "[See full response]")
$(grep -A1 "Confidence:" "${ARTIFACT_PATH}/gemini-response.md" 2>/dev/null || echo "")

## Consensus
- [ ] Both GO → Proceed
- [ ] Both NO-GO → Stop
- [ ] Disagreement → Review artifacts, apply domain weights

## Final Decision
[TO BE FILLED BY ORCHESTRATOR]

## Rationale
[TO BE FILLED]

## Verify
- [ ] [verification step]

## Artifacts
- Prompt: ${ARTIFACT_PATH}/prompt.md
- GPT-5.2: ${ARTIFACT_PATH}/gpt5.2-response.md
- Gemini: ${ARTIFACT_PATH}/gemini-response.md
DECISION_EOF

echo -e "${GREEN}✓ Decision template created: ${DECISION_FILE}${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Review both responses above"
echo "2. Fill in decision template: $DECISION_FILE"
echo "3. Update INDEX.md if decision is finalized"
