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
- **Day 4**: Agent Mode Setup & Lessons API (Current) 🚧
- **Day 5**: Stripe Payments (Subscription model) - *Originally Day 4*
- **Day 6**: OpenAI API Integration
- **Day 7**: Week 1 Review + Mini Project

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
