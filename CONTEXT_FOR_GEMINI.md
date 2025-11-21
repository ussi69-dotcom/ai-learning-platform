# 🚀 SYSTEM BRIEFING - 2025-11-21 15:40:59

**INSTRUCTION:** This is a context dump for the AI Architect (Gemini).
Please load the following context, activate your role defined in GEMINI_PROMPT.md, and await instructions.
----------------------------------------


## 📄 FILE: GEMINI_PROMPT.md
```markdown
Jsi Lead Architekt a Content Creator projektu "AI Learning Platform".
Spolupracujeme v režimu: Ty (Architekt) -> Já (Lead) -> Antigravity (Coder).

# 🎯 Tvé úkoly při startu seance:
1. Načti si soubory z `.ai-context/` (hlavně `AGENT-STATE.md`, `HISTORY.md` a `PROJECT_CORE.md`).
2. Zjisti, v jakém jsme Cyklu a co je cílem.

# 🛠️ Workflow pro nové features:
1. Nenavrhuj kód přímo (pokud o to neřeknu).
2. Místo toho vygeneruj obsah pro:
   - `implementation_plan.md` (Technický design).
   - `task.md` (Kroky pro Antigravity).

# 🏁 Closing Ritual (Na konci seance):
Před ukončením konverzace nebo na vyžádání uživatele MUSÍŠ:
1. **Aktualizovat `HISTORY.md`**:
   - Shrň strategická rozhodnutí ("Proč jsme to udělali").
   - Zaznamenej "Aha!" momenty a změny plánu.
   - Ujisti se, že kontext z aktuálního chatu je uložen v souboru.
2. **Připravit Handover**:
   - Navrhni prompt pro příští seanci (pokud se něco změnilo oproti standardu).
   - Připomeň uživateli spuštění `python scripts/context_builder.py`.

Cíl: Ty jsi "Mozek", soubory jsou "Paměť". Nic nesmí zůstat jen v chatu.
```


## 📄 FILE: PROJECT_CORE.md
```markdown
# Project Core & MVP Definitions

## 🚨 Meta Instructions (Agent & User)
1.  **Living Memory**: This context structure is the source of truth. Update it when architecture changes.
2.  **Step-by-Step**: Proceed logically. Do not rush.
3.  **Safe-Formatting**: Use 4 backticks for nested markdown blocks.
4.  **Git Hygiene**: Remind user to commit/push after checkpoints.

## 🎯 Vision & Philosophy
- **Goal**: Create a 30-day interactive platform for learning AI development.
- **Method**: "Learning by Doing" & "Meta-Learning" – user learns by building the platform they are using.
- **Design**: KISS, High Contrast (Dark text/Light bg), Function > Effects.
- **Target Audience**: Developers transitioning to AI engineering.

## 🏗️ MVP Definition (Day 1-7)
- **Scope**: Single functional learning module with AI feedback loop.
- **Core Features**:
    1.  User Authentication (Basic).
    2.  Lesson Viewing (Text + Video).
    3.  Quiz/Exercise Submission.
    4.  AI Feedback on Submission.
    5.  Progress Tracking.

## 🛠️ Workflow & Best Practices
- **Git**: Feature Branches. `main` is for functional code only.
- **Versioning**: Tag functional milestones (e.g., `v0.2-day2-complete`).
- **Backup**: Code on GitHub. DB dumps before destructive changes.
- **Docker**: `docker compose up -d` to run. `docker compose exec` for commands.
- **DB Changes**: "Hard Reset" (`down -v`) if model changes without Alembic.

## 📚 30-Day Curriculum (Roadmap)
### Week 1: Foundation
- **Day 1**: Platform Setup (VPS, Docker, Next.js, FastAPI) ✅
- **Day 2**: Core Data Flow & API (DB, FE/BE connection, n8n) ✅
- **Day 3**: Lesson Engine (Dynamic routing, MDX, Video) ✅
- **Day 4**: Agent Mode Setup & Lessons API (Current) ✅
- **Day 5**: Auth & User Profiles (JWT, "Duke Nukem" Difficulties) 🚧
- **Day 6**: OpenAI API Integration
- **Day 7**: Week 1 Review + Mini Project

## 🎮 Gamification & Difficulties ("Duke Nukem" Style)
- **Piece of Cake**: Easy mode, more hints, slower pace.
- **Let's Rock**: Standard mode.
- **Come Get Some**: Hard mode, less help.
- **Damn I'm Good**: Expert mode, no AI hints, permadeath (maybe?).

### Week 2: AI Core (LLMs & RAG)
- Day 8-14: LangChain, RAG, Prompt Engineering, Fine-tuning, Agents.

### Week 3: Advanced (Media & ML Ops)
- Day 15-21: Stable Diffusion, Whisper, ElevenLabs, CV, ML Deployment.

### Week 4: Production (SaaS & Scale)
- Day 22-30: K8s, CI/CD, Monitoring, Security, Launch.

## Styleguide
- **Backend**: Python 3.11+, FastAPI, Pydantic v2. Type hints everywhere.
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Shadcn/ui.
- **Naming**: `snake_case` (Python), `camelCase` (JS/TS), `PascalCase` (Classes).

```


## 📄 FILE: HISTORY.md
```markdown
# Project History & Lessons Learned

## 📜 Context Memory (What we learned)

### ✅ Best Practices (Keep doing)
- **Multi-stage Docker builds**: Reduces image size (FE ~200MB, BE ~180MB).
- **Docker Compose Orchestration**: Use `depends_on` and healthchecks.
- **VS Code + WSL2**: Primary dev environment.
- **Client Generation**: `openapi-typescript-codegen` keeps FE/BE in sync.

### ⚠️ Past Issues & Fixes (Avoid repeating)
- **Heredoc in Terminal**: Breaks formatting -> Write code in VS Code.
- **Docker Compose Version**: Use `docker compose` (v2), not `docker-compose`.
- **Next.js Standalone**: Requires Node 20+ in Dockerfile.
- **DB Persistence**: Docker Volumes held old passwords. Fix: `docker compose down -v`.
- **Pydantic Email**: Missing `email-validator` caused crashes.
- **Backend Imports**: Needs `__init__.py` in `backend/app`.
- **Networking**: Frontend (SSR) must call `http://backend:8000`, Browser calls `localhost:8000`.
- **React `asChild`**: Shadcn `Button` inside `Link` cannot have `asChild`.
- **Dynamic Routes**: Case sensitivity matters (`[courseId]` vs `[courseld]`).

## 🏁 Milestones

### Day 2: Core Data Flow
- **Done**: VPS, Docker orchestration, Basic Models, Homepage, n8n.
- **Debt**: Manual data entry (fixed in Day 3).

### Day 3: Lesson Engine
- **Done**: DB Seeding (`seed.py`), Dynamic Routes (`/courses/[id]`, `/lessons/[id]`), MDX Rendering, Video Embeds, API Client generation.
- **Debt**: Missing Prev/Next buttons, Payments (moved to Day 5).
## 📅 Session: Cycle 9 Refactor & Cycle 10 Prep (Date: 2025-11-21)

### 🧠 Strategic Decisions (Why we did what we did)
1.  **Content Engine Refactor**: Rozhodli jsme se opustit hardcoded `seed.py` a přejít na file-based systém (`/content` složka). Důvodem je škálovatelnost (až 50+ lekcí), lokalizace a oddělení kódu od obsahu.
2.  **Workflow Update**: Definovali jsme role.
    * **Gemini**: Architekt & Content Creator.
    * **Antigravity**: Coder (Dělník).
    * **User**: Lead Developer & Bridge.
3.  **Context Automation**: Vytvořili jsme `context_builder.py` pro bezztrátový přenos kontextu mezi chaty.
4.  **Docker & WSL Fix**: Vyřešili jsme problémy s Windows paths v Antigravity (`.cursorrules` vynucuje Bash) a mountování volumes pro content (`docker-compose.yml`).

### 🚧 Current Focus (Cycle 10)
* Původně jsme chtěli dělat Gamifikaci, ale priorita se změnila na **UX/UI Polish**.
* **Feedback k řešení**:
    * Modrý banner lekce je zastaralý -> Chceme "Liquid Glass" design.
    * Navigace je na mobilu malá -> Chceme velká tlačítka.
    * Chybějící video v Lekci 4.
* **Assets**: Obrázky se musí generovat a ukládat do `public/images`.

### 💡 Next Steps
1.  Dokončit Cyklus 10 (Design).
2.  Vrátit se k obsahu (přepsat texty do nových MDX souborů).
3.  Teprve poté Gamifikace.
```


## 📄 FILE: AGENT-STATE.md
```markdown
# Agent State Log

## Cycle 10: Rich MDX Components & Content Rewrite

**Date**: 2025-11-21
**Goal**: Implement rich MDX components (Callout, Steps, ConceptCard) and rewrite Lesson 1 with modern Theory/Practice structure.

### Log

#### Phase 1: MDX Component Creation ✅
- **[EXECUTION]**: Created `frontend/components/mdx/Callout.tsx`:
  - Three types: info (blue), warning (amber), tip (emerald)
  - Icons from lucide-react (Info, AlertTriangle, Lightbulb)
  - Glassmorphism styling with backdrop-blur
- **[EXECUTION]**: Created `frontend/components/mdx/Steps.tsx`:
  - Numbered steps with gradient badges (blue to indigo)
  - Supports h3 headings as step titles
  - Nested content rendering
- **[EXECUTION]**: Created `frontend/components/mdx/ConceptCard.tsx`:
  - Purple gradient background for definitions
  - BookOpen icon from lucide-react
  - Title prop for concept name

#### Phase 2: MarkdownRenderer Refactor ✅
- **[EXECUTION]**: Completely rewrote `MarkdownRenderer.tsx`:
  - Custom component parser for `<Callout>`, `<Steps>`, `<ConceptCard>`
  - Inline markdown support (bold, italic, links)
  - Proper nesting and content extraction
  - Support for headings, lists, images, horizontal rules
- **[VERIFICATION]**: Fixed TypeScript lint error in Steps component (typed React element props)

#### Phase 3: Content Rewrite ✅
- **[EXECUTION]**: Rewrote `content/courses/ai-basics-beginner/lessons/01-what-is-ai/content.mdx`:
  - **Theory Section**: Explains old vs new programming paradigm
  - **Practice Section**: Hands-on lab with ChatGPT "hallucination" test
  - Used all three new components (Callout, ConceptCard, Steps)
  - Czech language content with engaging tone
- **[EXECUTION]**: Updated lesson content in database via Python script

### Technical Improvements
- ✅ Rich educational components for better UX
- ✅ Theory/Practice structure for lessons
- ✅ Reusable MDX component system
- ✅ TypeScript type safety maintained

### Files Modified
**Frontend:**
- `frontend/components/mdx/Callout.tsx` - NEW: Info/warning/tip callout boxes
- `frontend/components/mdx/Steps.tsx` - NEW: Numbered tutorial steps
- `frontend/components/mdx/ConceptCard.tsx` - NEW: Definition highlights
- `frontend/components/MarkdownRenderer.tsx` - Complete rewrite with custom component parsing

**Content:**
- `content/courses/ai-basics-beginner/lessons/01-what-is-ai/content.mdx` - Rewritten with new structure

### Commits
- `feat(cycle-10): rich MDX components and Lesson 1 rewrite`

---

## Cycle 9: Content Migration & Dynamic Loading

**Date**: 2025-11-21
**Goal**: Migrate hardcoded lesson content to file-based structure and implement dynamic loading.

### Log

#### Phase 1: Content Migration ✅
- **[EXECUTION]**: Created `content/courses/` directory structure.
- **[EXECUTION]**: Migrated "AI Basics for Absolute Beginners" course:
  - 5 lessons with `content.mdx`, `meta.json`, and `quiz.json` files
  - Full content extracted from `seed.py`
- **[EXECUTION]**: Created skeleton folders for remaining courses (Practical Prompt Engineering, Advanced AI Techniques, AI Engineering Deep Dive).

#### Phase 2: Backend Logic ✅
- **[EXECUTION]**: Created `ContentLoader` service (`backend/app/services/content_loader.py`):
  - Parses `content/` directory structure
  - Reads MDX, JSON files
  - Syncs to database
- **[EXECUTION]**: Refactored `seed.py` to use `ContentLoader` instead of hardcoded data.
- **[VERIFICATION]**: Fixed Docker configuration:
  - Added `- ./content:/app/content` volume mount to `docker-compose.yml`
  - Updated `seed.py` to check `/app/content` first (Docker), then fallback to relative path

#### Phase 3: Frontend UX ✅
- **[EXECUTION]**: Refactored `Quiz` component:
  - Removed internal data fetching
  - Now accepts `quizzes` as prop
  - Added `onComplete` callback
- **[EXECUTION]**: Updated `LessonPage`:
  - Fetches quizzes alongside lesson content
  - Adds Quiz as standalone slide in pagination
  - Shows `LessonComplete` on last slide
- **[VERIFICATION]**: Fixed `canvas-confetti` dependency issue in Docker container.

### Technical Improvements
- ✅ Content now lives in version-controlled files (easier to edit)
- ✅ `ContentLoader` enables dynamic course creation
- ✅ Quiz integrated into slide-based navigation
- ✅ Docker configuration supports content directory mounting

### Files Modified
**Backend:**
- `backend/app/services/content_loader.py` - NEW: Dynamic content loader
- `backend/seed.py` - Refactored to use ContentLoader
- `docker-compose.yml` - Added content volume mount

**Frontend:**
- `frontend/components/Quiz.tsx` - Refactored to accept props
- `frontend/app/courses/[courseId]/lessons/[lessonId]/page.tsx` - Quiz as slide

**Content:**
- `content/courses/ai-basics-beginner/` - Complete course migration
- `content/courses/practical-prompt-engineering/` - Skeleton
- `content/courses/advanced-ai-techniques/` - Skeleton
- `content/courses/ai-engineering-deep-dive/` - Skeleton

### Commits
- `feat(cycle-9): content migration and docker config`

---

## Day 8: Progress Tracking System

**Date**: 2025-11-21
**Goal**: Implement progress tracking for lessons and courses.

### Log

#### Phase 1: Database & API ✅
- **[EXECUTION]**: Created `UserProgress` model in `backend/app/models.py`.
- **[EXECUTION]**: Added `POST /lessons/{lesson_id}/complete` endpoint.
- **[EXECUTION]**: Added `GET /users/me/progress` and `GET /courses/{course_id}/progress` endpoints.
- **[VERIFICATION]**: Added and ran tests in `backend/tests/test_api.py` (6 tests passed).

#### Phase 2: Frontend Integration ✅
- **[EXECUTION]**: Created `LessonComplete` component with confetti effect.
- **[EXECUTION]**: Integrated "Mark as Complete" button in Lesson page.
- **[EXECUTION]**: Added progress bar and checkmarks to Course page.
- **[EXECUTION]**: Added "My Learning" section to Profile page.

### Technical Improvements
- ✅ Verified API endpoints with `pytest` inside Docker container.
- ✅ Frontend components handle auth and loading states correctly.

---

## Day 7: Quiz System, Design Improvements & Slide-Based Navigation

**Date**: 2025-11-20
**Goal**: Add quiz system, improve lesson design, fix bugs, add difficulty switcher.

### Log

#### Phase 1: Quiz System Implementation ✅
- **[PLANNING]**: Created implementation plan for quiz system, difficulty switcher, and UI improvements.
- **[EXECUTION]**: Added `Quiz` model to `backend/app/models.py` with questions, options, correct answer, explanation.
- **[EXECUTION]**: Created `Quiz` schemas in `backend/app/schemas.py` for API validation.
- **[EXECUTION]**: Added `GET /lessons/{lesson_id}/quizzes` endpoint in `backend/app/main.py`.
- **[EXECUTION]**: Created 25 comprehensive quiz questions (5 per lesson) in `seed.py`:
  - Lesson 1: What is AI? (definitions, examples, history)
  - Lesson 2: How Does AI Learn? (ML types, training process)
  - Lesson 3: Talking to AI (prompting, formulas, examples)
  - Lesson 4: AI in Daily Life (applications, tools)
  - Lesson 5: Course Summary (key takeaways, next steps)
- **[EXECUTION]**: Created `Quiz.tsx` component with:
  - Multiple choice interface (A/B/C/D)
  - Instant visual feedback (green for correct, red for wrong)
  - Score calculation and percentage display
  - Detailed explanations after submission
  - "Try Again" button to reset quiz
- **[EXECUTION]**: Integrated Quiz component into lesson page (appears at end of content).
- **[VERIFICATION]**: Tested quiz functionality - all 25 questions working correctly.
- **[COMMIT]**: `feat: add Quiz model and difficulty switcher API`
- **[COMMIT]**: `feat: add 25 quiz questions (5 per lesson)`
- **[COMMIT]**: `feat: add interactive Quiz component`

#### Phase 2: Difficulty Switcher ✅
- **[EXECUTION]**: Added `PUT /users/me/difficulty` endpoint to update user difficulty.
- **[EXECUTION]**: Updated Profile page (`frontend/app/profile/page.tsx`) with:
  - Grid layout showing all 4 difficulty options
  - Visual selection with descriptions
  - Confirmation dialog before switching
  - Auto-reload after successful update
  - Current difficulty indicator with checkmark
- **[VERIFICATION]**: Tested difficulty switching - courses update correctly.
- **[COMMIT]**: `feat: add difficulty switcher to profile page`

#### Phase 3: Bug Fixes ✅
- **[EXECUTION]**: Fixed Next.js hydration error in `layout.tsx` with `suppressHydrationWarning`.
- **[EXECUTION]**: Fixed React error in ProfilePage by moving redirect to `useEffect`.
- **[VERIFICATION]**: All console errors resolved.

#### Phase 4: Modern Lesson Design ✅
- **[EXECUTION]**: Complete redesign of lesson page layout:
  - **Hero Section**: Gradient blue header with lesson number, title, description
  - **Video Section**: YouTube embed with shadow and border
  - **Content Card**: White card with shadow, better typography
  - **Navigation**: Improved prev/next buttons with labels
- **[EXECUTION]**: Added pagination system (initially 5 sections per page)
- **[COMMIT]**: `feat: modern lesson design with pagination`

#### Phase 5: Slide-Based Pagination Fix ✅
- **[ISSUE]**: Pagination was cutting content randomly mid-section (e.g., table separated from heading)
- **[EXECUTION]**: Rewrote pagination logic to split by main headings (`##`):
  - `splitIntoSlides()` function creates logical slides
  - Each slide = complete section with heading and all content
  - Tables stay together with their context
- **[EXECUTION]**: Improved markdown rendering:
- **Frontend**: Interactive component with immediate feedback
- **Content**: 25 real educational questions across 5 lessons
- **UX**: Score display (e.g., "4/5 - 80%"), try again functionality

#### 2. Difficulty Management ⚙️
- **Profile UI**: Grid selector with 4 difficulty options
- **API**: PUT endpoint to update user difficulty
- **Workflow**: Confirmation → API call → Auto-reload
- **Validation**: Backend validates difficulty values

#### 3. Modern Lesson Design 🎨
- **Layout**: Not a onepager - slide-based navigation
- **Hero**: Gradient header (blue to indigo)
- **Content**: White cards with proper spacing
- **Typography**: Large headings, readable paragraphs
- **Tables**: Properly styled with borders and hover effects

#### 4. Smart Pagination 📖
- **Logic**: Split by main headings (##), not random paragraphs
- **Slides**: Each slide = complete logical section
- **Navigation**: Page dots (1, 2, 3...) + prev/next buttons
- **Context**: Tables, lists, examples stay with their headings

### Technical Improvements
- ✅ React hydration error fixed
- ✅ ProfilePage redirect moved to useEffect
- ✅ Markdown rendering enhanced (tables, bold, lists)
- ✅ Quiz shows only on last page of lesson
- ✅ Navigation buttons show lesson titles

### Files Modified
**Backend:**
- `backend/app/models.py` - Added Quiz model
- `backend/app/schemas.py` - Added Quiz schemas
- `backend/app/main.py` - Added quiz + difficulty endpoints
- `backend/seed.py` - Added 25 quiz questions

**Frontend:**
- `frontend/components/Quiz.tsx` - NEW: Interactive quiz component
- `frontend/app/profile/page.tsx` - Added difficulty switcher
- `frontend/app/layout.tsx` - Fixed hydration error
- `frontend/app/courses/[courseId]/lessons/[lessonId]/page.tsx` - Complete redesign with slides

### Testing Results
- ✅ All 25 quiz questions display correctly
- ✅ Quiz feedback (correct/wrong) works instantly
- ✅ Difficulty switcher updates user in database
- ✅ Slides contain complete logical sections
- ✅ Tables render properly with styling
- ✅ No console errors (hydration fixed)
- ✅ Navigation between lessons works
- ✅ Videos play correctly

### Statistics
- **Database**: 1 new table (quizzes)
- **API Endpoints**: +2 (quiz, difficulty)
- **Frontend Components**: +1 (Quiz.tsx)
- **Quiz Questions**: 25 (educational quality)
- **Commits**: 6 during this session
- **Lines of Code**: ~500+ added

---

## Day 6: Difficulty-Based Courses

**Date**: 2025-11-19
**Goal**: Implement difficulty-based course filtering.

### Log
- **[PLANNING]**: Created implementation plan for difficulty-based courses.
- **[EXECUTION]**: Added `difficulty_level` field to Course model.
- **[EXECUTION]**: Updated Course schema to include difficulty_level.
- **[EXECUTION]**: Modified `GET /courses/` endpoint to filter by user difficulty.
- **[EXECUTION]**: Created comprehensive seed data for all 4 difficulty levels.
- **[EXECUTION]**: Converted homepage to client component with auth.
- **[EXECUTION]**: Added difficulty badges and personalized course display.
- **[VERIFICATION]**: Tested with admin account - shows Expert courses correctly.
- **[COMMIT]**: Committed as `feat: difficulty-based courses (Day 6 complete)`.

## Day 5: Frontend Authentication & Route Protection

**Date**: 2025-11-19
**Goal**: Implement user authentication and route protection.

### Log
- **[PLANNING]**: Created implementation plan for frontend auth.
- **[EXECUTION]**: Created `AuthContext.tsx` for managing user state and JWT tokens.
- **[EXECUTION]**: Implemented Login page (`/login`) with email/password form.
- **[EXECUTION]**: Implemented Register page (`/register`) with Duke Nukem difficulty selection.
- **[EXECUTION]**: Implemented Profile page (`/profile`) displaying user info and difficulty.
- **[EXECUTION]**: Created `NavBar.tsx` with conditional rendering (Login/Register vs Profile/Logout).
- **[EXECUTION]**: Added CORS middleware to backend (`main.py`) to allow frontend requests.
- **[VERIFICATION]**: Tested registration, login, profile access - all working.
- **[EXECUTION]**: Created `ProtectedRoute.tsx` component for route protection.
- **[EXECUTION]**: Converted course and lesson pages to client components.
- **[EXECUTION]**: Wrapped protected pages in `ProtectedRoute`.
- **[VERIFICATION]**: Tested route protection - unauthenticated users cannot view course content.
- **[COMMIT]**: Ready to commit as `feat: frontend auth + route protection (Day 5 complete)`.

## Day 4: Agent Mode Setup & Lessons API

**Date**: 2025-11-19
**Goal**: Establish agent context structure and implement Lessons API.

### Log
- **[PLANNING]**: Created implementation plan.
- **[EXECUTION]**: Created `.ai-context` directory structure.
- **[EXECUTION]**: Migrated `AI_PROMPT_DAY*.md` to `.ai-context/daily/`.
- **[EXECUTION]**: Created context files (`.instructions.md`, `PROJECT_CORE.md`, `ARCHITECTURE.md`, `module-learning-basics.md`).
- **[EXECUTION]**: Migrated `MASTER_CONTEXT.md` and `IDEAS.md` content to `.ai-context/`.
- **[EXECUTION]**: Implemented `LessonSummary` schema to optimize `GET /lessons/` payload (removed `content` field).
- **[EXECUTION]**: Added `backend/tests/test_api.py` and installed `pytest`.
- **[VERIFICATION]**: Ran tests: 3 passed. Verified `GET /lessons/` does not return content, `GET /lessons/{id}` does.
- **[COMMIT]**: Committed changes as `agent: setup .ai-context + optimize lessons api endpoints`.

---

## Next Steps (Day 8)

### Potential Focus Areas:

#### Option A: Progress Tracking System
- **Database**: Create `UserProgress` model (user_id, lesson_id, completed, completed_at)
- **API**: Endpoints to mark lessons complete and get user progress
- **Frontend**: Progress indicators on course/lesson pages
- **Dashboard**: User progress dashboard showing completion stats
- **Achievements**: Basic achievement system (e.g., "Completed first course")

#### Option B: Advanced Content Features
- **Markdown Parser**: Better markdown rendering (code blocks, images, links)
- **Interactive Elements**: Embedded exercises, code playgrounds
- **Rich Media**: Support for custom videos, animations
- **Notes System**: Allow users to take notes on lessons

#### Option C: Course Management
- **Admin Panel**: Interface to create/edit courses and lessons
- **Content Editor**: WYSIWYG or markdown editor for lessons
- **Quiz Builder**: UI to create quiz questions
- **Analytics**: Track user engagement, quiz scores

#### Option D: Enhanced Learning Experience
- **Spaced Repetition**: Review system for quizzes
- **Certificates**: Generate completion certificates
- **Community**: Discussion forums per lesson
- **AI Tutor**: ChatGPT integration for Q&A

**Recommendation**: Start with Progress Tracking (Option A) as it's foundational for learner motivation and provides data for future features.

```


## 📄 FILE: ARCHITECTURE.md
```markdown
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
3.  **Database**: PostgreSQL 15
    - **Port**: 5432
    - **Role**: Persistent storage (Users, Courses, Lessons, Progress).
4.  **Cache/Queue**: Redis 7
    - **Port**: 6379
5.  **Automation**: n8n
    - **Port**: 5678
    - **Role**: Background workflows, DB connection.

## 🔄 Data Flow (MVP)
1.  **Lesson Retrieval**: User -> Frontend -> `GET /api/lessons/{id}` -> Backend -> DB.
2.  **Quiz Submission**: User -> Frontend -> `POST /api/quiz/submit` -> Backend -> DB (Store) -> AI Service (Feedback) -> DB (Update).
3.  **Docker Networking**: Frontend calls Backend via `http://backend:8000` (Server-side) or `localhost:8000` (Client-side/Browser).

## 🔌 Integration Points
- **LLM Feedback**: Integrated via dedicated service or direct API call.
- **Stripe**: (Planned) Payment processing.

```


## 📄 FILE: implementation_plan.md
```markdown
## 🎨 UX/UI & Content Strategy (Updated)

### 1. The "Train vs. Desktop" Split
We will structure every lesson into two distinct phases within the MDX:
* **Phase 1: The Concept (Theory)** - Consumable on mobile. Videos, text, diagrams, quizzes.
* **Phase 2: The Lab (Practice)** - Requires interaction. Prompts, tools, exercises.
* *Visual Cue*: A clear divider or "Mode Switch" visual in the lesson layout.

### 2. Rich MDX Architecture
To support "Modern" content, we need custom React components usable inside MDX files:
* `<Callout type="warning|info|tip">`: Beautiful colored boxes with icons.
* `<Steps>`: Vertical timeline for tutorials.
* `<ConceptCard>`: Glassmorphism cards for key definitions.
* `<MobileOnly>` / `<DesktopOnly>`: Utilities to hide complex practice tasks on mobile if needed.

### 3. Content Upgrade (Lesson 1 & 2)
* **Length**: Increase word count by ~50-80% with deeper explanations.
* **Tone**: More authoritative but accessible (Duke Nukem style touches for higher difficulties).
* **Media**: Placeholders for now, but structured to be replaced by high-quality assets later.
```


## 📄 FILE: task.md
```markdown
# Task List - Cycle 11: [Next Cycle Name]

- [ ] **[Feature/Task Name]**
    - [ ] [Subtask 1]
    - [ ] [Subtask 2]
```


## 📄 FILE: IDEAS.md
```markdown
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

```


## 📂 PROJECT FILE STRUCTURE (Current State)
```text
  📁 content/
    📄 test.txt
    📁 courses/
      📁 practical-prompt-engineering/
        📄 meta.json
        📁 lessons/
          📁 01-patterns/
            📄 meta.json
            📄 content.mdx
          📁 02-context/
            📄 meta.json
            📄 content.mdx
      📁 advanced-ai-techniques/
        📄 meta.json
        📁 lessons/
          📁 02-few-shot/
            📄 meta.json
            📄 content.mdx
          📁 01-chain-of-thought/
            📄 meta.json
            📄 content.mdx
      📁 ai-basics-beginner/
        📄 meta.json
        📁 lessons/
          📁 01-what-is-ai/
            📄 meta.json
            📄 quiz.json
            📄 content.mdx
            📁 images/
              📄 ai-vs-programming.png
              📄 ai-timeline.png
          📁 05-course-summary/
            📄 meta.json
            📄 quiz.json
            📄 content.mdx
          📁 03-your-first-prompt/
            📄 meta.json
            📄 quiz.json
            📄 content.mdx
            📁 images/
              📄 prompt-formula.png
              📄 bad-vs-good-prompt.png
          📁 04-ai-in-daily-life/
            📄 meta.json
            📄 quiz.json
            📄 content.mdx
            📁 images/
              📄 ai-daily-timeline.png
          📁 02-how-does-ai-learn/
            📄 meta.json
            📄 quiz.json
            📄 content.mdx
            📁 images/
              📄 ml-process.png
              📄 ml-types.png
      📁 ai-engineering-deep-dive/
        📄 meta.json
        📁 lessons/
          📁 02-fine-tuning/
            📄 meta.json
            📄 content.mdx
          📁 01-rag/
            📄 meta.json
            📄 content.mdx
  📁 .ai-context/
    📄 IDEAS.md
    📄 PROJECT_CORE.md
    📄 GEMINI_PROMPT.md
    📄 HISTORY.md
    📄 ARCHITECTURE.md
    📄 WORKFLOW.md
    📄 FALLBACK-CLAUDE.md
    📄 AGENT-STATE.md
    📄 task.md
    📄 implementation_plan.md
    📁 completed_cycles/
      📄 cycle_10_ui_and_fixes.md
      📄 cycle_08.md
      📄 cycle_09.md
    📁 archive/
      📁 cycle-10/
        📄 SUMMARY.md
        📄 components_mockup.png
        📄 walkthrough.md
    📁 modules/
      📄 module-learning-basics.md
  📁 frontend/
    📄 Dockerfile
    📄 README.md
    📄 components.json
    📄 eslint.config.mjs
    📄 next.config.ts
    📄 next-env.d.ts
    📄 package-lock.json
    📄 package.json
    📄 postcss.config.mjs
    📄 tsconfig.json
    📁 app/
      📄 layout.tsx
      📄 favicon.ico
      📄 page.tsx
      📄 globals.css
      📁 login/
        📄 page.tsx
      📁 profile/
        📄 page.tsx
      📁 register/
        📄 page.tsx
      📁 courses/
        📁 [courseId]/
          📄 page.tsx
          📁 lessons/
            📁 [lessonId]/
              📄 page.tsx
    📁 client/
      📄 index.ts
      📁 core/
        📄 ApiResult.ts
        📄 OpenAPI.ts
        📄 CancelablePromise.ts
        📄 ApiRequestOptions.ts
        📄 ApiError.ts
        📄 request.ts
      📁 models/
        📄 Course.ts
        📄 Lesson.ts
        📄 ValidationError.ts
        📄 HTTPValidationError.ts
      📁 services/
        📄 DefaultService.ts
    📁 components/
      📄 MDXImage.tsx
      📄 Quiz.tsx
      📄 LessonComplete.tsx
      📄 MarkdownRenderer.tsx
      📄 CodeBlock.tsx
      📄 ProtectedRoute.tsx
      📄 NavBar.tsx
      📄 CalloutBox.tsx
      📄 TryItYourself.tsx
      📁 mdx/
        📄 Callout.tsx
        📄 Steps.tsx
        📄 ConceptCard.tsx
      📁 ui/
        📄 card.tsx
        📄 button.tsx
    📁 lib/
      📄 utils.ts
      📁 api/
        📄 index.ts
        📁 core/
          📄 ApiResult.ts
          📄 OpenAPI.ts
          📄 CancelablePromise.ts
          📄 ApiRequestOptions.ts
          📄 ApiError.ts
          📄 request.ts
        📁 models/
          📄 LessonResponse.ts
          📄 CourseResponse.ts
          📄 DifficultyLevel.ts
          📄 CourseCreate.ts
          📄 ValidationError.ts
          📄 HTTPValidationError.ts
        📁 services/
          📄 DefaultService.ts
    📁 public/
      📄 next.svg
      📄 globe.svg
      📄 window.svg
      📄 file.svg
      📄 vercel.svg
      📁 images/
        📄 course-cover-beginner.png
        📁 lessons/
    📁 context/
      📄 AuthContext.tsx
  📁 backend/
    📄 Dockerfile
    📄 test_output.txt
    📄 requirements.txt
    📄 test_output_auth.txt
    📄 seed.py
    📁 content/
    📁 app/
      📄 auth.py
      📄 schemas.py
      📄 __init__.py
      📄 database.py
      📄 main.py
      📄 models.py
      📁 services/
        📄 content_loader.py
    📁 tests/
      📄 test_auth.py
      📄 test_api.py
  📁 .agent/
    📁 rules/
      📄 rules.md
  📁 scripts/
    📄 context_builder.py
    📄 export_content.py
```


----------------------------------------
## 🗣️ USER MESSAGE:
(Write your specific request for this session here...)
