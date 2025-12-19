# Lesson Source: [Název lekce]

**Lesson ID:** XX-lesson-slug
**Kurz:** [course-slug]
**Typ:** deep-dive | overview | hands-on
**Status:** draft | in-progress | ready | published
**Last Updated:** YYYY-MM-DD

---

## O lekci

[2-3 odstavce popisující cíl, cílovou skupinu, očekávané výstupy]

---

## YouTube zdroje

### EN Notebook (pro content.mdx)

| # | Video ID | Kanál | Délka | Téma | Datum |
|---|----------|-------|-------|------|-------|
| 1 | `VIDEO_ID` | Channel Name | XX:XX | Topic | YYYY-MM-DD |
| 2 | | | | | |

**Celkem:** ~Xh obsahu, Y videí

### CZ Notebook (pro content.cs.mdx)

| # | Video ID | Kanál | Délka | Téma |
|---|----------|-------|-------|------|
| 1 | `VIDEO_ID` | Channel Name | XX:XX | Topic |
| 2 | | | | |

**Celkem:** ~Xh obsahu, Y videí

---

## VideoSwitcher konfigurace

```jsx
<VideoSwitcher alternatives={[
  {"id":"VIDEO_ID_1","title":"Title 1 (Channel)"},
  {"id":"VIDEO_ID_2","title":"Title 2 (Channel)"},
  {"id":"VIDEO_ID_CZ","title":"Title CZ (CZ)"}
]} />
```

---

## NotebookLM Workflow

### Custom Prompt pro Briefing Doc (EN)

```
Create a structured briefing for an educational lesson called "[LESSON TITLE]".

Focus on:
1. [Specific focus area 1]
2. [Specific focus area 2]
3. [Specific focus area 3]
4. Common mistakes and how to avoid them
5. [Tool-specific advanced features]

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
Vytvoř strukturovaný briefing pro výukovou lekci "[NÁZEV LEKCE]".

Zaměř se na:
1. [Specifická oblast 1]
2. [Specifická oblast 2]
3. [Specifická oblast 3]
4. Běžné chyby a jak se jim vyhnout
5. [Pokročilé funkce nástroje]

Formát:
- Úvodní hook (překvapivý fakt)
- 5-7 hlavních konceptů s příklady
- Tipy pro začátečníky vs pokročilé
- Shrnutí klíčových bodů

Styl: Edutainment - profesionální ale přístupný, s konkrétními příklady.
```

### Které výstupy vygenerovat

- [x] Briefing Doc - pro strukturu lekce
- [x] Study Guide - pro klíčové koncepty
- [x] Flashcards - pro quiz otázky
- [ ] Slide Deck - volitelně pro návrhy diagramů
- [ ] Quiz - naše quizy jsou specifičtější

---

## Struktura lekce (draft)

### Sekce

1. **Hook** - [Překvapivý fakt nebo statistika]
2. **[Koncept 1]** - [Popis]
3. **[Koncept 2]** - [Popis]
4. **[Koncept 3]** - [Popis]
5. **Holocron** - Summary ConceptCard

### Labs (návrh)

- **Lab 1:** [Název] - [Cíl] (~X min)
- **Lab 2:** [Název] - [Cíl] (~X min)
- **Lab 3:** [Název] - [Cíl] (~X min)

---

## Poznámky a aktualizace

| Datum | Poznámka |
|-------|----------|
| YYYY-MM-DD | Initial creation |
| | |
