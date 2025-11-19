# 🧠 AI Learning Platform - MASTER CONTEXT

## 🚨 META INSTRUKCE PRO AI
**DŮLEŽITÉ:** Tento soubor je "živá paměť" projektu.
1. **Při startu:** Vždy si přečti tento kontext, abys věděl, kde jsme.
2. **Při změně:** Pokud dokončíme velký úkol, změníme architekturu nebo narazíme na zásadní problém, **navrhni aktualizaci tohoto souboru**. Udržuj ho aktuální pro příští seanci.

## 🎯 Vize a Filosofie
**Cíl:** Vytvořit 30-denní interaktivní platformu pro výuku AI developmentu.
**Metoda:** "Learning by Doing" & "Meta-Learning" – uživatel se učí tím, že staví platformu, kterou právě používá.
**Design:** KISS (Keep It Simple, Stupid), Vysoký kontrast (Dark text/Light bg), Funkčnost > Efekty.
**Cílová skupina:** Vývojáři, kteří chtějí přejít na AI engineering.

## 🏗️ Architektura & Tech Stack
- **Infrastruktura:** VPS Hetzner CPX32 (IP: 46.224.37.64), Ubuntu 24.04 LTS.
- **Kontejnerizace:** Docker, Docker Compose (v2).
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Shadcn/ui (custom).
    - Port: 3000
- **Backend:** FastAPI (Python 3.11), Pydantic v2, SQLAlchemy (Sync).
    - Port: 8000, Docs: /docs (Swagger UI)
- **Databáze:** PostgreSQL 15 (Port: 5432).
- **Cache/Queue:** Redis 7 (Port: 6379).
- **Automation:** n8n (Port: 5678, propojeno s DB).
- **Dev Tools:** VS Code (WSL2), Git, OpenAPI Generator (`openapi-typescript-codegen`).

## 🛠️ Workflow & Best Practices
- **Git:** Používáme Feature Branches. Do `main` jde jen funkční kód.
- **Versioning:** Tagujeme funkční milníky (např. `v0.2-day2-complete`).
- **Backup:** Kód na GitHubu. Data v DB nutno zálohovat (`pg_dump`) před destruktivními změnami.
- **Dokumentace:** Udržujeme tento soubor a `IDEAS.md` aktuální.

## 📜 Historie Vývoje & Lessons Learned (Context Memory)
### Co fungovalo (Best Practices)
- **Multi-stage Docker builds:** Redukce image (FE ~200MB, BE ~180MB).
- **Docker Compose Orchestrace:** Definice `depends_on` a healthchecks pro DB.
- **VS Code + WSL2:** Přechod z terminálu do VS Code zrychlil vývoj.
- **Generování klienta:** `openapi-typescript-codegen` udržuje FE a BE v synchronizaci.

### Co nefungovalo (Pastem a Fixy)
- **Heredoc v terminálu:** Rozbíjel formátování -> Píšeme kód ve VS Code.
- **Docker Compose verze:** Konflikt v1/v2 -> Sjednoceno na `docker compose` (v2 plugin).
- **Next.js Standalone:** Vyžaduje Node 20+ (upgradován Dockerfile).
- **DB Persistence (CRITICAL):** Docker Volumes držely staré heslo. Při změně hesla v `.env` je nutný reset: `docker compose down -v`.
- **Pydantic Email:** Chyběl `email-validator` -> Doplňeno do `requirements.txt`.
- **Backend Importy:** Nutná struktura `backend/app/main.py` s `__init__.py`.

## 📍 AKTUÁLNÍ STAV (Konec Dne 2)
### ✅ HOTOVO:
1. **Infrastruktura:** VPS běží, Docker orchestrace (FE, BE, DB, n8n) funguje.
2. **Backend:** Modely (User, Course, Lesson), API endpointy, Swagger UI.
3. **Frontend:** Homepage dynamicky stahuje kurzy. UI komponenty (Card, Button).
4. **Automation:** n8n běží a má přístup do databáze.

### ⚠️ TECH DEBT:
- Data vkládáme ručně přes Swagger (potřebujeme Seed Script).
- Next.js warning `url.parse()` (zatím ignorujeme).

## 📚 30-Denní Osnova (Core Curriculum)
*Základní osnova ("Let's Rock").*

### Week 1: Foundation (Základy & Infrastruktura)
- **Den 1:** Platform Setup (VPS, Docker, Next.js, FastAPI) ✅ *HOTOVO*
- **Den 2:** Core Data Flow & API (Databáze, Propojení FE/BE, n8n) ✅ *HOTOVO*
- **Den 3:** Lesson Engine (Dynamic routing, MDX rendering, Video player) 🚧 *AKTUÁLNÍ*
- **Den 4:** Stripe Payments (Subscription model)
- **Den 5:** OpenAI API Integration (První AI featury)
- **Den 6:** Vector Database (Pinecone/Weaviate/Chroma)
- **Den 7:** Week 1 Review + Mini Project

### Week 2: AI Core (LLMs & RAG)
- **Den 8:** LangChain Basics
- **Den 9:** RAG (Retrieval Augmented Generation)
- **Den 10:** Prompt Engineering
- **Den 11:** Fine-tuning Models
- **Den 12:** AI Agents
- **Den 13:** Multi-modal AI
- **Den 14:** Week 2 Review

### Week 3: Advanced (Media & ML Ops)
- **Den 15:** Stable Diffusion
- **Den 16:** Whisper (Speech-to-Text)
- **Den 17:** ElevenLabs (Text-to-Speech)
- **Den 18:** Computer Vision
- **Den 19:** ML Deployment
- **Den 20:** Model Monitoring
- **Den 21:** Week 3 Review

### Week 4: Production (SaaS & Scale)
- **Den 22:** Kubernetes Basics
- **Den 23:** CI/CD Pipelines
- **Den 24:** Monitoring (Prometheus)
- **Den 25:** Security Best Practices
- **Den 26:** Performance Optimization
- **Den 27:** Cost Optimization
- **Den 28:** Documentation
- **Den 29:** Final Project Integration
- **Den 30:** Launch + Retrospective

## 💡 Kontext pro AI Asistenta
Tento soubor slouží jako paměť projektu. Při každém novém chatu nahraj tento obsah.