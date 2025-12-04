# GitHub Guide: Sloučení změn (Merge & Pull)

Tento návod popisuje, jak postupovat, když máte lokální změny (commits) a zároveň existují nové změny na vzdáleném repozitáři (GitHub), které potřebujete stáhnout a sloučit.

## Scénář
- Máte lokální commity, které ještě nejsou na GitHubu.
- Na GitHubu (remote `origin`) přibyly změny od jiných uživatelů nebo z jiného stroje.
- Potřebujete dostat svůj kód na GitHub, ale `git push` je zamítnut, protože "remote contains work that you do not have locally".

---

## 1. Metoda: VS Code GUI (Doporučeno)

VS Code má vestavěnou podporu pro Git, která většinu těchto situací řeší automaticky.

1.  Otevřete panel **Source Control** (ikona větve v levém panelu nebo `Ctrl+Shift+G`).
2.  V dolním rohu (nebo v menu pod třemi tečkami `...`) uvidíte tlačítko **Sync Changes** (nebo ikonu točících se šipek).
    - Čísla u šipek indikují: `↓` (počet commitů ke stažení) a `↑` (počet commitů k odeslání).
3.  Klikněte na **Sync Changes**.
    - VS Code se pokusí provést `git pull` a následně `git push`.
    - Pokud nenastanou konflikty, změny se automaticky sloučí a odešlou.
4.  **Pokud nastanou konflikty:**
    - VS Code zvýrazní soubory s konflikty.
    - Otevřete soubor, vyberte **Accept Current Change** (vaše) nebo **Accept Incoming Change** (z GitHubu), případně obojí.
    - Uložte soubor a v panelu Source Control klikněte na `+` (Stage).
    - Dokončete merge commit (zadejte zprávu a potvrďte).

---

## 2. Metoda: WSL / Terminál (Příkazy)

Pro větší kontrolu nad historií je lepší používat příkazovou řádku.

### A. Bezpečné stažení a sloučení (Standardní Merge)
Tento postup vytvoří "merge commit", který spojí obě historie. Je to bezpečné a přehledné.

```bash
# 1. Stáhněte informace o změnách z GitHubu (bez úpravy souborů)
git fetch origin

# 2. Zkontrolujte stav
git status

# 3. Stáhněte a slučte změny do vaší větve
git pull origin main
# (Pokud používáte jinou větev než main, nahraďte 'main' názvem vaší větve)

# 4. Pokud se otevře editor pro commit zprávu:
# - Ve VIM: stiskněte ':wq' a Enter
# - V Nano: stiskněte 'Ctrl+X', 'Y', Enter

# 5. Odešlete vše zpět na GitHub
git push origin main
```

### B. Čistší historie (Rebase)
Pokud chcete, aby vaše změny vypadaly, jako byste je napsali až *po* změnách z GitHubu (lineární historie bez zbytečných merge commitů).

```bash
# 1. Stáhněte a přeskládejte vaše změny NA VRCH změn z GitHubu
git pull --rebase origin main

# 2. Pokud nastanou konflikty:
# - Opravte soubory
# - git add <soubor>
# - git rebase --continue

# 3. Odešlete změny
git push origin main
```

---

## 3. Řešení problémů (Troubleshooting)

### "Please clean your repository working tree before checkout"
Tato chyba znamená, že máte **neuložené změny** (upravené soubory), které jste ještě nepotvrdili (neudělali commit). Git nemůže stáhnout nové změny, protože by přepsal vaši rozdělanou práci.

**Řešení:**
1.  **Uložte svou práci (Commit):**
    - V panelu *Source Control* napište zprávu do políčka "Message" (např. "WIP: rozpracované změny").
    - Klikněte na **Commit** (nebo `Ctrl+Enter`).
    - Teprve *potom* klikněte znovu na **Sync Changes** (kolečko se šipkami).

2.  **Nebo změny zahoďte (Discard):**
    - Pokud změny nechcete, klikněte pravým tlačítkem na soubor v *Source Control* a vyberte **Discard Changes** (ikona zahnuté šipky zpět).
    - **Pozor:** Toto nenávratně smaže vaši neuloženou práci!

---

## Rychlé tipy
- **`git status`**: Vždy používejte před jakoukoliv akcí, abyste věděli, kde jste.
- **`git log --oneline --graph --all`**: Zobrazí graf historie, abyste viděli, jak se větve rozcházejí a spojují.
