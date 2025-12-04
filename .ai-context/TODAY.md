[  ] Procesy, dokumentace, vse uz hraje? Potrebuju abys jel maximalne efektivne, drzel se postupu a ja mel prehled, jestli nepouzivas rules.md, ktere byly pro Gemini.cli a Antigravity, vytahni z nich, co se hodi pro nasi spolupraci a dopln si asi do claude.md?
[  ] Efektivita kodu, soubory, duplicity, nezaciname mit zas monoliticky files, zombies, nechce kod reforge? Jedeme podle best practices, nebo nerozjizdi se nam nejaky gap, ktery nas pozdeji dozene? Neco jeste zapsat do instrukci a zacit pravidelne delat drive, nez pozdeji?
[  ] Technologicky, neco co by nam pomohlo ted, nebo pozdeji? Nejaky clanek do techstack, nebo mcp co by pomohl, kus kodu co se osvedcil, jiny oblibeny github projekt, kde bychom si neco vypujcili?
[  ] Multiple sgents. Zaprahnout do procesu vice tvych subagents a delegovat? Pravidelne blueteam/ redteam cviceni. QA ? Zaprahnout gemini jako agenta na generovani a setrit prompty?
[  ] Beginner kurzy reforge k dokonalosti! Nez se vrhneme do dalsich obtiznosti, chci je mit PERFEKTNI!! Vyladili jsme titulni stranu a aboutpage, nezaostavaj ted obsahove vizualne kurzy samotne? Nejake navrhy? Obsahove sedi s cilem postupne dostavat do tematiky? Zvladnutelne i pro novacky, ale zabavi i pokrocilejsi? Splni ucel v souladu s nasi strategii (postupny learning curve) a jejich stavajici slozeni zapada do celku kurzu a pripravi na dalsi obtiznost? Jsou profesionalni? Nejsou moc kratke? (vize byla, ze ma jit o dailly skoleni) Youtube videa k nim sedi? Nedavat k nim nejake dalsi zdroje, vic tipu a zajimavosti, vic vizualizaci A PRIROVNANI? Jak lokalizovat youtube videa do CZ? LABY jsou podle me ted trapne a soucasne AI neznaji limity soucasnych AI, co s tim? Lab "co mam dnes za tricko" je vyslovene trash!
[  ] Ai helper v kurzech, nejake free api? Nerbo je legitimni na to zaregistrovat nejakou sadu uctu? Kontext v kurzu jako jeho RAG, automaticky predvyplnene keypoits z aktualni strany/lekce k rozvedeni, pokec o problematice, pomoc s aktualnim LAB

## 🤖 Doporučení od Antigravity (pro Claude CLI)

### 1. Procesy & Pravidla
- **`rules.md` je klíč:** Soubor `.agent/rules/rules.md` existuje a je v `CLAUDE.md` referencován. **Důsledně ho dodržuj.**
- **Atomicita:** "Atomic Steps" a "Test & Commit" jsou kritické. Nedělej obří změny najednou.
- **Context Awareness:** Vždy aktualizuj `LAST_SESSION.md` a `CURRENT_TASK.md`.

### 2. Code Quality (Reforge)
- **Monolity:** Zkontroluj `backend/app/main.py` a větší frontend komponenty. Pokud rostou, rozbij je na menší moduly/hooky.
- **Zombies:** Pokud narazíš na nepoužívaný kód (např. staré experimenty v `scripts/`), navrhni smazání nebo archivaci.
- **Tests:** Pozor na externí služby! V `backend/tests/test_auth.py` jsme museli mockovat email service. **Vždy mockuj SMTP/API volání v testech.**

### 3. Content (Beginner Kurzy)
- **Audit:** Projdi `content/courses/ai-basics-beginner`. Jsou lekce vizuálně atraktivní?
- **Visuals:** Používej `<Diagram>` komponenty místo statických obrázků, kde to jde.
- **Labs:** "Co mám dnes za tričko" je trash. Navrhni laby, které ukazují *skutečnou* sílu AI (např. sentiment analysis, simple classification), ale jsou zvládnutelné pro začátečníky.

### 4. AI Helper
- **MVP:** Nemusíme hned integrovat live LLM API.
- **Low-Hanging Fruit:** Do `meta.json` každé lekce přidej pole `ai_hints` nebo `key_takeaways`. Frontend to může zobrazovat jako "AI Asistenta", který "analyzoval" lekci. Je to levné, rychlé a efektivní.
