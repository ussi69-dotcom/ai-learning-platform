#!/bin/bash
# Auto-update WORKING_CONTEXT.md with commit info
# Usage: ./scripts/update-working-context.sh
# Called by: .husky/post-commit, make commit

set -e

CONTEXT_FILE=".ai-context/state/WORKING_CONTEXT.md"

if [ ! -f "$CONTEXT_FILE" ]; then
    echo "Warning: $CONTEXT_FILE not found, skipping update"
    exit 0
fi

COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
COMMIT_MSG=$(git log -1 --pretty=%s 2>/dev/null || echo "")
DATE=$(date +"%Y-%m-%d %H:%M")

# Detect agent (check if running from Codex, Claude, or manual)
if [ -n "$CODEX_SESSION_ID" ]; then
    AGENT="Codex"
elif [ -n "$CLAUDE_CODE" ]; then
    AGENT="Claude"
else
    AGENT="Manual"
fi

# Update Last Updated line
if grep -q "^\*\*Last Updated:\*\*" "$CONTEXT_FILE"; then
    # macOS/BSD sed compatibility
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/^\*\*Last Updated:\*\*.*/\*\*Last Updated:\*\* $DATE (Agent: $AGENT)/" "$CONTEXT_FILE"
    else
        sed -i "s/^\*\*Last Updated:\*\*.*/\*\*Last Updated:\*\* $DATE (Agent: $AGENT)/" "$CONTEXT_FILE"
    fi
fi

# Update Last Commit line
if grep -q "^\*\*Last Commit:\*\*" "$CONTEXT_FILE"; then
    # Escape special characters in commit message for sed
    ESCAPED_MSG=$(printf '%s\n' "$COMMIT_MSG" | sed 's/[&/\]/\\&/g')
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/^\*\*Last Commit:\*\*.*/\*\*Last Commit:\*\* \`$COMMIT_HASH\` $ESCAPED_MSG/" "$CONTEXT_FILE"
    else
        sed -i "s/^\*\*Last Commit:\*\*.*/\*\*Last Commit:\*\* \`$COMMIT_HASH\` $ESCAPED_MSG/" "$CONTEXT_FILE"
    fi
fi

echo "✅ WORKING_CONTEXT.md updated (commit: $COMMIT_HASH)"
