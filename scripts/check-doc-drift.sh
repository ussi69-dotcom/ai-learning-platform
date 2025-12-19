#!/bin/bash
# Doc Drift Linter - checks for stale paths and missing references
# Run: ./scripts/check-doc-drift.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

echo "🔍 Checking for documentation drift..."
echo ""

# 1. Check for stale paths (old usernames/paths)
echo "📁 Checking for stale paths..."
STALE_PATHS=(
    "/home/ussi/"
    "/home/ubuntu/"
    "localhost:3001"
)

for pattern in "${STALE_PATHS[@]}"; do
    # Exclude history/completed_cycles (archival data)
    matches=$(grep -r "$pattern" --include="*.md" .ai-context/ --exclude-dir="completed_cycles" --exclude-dir="history" 2>/dev/null || true)
    if [ -n "$matches" ]; then
        echo -e "${RED}✗ Found stale path '$pattern':${NC}"
        echo "$matches" | head -5
        ((ERRORS++))
    fi
done

# 2. Check for references to missing files
echo ""
echo "📄 Checking for missing file references..."
EXPECTED_FILES=(
    "GEMINI.md"
    "CLAUDE.md"
    "CODEX.md"
    ".ai-context/AGENT_PROTOCOL.md"
    ".ai-context/state/WORKING_CONTEXT.md"
    ".ai-context/state/MEMORY.md"
)

for file in "${EXPECTED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}✗ Missing expected file: $file${NC}"
        ((ERRORS++))
    else
        echo -e "${GREEN}✓ Found: $file${NC}"
    fi
done

# 3. Check for outdated version references
echo ""
echo "📦 Checking version references..."
# Check if Python version in docs matches Dockerfile
DOCKERFILE_PYTHON=$(grep -oP 'python:\K[0-9.]+' backend/Dockerfile 2>/dev/null | head -1 || echo "unknown")
DOC_PYTHON=$(grep -oP 'Python.*\|\s*\K[0-9.]+' .ai-context/state/WORKING_CONTEXT.md 2>/dev/null | head -1 || echo "unknown")

if [ "$DOCKERFILE_PYTHON" != "unknown" ] && [ "$DOC_PYTHON" != "unknown" ]; then
    if [[ "$DOC_PYTHON" != "$DOCKERFILE_PYTHON"* ]]; then
        echo -e "${YELLOW}⚠ Python version mismatch: Dockerfile=$DOCKERFILE_PYTHON, Docs=$DOC_PYTHON${NC}"
        ((WARNINGS++))
    else
        echo -e "${GREEN}✓ Python version aligned: $DOCKERFILE_PYTHON${NC}"
    fi
fi

# 4. Check internal markdown links in docs
echo ""
echo "🔗 Checking internal markdown links..."
# Find all markdown links like [text](path) and verify paths exist
for doc in CLAUDE.md CODEX.md GEMINI.md .ai-context/*.md .ai-context/**/*.md; do
    if [ -f "$doc" ]; then
        # Extract paths from markdown links (excluding http/https)
        grep -oP '\[.*?\]\(\K[^)]+(?=\))' "$doc" 2>/dev/null | grep -v '^http' | while read -r link; do
            # Skip anchors (#section)
            if [[ "$link" == \#* ]]; then
                continue
            fi
            # Skip known placeholders (URL, file://, mailto:)
            if [[ "$link" == "URL" ]] || [[ "$link" == file://* ]] || [[ "$link" == mailto:* ]]; then
                continue
            fi
            # Remove anchor from path
            path="${link%%#*}"
            # Check if path exists (relative to repo root)
            if [ -n "$path" ] && [ ! -e "$path" ]; then
                echo -e "${RED}✗ Broken link in $doc: $link${NC}"
                ERRORS=$((ERRORS + 1))
            fi
        done
    fi
done

# 5. Check for known drift patterns
echo ""
echo "🔎 Checking for known drift patterns..."
KNOWN_DRIFTS=(
    ".ai-context/CODEX.md:CODEX.md is in root not .ai-context"
    ".env.example:Should be .env.prod.example"
    "@context7/mcp-server:Should be @upstash/context7-mcp"
    "CPX32:Infrastructure changed to Dedicated Server"
)

for drift in "${KNOWN_DRIFTS[@]}"; do
    pattern="${drift%%:*}"
    description="${drift#*:}"
    matches=$(grep -r "$pattern" --include="*.md" . 2>/dev/null | grep -v "history/" | grep -v "check-doc-drift" || true)
    if [ -n "$matches" ]; then
        echo -e "${YELLOW}⚠ Potential drift '$pattern' ($description):${NC}"
        echo "$matches" | head -3
        ((WARNINGS++))
    fi
done

# 6. Check decision log exists
echo ""
echo "📝 Checking decision log structure..."
if [ -d ".ai-context/history/decisions" ] && [ -f ".ai-context/history/decisions/INDEX.md" ]; then
    echo -e "${GREEN}✓ Decision log structure exists${NC}"
else
    echo -e "${YELLOW}⚠ Decision log structure missing${NC}"
    ((WARNINGS++))
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ Doc drift check FAILED: $ERRORS errors, $WARNINGS warnings${NC}"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️ Doc drift check PASSED with $WARNINGS warnings${NC}"
    exit 0
else
    echo -e "${GREEN}✅ Doc drift check PASSED${NC}"
    exit 0
fi
