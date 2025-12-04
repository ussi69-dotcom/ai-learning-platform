# RCA: Selhání nasazení verze (3. 12. 2025)

## 1. Shrnutí incidentu
Při pokusu o nasazení nejnovější verze z větve `main` na produkční server došlo k selhání procesu sestavení (build) frontendové aplikace. Služba odmítla nastartovat, což si vyžádalo manuální zásah (hotfix) přímo na produkčním prostředí.

*   **Datum:** 3. 12. 2025
*   **Dotčené komponenty:** Frontend (Next.js)
*   **Dopad:** Nemožnost nasadit novou verzi bez manuální opravy kódu; potenciální downtime při pokusu o restart.

## 2. Analýza kořenových příčin (Root Cause Analysis)

### A. Technická příčina (The "What")
Došlo k `TypeError` během transpilace TypeScriptu v produkčním buildu (`npm run build`).
*   **Chyba:** `JSX element type 'AvatarIcon' does not have any construct or call signatures.`
*   **Lokace:** `frontend/app/[locale]/profile/page.tsx` a `frontend/components/NavBar.tsx`.
*   **Detail:** Kód se pokoušel renderovat proměnnou jako React komponentu (`<AvatarIcon />`), aniž by TypeScript měl jistotu, že tato proměnná je definovaná a že je validní komponentou (mohla být `undefined` nebo `null`).

### B. Procesní příčina (The "Why")
Kritická chyba se dostala až do větve `main` a na produkční server. To indikuje selhání v procesu vývoje a kontroly kvality:
1.  **Absence CI/CD Pipeline:** Neexistuje automatizovaný proces (např. GitHub Actions), který by spustil `npm run build` nebo `tsc --noEmit` nad každým Pull Requestem nebo commitem před sloučením do `main`.
2.  **Rozdíl mezi Dev a Prod:** Vývojáři pravděpodobně spoléhali na `npm run dev`, který je benevolentnější a často ignoruje typové chyby, které následně `npm run build` (v Dockeru) vyhodnotí jako fatální.
3.  **Chybějící lokální verifikace:** Změny nebyly lokálně otestovány příkazem pro produkční build před pushnutím.

## 3. Provedené řešení (Hotfix)
Jako dočasné řešení pro zprovoznění produkce byly provedeny přímé úpravy kódu na serveru:
*   Přidána kontrola existence proměnné (`AvatarIcon && <AvatarIcon ... />`).
*   Opraven název property `gradient` na `color`.
*   Změny byly commitnuty do `main` přímo z VPS (což je anti-pattern, ale v dané chvíli nutný pro obnovu služby).

## 4. Doporučení pro Architekta / Dokumentaci

Pro zamezení opakování tohoto scénáře navrhuji implementovat následující opatření:

### Priorita 1: Implementace CI Pipeline (Kritické)
Vytvořit soubor `.github/workflows/ci.yml`, který při každém PR a pushi do `main` provede:
```yaml
# Příklad kroku
- name: Check Types
  run: cd frontend && npm ci && npm run lint && npm run build
```
**Cíl:** Zabránit tomu, aby se nefunkční kód (který nelze zkompilovat) vůbec dostal do repozitáře.

### Priorita 2: Zpřísnění lokálního vývoje
Upravit `package.json` nebo `pre-commit` hooky (pomocí nástroje `husky`), aby vývojář nemohl commitnout kód, pokud neprojde TypeScript kontrolou.
*   Příkaz: `tsc --noEmit` (pouze kontrola typů, bez generování souborů).

### Priorita 3: Sjednocení prostředí
Zajistit, aby lokální vývojové prostředí reportovalo chyby stejně striktně jako produkční build.
*   V `tsconfig.json` ověřit nastavení `strict: true`.

### Závěr
Současný stav, kdy "Build serverem je produkční VPS", je neudržitelný. Je nutné přesunout validaci kódu co nejvíce "doleva" (Shift-Left Testing) – tedy k vývojáři nebo do CI procesu, nikoliv až na produkční server.
