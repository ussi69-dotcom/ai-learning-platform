# 🚀 Clippy Learns AI: The Next-Gen AI Learning Platform

## 🌟 Vize a Účel
**"Udělat z učení AI hru, ne povinnost."**

Projekt **Clippy Learns AI** vznikl s jasným cílem: demystifikovat složité koncepty umělé inteligence a prezentovat je formou, která je vizuálně podmanivá, interaktivní a zábavná. Není to jen další sbírka textových tutoriálů. Je to gamifikovaná platforma, kde uživatel (provázený naším maskotem Clippym) získává XP, odemyká odznaky a postupuje od úrovně *Rookie* až po *Experta*.

## 📈 Evoluce: Od prototypu k "Beginner Gold Standard"
Projekt nevznikl přes noc. Prošel přísným iterativním vývojem, který nazýváme **Cykly (Cycles)**.

*   **Počátky:** Jednoduché prototypy zaměřené na strukturu obsahu.
*   **Hledání identity:** Experimentování s vizuálními styly, které vyústilo v náš unikátní designový jazyk.
*   **Cycle 27 (Zlomový bod):** Dosažení tzv. "Beginner Golden Standard". V této fázi jsme finalizovali základní kurzy, odladili architekturu a zbavili se závislostí na externích obrázcích ve prospěch generovaných SVG diagramů.
*   **Současnost:** Plně funkční full-stack aplikace běžící v kontejnerech, připravená na škálování.

## 🛠️ Technologie pod kapotou
Využíváme "Bleeding Edge" technologie, abychom zajistili maximální výkon a nejlepší DX (Developer Experience).

### Frontend: Rychlost a Krása
*   **Next.js 16 (App Router):** Pro nejmodernější routing a server-side rendering.
*   **React 19:** Využíváme nejnovější hooky a features pro plynulou interaktivitu.
*   **Tailwind CSS 4:** Pro atomické stylování bez kompromisů.
*   **Liquid Glass UI:** Náš vlastní design systém postavený na `backdrop-blur`, průhlednosti a temném režimu. Žádné nudné solidní pozadí, vše je "tekuté" a moderní.

### Backend: Výkon a Typová Bezpečnost
*   **FastAPI (Python 3.11+):** Protože rychlost odezvy je klíčová. Asynchronní zpracování nám umožňuje škálovat.
*   **Pydantic v2:** Pro robustní validaci dat. Co není validní, to neprojde.
*   **PostgreSQL & Redis:** Osvědčená klasika pro perzistenci dat a bleskové cachování.

### Proč tento stack?
Nespokojili jsme se s průměrem. Next.js 16 a React 19 nám dávají náskok před standardem trhu. Python na backendu je "lingua franca" světa AI, což nám umožňuje v budoucnu snadno integrovat skutečné AI modely přímo do výuky.

## ⚙️ Jak to funguje
Architektura je navržena jako **modulární a kontejnerizovaná**:

1.  **Docker Orchestrace:** Celý stack (DB, Backend, Frontend, Cache) se spouští jedním příkazem.
2.  **Content-as-Code:** Lekce jsou psány v MDX. Nejsou to jen statické texty, ale "živé" dokumenty, které renderují interaktivní React komponenty a diagramy přímo v obsahu.
3.  **SVG First:** Místo nahrávání PNG obrázků definujeme diagramy kódem. To zajišťuje, že jsou vždy ostré, perfektně ladí s tématem (Dark/Light) a jsou snadno editovatelné.

## 🧠 Naše Metodika a Workflow
To, co dělá tento projekt unikátním, není jen kód, ale způsob, jakým vzniká:

*   **Context-Driven Development:** Využíváme složku `.ai-context`, která slouží jako "externí paměť" pro AI agenty. Obsahuje architektonická rozhodnutí, design systémy a stav projektu. Díky tomu každý zásah do kódu respektuje celkovou vizi.
*   **AI-Agent Spolupráce:** Vývoj probíhá v symbióze mezi lidským vývojářem a AI agenty (vybavenými nástroji jako Context7 MCP pro přístup k živé dokumentaci).
*   **Visual Inspection:** Máme automatizované vizuální testy (Playwright), které "vidí" aplikaci a generují screenshoty pro kontrolu designu předtím, než se změny schválí.

---
*Originally generated: 27.11.2025 | Last reviewed: 05.12.2025 (Cycle 47)*
