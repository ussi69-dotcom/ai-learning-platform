📘 PRACTICAL PROMPT ENGINEERING — Intermediate (10 lekcí)
Projektové téma: „Become an AI Systems Engineer Padawan“
1) The Engineer’s Workbench Reloaded (praktické prostředí pro AI práci)

Trend potvrzen (YouTube/Reddit): Začátečníci mají chaos v nástrojích, chtějí “professional AI workflow”.
Obsah (krátce):

WSL2 / macOS setup

VS Code jako „AI console“ (rozšíření pro LLM)

Git jako backup promptů a experimentů

Prompt session logging + verzování

2) Anatomy of a Prompt (mezilekce mezi základy a experty)

Trend: Lidi zvládají základní prompting, ale nechápou prompt patterns ani prompt decomposition.
Obsah:

Co je prompt pattern, macro-prompt, templating

Chain of Thought vs Chain of Verification

Fail-first příklady: špatný prompt → analýza → fix

Edge cases (model bias, refusal handling)

3) Local AI Power-Up (LM Studio, Ollama, Llama 3.2, Gemma 2)

Trend: Extrémní zájem o lokální modely kvůli GDPR + výkonu.
Obsah:

Instalace LM Studio + Ollama side-by-side

Volba modelu podle úlohy (chat, extraction, reasoning, summarization)

Benchmark malého vs velkého modelu

Fail-first: lokální model halucinuje → fix pomocí prompt patterns

4) Reliability Engineering for Prompts (Promptfoo a alternativy)

Trend: Druhá největší bolest lidí po zvládnutí základů → nekonzistence modelů.
Obsah:

Metric-driven prompting

AB testování promptů

Jak tvořit eval datasety

Promptfoo vs G-Eval vs RapidEval (co je dnes nejlepší)

5) Structured Outputs (JSON Mode, Schemas, Extraction patterns)

Trend: Každý chce z chaosu udělat použitelná data.
Obsah:

JSON mode správně (včetně fail cases)

Přísné schéma (OAI + LM Studio pluginy)

Unstable patterns: jak je detekovat a opravovat

Extraction Lab: proměnit 10 chaotických dokumentů → tabulka

6) Tool-Oriented Prompting (jak psát prompt pro konkrétní nástroj)

Trend 2024/25: Zapier/Make/Notion/Slack mají své vlastní AI moduly → lidé neví, jak psát prompt pro konkrétní tool.
Obsah:

Čtení kontextu daného nástroje

Structure-first prompting

Error-handling prompting

Use case: AI inbox triage v Make

7) No-Code Automation: Make.com + Zapier + n8n (první integrace)

Trend: Nástup no-code orchestrátorů, nejvíc dotazů: “Jak propojit LLM s mým workflow”.
Obsah:

Porovnání Make vs Zapier vs n8n

GDPR rozdíly (EU context)

Hands-on: AI notifikace → triage → akce → logging

Fail-first: rozbitý workflow → debugging pomocí LLM

8) Self-Hosting for AI Users (Docker, docker-compose)

Trend: Exploze popularity místních AI služeb (LM Studio server, Ollama server, OpenWebUI).
Obsah:

Docker jako “AI server platform”

Nasazení OpenWebUI + Ollama jako lokální API

Best-practices pro 8GB/16GB RAM

Fail-first: container crash → fix + optimalizace

9) Orchestration: Build Your AI Workflow Brain (n8n)

Trend: Nejvíce žádaný skill — vytvořit vlastní AI agenta bez programování.
Obsah:

LLM as Router

LLM as Decision Engine

Context windows, memory, state

Hands-on: RSS analyst / sentiment engine

10) Capstone Mission: Personal AI Research Agent (Ollama + Search + n8n)

Trend: Exploze poptávky po „deep research assistants“.
Obsah:

Multi-step reasoning prompt

Scoring + verification

Combining multiple models (ensemble prompting)

Finální AI agent → 1-click research pack (PDF export, mindmap, summary)

Tvoje verze: 10 lekcí místo původních 8

Tady je finální přehled, jak to navazuje:

#	Lesson	Skill Level	Key Outcome
1	Workbench Reloaded	Intermediate warmup	Profesionální AI environment
2	Anatomy of a Prompt	Theory-heavy	Pokročilé prompt patterns
3	Local AI Power-Up	Practical	Lokální LLM workflow
4	Reliability Engineering	Scientific	Eval testování promptů
5	Structured Outputs	Practical	Datová extrakce → JSON
6	Tool-Oriented Prompting	Practical	Prompting pro Make/Zapier
7	No-Code Automation	Practical	Reálné AI automatizace
8	Self-Hosting	Technical	Docker AI stack
9	Orchestration	Advanced-practical	AI rozhodovací engine
10	Capstone: Research Agent	Finale	Vlastní agent + workflow