# Camoufox - Anti-Detect Browser pro Web Scraping

## Co je Camoufox?

Open-source anti-detekční prohlížeč postavený na Firefox, navržený pro web scraping a obcházení bot detekce (Cloudflare, DataDome, PerimeterX, atd.).

- **GitHub:** https://github.com/daijro/camoufox
- **PyPI:** `pip install camoufox`
- **Licence:** MPL-2.0

## Kdy použít Camoufox místo Playwright?

| Situace | Nástroj |
|---------|---------|
| Běžné testování, interní stránky | Playwright MCP |
| Cloudflare challenge, anti-bot ochrana | **Camoufox** |
| OAuth login na chráněných službách | **Camoufox** |
| Scraping e-shopů, social media | **Camoufox** |
| Rychlé screenshoty bez detekce | Playwright MCP |

## Instalace

```bash
# 1. Nainstaluj balíček
pip3 install camoufox --break-system-packages

# 2. Stáhni Camoufox browser (Firefox mod)
export PATH="$HOME/.local/bin:$PATH"
camoufox fetch

# Binárky se uloží do: ~/.cache/camoufox/
```

## Základní použití

### Synchronní API (nejčastější)

```python
from camoufox.sync_api import Camoufox

with Camoufox(
    humanize=True,      # Realistický pohyb myši
    headless=True,      # Bez GUI (pro servery)
    os=["windows"],     # Spoof jako Windows
) as browser:
    page = browser.new_page()
    page.goto("https://example.com")

    # Playwright API - stejné jako běžný Playwright!
    page.fill("input[name='email']", "test@test.com")
    page.click("button[type='submit']")
    page.screenshot(path="result.png")

    content = page.content()
    print(page.title())
```

### Asynchronní API

```python
import asyncio
from camoufox.async_api import AsyncCamoufox

async def main():
    async with AsyncCamoufox(humanize=True, headless=True) as browser:
        page = await browser.new_page()
        await page.goto("https://example.com")
        await page.screenshot(path="result.png")

asyncio.run(main())
```

## Klíčové parametry

```python
Camoufox(
    humanize=True,           # Human-like pohyb myši (DOPORUČENO!)
    headless=True,           # Headless mode (pro servery)
    os=["windows"],          # Spoof OS: "windows", "macos", "linux"

    # Proxy konfigurace
    proxy={
        "server": "http://proxy.example.com:8080",
        "username": "user",
        "password": "pass"
    },

    # Custom fingerprint (volitelné)
    config={
        "navigator.language": "cs-CZ",
        "screen.width": 1920,
        "screen.height": 1080,
    },
)
```

## Praktické příklady

### 1. Procházení Cloudflare Challenge

```python
from camoufox.sync_api import Camoufox
import time

with Camoufox(humanize=True, headless=True, os=["windows"]) as browser:
    page = browser.new_page()

    # Naviguj na chráněnou stránku
    page.goto("https://protected-site.com", timeout=60000)

    # Počkej na Cloudflare challenge (automaticky projde)
    for i in range(30):
        time.sleep(1)
        if "moment" not in page.title().lower():
            print("Challenge passed!")
            break

    # Pokračuj s akcemi
    page.screenshot(path="after_challenge.png")
```

### 2. OAuth Login (OpenAI, Google, atd.)

```python
from camoufox.sync_api import Camoufox
import time

def oauth_login(auth_url, email, password):
    with Camoufox(humanize=True, headless=True, os=["windows"]) as browser:
        page = browser.new_page()

        # Navigate to OAuth
        page.goto(auth_url, timeout=60000)
        time.sleep(2)

        # Fill credentials
        page.fill('input[type="email"]', email)
        page.click('button:has-text("Continue")')
        time.sleep(3)

        page.fill('input[type="password"]', password)
        page.click('button:has-text("Continue")')
        time.sleep(5)

        # Handle verification code if needed
        if "verification" in page.url:
            code = input("Enter verification code: ")
            page.fill('input', code)
            page.click('button:has-text("Continue")')
            time.sleep(5)

        # Get callback URL with auth code
        return page.url
```

### 3. Scraping s anti-bot ochranou

```python
from camoufox.sync_api import Camoufox
import json

def scrape_protected_site(url):
    with Camoufox(humanize=True, headless=True, os=["windows"]) as browser:
        page = browser.new_page()

        # Set realistic viewport
        page.set_viewport_size({"width": 1920, "height": 1080})

        page.goto(url, timeout=60000)
        page.wait_for_load_state("networkidle")

        # Extract data
        data = page.evaluate("""() => {
            return {
                title: document.title,
                links: Array.from(document.querySelectorAll('a')).map(a => a.href),
                text: document.body.innerText.substring(0, 1000)
            }
        }""")

        return data
```

## Fingerprint Testing

Ověř, že Camoufox prochází anti-bot detekcí:

```python
from camoufox.sync_api import Camoufox

with Camoufox(humanize=True, headless=True) as browser:
    page = browser.new_page()

    # Test na bot.sannysoft.com
    page.goto("https://bot.sannysoft.com/")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="bot_test.png", full_page=True)

    # Zkontroluj klíčové hodnoty
    webdriver = page.evaluate("() => navigator.webdriver")
    print(f"navigator.webdriver = {webdriver}")  # Mělo by být False!
```

## Výhody oproti běžnému Playwright

| Feature | Playwright | Camoufox |
|---------|-----------|----------|
| `navigator.webdriver` | `true` (detekce!) | `false` |
| Fingerprint spoofing | ❌ | ✅ C++ level |
| Human-like mouse | ❌ | ✅ Trajektorie |
| Cloudflare bypass | ❌ | ✅ Většinou OK |
| WebRTC leak protection | ❌ | ✅ |
| Font fingerprint | Detekce | Spoofed |

## Omezení

1. **CAPTCHA solving** - Camoufox NEPOSKYTUJE automatické řešení CAPTCHA. Pokud se CAPTCHA zobrazí, potřebuješ:
   - Ruční zadání
   - Integraci s 2captcha, Anti-Captcha, apod.

2. **Headful mode** - Na serverech bez GUI potřebuješ Xvfb nebo headless=True

3. **Rychlost** - Pomalejší než čistý Playwright (kvůli humanize)

## Troubleshooting

### "Browser executable not found"

```bash
camoufox fetch  # Znovu stáhni binárky
```

### Timeout při Cloudflare

```python
# Prodluž timeout a počkej déle
page.goto(url, timeout=120000)
time.sleep(10)  # Delší čekání na challenge
```

### Memory issues

```python
# Zavírej stránky explicitně
page.close()
# Nebo použij context manager (with statement)
```

## Soubory na serveru

Po instalaci jsou k dispozici:

```
~/.local/bin/camoufox          # CLI nástroj
~/.cache/camoufox/             # Firefox binárky + profily
~/camoufox_demo.py             # Demo skript
~/openai_auth.py               # OAuth login příklad
```

## Použité v projektu

- **2024-12-20:** Úspěšně použito pro OpenAI Codex CLI autentizaci přes Cloudflare challenge

## Zdroje

- GitHub: https://github.com/daijro/camoufox
- Dokumentace: https://camoufox.com/
- BrowserForge (fingerprints): https://github.com/AlizerUncworker/browserforge
