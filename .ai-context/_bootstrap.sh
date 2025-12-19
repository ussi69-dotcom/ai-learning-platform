#!/bin/bash
# .ai-context Bootstrap Script
# Initialize multi-agent workflow for ANY project
#
# Usage (from project root):
#   curl -sL https://raw.githubusercontent.com/YOUR_REPO/.ai-context/_bootstrap.sh | bash
#   OR
#   cp -r /path/to/.ai-context . && ./.ai-context/_bootstrap.sh
#
# This script:
# 1. Detects project type (Node, Python, etc.)
# 2. Creates project-specific WORKING_CONTEXT.md
# 3. Sets up scripts directory with helpers
# 4. Creates root CLAUDE.md, CODEX.md, GEMINI.md

set -e

PROJECT_NAME=$(basename "$(pwd)")
DATE=$(date +"%Y-%m-%d %H:%M")

echo "🚀 Initializing .ai-context for: $PROJECT_NAME"
echo ""

# Detect environment
detect_env() {
    echo "🔍 Detecting environment..."

    # Platform
    PLATFORM=$(uname -s)

    # Shell
    SHELL_NAME=$(basename "$SHELL")

    # Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
    else
        NODE_VERSION="N/A"
    fi

    # Python
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 --version 2>&1)
    else
        PYTHON_VERSION="N/A"
    fi

    # Docker
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version 2>&1 | head -1)
    else
        DOCKER_VERSION="N/A"
    fi

    # Git
    if [ -d ".git" ]; then
        GIT_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
        GIT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "none")
    else
        GIT_BRANCH="not a git repo"
        GIT_REMOTE="none"
    fi

    echo "  Platform: $PLATFORM"
    echo "  Shell: $SHELL_NAME"
    echo "  Node: $NODE_VERSION"
    echo "  Python: $PYTHON_VERSION"
    echo "  Docker: $DOCKER_VERSION"
    echo "  Git: $GIT_BRANCH"
}

# Detect project type
detect_project_type() {
    if [ -f "package.json" ]; then
        if grep -q "next" package.json 2>/dev/null; then
            echo "nextjs"
        elif grep -q "react" package.json 2>/dev/null; then
            echo "react"
        else
            echo "nodejs"
        fi
    elif [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
        if [ -f "manage.py" ]; then
            echo "django"
        elif grep -q "fastapi" requirements.txt 2>/dev/null || grep -q "fastapi" pyproject.toml 2>/dev/null; then
            echo "fastapi"
        else
            echo "python"
        fi
    elif [ -f "Cargo.toml" ]; then
        echo "rust"
    elif [ -f "go.mod" ]; then
        echo "go"
    else
        echo "unknown"
    fi
}

# Create WORKING_CONTEXT.md
create_working_context() {
    echo ""
    echo "📝 Creating WORKING_CONTEXT.md..."

    PROJECT_TYPE=$(detect_project_type)

    cat > .ai-context/state/WORKING_CONTEXT.md << EOF
# Working Context

**Project:** $PROJECT_NAME
**Type:** $PROJECT_TYPE
**Last Updated:** $DATE (Agent: Bootstrap)
**Last Commit:** \`$(git rev-parse --short HEAD 2>/dev/null || echo "none")\`
**Status:** 🟢 Fresh Setup

---

## 🖥️ Environment

| Tool | Version |
|------|---------|
| Platform | $PLATFORM |
| Shell | $SHELL_NAME |
| Node | $NODE_VERSION |
| Python | $PYTHON_VERSION |
| Docker | $DOCKER_VERSION |

### Git
- **Branch:** $GIT_BRANCH
- **Remote:** $GIT_REMOTE

---

## 🎯 Current State

### Current Task
[Describe what you're working on]

### Status
- [ ] [Current subtask 1]
- [ ] [Current subtask 2]

---

## 📜 Session Log

| Date | Agent | Summary |
|------|-------|---------|
| $DATE | Bootstrap | Initial setup |

---

*Edit this file to reflect your current work state.*
EOF

    echo "  ✅ Created: .ai-context/state/WORKING_CONTEXT.md"
}

# Create minimal root agent files if they don't exist
create_root_agents() {
    echo ""
    echo "📄 Creating root agent files..."

    # CLAUDE.md
    if [ ! -f "CLAUDE.md" ]; then
        cat > CLAUDE.md << 'EOF'
# CLAUDE.md

Project instructions for Claude Code.

## Boot Checklist

1. Read `.ai-context/state/WORKING_CONTEXT.md`
2. Identify task type
3. Load relevant docs from `.ai-context/`
4. Respond: "Pokračujeme od [X]. Další: [Y]."

## Quick Reference

- **Docs:** `.ai-context/`
- **State:** `.ai-context/state/WORKING_CONTEXT.md`
- **Templates:** `.ai-context/templates/`

## Rules

- Update WORKING_CONTEXT.md before context compact
- Use thin protocol (summaries, not dumps)
- Delegate to GPT-5.2 for hard reasoning
- Delegate to Gemini for content/visual QA
EOF
        echo "  ✅ Created: CLAUDE.md"
    else
        echo "  ⏭️ Skipped: CLAUDE.md (exists)"
    fi

    # CODEX.md
    if [ ! -f "CODEX.md" ]; then
        cat > CODEX.md << 'EOF'
# CODEX.md

Project instructions for GPT-5.2 (Codex CLI).

## Boot Sequence

```bash
cat .ai-context/state/WORKING_CONTEXT.md | head -50
git log -1 --oneline
```

## Role

Situational Orchestrator - hard reasoning, debugging, security review.

## Response Format

Always return structured analysis with:
- Hypotheses (ranked)
- Experiments (ranked)
- Recommended fix
- Alternatives
EOF
        echo "  ✅ Created: CODEX.md"
    else
        echo "  ⏭️ Skipped: CODEX.md (exists)"
    fi

    # GEMINI.md
    if [ ! -f "GEMINI.md" ]; then
        cat > GEMINI.md << 'EOF'
# GEMINI.md

Project instructions for Gemini CLI.

## Boot Sequence

```bash
cat .ai-context/state/WORKING_CONTEXT.md | head -50
```

## Role

Content Generator + Visual QA.

## When to Use

- Content creation (lessons, docs)
- Visual QA (screenshots, UI review)
- Research & oponentura
EOF
        echo "  ✅ Created: GEMINI.md"
    else
        echo "  ⏭️ Skipped: GEMINI.md (exists)"
    fi
}

# Create scripts if they don't exist
setup_scripts() {
    echo ""
    echo "🔧 Setting up scripts..."

    mkdir -p scripts

    # update-working-context.sh
    if [ ! -f "scripts/update-working-context.sh" ]; then
        cat > scripts/update-working-context.sh << 'SCRIPT'
#!/bin/bash
# Auto-update WORKING_CONTEXT.md with commit info
CONTEXT_FILE=".ai-context/state/WORKING_CONTEXT.md"
[ ! -f "$CONTEXT_FILE" ] && exit 0

COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
DATE=$(date +"%Y-%m-%d %H:%M")

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/^\*\*Last Updated:\*\*.*/\*\*Last Updated:\*\* $DATE/" "$CONTEXT_FILE"
    sed -i '' "s/^\*\*Last Commit:\*\*.*/\*\*Last Commit:\*\* \`$COMMIT_HASH\`/" "$CONTEXT_FILE"
else
    sed -i "s/^\*\*Last Updated:\*\*.*/\*\*Last Updated:\*\* $DATE/" "$CONTEXT_FILE"
    sed -i "s/^\*\*Last Commit:\*\*.*/\*\*Last Commit:\*\* \`$COMMIT_HASH\`/" "$CONTEXT_FILE"
fi
echo "✅ WORKING_CONTEXT.md updated"
SCRIPT
        chmod +x scripts/update-working-context.sh
        echo "  ✅ Created: scripts/update-working-context.sh"
    fi
}

# Main
detect_env
create_working_context
create_root_agents
setup_scripts

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ .ai-context initialized for: $PROJECT_NAME"
echo ""
echo "Next steps:"
echo "  1. Edit .ai-context/state/WORKING_CONTEXT.md"
echo "  2. Customize CLAUDE.md for your project"
echo "  3. Run: claude (to start working)"
echo ""
