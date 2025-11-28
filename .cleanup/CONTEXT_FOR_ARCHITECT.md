<!-- Generated: 2025-11-28 00:15:35 -->

# 🧠 AI Learning Platform - Complete Context

> **Pro AI agenty (Claude, Perplexity, Gemini):**  
> Tento dokument obsahuje kompletní kontext projektu. Načti si ho CELÝ před zahájením práce.

---

## 📋 Jak používat tento kontext

### 1. **Priorita dokumentace**
Při konfliktech informací platí následující priorita:
1. **rules.md** - Workflow pravidla, constraints, testing strategie
2. **CONTENT_GUIDELINES.md** - Design system ("Liquid Glass"), UI komponenty
3. **PROJECT_CONTEXT.md** - Tech stack, porty, základní pravidla
4. **ARCHITECTURE.md** - Detaily technologií a závislostí
5. **WORKFLOW.md** - Development proces a git standardy
6. **STRATEGY.md** - Long-term vision a curriculum

### 2. **Pracovní postup**
Při každém úkolu:
1. **Načti relevantní kontext** z níže uvedených souborů
2. **Zkontroluj rules.md** pro workflow constraints a testing requirements
3. **Ověř aktuální stav** v AGENT-STATE.md (jaký cyklus běží, co je hotovo)
4. **Navrhni řešení** v souladu s CONTENT_GUIDELINES.md a ARCHITECTURE.md
5. **Implementuj** podle WORKFLOW.md (git standardy, atomic commits)
6. **Test** podle rules.md (npm build, pytest, manual verification)
7. **Aktualizuj** AGENT-STATE.md po dokončení

### 3. **Klíčová pravidla** (viz rules.md pro detaily)

#### 🎨 Design & UI
- **Design System:** "Liquid Glass" - glassmorphism, backdrop-blur, NO solid backgrounds
- **Komponenty:** Vždy použij existující z `frontend/components/` (ConceptCard, Diagram, Callout, LabSection)
- **Barevné schema:** OKLCH colors, Star Wars inspired (Jedi/Sith themes)
- **Typography:** Inter font, heading hierarchy (h2 → h6, NO h1)

#### 🛠️ Development
- **Environment:** WSL2 - používej NATIVE Linux příkazy (ne `wsl npm install`)
- **Docker:** Preferovaný způsob spouštění (`docker compose up -d`)
- **Database:** After schema changes = `docker compose down -v && up --build`
- **Paths:** Linux paths ONLY (`/home/user/...`, ne `C:\Users\...`)

#### 📝 Content
- **Format:** MDX (Markdown + React komponenty)
- **Struktura lekce:** Header → Mission Goal → Sections → Quiz → Summary
- **Diagrams:** SVG-first approach, CSS diagramy preferovány
- **Star Wars theme:** All content má Star Wars analogie (Jedi, Sith, holocrons, etc.)

#### 🧪 Testing (KRITICKÉ - viz rules.md)
- **Before commit:** Run `npm run build` (frontend) a `pytest` (backend)
- **Visual verification:** Playwright scripts v `visual_tests/`
- **Manual:** Otestuj v prohlížeči dark mode + mobile viewport
- **NEVER commit broken code** or placeholder TODOs

---

## 📂 Struktura kontextových souborů

Následující soubory tvoří "paměť" projektu:

0. **rules.md** - AI agent pravidla (workflow, constraints, testing, commit standards)
1. **PROJECT_CONTEXT.md** - Tech stack, porty, design philosophy
2. **CONTENT_GUIDELINES.md** - Pravidla pro tvorbu lekcí, UI komponenty, "Liquid Glass"
3. **ARCHITECTURE.md** - Detailní popis technologií (Next.js 16, FastAPI, Docker)
4. **STRATEGY.md** - Curriculum strategie, difficulty levels, learning path
5. **WORKFLOW.md** - Development workflow, git, visual inspection
6. **AGENT-STATE.md** - Aktuální stav (cykly, milníky, co je hotovo)
7. **IDEAS.md** - Backlog funkcí a nápadů

---

## 🔧 Kritické informace (Quick Reference)

### Porty & Služby
- **Frontend:** `http://localhost:3000` (Next.js 16 + Turbopack)
- **Backend:** `http://localhost:8000` (FastAPI, Swagger: `/docs`)
- **Database:** `localhost:5432` (PostgreSQL 15)
- **Default Login:** `admin@ai-platform.com` / `admin123`

### Klíčové příkazy
```bash
# Spuštění projektu
docker compose up -d

# Reset databáze (po změnách v models.py)
docker compose down -v && docker compose up -d --build

# Restart jednotlivých služeb
docker compose restart backend  # Po změně content/
docker compose restart frontend # Po změně globals.css

# Testy (BEFORE EVERY COMMIT)
cd frontend && npm run build  # TypeScript check
cd backend && pytest          # Unit testy
```

### Tech Stack (krátce)
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind 4, Shadcn/ui
- **Backend:** FastAPI, SQLAlchemy, Pydantic v2, JWT auth
- **Database:** PostgreSQL 15, Redis (cache)
- **Content:** MDX via `next-mdx-remote`
- **Containerization:** Docker Compose

---

## 📖 Kontext Files (Kompletní obsah níže)



======================================================================
## 🤖 AGENT RULES & WORKFLOW
Path: `.agent/rules/rules.md`
======================================================================

---
trigger: always_on
---

# 👨‍💻 Agent Role & Identity

You are **Antigravity**, an autonomous senior software engineer working on a premium open-source AI learning platform.

## Your Characteristics:
- **Senior-level expertise**: Think critically, suggest improvements, anticipate edge cases
- **Best practices first**: Clean code, proper error handling, type safety, testing
- **Educational mindset**: Code should teach (use `// LEARN:` comments for complex logic)
- **Autonomous but collaborative**: Make decisions independently, but consult docs when uncertain
- **Production-ready output**: Every commit should be deployment-worthy

## Your Mandate:
- Write code that a senior engineer would be proud to review
- Never commit placeholder code (`// TODO: implement later`)
- Always test before committing
- Document your reasoning in commit messages and inline comments

---

# 🧠 CRITICAL: Context Awareness
**Tento projekt je řízen externí dokumentací.**
Před jakoukoliv odpovědí nebo generováním kódu si **MUSÍŠ** načíst kontext:

## Always Read (Before Every Task):
1.  **`.ai-context/PROJECT_CORE.md`** - Vize, MVP, curriculum philosophy
2.  **`.ai-context/CONTENT_GUIDELINES.md`** - Design system ("Liquid Glass"), lesson structure, component usage
3.  **`.ai-context/ARCHITECTURE.md`** - Tech stack, ports, dependencies
4.  **`.ai-context/AGENT-STATE.md`** - Current cycle status, what's completed
5.  **`.ai-context/implementation_plan.md`** - Your current task (if exists)

## Reference Only (When Relevant):
6.  **`.ai-context/CURRICULUM_STRATEGY.md`** - Long-term learning path (for understanding context)
7.  **`.ai-context/WORKFLOW.md`** - Team collaboration rules (for understanding your role)

## Priority Rules:
- If conflicting information: `implementation_plan.md` > `CONTENT_GUIDELINES.md` > `PROJECT_CORE.md`
- Design decisions: **Always defer to `CONTENT_GUIDELINES.md`** (Liquid Glass, component usage, etc.)
- Strategic questions: Consult `CURRICULUM_STRATEGY.md`
- When in doubt: Ask Lead Developer or Lead Architect (Perplexity) for clarification

---

# 🖥️ Environment Strategy (Direct WSL Integration)
The IDE is connected directly to WSL2. All commands run natively in Linux.

## Execution Rules:
1. **Use NATIVE Linux commands ONLY:**
   - ✅ `npm install`
   - ✅ `python3 seed.py`
   - ✅ `docker compose up -d`
   - ✅ `git commit -m "..."`
   - ❌ NEVER use `wsl npm install` or PowerShell wrappers

2. **Why**: The IDE is already inside WSL. Using `wsl` wrappers would be redundant and cause errors.

3. **Path Format**: Use Linux paths (`/home/user/project`), NOT Windows paths (`C:\Users\...`).

4. **Docker**: Docker commands work natively. Use `docker compose` (not `docker-compose`).

---

# ⚙️ Workflow Rules

## Atomic Steps (One Task at a Time):
- Implementuj vždy pouze **jeden bod** z `task.md` najednou
- Never combine multiple tasks in one commit
- If a task is too large, break it into sub-tasks

## Test & Commit (After Every Step):
1. **Test**: Run relevant tests (`npm test`, `pytest`, manual verification)
2. **Commit**: If tests pass, create atomic git commit with descriptive message
3. **Update**: Mark task as done in `task.md` (`[x]`)

### Commit Message Format:

<type>: <short description>

<optional longer description>
<optional LEARN: comment>


**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting, no code change
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

**Examples:**

feat: add XP system to user model

Added xp_earned column to User table. XP is awarded after lesson completion.
LEARN: Using SQLAlchemy column with default=0 to avoid null values.


## Educational Comments:
When writing complex logic, add `// LEARN:` comments:

// LEARN: Using backdrop-blur for "Liquid Glass" effect
className="bg-white/10 backdrop-blur-xl"


---

# 🏁 Definition of Done (Cycle End)

When ALL tasks in `task.md` are checked `[x]`:

1. **Don't wait for prompt** - proceed automatically
2. **Archive cycle**:

mkdir -p .ai-context/completed_cycles/cycle_XX
mv .ai-context/implementation_plan.md .ai-context/completed_cycles/cycle_XX/
mv .ai-context/task.md .ai-context/completed_cycles/cycle_XX/

3. **Update AGENT-STATE.md**: Mark cycle as complete
4. **Git push**:

git add .
git commit -m "chore: complete cycle XX"
git push origin main

5. **Report**: "✅ Cycle XX completed. All tasks done. Pushed to GitHub."

---

# 🚫 Constraints

## Never Do:
- ❌ Use libraries not listed in `ARCHITECTURE.md`
- ❌ Commit secrets (API keys, passwords)
- ❌ Use placeholder code (`// TODO`, `console.log("fix later")`)
- ❌ Skip tests
- ❌ Commit broken code
- ❌ Use Windows paths or `wsl` wrappers

## Always Do:
- ✅ Follow `CONTENT_GUIDELINES.md` for all UI work
- ✅ Write type-safe code (TypeScript, Python type hints)
- ✅ Add error handling
- ✅ Test before committing
- ✅ Write descriptive commit messages
- ✅ Update `task.md` after each completion

---

# 📚 Lesson Generation Protocol

When creating new content:

1.  **Structure & Design**: Strictly follow the **"Structure of a Lesson"** and **"Visual Rules"** defined in `.ai-context/CONTENT_GUIDELINES.md`.
2.  **Diagram Check**: Before creating a new diagram, check `Diagram.tsx` for existing ones to avoid duplication. Ensure SVG paths do not overlap text.
3.  **Technical Constraints**:
    - **Quiz**: DO NOT put `<Quiz>` tag in MDX. Quiz data goes into `quiz.json` and is rendered automatically.
    - **Updates**: Use `docker-compose restart backend` to apply content changes (seed runs on startup).

# 🗄️ Database Management Protocol

1.  **Schema Changes**:
    - If you modify `models.py`, you MUST reset the DB volume: `docker-compose down -v && docker-compose up -d --build`.
2.  **Seeding**:
    - Seeding is AUTOMATED via `entrypoint.sh`.
    - **NEVER** run `python seed.py` manually inside a running container (race conditions).
3.  **Login**:
    - Default admin: `admin@ai-platform.com` / `admin123`.

---

# 🎨 Design System Compliance

## Primary Directive:
**Adhere strictly to `.ai-context/CONTENT_GUIDELINES.md` for all UI, Component, and Content decisions.**

## Critical Reminders:
- **"Liquid Glass" Aesthetic**: Use `bg-white/10 backdrop-blur-xl` styles as defined in guidelines.
- **Mobile-First**: Always test layout on mobile viewports.
- **Dark Mode**: Ensure all components render correctly in dark mode.

---

# 🧪 Testing Strategy

## Before Every Commit:
- **Frontend**: `npm run build` (check for TypeScript errors)
- **Backend**: `pytest` (run all tests)
- **Manual**: Test the feature in browser/API client

## If Tests Fail:
- Fix the issue immediately
- Never commit broken code
- If unsure, ask for guidance in commit message or console output

---

# 📚 Learning Resources

When stuck:
1. Check `.ai-context/` documentation first
2. Consult official docs (Next.js, FastAPI, etc.)
3. Look at existing code patterns in the repo
4. Ask Lead Developer or Lead Architect for clarification

---

**Remember: You're not just writing code—you're building an educational platform. Every line should reflect senior-level quality and teaching mindset.** 🎯

**Version:** 2.0 (Perplexity Era)  
**Last Updated:** Cycle 16


======================================================================
## 📋 Project Context
Path: `PROJECT_CONTEXT.md`
======================================================================

# 🚀 AI Learning Platform - Context

## 🛠️ Tech Stack
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Shadcn/ui.
- **Backend:** FastAPI (Python 3.11), Pydantic v2, SQLAlchemy.
- **Infra:** Docker Compose, PostgreSQL (v15), Redis.
- **Environment:** WSL2 (Linux paths only).

## 🔌 Ports & Services
- **Frontend:** `http://localhost:3000` (Docker: `ai-frontend`)
- **Backend:** `http://localhost:8000` (Docker: `ai-backend`)
- **DB:** Port `5432` (Docker: `ai-db`)

## 🎨 Design Philosophy
- **Style:** "Holographic Datapad" (Glassmorphism, Neon Accents).
- **Themes:** Dual-mode system: **Jedi (Light/Indigo)** vs **Sith (Dark/Red/Gold)**.
- **Assets:** No stock photos. Only code, CSS diagrams, or educational SVGs.
- **Reference:** See `CONTENT_GUIDELINES.md` for strict UI rules.

## 📂 Key Directories
- `/frontend`: Next.js app (run `npm run dev` locally for speed, or Docker).
- `/backend`: FastAPI app.
- `/content`: MDX lesson content (synced to containers).


======================================================================
## 🎨 Content Guidelines
Path: `CONTENT_GUIDELINES.md`
======================================================================

# 📜 Content Guidelines (The Golden Standard)

This document defines the "Masterpiece" quality standard for all course content.

## 1. Core Philosophy
*   **"Liquid Glass" Aesthetic:** Content must look native to the dark-mode, neon-accented UI.
*   **Interactive First:** No passive reading. Labs and Quizzes drive engagement.
*   **Jedi/Sith Theme:** Use analogies (The Force, Droids, Holocrons) but keep it professional.

## 2. Structure of a Lesson
Every lesson MUST follow this structure:

1.  **Header Callout:**
    ```markdown
    <Callout type="info">
    **Mission Goal:** [One sentence goal]
    ⏳ **Reading Time:** 15 min | 🧪 **[X] Labs Included**
    </Callout>
    ```
2.  **The Hook:** Why does this matter? (Star Wars analogy allowed).
3.  **Core Concepts:** Broken down into sections with **Visual Anchors**.
4.  **Interactive Labs:** Copy-Paste ready prompts.
5.  **The Holocron:** A summary ConceptCard at the end.

## 3. Visual Rules (SVG First) 🎨
*   **NO Raster Images:** Do not use `.png` or `.jpg` files unless absolutely necessary (and approved).
*   **Use Diagrams:** Use the `<Diagram type="...">` component.
    *   **Check First:** Before creating a new diagram, check `frontend/components/mdx/Diagram.tsx` to see if a suitable one already exists. **Do not create duplicates.**
    *   *Available Types:* `neural-network`, `training-loop`, `traditional-vs-ml`, `ai-timeline`, `dashboard-ui`, `data-analysis-chart`, etc.
    *   *Why?* Scales perfectly, respects Dark Mode, editable via code.
*   **Icons:** Use `LessonIcon` and `CourseIcon` components for UI elements.

## 4. Component Usage

### `<ConceptCard>`
Use for key definitions or summaries.
```tsx
<ConceptCard title="The Student" icon="🎓" jediQuote="Much to learn...">
  Content...
</ConceptCard>
```

### `<Steps>`
Use for sequential instructions or lab analysis.

### `<Callout>`
Use for warnings (Hallucinations) or tips.
*   `type="info"`: General info (Blue)
*   `type="warning"`: Risks/Hallucinations (Yellow/Red)
*   `type="success"`: Achievements (Green)
*   `type="tip"`: Pro Tips (Purple)

## 5. Lab Standards
Labs must be "Copy-Paste" ready. Don't describe the prompt. Write it.

**Bad:** "Ask the AI to write a poem."
**Good:**
```markdown
**The Prompt:**
```text
Write a poem about a robot who loves gardening.
```
```

## 6. Tone & Voice
*   **Empowering:** You are the Jedi Master guiding a Padawan.
*   **Precise:** No fluff. Short paragraphs.
*   **Formatted:** Use **Bold** for key terms. Use lists often.

## 7. Technical Best Practices 🔧

### Diagram Design
*   **Light Mode Contrast:** ALWAYS use dark-mode-aware color classes for text:
    ```tsx
    // ✅ CORRECT
    className="fill-slate-600 dark:fill-slate-400"
    
    // ❌ WRONG (unreadable in light mode)
    className="fill-slate-400"
    ```
*   **Legibility:** Ensure SVG paths (arrows, lines) DO NOT overlap with text labels. Test visually.
*   **Context Match:** Ensure the diagram fits the specific pedagogical goal (e.g., use `traditional-vs-ml` for rule-based vs learning, and `training-loop` for the feedback cycle).
*   **Font Sizes:** Minimum `text-xs` for body text, `text-[10px]` for labels.
*   **Test Both Modes:** Verify diagrams in both light and dark themes before committing.

### Component Capabilities
*   **Nested Markdown:** `<ConceptCard>` and `<Callout>` support complex Markdown (Lists, Code Blocks, Headings) thanks to recursive parsing.
    *   **Requirement:** Ensure valid Markdown structure.
    *   **Pattern:**
      ```markdown
      <ConceptCard ...>
      ### 🔑 Key Points
      *   **Item 1:** Description
      ```
*   **Diagrams in Cards:** While possible, avoid putting heavy `<Diagram>` components inside `<ConceptCard>` to prevent layout clutter. Use them *between* cards.

### Code Blocks
*   **Language Identifier:** Always specify language for syntax highlighting:
    ```markdown
    ```python  ← Specify language
    def example():
        pass
    ```  ← Close properly
    ```
*   **Where They Work:** Code blocks are supported everywhere (not just `<Steps>`).
*   **Styling:** Code blocks automatically get Mac-style window dots (🔴🟡🟢) and a Copy button.

### Summary Section Pattern
*   **Inspiration:** Use Lesson 3's Holocron as the gold standard.
*   **Icon Usage:** One icon per key concept improves scannability.
*   **Avoid:** Long paragraphs, walls of text, ASCII art dividers.

======================================================================
## 🏗️ Architecture
Path: `ARCHITECTURE.md`
======================================================================

# Architecture Overview

## 🏗️ Tech Stack & Infrastructure
- **Repo**: `ussi69-dotcom/ai-learning-platform`
- **Infrastructure**: VPS Hetzner CPX32 (Ubuntu 24.04 LTS).
- **Containerization**: Docker, Docker Compose (v2).

### Components
1.  **Frontend**: Next.js 16 (App Router)
    - **Port**: 3000
    - **Tech**: TypeScript, Tailwind CSS, Shadcn/ui.
    - **Role**: UI, Client-side logic, connects to Backend via generated client.
2.  **Backend**: FastAPI (Python 3.11)
    - **Port**: 8000 (Docs at `/docs`)
    - **Tech**: Pydantic v2, SQLAlchemy (Sync).
    - **Role**: REST API, Business logic, DB access.
### 3. Database: PostgreSQL 15
*   **Role:** Persistent storage.
*   **Key Models:**
    *   `User`: Auth & XP.
    *   `Course` / `Lesson` / `Quiz`: Content structure.
    *   `UserProgress`: Smart tracking of user journey.
        *   `current_page` (Int): Remembers the exact slide user left off.
        *   `completed_labs` (JSON): List of completed Lab IDs (e.g. `["intro-lab", "rag-setup"]`).
        *   `quiz_score` (Int): Best score achieved on the lesson's quiz.
        *   `last_accessed` (DateTime): For "Resume Learning" functionality.

### 4. Database Management (SOP)
*   **Entrypoint:** The backend container uses `entrypoint.sh` to automatically wait for DB readiness and run `seed.py`.
*   **Reset Protocol:** To apply schema changes, volumes must be destroyed: `docker-compose down -v && docker-compose up`. Manual seeding is forbidden.

## 🔄 Data Flow (Smart Progress)
1.  **Resume:** `GET /users/me/last-lesson` -> Frontend redirects to Lesson + Page.
2.  **Reading:** Frontend debounces page changes -> `POST /lessons/{id}/progress`.
3.  **Lab:** User clicks "Finish" -> `POST /lessons/{id}/lab/complete` -> Backend checks `completed_labs` JSON -> Awards XP only if new.
4.  **Quiz:** User submits -> `POST /lessons/{id}/quiz/complete` -> Backend stores score -> Awards XP if passed (>70%).

## 🔌 Integration Points
- **LLM Feedback**: Integrated via dedicated service or direct API call.

---

**Status:** Aktualizováno listopad 2025  
**Agent Architecture:** Perplexity (Architect) + Antigravity (Executor)  
**OSS/Gemini/ostatní agenti se NEpoužívají pro tento projekt**


======================================================================
## 🎯 Strategy
Path: `STRATEGY.md`
======================================================================

# 🎓 AI Learning Platform - Curriculum Strategy

## Vision
**"Don't just learn about the Force. Learn to wield it."**
Students start as **Padawans** (Users) and graduate as **Jedi Knights** (Builders). The final project is rebuilding this very platform.

---

## 🗺️ Roadmap Status

### ✅ Phase 1: The Padawan (AI Basics) - COMPLETED
**Goal:** Master the tools and understand the mechanics. "Golden Standard" achieved in Cycle 27.

**The Completed Curriculum:**
1.  **What is AI?** (Programming vs Training) - *SVG Visualized*
2.  **How Machines Learn** (Supervised/Unsupervised/RL) - *Visual Workflows*
3.  **LLMs Explained** (Tokens, Context, Temperature) - *Interactive Labs*
4.  **Prompt Engineering** (6 Pillars of Precision) - *Few-Shot Diagrams*
5.  **The Dark Side** (Hallucinations & Bias) - *Safety First*
6.  **AI at Work** (Enterprise Tools) - *Dashboard Simulation*
7.  **Mission Summary** (Toolkit & Next Steps) - *Grand Finale*

**Key Features:**
- **SVG-First Design:** No raster images dependencies.
- **Copy-Paste Labs:** Immediate actionable learning.
- **Liquid Glass UI:** Optimized for Dark Mode (Sith Theme).

---

### 🚧 Phase 2: The Jedi Knight (Building with APIs) - NEXT
**Goal:** Code your first AI-powered Python applications. "Build your own Lightsaber".

**Planned Topics:**
1.  **Connecting to the Force (API Basics)**
    *   *Lab:* Your first `client.chat.completions.create` call.
2.  **Droid Memory (Context & History)**
    *   *Lab:* Build a CLI chatbot that remembers your name.
3.  **The Jedi Archives (RAG - Retrieval Augmented Generation)**
    *   *Lab:* Chat with a PDF (Star Wars script).
4.  **Function Calling (Giving AI Hands)**
    *   *Lab:* AI that can get current weather or roll dice.
5.  **Building a Brain (Fine-tuning vs RAG)**
    *   *Concept:* When to train vs when to give context.
6.  **Project: The Holocron Assistant**
    *   *Multi-stage Lab:* Build a web-based helper using Streamlit/Gradio + OpenAI.

---

### Phase 3: The Master (Production Systems)
**Goal:** Ship scalable, secure, and expensive-to-run systems.

1.  **Vector Databases** (Pinecone/Chroma deep dive)
2.  **AI Agents & Swarms** (LangChain/CrewAI basics)
3.  **Eval & Monitoring** (How to know if your Jedi is failing)
4.  **Local LLMs** (Running Llama 3 on your laptop)

---

## 📚 "Golden Standard" Content Rules
*   **Header:** Every lesson starts with a Mission Goal Callout.
*   **Video:** Embedded YouTube video in `meta.json`.
*   **Visuals:** Use `<Diagram type="...">`. No external images.
*   **Labs:** Instructions must be copy-paste ready code blocks.
*   **Summary:** End with a `<ConceptCard title="Holocron">`.

---

**Last Updated:** Cycle 27 (Beginner Course Finalized)


======================================================================
## ⚙️ Workflow
Path: `WORKFLOW.md`
======================================================================

# ⚙️ Agent Workflow

## 1. Standard Development Loop
1.  **Plan:** Analyze requirements -> Check `STRATEGY.md`.
2.  **Code:** Implement features/content.
3.  **Verify (Unit):** Run backend tests (`pytest`).
4.  **Verify (Visual):** Run Playwright capture scripts.
5.  **Document:** Update context files.

## 2. Content Creation Workflow
1.  **Draft:** Write `content.mdx` following `CONTENT_GUIDELINES.md`.
2.  **Diagram:** If a visual is needed, implement a new type in `Diagram.tsx`.
3.  **Metadata:** Update `meta.json` with Video URL and Order.
4.  **Deploy:** `docker-compose restart backend` to refresh DB.
5.  **Inspect:** Run `visual_tests/capture_lesson_dark.js` to verify rendering.

## 3. Visual Inspection Protocol (Playwright)
We use Dockerized Playwright to "see" the UI.

**Command:**
```bash
docker run --rm --network host -v $(pwd)/visual_tests:/app -w /app mcr.microsoft.com/playwright:v1.57.0-jammy /bin/bash -c "npm install playwright && node <script_name>.js"
```

**Available Scripts:**
*   `capture_lesson_dark.js`: Captures a specific lesson in Sith mode.
*   `capture_dashboard_auth.js`: Captures the Dashboard as a logged-in user.

## 4. Git Commit Standards
*   **Feat:** New features or content.
*   **Fix:** Bug fixes.
*   **Refactor:** Code cleanup.
*   **Docs:** Documentation updates.
*   **Milestone:** Major cycle completion.


======================================================================
## 📊 Agent State
Path: `AGENT-STATE.md`
======================================================================

# 🧠 Agent State & Memory

Current Cycle: 31 (Visual Polish & Content Refinement) - COMPLETED
**Focus:** Diagram readability, code block rendering, lesson summary design.

## 🛠️ System Snapshot
- **Frontend:** Next.js 16, Tailwind v4, "Holographic Datapad".
- **Backend:** FastAPI, PostgreSQL (Auto-seed via `entrypoint.sh`).
- **Content:** 
    - Lesson 3: **Gold Standard**.
    - Lesson 4: **Masterpiece** (13 pages, 6 Labs, **Fixed Summary**).
    - Lesson 5: **Masterpiece** (10+ pages, 3 Labs).
    - Lesson 6: **Masterpiece** (20+ pages, RAG Diagram, Video Integration).

## 🔑 Critical Protocols (SOP)
1.  **Content Generation:** Follow `CONTENT_GUIDELINES.md`. **Quiz in JSON, not MDX.**
2.  **DB Changes:** Nuclear reset only. `docker-compose down -v`.
3.  **Visuals:** No walls of text. Use `<Diagram>`, `<ConceptCard>`, or Emoji.
4.  **Diagram Colors:** ALWAYS use `fill-slate-600 dark:fill-slate-400` for text (not `fill-slate-400`).
5.  **Code Blocks:** Supported everywhere. Parser properly skips closing ``` marker.

## ⏭️ Next Steps (Backlog)
- **Lesson 7:** Course Summary & Final Exam (The Grand Trial).
- **Phase 2 (Coding):** Setup Python sandbox environment.


======================================================================
## 💡 Ideas Backlog
Path: `IDEAS.md`
======================================================================

# 💡 Brainstorming & Ideas Backlog

## 🎮 Gamifikace - RPG & "Pan Sponka"
**Koncept:** Učení jako RPG hra.
**Postava:**
- Interaktivní průvodce ("Pan Sponka" 2.0).
- Avatar se mění/vylepšuje podle levelu.
- Získává XP za kvízy a dokončené lekce.

**Boss Fights (Auto-battler):**
- Na konci každého kurzu je "Boss" (tematický, např. "The Hallucination Monster").
- **Mechanika:** Úspěšnost v kurzu určuje útok/HP hráče.
- **Loot:** Roguelike výběr ze 3 odměn po výhře (+Crit Chance, +Memory).
- **Leaderboard:** Žebříček na Homepage.

## 🧠 Smart Glossary (Slovníček)
- **Struktura:** Řazeno dle obtížnosti, ne abecedy.
- **Interaktivita:** Hover tooltips v textu lekcí.
- **Loading Screens:** Zobrazovat "Did you know?" pojmy.

## 🤖 AI Mentor (Offline/Online LLM)
- Tlačítko "Pomoc" v lekci.
- Generování promptů pro pomoc, pokud se uživatel zasekne.
- Kontextová nápověda na základě `MASTER_CONTEXT.md`.

## 🌍 Lokalizace & Security
- **Jazyk:** CZ obsah + EN terminologie.
- **Geo-blocking:** Povolit jen ČR/SR IP adresy (Cloudflare WAF).

## 📊 Analýza & Výkonnost
- **Dashboard:** Výkonnost uživatele (účet, kurzy, úspěšnost).
- **Leaderboard:** Žebříček na Homepage.
- **Analytics:** Google Analytics pro sledování výkonnosti.


======================================================================
## 📂 PROJECT FILE STRUCTURE (Current State)
======================================================================

```text
📁 ai-learning-platform/
  📄 GEMINI.md
  📄 README.md
  📄 agent_state.txt
  📄 check_content.py
  📄 context_structure.txt
  📄 docker-compose.yml
  📄 recent_commits.txt
  📄 reproduce_issue.py
  📄 test_results.txt
  📄 test_results_2.txt
  📄 verify_reply.py
  📄 walkthrough.md
  📁 content/
    📄 test.txt
    📁 courses/
  📁 .ai-context/
    📄 AGENT-STATE.md
    📄 ARCHITECTURE.md
    📄 COMPONENT_PATTERNS.md
    📄 CONTENT_GUIDELINES.md
    📄 GLOSSARY.md
    📄 IDEAS.md
    📄 NEW-LESSON-PROMPT.md
    📄 PROJECT_CONTEXT.md
    📄 STRATEGY.md
    📄 VISUAL_INSPECTION.md
    📄 WORKFLOW.md
    📁 archive/
    📁 modules/
      📄 module-learning-basics.md
  📁 frontend/
    📄 Dockerfile
    📄 README.md
    📄 components.json
    📄 eslint.config.mjs
    📄 middleware.ts
    📄 next-env.d.ts
    📄 next.config.ts
    📄 package.json
    📄 postcss.config.mjs
    📄 tsconfig.json
    📁 content/
    📁 app/
      📄 favicon.ico
      📄 globals.css
      📄 layout.tsx
    📁 messages/
      📄 cs.json
      📄 en.json
    📁 i18n/
      📄 request.ts
      📄 routing.ts
    📁 client/
      📄 index.ts
    📁 components/
      📄 AvatarSelector.tsx
      📄 CalloutBox.tsx
      📄 Clippy.tsx
      📄 CodeBlock.tsx
      📄 CourseIcon.tsx
      📄 FeedbackDetailModal.tsx
      📄 FeedbackFAB.tsx
      📄 FeedbackMarker.tsx
      📄 FeedbackSubmissionModal.tsx
      📄 JediSithToggle.tsx
      📄 LanguageSwitcher.tsx
      📄 LessonComplete.tsx
      📄 LessonIcon.tsx
      📄 LessonProgressBar.tsx
      📄 MDXImage.tsx
      📄 MarkdownRenderer.tsx
      📄 NavBar.tsx
      📄 ProtectedRoute.tsx
      📄 Quiz.tsx
      📄 TryItYourself.tsx
      📄 UserAvatar.tsx
      📄 XPProgressBar.tsx
    📁 lib/
      📄 utils.ts
    📁 public/
      📄 file.svg
      📄 globe.svg
      📄 next.svg
      📄 vercel.svg
      📄 window.svg
    📁 context/
      📄 AuthContext.tsx
  📁 backend/
    📄 Dockerfile
    📄 entrypoint.sh
    📄 requirements.txt
    📄 seed.py
    📄 test_output.txt
    📄 test_output_auth.txt
    📁 content/
    📁 app/
      📄 __init__.py
      📄 auth.py
      📄 database.py
      📄 main.py
      📄 models.py
      📄 schemas.py
    📁 tests/
      📄 test_api.py
      📄 test_auth.py
  📁 visual_tests/
    📄 capture.js
    📄 capture_dashboard.js
    📄 capture_dashboard_auth.js
    📄 capture_lesson.js
    📄 capture_lesson_dark.js
    📄 current_view.png
    📄 dashboard_logged_in.png
    📄 dashboard_view.png
    📄 lesson_view.png
    📄 lesson_view_dark.png
    📄 package.json
  📁 .agent/
    📁 rules/
      📄 rules.md
  📁 scripts/
    📄 context_builder.py
    📄 export_content.py
```


======================================================================
## 🗣️ READY FOR YOUR INSTRUCTIONS
======================================================================

Kontext byl úspěšně načten. Nyní můžeš zadat konkrétní úkol.

**Příklady úkolů:**
- "Vytvoř novou lekci o Fine-Tuning podle CONTENT_GUIDELINES"
- "Oprav layout na mobile v komponenty NavBar"
- "Přidej novou gamification feature (badges system)"
- "Debug problém s login flow"

> 💡 **Tip:** Vždy zkontroluj AGENT-STATE.md pro kontext aktuálního cyklu.
> ⚠️ **Důležité:** Před commitem vždy spus testy podle rules.md!
