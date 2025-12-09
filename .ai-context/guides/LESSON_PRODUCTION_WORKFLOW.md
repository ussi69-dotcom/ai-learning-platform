# 📚 Lesson Production Workflow

> **Verze:** 1.1 | **Aktualizováno:** 2025-12-09

Kompletní workflow pro efektivní tvorbu a úpravu lekcí s minimálním pokus-omyl.

---

> [!CAUTION]
> ## ⚠️ KRITICKÉ PRAVIDLO: Real-Time Verification
> 
> **Před zmíněním JAKÉHOKOLI modelu nebo nástroje v obsahu MUSÍŠ:**
> 1. Provést **real-time web search** pro aktuální verze
> 2. Ověřit, že model/nástroj stále existuje a je aktuální
> 3. Použít **správný název verze** (např. GPT-5.1, ne GPT-4o; Claude Opus 4.5, ne Claude 3.5)
> 
> **Aktuální modely (prosinec 2025):**
> - OpenAI: **GPT-5.1** (GPT-5.2 launching)
> - Anthropic: **Claude Opus 4.5**, Sonnet 4.5, Haiku 4.5
> - Google: **Gemini 3 Pro**, Gemini 3 Deep Think
> - Meta: **Llama 4 Maverick/Scout** (open-source)
> - Alibaba: **Qwen 3** (235B flagship)
> 
> **NIKDY nepoužívej zastaralé názvy jako GPT-4o, Claude 3.5, Gemini 2.5!**

---

## 🎯 Přehled procesu

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  1. RESEARCH │ -> │  2. DRAFT   │ -> │  3. POLISH  │ -> │  4. QA      │
│  (Perplexity)│    │  (Claude)   │    │  (Gemini)   │    │  (Claude)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
     1-2h              2-3h              1-2h              30min
```

---

## 📋 Fáze 1: RESEARCH (Perplexity Deep Research)

### Kdy použít
- **Nová lekce:** Vždy
- **Update lekce:** Pokud je téma > 3 měsíce staré

### Prompt pro Perplexity

```text
Proveď deep research pro vzdělávací lekci na téma: [TÉMA LEKCE]

Kontext:
- Cílová skupina: Čeští profesionálové (30-50 let), pokročilí začátečníci v AI
- Formát: Online kurz s 20-30min lekcemi
- Jazyk: Čeština (ale anglické zdroje OK)
- Datum: [AKTUÁLNÍ DATUM] - potřebujeme nejnovější informace

Potřebuji:

1. **Aktuální stav (prosinec 2025)**
   - Jaké jsou nejnovější modely/nástroje v této oblasti?
   - Co se změnilo za posledních 6 měsíců?
   - Jaké jsou aktuální best practices?

2. **YouTube videa (kritické!)**
   - 3-5 kvalitních videí z posledních 6 měsíců
   - Preferuj: Andrej Karpathy, Anthropic, OpenAI, DeepMind
   - Ověř, že videa existují a mají > 10k views
   - Formát: [Název](URL) - Kanál - Délka - Proč je relevantní

3. **České zdroje**
   - Existují kvalitní české kanály/weby na toto téma?
   - Překlady/adaptace zahraničního obsahu?

4. **Praktické příklady**
   - 2-3 hands-on příklady, které můžeme použít v labu
   - Reálné use-cases, ne teoretické

5. **Běžné chyby**
   - Co lidé nejčastěji dělají špatně?
   - Jaké jsou misconceptions?

Formát odpovědi: Markdown s jasnou strukturou.
```

### Výstup
- Uložit do `.ai-context/Perplexity_assist/LESSONXX-research.md`
- Přidat relevantní videa do `references.md`

---

## 📋 Fáze 2: DRAFT (Claude Opus 4.5 / Sonnet 4.5)

### Kdy který model
| Model | Použití |
|-------|---------|
| **Claude Opus 4.5** | Komplexní lekce, architektura, nové frameworky |
| **Claude Sonnet 4.5** | Standardní lekce, úpravy, opravy |

### Prompt pro tvorbu lekce

```text
Jsi expert na tvorbu vzdělávacího obsahu pro AI kurzy.

## Kontext
- Kurz: [NÁZEV KURZU]
- Lekce: [ČÍSLO] - [NÁZEV]
- Cílová skupina: Čeští profesionálové, pokročilí začátečníci
- Předchozí lekce: [STRUČNÉ SHRNUTÍ]
- Research: [VLOŽIT VÝSTUP Z PERPLEXITY]

## Požadavky na formát
Použij tyto komponenty (MDX):
- `<Callout type="info|warning|tip|success">` pro důležité poznámky
- `<ConceptCard title="X" icon="emoji">` pro klíčové koncepty
- `<Diagram type="X" />` pro vizualizace (dostupné typy: [SEZNAM])
- `<LabComplete labId="X" />` na konci každého labu
- Code blocky s ```text pro prompty

## Struktura lekce
1. Úvod s Callout (mise + čas + počet labů)
2. Video sekce (bude v meta.json)
3. 4-6 hlavních sekcí s ## nadpisy
4. 2-3 interaktivní laby
5. Holocron sekce (ve stylu beginner kurzu - emojis, numbered list, code block šablona)

## Styl
- Jedi/Padawan metafory (subtilně)
- Praktický, ne akademický
- Každá sekce má jasný "aha moment"
- Čeština: přirozená, ne robotic

## Výstup
Vytvoř kompletní content.cs.mdx (min. 400 řádků).
```

### Validace draftu
Před pokračováním zkontroluj:
- [ ] Všechny `<Component>` mají správnou syntax
- [ ] Laby mají prerekvizity a kritéria úspěchu
- [ ] Holocron má copy-paste šablonu
- [ ] Žádné placeholder texty

---

## 📋 Fáze 3: POLISH (Gemini 3 Pro)

### Kdy použít Gemini
- Vizuální vylepšení
- Přidání emojis a formátování
- Kontrola konzistence s existujícími lekcemi
- Rychlé opravy

### Prompt pro polish

```text
Zkontroluj a vylepši tuto lekci podle standardu "Masterpiece v2.1".

## Checklist
1. [ ] Emojis v nadpisech sekcí
2. [ ] Callouts na správných místech (tip po videu, warning před labs)
3. [ ] Konzistentní formátování tabulek
4. [ ] Code blocky mají správný jazyk (```text pro prompty)
5. [ ] Holocron má: emojis, numbered list, code block šablonu
6. [ ] Žádné prázdné řádky na konci code bloků

## Reference
Zde je vzorová lekce pro porovnání:
[VLOŽIT ČÁST BEGINNER KURZU]

## Vstup
[VLOŽIT DRAFT]

## Výstup
Vrať pouze opravené části s řádky, které se mají změnit.
```

---

## 📋 Fáze 4: QA (Claude + Build + Browser)

### Automatická validace
```bash
cd frontend && npm run verify
docker compose restart backend
```

### Manuální kontrola
1. Otevřít lekci v browseru
2. Projít všechny stránky (sekce)
3. Zkontrolovat:
   - [ ] Video se načítá
   - [ ] Diagramy se zobrazují
   - [ ] Code blocky nejsou "rozlomené"
   - [ ] Tabulky jsou čitelné
   - [ ] Laby mají správný formát

### Opravy
Pro rychlé opravy použij Claude Sonnet 4.5 s konkrétním popisem problému.

---

## 🔧 Model Matrix

| Úkol | Model | Důvod |
|------|-------|-------|
| Deep research | **Perplexity Pro** | Aktuální zdroje, citace |
| Tvorba nové lekce | **Claude Opus 4.5** | Nejlepší kvalita textu |
| Úpravy existující lekce | **Claude Sonnet 4.5** | Rychlé, přesné, levné |
| Vizuální polish | **Gemini 3 Pro** | Rychlé, multimodální, 1M kontext |
| Kódování (komponenty) | **Claude Sonnet 4.5** | Nejlepší pro kód |
| QA a debugging | **Claude Sonnet 4.5** | Systematický, přesný |

---

## ⚡ Quick Reference

### Nová lekce (4-6h)
```
1. Perplexity research -> .ai-context/Perplexity_assist/
2. Claude Opus draft -> content.cs.mdx
3. Gemini polish -> vizuální úpravy
4. npm run verify -> build OK
5. Browser QA -> finální check
6. Update references.md -> přidat videa
```

### Oprava existující lekce (30min-2h)
```
1. Identifikuj problém (screenshot)
2. Claude Sonnet fix -> konkrétní změny
3. npm run verify -> build OK
4. Browser check -> hotovo
```

### Přidání nového videa (5min)
```
1. Najdi embed ID (po /watch?v=)
2. Update meta.json: "video_url": "https://www.youtube.com/embed/[ID]"
3. docker compose restart backend
```

---

## 📁 Soubory k aktualizaci

| Soubor | Kdy |
|--------|-----|
| `content.cs.mdx` | Hlavní obsah lekce (CZ) |
| `content.mdx` | Anglická verze |
| `meta.json` | Video URL, metadata |
| `quiz.cs.json` | Kvízy (CZ) |
| `.ai-context/references.md` | Zdroje a nová videa |

---

*"Struktura > Improvizace. Dobrý proces porazí dobrý úmysl."*
