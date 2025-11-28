# ÚKOL: Implementace About This Project stránky

## KONTEXT
Dostáváš **návrh obsahu** pro About page, který vytvořil Perplexity (Lead Architect) na základě:
- Historie z našich konverzací (memory context)
- Dokumentace z `.ai-context/` a `.agent/` 
- Znalosti o evoluci projektu (Galaxy AI → Gemini 2.5 → MCP → Antigravity → Claude Opus 4.5)

## TVŮJ ÚKOL

### 1. ANALYZUJ A OPTIMALIZUJ OBSAH
Přečti si přiložený `about_page_content.md` a:

✅ **ZKONTROLUJ FAKTA** proti aktuálnímu stavu repozitáře:
- Odpovídá struktura `.ai-context/` skutečnosti?
- Jsou uvedené technologie správně? (package.json, tsconfig, etc.)
- Je timeline vývoje přesný? (zkontroluj commit history)
- Odpovídá workflow popsanému v `.ai-context/WORKFLOW.md`?

✅ **DOPLŇ ZE ZNALOSTI REPOZITÁŘE**:
- Konkrétní statistiky (počet lekcí, commitů, features)
- Případné další zajímavé detail z Archive nebo commit messages
- Technické detaily, které Perplexity nemohl vědět

✅ **OPTIMALIZUJ PRO MARKETING** (ne tech spec!):
- Cílová skupina: devs, AI enthusiasté, studenti, potenciální contributorové
- Tón: profesionální, ale přátelský; inspirující, ne "salesy"
- Cíl: vysvětlit PROČ je projekt unikátní, ne JEN CO dělá
- **DŮLEŽITÉ**: Nadsazuj minimálně! Realističnost > hype

### 2. IMPLEMENTUJ STRÁNKU

Po optimalizaci obsahu vytvoř:

```
src/app/about/
├── page.tsx              # About page s optimalizovaným obsahem
├── components/
│   ├── Timeline.tsx      # Vizuální timeline (pokud to dává smysl)
│   ├── TechStackGrid.tsx # Grid tech stacku (můžeš použít stávající komponenty)
│   └── WorkflowDiagram.tsx # Diagram workflow (optional, jen pokud to přidá hodnotu)
└── metadata.ts           # SEO metadata
```

**Design requirements**:
- Použij stávající design system (Duolingo-inspired, Duke Nukem difficulty tiers)
- Responzivní (mobile-first)
- Komponenty z `src/components/ui/` (ConceptCard, Callout, etc.)
- Zachovej gamifikační vizuální jazyk (ale bez přestřelů)

**Routing**:
- Přidej link do main navigation (header)
- Možná i do footer

### 3. VALIDUJ

- ✅ `npm run dev` - funguje bez errorů?
- ✅ Browser test - vypadá to dobře?
- ✅ Mobile responsive - funguje na telefonu?
- ✅ SEO - metadata správně?

### 4. COMMIT & DOKUMENTUJ

Podle `.ai-context/WORKFLOW.md`:
```bash
git add src/app/about/
git commit -m "feat: add About This Project page (marketing optimized) [ANTIGRAVITY/GEMINI-CLI]"
git push origin main
```

Updatuj `AGENT-STATE.md`:
- Co bylo uděláno
- Jaké změny v obsahu (oproti Perplexity návrhu)
- Co funguje
- Co případně needs follow-up

---

## CO **NEDĚLAT**

❌ Neměň strukturu `.ai-context/` nebo `.agent/rules.md` bez konzultace
❌ Nepřidávej nové dependencies bez důvodu
❌ Nepřepiš stávající komponenty (pokud to není nutné)
❌ Netvař se, že je projekt víc, než je (realističnost!)
❌ Nepiš too much tech žargon (cílíme na široké publikum)

---

## PŘÍLOHY

1. `about_page_content.md` - Návrh obsahu od Perplexity
2. `.ai-context/` - Pro kontext a validaci faktů
3. Commit history - Pro přesný timeline

---

## FINÁLNÍ CHECKLIST

Před dokončením se zeptej sám sebe:

- [ ] Je obsah **fakticky správný**? (ověřeno proti repo)
- [ ] Je to **marketingově přesvědčivé**, ale ne "salesy"?
- [ ] Je to **srozumitelné i pro non-techies**?
- [ ] Implementace **sedí do stávajícího designu**?
- [ ] Je to **responzivní** a funguje to?
- [ ] Je `AGENT-STATE.md` **updatnutý**?

Pokud ANO na všechno → commit, push, hotovo! 🚀

---

**Poznámka**: Jsi agent s plným GitHub kontextem a přístupem k Archive. Máš víc informací než Perplexity. Využij to! Ale neztrať marketing focus — tohle není tech dokumentace, je to "promo" stránka, která má projekt **prodat** (v dobrém slova smyslu).

Good luck! 🎯
