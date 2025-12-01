# 🧠 AI Learning Platform - MASTER CONTEXT

## 🚨 META INSTRUKCE PRO AI
**DŮLEŽITÉ:** Tento soubor je "živá paměť" projektu.
1. **Při startu:** Vždy si přečti tento kontext, abys věděl, kde jsme.
2. **Při změně:** Pokud dokončíme velký úkol, změníme architekturu nebo narazíme na zásadní problém, **navrhni aktualizaci tohoto souboru**.
3. **Zachování kontextu:** Nemazat existující obsah, pouze inkrementálně přidávat. **NIKDY nezkracovat** dlouhé sekce (např. osnovu) pomocí "...", pokud má uživatel přepsat celý soubor.
4. **Konvence názvů chatů:** Používej formát `AI Platform: Den x - [Téma]`.
5. **Krokování:** Postupujeme striktně krok po kroku. Pokud se uživatel pozastaví, nehrnu se dál.
6. **Manipulace se soubory:**
    - Vždy explicitně uveď: *"Tento kód nahrazuje celý obsah souboru X"* nebo přesně definuj blok.
    - **🛡️ Safe-Formatting:** Pokud kód obsahuje vnořené markdown bloky (např. v Python stringu), použij pro vnější obalení 4 zpětné uvozovky (````).
7. **Pravidelné Checkpointy:** Jakmile se nahromadí změny nebo poznatky, navrhni zápis do tohoto souboru, aby se nevytrácel postup.
8. **📝 Bezpečný Update Kontextu:** Při aktualizaci tohoto souboru instruuj uživatele, aby:
    - Přejmenoval starý soubor na `.old`.
    - Vytvořil nový soubor s kompletním obsahem.
    - Použil VS Code funkci "Compare Selected" pro ověření změn.
9. **Tracking Historie:** Nemazat stavy předchozích dnů. Přejmenovat starý "AKTUÁLNÍ STAV" na "STAV (Konec Dne X)" a přesunout do historie. Vytvořit nový "AKTUÁLNÍ STAV".
10. **🔄 Start-of-Day Sync:** Na začátku každé nové seance (nový Den) ověř aktuální stav kódu v repozitáři (pokud je dostupný nástroj), abychom navazovali na commitnutou verzi.
11. **💾 Git Hygiene Reminders:** Při každém checkpointu nebo na konci seance **VŽDY připomeň uživateli**, aby provedl `git commit` a `git push`. Uživatel se učí, proto uváděj **přesné příkazy** k provedení.
12. **📋 Šablona pro Next-Day Prompt:** Pokud jsi požádán o vygenerování promptu pro další den, VŽDY dodrž tuto strukturu:
    - **Role:** (Senior Full-Stack Mentor...)
    - **=== 🚨 KROK 1: NAČTENÍ KONTEXTU ===** (Instrukce k načtení `MASTER_CONTEXT.md` a `IDEAS.md` + Start-of-Day Sync).
    - **=== 📊 STARTING POINT (Konec Dne X) ===** (Stručný technický souhrn: co funguje Backend/Frontend/Infra).
    - **=== 🎯 CÍL PRO DNEŠEK (DEN Y): "[Téma]" ===** (Hlavní cíl + číslovaný seznam konkrétních kroků).
    - **Instrukce:** (Specifický pokyn, čím začít).

## 🎯 Vize a Filosofie
**Cíl:** Vytvořit 30-denní interaktivní platformu pro výuku AI developmentu.
**Metoda:** "Learning by Doing" & "Meta-Learning" – uživatel se učí tím, že staví platformu, kterou právě používá.
**Design:** KISS (Keep It Simple, Stupid), Vysoký kontrast (Dark text/Light bg), Funkčnost > Efekty.
**Cílová skupina:** Vývojáři, kteří chtějí přejít na AI engineering.

## 🏗️ Architektura & Tech Stack
- **Repo:** [https://github.com/ussi69-dotcom/ai-learning-platform](https://github.com/ussi69-dotcom/ai-learning-platform)
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
- **Docker:** `docker compose up -d` pro běh, `docker compose exec [service] [cmd]` pro příkazy.
- **DB Změny:** Při změně modelu (pokud nemáme Alembic) nutný "Hard Reset": `docker compose down -v` -> `docker compose up -d`.

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
- **Localhost vs Docker Networking:** Frontend v Dockeru nemůže volat `localhost:8000`. Musí volat `http://backend:8000` (nastaveno přes `OpenAPI.BASE`).
- **React `asChild` warning:** `Button` se Shadcn/ui nemůže mít `asChild` pokud je obalen v `Link`.

## 📜 Historie Stavů (Milestones)

### 🏁 STAV (Konec Dne 2)
**✅ HOTOVO:**
1. **Infrastruktura:** VPS běží, Docker orchestrace (FE, BE, DB, n8n) funguje.
2. **Backend:** Modely (User, Course, Lesson), API endpointy, Swagger UI.
3. **Frontend:** Homepage dynamicky stahuje kurzy. UI komponenty (Card, Button).
4. **Automation:** n8n běží a má přístup do databáze.
**⚠️ TECH DEBT:**
- Data vkládáme ručně přes Swagger (vyřešeno Dne 3).

### 🏁 STAV (Konec Dne 3)
**✅ HOTOVO:**
1. **Backend:**
    - DB Seeding (`seed.py`) automaticky plní kurzy a lekce.
    - Modely upraveny (`image_url` v Course, `video_url` v Lesson).
    - Opraveny importy a Pydantic schémata (`schemas.py`).
2. **Frontend:**
    - **Homepage:** Načítá kurzy z API (vyřešen problém s `localhost` vs `backend` URL).
    - **Detail Kurzu:** Dynamická routa `/courses/[id]`, zobrazuje seznam lekcí.
    - **Detail Lekce:** Dynamická routa `/lessons/[id]`, zobrazuje Video (YouTube embed) a Text (MDX Rendering).
    - Vygenerován API klient (`npm run generate-client`).

**⚠️ TECH DEBT:**
- Chybí tlačítka "Předchozí/Další" v lekci.
- Platby nejsou implementovány (Den 4).

---

## 📍 AKTUÁLNÍ STAV (Start Dne 4)
### 🎯 CÍL: Stripe Payments & Subscriptions
- Implementace platební brány Stripe.
- Omezení přístupu k lekcím (jen pro předplatitele).

## 🛠️ Build Log (Course Material)
*Záznam "Aha!" momentů a chyb pro tvorbu obsahu lekcí.*

### Den 3: Lesson Engine & Docker Networking
- **Lekce:** "Docker Networking pro začátečníky"
- **Problem (Connection Refused):** Frontend (SSR) nemohl načíst data z Backendu přes `localhost`.
    - **Řešení:** Vysvětlit rozdíl mezi `client-side` (browser -> localhost) a `server-side` (container -> container name). Nastavení `OpenAPI.BASE = "http://backend:8000"`.
- **Problem (DB Init):** `seed.py` padal, protože tabulky neexistovaly.
    - **Řešení:** Přidat `Base.metadata.create_all(bind=engine)` do `seed.py`.
- **Problem (MDX):** Jak zobrazit Markdown z DB?
    - **Řešení:** Knihovna `next-mdx-remote/rsc` pro Server Components.
- **Problem (Git Auth):** "Password authentication removed".
    - **Řešení:** Nutnost vygenerovat GitHub Personal Access Token (PAT) a použít ho místo hesla.
- **Problem (UI Composition):** Warning `React does not recognize the asChild prop`.
    - **Řešení:** Komponenta `Button` ze Shadcn UI nesnese `asChild`, pokud je obalená v `Link`. Řešením je odstranit `asChild` a nechat `Link` obalovat `Button`.
- **Problem (Dev Experience):** VS Code nevidí balíčky instalované jen v Dockeru (`next-mdx-remote`).
    - **Řešení:** Spustit `npm install` i lokálně, aby fungovalo IntelliSense.
- **Problem (Dynamic Routes):** `undefined` parametry.
    - **Řešení:** Pozor na Case Sensitivity! Složka `[courseId]` musí přesně odpovídat `params.courseId` v kódu. `[courseld]` (malé L místo I) je častý překlep.

## 📚 30-Denní Osnova (Core Curriculum)
*Základní osnova ("Let's Rock").*

### Week 1: Foundation (Základy & Infrastruktura)
- **Den 1:** Platform Setup (VPS, Docker, Next.js, FastAPI) ✅ *HOTOVO*
- **Den 2:** Core Data Flow & API (Databáze, Propojení FE/BE, n8n) ✅ *HOTOVO*
- **Den 3:** Lesson Engine (Dynamic routing, MDX rendering, Video player) ✅ *HOTOVO*
- **Den 4:** Stripe Payments (Subscription model) 🚧 *NEXT*
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