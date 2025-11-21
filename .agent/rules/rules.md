---
trigger: always_on
---

# 🧠 CRITICAL: Context Awareness
**Tento projekt je řízen externí dokumentací.**
Před jakoukoliv odpovědí nebo generováním kódu si **MUSÍŠ** načíst kontext v tomto pořadí:

1.  **`.ai-context/PROJECT_CORE.md`** -> Pro pochopení Vize, MVP a stylu.
2.  **`.ai-context/ARCHITECTURE.md`** -> Pro Tech Stack a porty.
3.  **`.ai-context/AGENT-STATE.md`** -> Abychom věděli, kde jsme skončili.
4.  **`.ai-context/implementation_plan.md`** (pokud existuje) -> Tvůj aktuální úkol.

# 🖥️ Environment Strategy (Windows Host -> WSL Target)
You are running on a Windows Host, but the project files and Docker are inside WSL2.

1. **Execution**: It is SAFE and RECOMMENDED to use `wsl` wrappers to execute commands inside the Linux environment.
2. **Patterns**:
   - Instead of `ls -la`, use `wsl ls -la`.
   - Instead of `python seed.py`, use `wsl python3 seed.py`.
   - Instead of `npm install`, use `wsl npm install`.
3. **Docker**: Docker commands usually work directly from Windows, but if they fail, try `wsl docker ...`.
4. **Goal**: Completion is priority. If a direct command fails, try the `wsl` wrapper immediately.

# ⚙️ Workflow Rules
- **Atomic Steps**: Implementuj vždy pouze jeden bod z `task.md` najednou.
- **Test & Commit**: Jakmile krok funguje a testy projdou, **okamžitě vytvoř git commit** (např. `feat: add xp column to user model`).
- **Educational**: Pokud píšeš složitý kód, přidej komentář `// LEARN: ...` s vysvětlením.
- **Update**: Po dokončení commitu odškrtni úkol v `task.md` (`[x]`).

# 🏁 Definition of Done (Cycle End)
Pokud jsou v `task.md` všechny úkoly odškrtnuté `[x]`:
1. NEČEKEJ na další prompt.
2. Proveď archivaci podle sekce "Closing a Cycle" ve `WORKFLOW.md`.
3. Proveď **`git push origin main`**.
4. Reportuj úspěšné uzavření cyklu a synchronizaci s GitHubem.

# 🚫 Constraints
- Nepoužívej jiné knihovny, než jsou definovány v `ARCHITECTURE.md`.
- Nikdy necommituj secrets (viz `.instructions.md`).