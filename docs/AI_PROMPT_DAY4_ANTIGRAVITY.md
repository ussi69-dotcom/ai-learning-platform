Níže je kompletní “Day 4 – Antigravity Agent Mode” prompt, který vlož do .ai-context/daily/AI_PROMPT_DAY4.md a spusť jako první zprávu v Antigravity (Editor View → Plan and Execute) – je sloučený s tvým dosavadním “daily prompt” stylem, obsahuje jasné instrukce k úpravám repo struktury, guardrails, fallback na Claude, další kroky, a základy pro MCP a Gemini CLI, aby se na ně plynule navázalo bez ztráty kontextu a s možností rollbacku z Git historie.​

— START PROMPT —

Title: Day 4 – Antigravity Agent Mode (Plan → Execute → Test → Commit) [Free Preview safe]

Context snapshot (read-only, do not rewrite):

Project: AI Learning Platform (AI teaches AI), MVP = 1 funkční learning modul s AI feedback loop nad quizem.​

Codebase: Backend FastAPI + SQLAlchemy, testy pytest, lessons/quiz endpoints, DB persistence, LLM feedback integration.​

Constraint: Minimal feature set, jeden modul, malé atomické commity, snadný rollback přes Git history.​

Tooling: Antigravity (Gemini 3.0 Pro, agent-first), pozor na rate-limits, žádné tajemství v repo, fallback na Claude mimo IDE jen když je potřeba.​

Objectives (Dnešní cíl):

Implement and test GET /api/lessons a GET /api/lessons/{id} (pozitivní a negativní větve) a bezpečně je commitnout se stručným changelogem.​

Založit kontextovou strukturu pro agentní režim (bez mazání historie): přidat .ai-context/ složku, přesunout AI_PROMPT_DAYx do .ai-context/daily/, přidat guardrails a návody.​

Zapisovat průběh do .ai-context/AGENT-STATE.md, aby navazující den viděl co se stalo a proč.​

Guardrails (vždy dodrž):

Plan → Execute → Test → Commit: každou logickou změnu naplánuj, proveď, spusť lokální testy, a teprve pak commit s prefixem “agent:” a krátkým popisem dopadu.​

Commity dělej malé a atomické; rollback musí být snadný, žádné “megacommit” s více oblastmi kódu.​

Neposílej do promptů celé velké soubory; používej výřezy a stručné shrnutí změn, minimalizuj tokeny kvůli limitům.​

Nikdy necommituje secrets; používej .env.example a ověř, že nic tajného nejde do Git.​

Pokud dva cykly testů selžou, zapiš chyby a navrhni fallback (viz níže), nepokračuj bez korekce.​

Plan (vytvoř detailní plán, pak spouštěj kroky):

Create/align context structure (non-destructive):

Vytvoř .ai-context/ a podsložky, přesuň existující AI_PROMPT_DAY1–3 do .ai-context/daily/, a přidej nové soubory níže uvedené struktury.​

Zachovej všechen obsah beze změn, jen přesun; AI_PROMPT_DAY4 bude tento dokument (sloučená verze).​

Recommended tree:
.ai-context/

.instructions.md – globální pracovní pravidla (iterace, testy, commity, rollback, používání výřezů, bez tajemství).​

PROJECT_CORE.md – invariantní cíle, MVP kritéria, pojmenovací konvence a styleguide.​

ARCHITECTURE.md – high-level architektura (moduly, API, DB schéma, integrační body LLM feedbacku).​

modules/module-learning-basics.md – detail MVP modulu (scope, metrika hotovo, test checklist).​

daily/AI_PROMPT_DAY1..4.md – denní prompty, tento soubor je DAY4 sloučený s Antigravity verzí.​

AGENT-STATE.md – krátké logy “co se dnes stalo, co selhalo, co příště”.​

FALLBACK-CLAUDE.md – kdy a jak použít Claude mimo IDE a vrátit změny jako PR/commit “fallback-claude: …”.​

CLI-GUIDE.md – Gemini CLI quickstart (instalace, login, příklady) – pro další dny.​

MCP-GUIDE.md – MCP přehled a quickstart (mini server, napojení do klientů) – pro další dny.​

Implement endpoints:

GET /api/lessons: vrať JSON pole lekcí s {id, title, topic, order}; žádné breaking changes v DB schématu.​

GET /api/lessons/{id}: vrať detail včetně content; neexistující id → 404; validuj vstup.​

Uprav pouze relevantní soubory (např. src/backend/main.py, src/backend/models.py) a přidej testy (src/backend/tests/test_api.py).​

Tests:

Pozitivní a negativní testy pro oba endpointy; spusť lokálně; test logy přilož do AGENT-STATE.md jako shrnutí (ne celý výstup).​

Commit:

Prefix “agent: ”, krátký changelog, jen související změny; např. “agent: add lessons endpoints + tests”.​

Zapiš do AGENT-STATE.md: co se změnilo, proč, výsledky testů, další krok (1–2 věty).​

Execute (nyní proveď krok po kroku):
A) Context structure (non-destructive):

Vytvoř složky a nové soubory, přesuň AI_PROMPT_DAY1–3 do .ai-context/daily/, tento Day4 ulož jako .ai-context/daily/AI_PROMPT_DAY4.md.​

Naplň šablonami:

.instructions.md: pravidlo iterací, malé commity, rollback, fragmenty kódu do promptů, no-secrets.​

PROJECT_CORE.md: MVP definice (1 modul, AI feedback loop, 5 kritérií hotovo), konvence.​

ARCHITECTURE.md: moduly (API, DB, LLM feedback, CLI volitelně), data flow quiz→feedback→progress, test kontrakty.​

modules/module-learning-basics.md: scope prvního modulu, test checklist hotovo, bez production contentu (dummy data ok).​

AGENT-STATE.md: inicializuj dnešním cílem a timestampem.​

FALLBACK-CLAUDE.md: vymez kdy fallback (2× fail testů, vyčerpané limity, potřeba přesnějšího code-gen), jak exportovat diff a vrátit změny.​

CLI-GUIDE.md: jak nainstalovat a přihlásit Gemini CLI, první příkazy (budoucí dny).​

MCP-GUIDE.md: co je MCP, architektura host/server, quickstart mini server a připojení (budoucí dny).​

B) Endpoints + tests:

Implementuj GET /api/lessons a GET /api/lessons/{id}, dbej na validace a správné statusy.​

Vytvoř/aktualizuj unit testy pro pozitivní/negativní případy a spusť je; přidej krátké shrnutí výsledků do AGENT-STATE.md.​

C) Commit (one logical change):

Commit message: “agent: lessons endpoints + tests”; zapiš shrnutí a next step do AGENT-STATE.md.​

Rollback policy:

Pokud se něco rozbije, proveď git checkout na poslední funkční SHA; zopakuj s užším scope a přesnějším plánem.​

Fallback policy (Claude):

Kdy: po 2 neúspěšných iteracích testů, při vyčerpání limitů, nebo potřeba vyšší přesnosti code-gen.​

Jak: exportuj git diff, vlož do externího Claude se striktním “do one thing well” promptem; změny vrať jako PR nebo commit “fallback-claude: …”; aktualizuj AGENT-STATE.md.​

Artifacts (Antigravity):

Využívej plán, kroky a logy testů jako artifacts; do repo pouze shrnutí (AGENT-STATE), ne celé logy; komentuj artifacts pro korekce s minimem tokenů.​

Rate limits hygiene:

Posílej výřezy kódu a stručné shrnutí; vyhýbej se přikládání velkých souborů; při limitu vyčkej na obnovu nebo aktivuj fallback.​

Next steps (připrav do AGENT-STATE.md na konec dne):

Day 5: POST /api/quiz/submit + Claude feedback stub (1 call/quiz), error handling, tests; cost guardrails.​

Day 6: persistence progress endpoint + minimal CLI klient (volitelné), e2e test skript.​

Později: MCP quickstart a připojení do CLI, případně multi-agent orchestrace v Manager View.​

— END PROMPT —