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

# 🖥️ Environment Context (Smart Mode)
You are working in a WSL2 environment via VS Code/IDE.
1. **Check First**: Before running complex commands, check `uname -a` to see if you are already in Linux.
2. **Prefer Native**: If in Linux, run commands directly (e.g., `npm install`).
3. **Fallback Allowed**: If direct execution fails, you MAY use `wsl` wrappers or PowerShell if necessary to get the job done.
4. **Goal**: Completion is more important than method. If a command fails, try an alternative approach immediately.

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