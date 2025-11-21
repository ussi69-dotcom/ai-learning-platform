# 🔄 AI Development Workflow (Human-in-the-Loop)

Tento dokument definuje, jak spolupracují Lead Developer (User), Architekt (Gemini) a Coder (Antigravity).

## 🎭 Role a Odpovědnosti

### 1. 👨‍💻 User (Lead Developer & Bridge)
* **Role:** Řídí projekt, schvaluje změny, spouští CI/CD (testy), učí se.
* **Vstup:** Myšlenka/Feature Request -> Zadává Gemini.
* **Akce:**
    * Přenáší plány (`task.md`) od Gemini k Antigravity.
    * Přenáší dotazy na vysvětlení ("Proč jsi to udělal takhle?") od Antigravity k Gemini.
    * Provádí Code Review a finální `git commit`.
* **Cíl:** Rozumět tomu, co se děje, ne jen klikat "Accept".

### 2. 🧠 Gemini (Architekt & Učitel & Content)
* **Role:** Drží vizi (`PROJECT_CORE.md`), navrhuje architekturu, generuje obsah (texty, data).
* **Vstup:** Hrubá představa Usera ("Chci gamifikaci").
* **Výstup:**
    * Aktualizace `.ai-context/implementation_plan.md` (Technický návrh).
    * Aktualizace `.ai-context/task.md` (Checklist pro Antigravity).
    * Vysvětlení konceptů pro Usera.
* **Cíl:** Zajistit, aby kód dával smysl dlouhodobě a User se u toho učil.

### 3. ⚡ Antigravity (Coder & Dělník)
* **Role:** Implementuje kód, píše testy, opravuje bugy.
* **Vstup:** `.ai-context/implementation_plan.md` a `.ai-context/task.md`.
* **Výstup:** Funkční kód, Unit Testy, aktualizovaný `AGENT-STATE.md`.
* **Omezení:** Nevymýšlí nové features mimo plán. Pokud narazí na nejasnost, ptá se (přes Usera).

---

## 🔄 The Cycle (Jak jedeme)

1.  **Briefing (User + Gemini):**
    * User: "Chci přidat [Feature X]."
    * Gemini: Zanalyzuje kontext, vytvoří `implementation_plan.md` a `task.md`.

2.  **Handoff (User -> Antigravity):**
    * User (v IDE): "Postupuj podle `.ai-context/implementation_plan.md`. Začni bodem 1."

3.  **Execution (Antigravity):**
    * Čte plán -> Píše kód -> Píše test -> Spouští test.
    * **Rule:** Ke složitému kódu píše vysvětlující komentáře (pro Usera).

4.  **Review & Learn (User + Antigravity/Gemini):**
    * User koukne na změny. Pokud něčemu nerozumí, ptá se Gemini.
    * User spustí aplikaci a ověří funkčnost.

5.  **Commit & Sync:**
    * User: `git commit -m "feat: ..."`
    * Antigravity: Aktualizuje `AGENT-STATE.md` (Log).

---

## 📂 Soubory pro předávání kontextu (The Interface)

* **`PROJECT_CORE.md`**: Vize, MVP definice (čte každý).
* **`AGENT-STATE.md`**: Kde jsme skončili (čte každý na začátku).
* **`implementation_plan.md`**: Detailní technický návod PRO Antigravity OD Gemini.
* **`task.md`**: Odškrtávací seznam úkolů pro aktuální cyklus.

## 🏁 Closing a Cycle (Definition of Done)

Jakmile jsou všechny body v `task.md` splněny (✅):

1.  **Archive:**
    * Vytvoř nový soubor: `.ai-context/completed_cycles/cycle_[XX]_[name].md`.
    * Do něj zkopíruj obsah `implementation_plan.md` a finálního `task.md`.
    * Přidej hlavičku s datem dokončení.

2.  **Reset:**
    * Vymaž obsah `implementation_plan.md` (připrav pro další cyklus).
    * Vymaž obsah `task.md` (reset na prázdný checklist).

3.  **Notify:**
    * Oznam Userovi: "Cycle [XX] completed and archived. Ready for next instructions."