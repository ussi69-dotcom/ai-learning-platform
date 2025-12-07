# 🔍 Session Retrospective: Lesson 01 Fixes

> **Datum:** 2025-12-07
> **Trvání:** ~3 hodiny
> **Výsledek:** ✅ Opraveno, ale s mnoha iteracemi

---

## ❌ Problémy a jejich příčiny

### 1. Video embed nefungovalo
**Symptom:** "www.youtube.com se odmítl připojit"

**Příčina:** 
- V `meta.json` byla URL ve formátu `watch?v=` místo `embed/`
- Iframe vyžaduje embed URL, ne normální YouTube link

**Jak jsem to řešil (špatně):**
1. ❌ Změnil jsem `<YouTube>` komponentu v content.mdx
2. ❌ Měnil jsem video ID
3. ❌ Upravoval jsem regex v MarkdownRenderer
4. ✅ Až nakonec jsem zjistil, že problém je v `meta.json`

**Jak to řešit správně:**
```bash
# 1. Najdi kde se video definuje
grep -r "video_url" content/courses/

# 2. Zkontroluj formát URL v meta.json
# ŠPATNĚ: https://www.youtube.com/watch?v=XXX
# SPRÁVNĚ: https://www.youtube.com/embed/XXX
```

**Poučení:** 
- Video se renderuje z `lesson.video_url` v `page.tsx`, NE z `<YouTube>` komponenty v MDX
- `<YouTube>` komponenta v MDX je pro *volitelná* videa uvnitř obsahu
- Hlavní video je v `meta.json`

---

### 2. Tabulka modelů měla staré verze
**Symptom:** Uživatel upozornil, že GPT-5 a Sonnet 4.5 chybí

**Příčina:**
- Neověřil jsem aktuální stav modelů před psaním
- Kopíroval jsem starší data

**Jak jsem to řešil:**
1. ✅ Použil `search_web` pro ověření aktuálních verzí
2. ✅ Aktualizoval tabulku na: Claude Sonnet 4.5, Gemini 2.5 Pro

**Poučení:**
- **VŽDY** použít web search pro aktuální data (modely, verze, benchmarky)
- Nikdy nepředpokládat, že "vím" aktuální stav - AI svět se mění rychle

---

### 3. Holocron formát neodpovídal vzoru
**Symptom:** Uživatel ukázal screenshot z beginner kurzu - jiný styl

**Příčina:**
- Nepodíval jsem se na existující lekce jako referenci
- Přidal jsem `<Diagram>`, který tam nepatřil

**Jak jsem to řešil:**
1. ✅ Prohlédl jsem si `content.cs.mdx` z beginner kurzu
2. ✅ Zkopíroval strukturu: emojis, numbered list, code block šablona

**Poučení:**
- **PŘED úpravou** se vždy podívat na existující lekce stejného kurzu
- Konzistence > Kreativita

---

### 4. Backend restart
**Symptom:** Změny v content se neprojevily v browseru

**Příčina:**
- Backend cachuje data z content souborů
- Po změně `meta.json` nebo content je nutný restart

**Řešení:**
```bash
docker compose restart backend
```

**Poučení:**
- Po změnách v `content/` vždy restartovat backend
- Po změnách ve `frontend/` stačí hot-reload (dev server)

---

### 5. splitIntoSlides bug
**Symptom:** Code blocky se "rozlomily" na stránky

**Příčina:**
- Funkce `splitIntoSlides` dělila obsah na každé `## ` 
- Nedělal jsem rozdíl, jestli je `## ` uvnitř code blocku

**Řešení:**
```typescript
// Přidal jsem tracking code block stavu
let insideCodeBlock = false;
if (line.trim().startsWith('```')) {
  insideCodeBlock = !insideCodeBlock;
}
if (!insideCodeBlock && line.match(/^##\s+[^#]/)) {
  // split here
}
```

**Poučení:**
- Při parsování Markdown vždy trackovat stav code bloků
- Testy na edge cases (## uvnitř code bloku)

---

## ✅ Co fungovalo dobře

1. **Build verification** - `npm run verify` po každé změně
2. **Screenshoty od uživatele** - rychlá identifikace problémů
3. **Web search pro aktuální data** - ověření verzí modelů
4. **Iterativní přístup** - malé změny, časté kontroly

---

## 📋 Checklist pro příště

### Před úpravou lekce
- [ ] Podívat se na existující lekce STEJNÉHO kurzu jako referenci
- [ ] Ověřit aktuální verze modelů/nástrojů přes web search
- [ ] Zjistit kde se definuje video (`meta.json` vs MDX)

### Během úpravy
- [ ] Po každé větší změně: `npm run verify`
- [ ] Po změně content: `docker compose restart backend`
- [ ] Kontrolovat konzoli browseru pro chyby

### Po úpravě
- [ ] Hard refresh (`Ctrl+Shift+R`)
- [ ] Projít všechny stránky lekce
- [ ] Zkontrolovat video, tabulky, code blocky

---

## 🎯 Klíčové poučení

> **"Nejdřív zjisti kde problém je, pak teprve opravuj."**

V této session jsem často opravoval špatnou věc:
- Měnil jsem `<YouTube>` v MDX, když problém byl v `meta.json`
- Měnil jsem regex v MarkdownRenderer, když problém byla URL

**Diagnostický postup:**
1. Podívat se do konzole browseru
2. Najít kde se daný element definuje (grep)
3. Ověřit data v source of truth (meta.json, API response)
4. Teprve pak opravit

---

*Dokumentováno pro budoucí reference a zlepšení workflow.*
