# Course Sources System

> **Účel:** Centralizovaná organizace zdrojů pro tvorbu lekcí s NotebookLM workflow.

## Struktura

```
.ai-context/course_sources/
├── README.md                           # Tento soubor
├── _templates/
│   └── LESSON_SOURCE_TEMPLATE.md       # Šablona pro nové lekce
│
├── practical-prompt-engineering/       # Kurz: Practical Prompt Engineering
│   ├── 05-ai-powered-development.md    # Overview lekce (intro k deep-dives)
│   ├── 06-claude-code-mastery.md       # Deep-dive: Claude Code
│   ├── 07-build-first-ai-app.md        # Hands-on projekt
│   └── ...
│
└── [další-kurzy]/
    └── ...
```

---

## Workflow: Od zdrojů k lekci

### Fáze 1: Příprava zdrojů (Claude)

1. **Vytvoř source dokument** z `_templates/LESSON_SOURCE_TEMPLATE.md`
2. **Najdi YouTube videa** pomocí YouTube Data API MCP
3. **Vyplň metadata** - video IDs, délky, témata
4. **Definuj custom prompts** pro NotebookLM

### Fáze 2: NotebookLM Processing (User)

1. **Vytvoř notebook** v NotebookLM (oddělené pro EN/CZ)
2. **Nahraj videa** jako sources (max 50 free, 300 Plus)
3. **Vygeneruj výstupy:**
   - Briefing Doc (s custom promptem)
   - Study Guide
   - Flashcards
4. **Exportuj** a předej Claude

### Fáze 3: Tvorba lekce (Claude + Gemini)

1. **Zpracuj NotebookLM výstupy**
2. **Vytvoř/aktualizuj content.mdx** podle CONTENT_GUIDELINES.md
3. **Lokalizuj do content.cs.mdx**
4. **Vytvoř quiz.json + quiz.cs.json**
5. **QA workflow** (backend restart, visual check)

---

## NotebookLM Limity a Best Practices

### Limity (2025)

| Verze | Sources/notebook | Words/source |
|-------|------------------|--------------|
| Free | 50 | 500,000 |
| Plus ($20/mo) | 300 | 500,000 |

### Best Practices

1. **Více = lépe** - NotebookLM syntetizuje napříč zdroji
2. **Oddělené notebooky** - EN videa → EN notebook, CZ videa → CZ notebook
3. **Kvalita > kvantita** - 5-8 kvalitních videí > 15 průměrných
4. **Custom prompts** - Vždy použij specifický prompt pro Briefing Doc

### Které výstupy použít

| Výstup | Použití | Co extrahovat |
|--------|---------|---------------|
| **Briefing Doc** | Struktura lekce | Hlavní sekce, flow, klíčové body |
| **Study Guide** | ConceptCards | Definice konceptů, vysvětlení |
| **Flashcards** | Quiz otázky | Přeformulovat na MCQ |
| **Slide Deck** | Sekce + vizuály | Návrhy diagramů |

---

## YouTube Video Discovery

### Nástroje

| Nástroj | Kdy použít |
|---------|------------|
| `mcp__youtube-data__search_videos` | Hledání videí podle klíčových slov |
| `mcp__youtube-data__get_video_details` | Metadata konkrétního videa |
| `mcp__youtube-data__get_channel_videos` | Videa z kanálu |
| `mcp__youtube-data__get_playlist_items` | Videa z playlistu |
| `mcp__youtube-data__get_video_transcript` | Transkript videa |

### Kritéria výběru videí

1. **Aktuálnost** - preferuj videa z posledních 6 měsíců
2. **Délka** - 10-35 min ideální pro NotebookLM
3. **Kvalita** - renomované kanály, vysoký engagement
4. **Pokrytí** - různé úhly pohledu na téma

---

## Typy lekcí

| Typ | Účel | Příklad |
|-----|------|---------|
| **overview** | Úvod do tématu, přehled nástrojů | 05-ai-powered-development |
| **deep-dive** | Hloubkové pokrytí jednoho nástroje | 06-claude-code-mastery |
| **hands-on** | Praktický projekt od A do Z | 07-build-first-ai-app |

---

## Konvence pojmenování

- **Soubory:** `XX-lesson-slug.md` (odpovídá lesson ID)
- **Video IDs:** Vždy 11 znaků (YouTube standard)
- **Jazyky:** EN = primární, CZ = lokalizace

---

## Údržba

- **Aktualizuj source docs** když přidáš/změníš videa
- **Trackuj datum** poslední aktualizace v každém source doc
- **Archivuj** zastaralé source docs (přesuň do `_archive/`)
