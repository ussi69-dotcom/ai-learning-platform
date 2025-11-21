# 🔄 AI Development Workflow (Human-in-the-Loop)

Tento dokument definuje, jak spolupracují Lead Developer (User), Architekt (Gemini) a Coder (Antigravity).

## 🎭 Role a Odpovědnosti

### 1. 👨‍💻 User (Lead Developer & Bridge)
* **Role:** Řídí projekt, schvaluje změny, spouští CI/CD (testy), učí se.
* **Vstup:** Myšlenka/Feature Request -> Zadává Gemini.
* **Akce:**
    * Spouští `python scripts/context_builder.py` pro start seance.
    * Přenáší plány (`task.md`) od Gemini k Antigravity.
    * Přenáší dotazy na vysvětlení od Antigravity k Gemini.
    * Provádí Code Review a finální `git commit` / `push`.

### 2. 🧠 Gemini (Architekt & Učitel & Content)
* **Role:** Drží vizi (`PROJECT_CORE.md`), navrhuje architekturu, generuje obsah (texty, data) a udržuje `HISTORY.md`.
* **Vstup:** Kontext z `context_builder.py` + Hrubá představa Usera.
* **Výstup:**
    * Aktualizace `.ai-context/implementation_plan.md` (Technický návrh).
    * Aktualizace `.ai-context/task.md` (Checklist pro Antigravity).
    * Aktualizace `.ai-context/HISTORY.md` (Strategická paměť).
* **Cíl:** Zajistit, aby kód dával smysl dlouhodobě a User se u toho učil.

### 3. ⚡ Antigravity (Coder & Dělník)
* **Role:** Implementuje kód, píše testy, opravuje bugy.
* **Vstup:** `.ai-context/implementation_plan.md` a `.ai-context/task.md`.
* **Výstup:** Funkční kód, Unit Testy, aktualizovaný `AGENT-STATE.md`.
* **Omezení:** Nevymýšlí nové features mimo plán.

---

## 🔄 The Cycle (Jak jedeme)

1.  **Start (User + Gemini):**
    * User spustí: `python scripts/context_builder.py`.
    * User vloží kontext do Gemini: "Startujeme Cyklus X".
    * Gemini připraví `implementation_plan.md` a `task.md`.

2.  **Execution (Antigravity):**
    * User (v IDE): "Postupuj podle plánu. Začni bodem 1."
    * Antigravity: Kóduje -> Testuje -> Commituje po každém kroku.

3.  **Review & Content (User + Gemini):**
    * Pokud je potřeba text/obrázky, User žádá Gemini.
    * Gemini generuje obsah do souborů v `content/`.

4.  **Completion (Antigravity):**
    * Všechny úkoly v `task.md` jsou splněny (`[x]`).
    * Antigravity provede `git push`.

---

## 🏁 Closing a Session (The Handover)

Abychom mohli příště plynule navázat, musíme na konci seance provést tento rituál:

1.  **Update History (Gemini):**
    * User vyzve Gemini: *"Ulož dnešní progress do HISTORY.md"*.
    * Gemini shrne strategická rozhodnutí a "Aha!" momenty do `.ai-context/HISTORY.md`.

2.  **Archive Cycle (Antigravity/User):**
    * Hotový `implementation_plan.md` a `task.md` se přesune do `.ai-context/completed_cycles/`.
    * Soubory se vyčistí pro další den.

3.  **Context Freeze:**
    * Stav je nyní bezpečně uložen v souborech (`HISTORY`, `AGENT-STATE`, `completed_cycles`).
    * Příště stačí jen spustit `context_builder.py` a jsme zpět v obraze.

---

## 📂 Soubory pro předávání kontextu (The Interface)

* **`PROJECT_CORE.md`**: Vize, MVP definice (čte každý).
* **`HISTORY.md`**: Strategická paměť a deník rozhodnutí (zapisuje Gemini).
* **`AGENT-STATE.md`**: Technický stav a log změn (zapisuje Antigravity).
* **`implementation_plan.md`**: Detailní technický návod (PRO Antigravity OD Gemini).
* **`task.md`**: Odškrtávací seznam úkolů (Antigravity si zde vede status).