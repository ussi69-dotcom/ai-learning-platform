# Lesson Source: Claude Code Mastery

**Lesson ID:** 06-claude-code-mastery
**Kurz:** practical-prompt-engineering
**Typ:** deep-dive
**Status:** draft
**Last Updated:** 2025-12-18

---

## O lekci

Claude Code je Anthropic's oficiální CLI pro AI-native development. Tato deep-dive lekce pokrývá vše od základního workflow až po pokročilé funkce jako hooks, MCP servery, sub-agenti a skills.

**Cílová skupina:** Vývojáři, kteří chtějí maximalizovat produktivitu s Claude Code. Předpoklad: základní znalost terminálu a git.

**Očekávané výstupy:**
- Efektivní workflow pro denní práci s Claude Code
- Nastavení projektu (CLAUDE.md, hooks)
- Integrace s MCP servery
- Využití pokročilých funkcí (plan mode, sub-agents, skills)
- Non-coding use cases (research, writing)

---

## YouTube zdroje

### EN Notebook (pro content.mdx)

| # | Video ID | Kanál | Délka | Téma | Datum |
|---|----------|-------|-------|------|-------|
| 1 | `UVJXh57MgI0` | Alex Finn | 24:45 | Complete workflow guide | 2025-12-16 |
| 2 | `Xob-2a1OnvA` | Greg Isenberg | 17:07 | 10 Anthropic rules | 2025-12-10 |
| 3 | `aQvpqlSiUIQ` | AI with Avthar | 34:16 | Project setup workflow | 2025-12-17 |
| 4 | `1uWJC2r6Sss` | Income Stream | 11:08 | Skills & plugins | 2025-12-16 |
| 5 | `RV9vBRtXagQ` | Matt Maher | 20:11 | Multi-agent non-coding | 2025-12-11 |
| 6 | `0UbxmrUEG1o` | Income Stream | 12:31 | Native browser use | 2025-12-18 |

**Celkem:** ~2h obsahu, 6 videí

**YouTube URLs pro NotebookLM:**
1. https://www.youtube.com/watch?v=UVJXh57MgI0
2. https://www.youtube.com/watch?v=Xob-2a1OnvA
3. https://www.youtube.com/watch?v=aQvpqlSiUIQ
4. https://www.youtube.com/watch?v=1uWJC2r6Sss
5. https://www.youtube.com/watch?v=RV9vBRtXagQ
6. https://www.youtube.com/watch?v=0UbxmrUEG1o

### CZ Notebook (pro content.cs.mdx)

| # | Video ID | Kanál | Délka | Téma |
|---|----------|-------|-------|------|
| 1 | `zEk7eZzA04s` | Souki/Honza Černý | 55:45 | Celé aplikace bez dozoru |
| 2 | `NpDj0EGBFF8` | Programuj s Tomášem | 18:16 | Intro + Cursor combo |
| 3 | `G7fJWkXjKJ8` | AIČKO | 8:10 | Design plugins |

**Celkem:** ~1.5h CZ obsahu, 3 videa

**YouTube URLs pro NotebookLM:**
1. https://www.youtube.com/watch?v=zEk7eZzA04s
2. https://www.youtube.com/watch?v=NpDj0EGBFF8
3. https://www.youtube.com/watch?v=G7fJWkXjKJ8

---

## VideoSwitcher konfigurace

```jsx
<VideoSwitcher alternatives={[
  {"id":"UVJXh57MgI0","title":"Complete Claude Code Guide (Alex Finn)"},
  {"id":"Xob-2a1OnvA","title":"10x Claude Code Rules (Greg Isenberg)"},
  {"id":"aQvpqlSiUIQ","title":"How I Start Every Project (Avthar)"},
  {"id":"zEk7eZzA04s","title":"Celé aplikace bez dozoru (CZ - Souki)"}
]} />
```

---

## NotebookLM Workflow

### Krok 1: EN Notebook

**Vytvořit notebook:** "Claude Code Mastery EN"

**Nahrát videa:**
1. https://www.youtube.com/watch?v=UVJXh57MgI0
2. https://www.youtube.com/watch?v=Xob-2a1OnvA
3. https://www.youtube.com/watch?v=aQvpqlSiUIQ
4. https://www.youtube.com/watch?v=1uWJC2r6Sss
5. https://www.youtube.com/watch?v=RV9vBRtXagQ
6. https://www.youtube.com/watch?v=0UbxmrUEG1o

**Vygenerovat:**
- Briefing Doc (custom prompt níže)
- Study Guide
- Flashcards

### Krok 2: CZ Notebook (volitelně)

**Vytvořit notebook:** "Claude Code Mastery CZ"

**Nahrát videa:**
1. https://www.youtube.com/watch?v=zEk7eZzA04s
2. https://www.youtube.com/watch?v=NpDj0EGBFF8
3. https://www.youtube.com/watch?v=G7fJWkXjKJ8

**Vygenerovat:**
- Briefing Doc (CZ verze promptu)

### Custom Prompt pro Briefing Doc (EN)

```
Create a structured briefing for an educational lesson called "Claude Code Mastery".

Focus on:
1. Practical workflows and best practices for using Claude Code
2. Specific tips, tricks, and keyboard shortcuts
3. Common mistakes and how to avoid them
4. Advanced features: hooks, MCP servers, plan mode, sub-agents, skills, plugins
5. Project setup patterns (CLAUDE.md, .cursorrules)
6. Integration with other tools (Cursor, Windsurf, Git)
7. Non-coding use cases (research, writing, multi-agent workflows)
8. Latest features (native browser use, skills system)

Format:
- Opening hook (surprising statistic or bold claim)
- 5-7 main concepts with practical examples
- Tips for beginners vs advanced users
- Common pitfalls section
- Key takeaways summary

Style: Edutainment - professional but accessible, with concrete examples.
Include specific commands, keyboard shortcuts, and code snippets where relevant.
```

### Custom Prompt pro Briefing Doc (CZ)

```
Vytvoř strukturovaný briefing pro výukovou lekci "Mistrovství v Claude Code".

Zaměř se na:
1. Praktické workflow a best practices
2. Konkrétní tipy, triky a klávesové zkratky
3. Běžné chyby a jak se jim vyhnout
4. Pokročilé funkce: hooks, MCP servery, plan mode, sub-agenti
5. Nastavení projektu (CLAUDE.md)
6. Integrace s dalšími nástroji
7. Tvorba celých aplikací bez dozoru

Formát:
- Úvodní hook (překvapivý fakt)
- 5-7 hlavních konceptů s příklady
- Tipy pro začátečníky vs pokročilé
- Shrnutí klíčových bodů

Styl: Edutainment - profesionální ale přístupný, s konkrétními příklady.
```

### Které výstupy vygenerovat

- [x] **Briefing Doc** - pro strukturu lekce (hlavní sekce, flow, klíčové body)
- [x] **Study Guide** - pro ConceptCards (definice konceptů, vysvětlení)
- [x] **Flashcards** - pro quiz otázky (přeformulovat na MCQ)
- [ ] Slide Deck - volitelně pro návrhy diagramů
- [ ] Quiz - naše quizy jsou specifičtější

---

## Struktura lekce (draft)

### Sekce

1. **Hook** - "V prosinci 2025 Claude Code překonal 1M aktivních vývojářů..." (nebo podobný fakt)
2. **Proč Claude Code?** - Positioning vs Cursor, Windsurf, Copilot
3. **Setup & First Steps** - Instalace, CLAUDE.md, základní příkazy
4. **Daily Workflow** - Jak efektivně pracovat, keyboard shortcuts
5. **Project Configuration** - CLAUDE.md deep-dive, hooks
6. **MCP Integration** - Připojení externích nástrojů
7. **Advanced Features** - Plan mode, sub-agents, skills
8. **Non-Coding Use Cases** - Research, writing, multi-agent
9. **Holocron** - Summary ConceptCard

### Labs (návrh)

- **Lab 1:** First Project Setup - Vytvoř CLAUDE.md pro existující projekt (~15 min)
- **Lab 2:** MCP Server Connection - Připoj GitHub MCP server (~10 min)
- **Lab 3:** Advanced Workflow - Použij plan mode pro komplexní refactoring (~20 min)

---

## Klíčové koncepty k pokrytí

### Z videí (extrahováno)

1. **CLAUDE.md** - Project constitution, context management
2. **Hooks** - Pre/post action hooks pro automatizaci
3. **MCP Servers** - Rozšíření capabilities (filesystem, GitHub, DB)
4. **Plan Mode** - Strukturované plánování před implementací
5. **Sub-agents** - Delegace úkolů na specializované agenty
6. **Skills** - Pluginy pro specifické úkoly
7. **Keyboard Shortcuts** - Efektivní navigace (Esc, /, atd.)
8. **Context Management** - Jak efektivně předávat kontext

### Tipy pro začátečníky

- Začni s jednoduchým CLAUDE.md
- Používej `/help` pro discovery
- Nech Claude navrhnout strukturu projektu

### Tipy pro pokročilé

- Vlastní hooks pro linting/testing
- Multi-agent workflows přes MCP
- Kombinace s Cursor pro rychlý edit

---

## Poznámky a aktualizace

| Datum | Poznámka |
|-------|----------|
| 2025-12-18 | Initial creation, 6 EN + 3 CZ videos curated |
| | Čeká na NotebookLM processing |
