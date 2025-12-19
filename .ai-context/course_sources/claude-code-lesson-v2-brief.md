# Task Brief: Claude Code Mastery Lesson v2.0

## Kontext
Aktuální lekce předpokládá znalost terminálu a GitHub. Potřebujeme ji přepracovat tak, aby:
1. Byla přístupná i začátečníkům bez zkušeností s terminálem
2. Měla progresivní strukturu - od instalace k mistrovství
3. Obsahovala vizuální podporu (odkazy na diagramy)
4. Vedla uživatele k postupnému zlepšování jejich Claude Code skills

## Cílová skupina
- Windows uživatelé (WSL)
- Linux/Mac uživatelé
- Začátečníci v terminálu
- Zkušení vývojáři (mohou přeskočit základy)

## Požadovaná struktura

### Sekce 0: Než začneme (Prerequisites)
- Krátké vysvětlení co je Claude Code
- Proč terminál (ne GUI chat)
- Co budete potřebovat: Node.js, terminál, Anthropic API klíč

### Sekce 1: Instalace prostředí (NOVÁ - klíčová!)

#### 1.1 Pro Windows uživatele (Optional - WSL)
- Co je WSL a proč ho použít
- Krok za krokem instalace WSL2
- Instalace Ubuntu
- Základní orientace v Linux terminálu
- Nastavení VS Code + WSL remote

#### 1.2 Společná část (Linux/Mac/WSL)
- Instalace Node.js (nvm doporučeno)
- Instalace Claude Code CLI
- Nastavení Anthropic API klíče
- Ověření instalace (`claude --version`)
- První spuštění a autorizace

### Sekce 2: První kroky v Claude Code
- Základní příkazy (`/help`, `/clear`, `/cost`)
- Váš první prompt
- Pochopení odpovědí a kontextu
- Kdy Claude píše soubory vs. jen odpovídá

### Sekce 3: Základní workflow (Lab 0 - NEW!)
**Lab 0: Váš první projekt s Claude Code**
- Vytvořte jednoduchý projekt (např. TODO list)
- Naučte se základní cyklus: prompt → review → approve
- Pochopte jak Claude čte a upravuje soubory
- Kritéria úspěchu: Běžící jednoduchá aplikace

### Sekce 4: Projektová ústava (CLAUDE.md)
- Proč CLAUDE.md
- Základní šablona
- Lab 1: Vytvořte svůj CLAUDE.md (existující lab)

### Sekce 5: 10 pravidel pro lepší výstupy
- Zachovat existující obsah
- Přidat praktické příklady

### Sekce 6: Hlavní funkce (Plan Mode, Sub-agents)
- Zachovat existující obsah
- Přidat více kontextu pro začátečníky

### Sekce 7: Pokročilé funkce (MCP, Hooks)
- Lab 2: MCP integrace (existující)
- Lab 3: Automatizace (existující)

### Sekce 8: Troubleshooting a best practices
- Rozšířit sekci o běžné problémy začátečníků
- Přidat sekci "Co dělat když to nefunguje"

## Vizuální prvky (diagramy k použití)
- `<Diagram type="claude-code-psb-workflow" />` - PSB systém
- `<Diagram type="agentic-vs-assistive" />` - Agentní vs asistentní
- `<Diagram type="sub-agent-architecture" />` - Sub-agenti
- `<Diagram type="plan-mode-flow" />` - Plan mode
- `<Diagram type="claude-code-ecosystem" />` - Ekosystém
- `<Diagram type="10-rules-pyramid" />` - 10 pravidel
- NOVÉ diagramy potřeba: `installation-flow`, `terminal-basics`

## Existující videa (zachovat)
```jsx
<VideoSwitcher alternatives={[
  {"id":"zEk7eZzA04s","title":"Celé aplikace bez dozoru (CZ - Souki)"},
  {"id":"UVJXh57MgI0","title":"Complete Claude Code Guide (Alex Finn)"},
  {"id":"Xob-2a1OnvA","title":"10x Claude Code Rules (Greg Isenberg)"},
  {"id":"aQvpqlSiUIQ","title":"How I Start Every Project (Avthar)"}
]} />
```

## Callout typy
- `info` - informace, tipy
- `warning` - varování, prerekvizity
- `tip` - pro tipy
- `success` - pro úspěchy

## Labs formát
```markdown
## 🔬 Lab X: Název

**Cíl:** Jednoznačný cíl

**Čas:** X minut | **Obtížnost:** Začátečník/Pokročilý/Expert

### Krok 1: ...
[Konkrétní instrukce]

### Krok 2: ...
[Copy-paste ready prompty]

**Očekávané chování:**
- ...

**Kritéria úspěchu:**
- ✅ ...

**💡 Aha moment:** "..."

<LabComplete labId="lab-cc-X" />
```

## Požadovaný výstup
1. Kompletní `content.mdx` (EN)
2. Kompletní `content.cs.mdx` (CZ)
3. Aktualizovaný `meta.json` s novými learning objectives

## Délka
- Čas čtení: 60 min (rozšířeno z 45)
- Labs: 4 (přidán Lab 0)

## Tón
- Přátelský, ne povýšený
- "Pojďme společně" místo "Musíte"
- Praktický, hands-on přístup
- Uznání že terminál může být strašidelný pro začátečníky
