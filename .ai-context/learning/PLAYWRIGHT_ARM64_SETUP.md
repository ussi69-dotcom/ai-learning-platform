# Playwright MCP na ARM64 WSL2

## Problem

Playwright MCP server nefunguje na ARM64 (aarch64) WSL2 systémech, protože:
1. Playwright nemá nativní ARM64 build pro bundled Chromium
2. Snap Chromium nelze spustit přímo mimo snap prostředí (chybí shared libraries)

## Řešení

### 1. Nainstalovat Chromium přes snap

```bash
sudo apt update && sudo apt install -y chromium-browser
```

### 2. Vytvořit wrapper script

Playwright MCP hledá Chrome na `/opt/google/chrome/chrome`. Vytvoříme wrapper script:

```bash
sudo mkdir -p /opt/google/chrome

echo '#!/bin/bash' | sudo tee /opt/google/chrome/chrome
echo 'exec /snap/bin/chromium "$@"' | sudo tee -a /opt/google/chrome/chrome
sudo chmod +x /opt/google/chrome/chrome
```

### 3. Ověřit funkčnost

```bash
/opt/google/chrome/chrome --version
# Očekávaný výstup: Chromium 143.0.7499.40 snap (nebo novější)
```

### 4. MCP konfigurace

`~/.claude/mcp.json` - jednoduchá konfigurace stačí:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

Volitelné flagy:
- `--no-sandbox` - vypne sandbox (někdy potřeba na WSL)
- `--headless` - headless mode (default pro MCP)

## Co NEFUNGUJE

- `--executable-path` flag - ignorován (známý bug)
- `--config` s launchOptions.executablePath - ignorován
- Přímý symlink na snap binárku (`/snap/chromium/current/usr/lib/chromium-browser/chrome`) - chybí shared libraries mimo snap prostředí

## Troubleshooting

### "Browser is already in use"

```bash
rm -rf ~/.cache/ms-playwright
# Pak restartovat Claude Code
```

### Chyba "libasound.so.2 not found"

Používáte přímý symlink místo wrapper scriptu. Snap binárka potřebuje snap prostředí.

## Testováno na

- WSL2 (Ubuntu 24.04)
- Kernel: 6.6.87.2-microsoft-standard-WSL2
- Architektura: aarch64 (ARM64)
- Chromium: 143.0.7499.40 snap
- @playwright/mcp: 0.0.51
