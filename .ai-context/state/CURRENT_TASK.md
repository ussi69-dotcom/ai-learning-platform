# Agent State - Synchronized with MEMORY.md

## Current Status
- **Cycle:** 36 (Optimization & Stabilization)
- **Focus:** Developer Experience (DX) & Infrastructure Optimization
- **Last Action:** Completed visual fixes on `ABTestShowcase` and optimized Docker builds.

## 🏆 Recent Achievements
1.  **Visual & Functional Fixes (`ABTestShowcase.tsx`):**
    *   **Theming:** Komponenta plně respektuje Sith/Jedi přepínač (Red/Purple akcenty).
    *   **Identity:** Blue Team (Gemini) je nyní správně Modrý (Blue/Cyan), Red Team (Claude 4.5) Červený.
    *   **UX:** Implementován "Smart Auto-scroll". Interakce uživatele (scroll) pauzne přehrávání na 2s.
    *   **Syntax:** Opravena chyba parsování JS v lokalizačních řetězcích.

2.  **Infrastructure Optimization:**
    *   **Backend Dockerfile:** Přepsán na **Multi-stage build**. Produkční image neobsahuje `gcc` (menší, bezpečnější).
    *   **Makefile:** Přidán `Makefile` pro zjednodušení DX (`make up`, `make reset`, `make logs`).

3.  **Documentation:**
    *   `README.md` aktualizován o `make` příkazy.
    *   Jasné instrukce pro onboarding.

## 🚧 Active Issues
- Žádné kritické blokery. Platforma je stabilní.

## ⏭️ Next Actions
1.  **Feature Development:** Platforma je připravena na vývoj nových funkcí (nové lekce, gamifikace).
2.  **Deployment:** Zvážit nasazení na staging s novou optimalizovanou infrastrukturou.
3.  **Visual Check:** Ověřit, zda nové barvy v `ABTestShowcase` sedí i v reálném nasazení (Blue vs Purple v Light mode).

## 🧠 Context for Next Agent
- **Docker:** Backend používá `/opt/venv` v Dockeru. Pokud instaluješ nové balíčky, přidej je do `requirements.txt` a rebuildni (`make up`).
- **Dev Workflow:** Používej `make` příkazy. Je to rychlejší.
- **Content:** `ABTestShowcase` je hotový. Nesahej na něj, pokud není hlášen bug.
