# 🔌 MCP Server Setup Guide

**Purpose:** Konfigurace Model Context Protocol (MCP) serverů pro optimální workflow s Claude Code.

---

## 🎯 Co Je MCP?

Model Context Protocol umožňuje Claude Code přístup k:
- Filesystému (rychlejší file operations)
- Git repository (advanced git operations)
- Databázím (direct DB inspection)
- Dokumentaci (Context7 pro live docs)
- Browser (visual testing)

**Výhoda:** Méně Bash commands, více specialized tools, rychlejší práce.

---

## 📦 Doporučené MCP Servery

### Priority 1: Must-Have (Instaluj HNED)

#### 1. **Filesystem MCP**
```bash
claude mcp add filesystem /home/ussi/ai-learning-platform
```

**Co to dělá:**
- Rychlejší file operations (Read/Write/Glob)
- Lepší handling velkých složek (content/, node_modules/)
- Watch mode pro změny

**Kdy použít:**
- Multi-file refactoring
- Content management (bulk lesson updates)
- Grep across large directories

---

#### 2. **Git MCP**
```bash
claude mcp add git /home/ussi/ai-learning-platform
```

**Co to dělá:**
- Advanced git diff/log analýza
- Branch management
- Commit history exploration
- Automatické conventional commits

**Kdy použít:**
- Git workflow (better than Bash git commands)
- Code archaeology ("kdy byla tato funkce přidána?")
- Branch comparison
- Merge conflict resolution

---

#### 3. **Context7 MCP** (Dokumentace)
```bash
claude mcp add context7
```

**Co to dělá:**
- Přístup k živé dokumentaci (Next.js docs, FastAPI docs)
- Search across multiple doc sources
- Version-specific docs

**Kdy použít:**
- "Jak se dělá X v Next.js 16?"
- "Co je nového v Tailwind CSS 4?"
- Rychlé reference při implementaci

**Konfigurace:**
Po instalaci přidej relevantní doc sources:
- Next.js 16 docs
- FastAPI docs
- Tailwind CSS 4 docs
- React 19 docs
- PostgreSQL 15 docs

---

### Priority 2: Highly Recommended

#### 4. **PostgreSQL MCP**
```bash
claude mcp add postgres
```

**Konfigurace:**
```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://ai_user:password@localhost:5432/learning_platform"
      }
    }
  }
}
```

**Co to dělá:**
- Direct DB inspection (místo `docker exec`)
- Schema validation
- Query testing
- Data integrity checks

**Kdy použít:**
- Debugging DB issues
- Verifying migrations
- Data exploration
- Performance analysis (EXPLAIN ANALYZE)

---

#### 5. **Docker MCP**
```bash
claude mcp add docker
```

**Co to dělá:**
- Container inspection bez Bash
- Logs streaming
- Health checks
- Volume management

**Kdy použít:**
- Container debugging
- Log analysis
- Resource monitoring
- Multi-container orchestration

---

### Priority 3: Nice to Have

#### 6. **Browser MCP** (Visual Testing)
```bash
# Check if available:
claude mcp list

# If exists:
claude mcp add browser
```

**Co to dělá:**
- Otevře skutečný browser
- Screenshots
- UI interaction
- Visual regression testing

**Kdy použít:**
- **TOTO je řešení pro visual testing!**
- Místo Playwright z Dockeru
- Debugging UI issues
- Screenshot-based bug reports

---

#### 7. **GitHub MCP**
```bash
claude mcp add github
```

**Co to dělá:**
- Issue tracking
- PR creation/review
- Release management
- CI/CD integration

**Kdy použít:**
- Když open-sourcneš projekt
- Automatizace PR workflows
- Issue management

---

## ⚙️ Kompletní Konfigurace

**Location:** `~/.config/claude/mcp.json` (nebo kde Claude Code ukládá config)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/ussi/ai-learning-platform"
      ]
    },
    "git": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-git",
        "/home/ussi/ai-learning-platform"
      ]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://ai_user:password@localhost:5432/learning_platform"
      }
    },
    "docker": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-docker"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"]
    }
  }
}
```

---

## 🚀 Setup Checklist

### Krok 1: Instalace (15 minut)
```bash
# Must-have servery
claude mcp add filesystem /home/ussi/ai-learning-platform
claude mcp add git /home/ussi/ai-learning-platform
claude mcp add context7

# Recommended (pokud chceš)
claude mcp add postgres
claude mcp add docker

# Nice to have (later)
claude mcp add browser  # Pokud existuje
claude mcp add github   # Pokud plánuješ open-source
```

### Krok 2: Ověření
```bash
# List installed MCP servers
claude mcp list

# Test filesystem
# (v Claude Code session)
# Zkus: "List all .tsx files in components/"
# Měl by použít filesystem MCP místo Glob tool
```

### Krok 3: Restart Claude Code
```bash
exit
claude
```

---

## 📊 Kdy Použít Který Tool?

| Úkol | Bez MCP | S MCP | Benefit |
|------|---------|-------|---------|
| **List files** | Glob tool | Filesystem MCP | Rychlejší, watch mode |
| **Git diff** | Bash git diff | Git MCP | Better formatting, smart filters |
| **DB query** | docker exec | Postgres MCP | Direct access, no container overhead |
| **Check logs** | docker logs | Docker MCP | Streaming, filtering |
| **Docs lookup** | Web search | Context7 MCP | Faster, version-specific |
| **Visual test** | Playwright script | Browser MCP | Real browser, interactive |

---

## 🔧 Troubleshooting

### MCP server nenajde soubory
**Problém:** Filesystem MCP hlásí "file not found"
**Řešení:**
```bash
# Zkontroluj path v konfiguraci
claude mcp list
# Ujisti se že path je absolute: /home/ussi/ai-learning-platform
```

### PostgreSQL MCP nemůže connect
**Problém:** "Connection refused"
**Řešení:**
```bash
# Ověř že DB běží
docker compose ps

# Zkontroluj DATABASE_URL v mcp.json
# Musí být: postgresql://ai_user:password@localhost:5432/learning_platform
# NEBO docker network IP: postgresql://ai_user:password@172.19.0.3:5432/learning_platform
```

### Context7 nevrací docs
**Problém:** "No documentation found"
**Řešení:**
```bash
# Zkontroluj že máš přidané doc sources
# Context7 config se obvykle dělá při prvním použití
# Řekni Claude: "Search Next.js 16 documentation for App Router"
```

---

## 🎯 Best Practices

### Do:
- ✅ Nainstaluj must-have MCP servery hned na začátku
- ✅ Preferuj MCP tools před Bash commands (kde je to možné)
- ✅ Používej Context7 pro quick docs lookup
- ✅ Testuj MCP po instalaci (zkus pár commandů)

### Don't:
- ❌ Neinstaluj všechny MCP servery najednou (start small)
- ❌ Nepoužívej MCP pro jednoduché operace (overkill)
- ❌ Nezapomeň restartovat Claude Code po změnách v mcp.json

---

## 📈 Performance Impact

**Očekávané zrychlení:**
- File operations: **2-3x rychlejší** (filesystem MCP)
- Git operations: **Better UX** (formatted output)
- DB queries: **5-10x rychlejší** (no container overhead)
- Docs lookup: **Instant** vs web search (Context7)

---

## 🔄 Update Strategy

```bash
# Quarterly update MCP packages
npm update -g @modelcontextprotocol/server-*

# Check for new MCP servers
claude mcp search

# Experimentuj s novými servery (install locally first)
```

---

## 🚀 Next Steps

Po instalaci MCP serverů:

1. **Test každý server:**
   - Filesystem: "List all TypeScript files in frontend/"
   - Git: "Show me commits from last week"
   - Context7: "Search Next.js docs for middleware"

2. **Update workflow docs:**
   - Aktualizuj DEV_AND_DEPLOYMENT_GUIDE.md s MCP usage
   - Přidej MCP examples do SESSION_LOG.md

3. **Train yourself:**
   - Zkus použít MCP místo Bash kde je to možné
   - Porovnej speed (MCP vs traditional tools)

---

**Maintained by:** Senior Architect (Claude Code)
**Last Updated:** 2025-12-02
**Status:** Active
**Next Review:** 2026-03-01 (or when new MCP servers release)
