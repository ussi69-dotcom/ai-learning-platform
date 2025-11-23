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

## 🎓 Curriculum Philosophy & Progression

### Core Principle: "From Theory to Practice"
As students advance, the ratio shifts from **learning** to **doing**.

| Level | Theory:Practice | Lesson Length | Daily Commitment |
|-------|-----------------|---------------|------------------|
| **Beginner (IM_A_ROOKIE)** | 70:30 | 15-30 min | 1 lesson/day |
| **Intermediate (LETS_ROCK)** | 40:60 | 15 min theory + 45 min lab | 1 lesson/day |
| **Advanced (COME_GET_SOME)** | 25:75 | 10 min prep + 90 min project | 2-3 days/lesson |
| **Expert (DAMN_IM_GOOD)** | 10:90 | 5 min brief + real project | 1 week/project |

### The Meta-Learning Arc
- **Day 1-7 (Beginner):** Learn what AI is, how it works, basic prompting
- **Day 8-14 (Intermediate):** Build AI-powered tools, integrate APIs
- **Day 15-21 (Advanced):** RAG systems, fine-tuning, production deployment
- **Day 22-30 (Expert):** **Build THIS platform** (inception moment - you become the builder)

### Evening Lab Pattern (Intermediate+)
Students learn theory "on the commute" (15-30 min mobile-friendly content), then execute labs in the evening with full focus.

**Example flow:**
- 🚆 Morning commute: Read "What is RAG?" (theory)
- 🌙 Evening: Build a RAG chatbot (90 min hands-on lab)

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

### Week 1: Foundation (Beginner)
- **Day 1**: What is AI? (Programming vs Training) ✅
- **Day 2**: How does AI learn? (Supervised, Unsupervised, Reinforcement) 🚧
- **Day 3**: Your first prompt (Prompt patterns & techniques)
- **Day 4**: AI in daily life (Recognition, recommendations, generation)
- **Day 5**: Ethics & limitations (Bias, hallucinations, privacy)
- **Day 6**: Intro to LLMs (GPT, Claude, Gemini comparison)
- **Day 7**: Week 1 Review + Mini Challenge

### Week 2: Builder Basics (Intermediate)
- **Day 8**: OpenAI API setup & first call
- **Day 9**: Prompt engineering patterns (Role, context, examples)
- **Day 10**: Building a chatbot (Frontend + Backend)
- **Day 11**: Image generation (Stable Diffusion / DALL-E)
- **Day 12**: Voice synthesis (ElevenLabs)
- **Day 13**: Multi-modal projects (Text → Image → Voice)
- **Day 14**: Week 2 Review + Deploy your first AI app

### Week 3: Production Systems (Advanced)
- **Day 15**: RAG (Retrieval-Augmented Generation)
- **Day 16**: Vector databases (Pinecone, Weaviate, Chroma)
- **Day 17**: Fine-tuning LLMs
- **Day 18**: AI Agents (Multi-step reasoning, tool use)
- **Day 19**: ML Ops basics (Monitoring, logging, versioning)
- **Day 20**: Security (Prompt injection, data privacy)
- **Day 21**: Week 3 Review + Production deployment

### Week 4: Meta-Project (Expert)
- **Day 22-30**: **Build THIS platform**
  - Next.js frontend
  - FastAPI backend
  - PostgreSQL database
  - OpenAI integration
  - Docker deployment
  - Open source contribution

## 🎮 Gamification & Difficulties ("Duke Nukem" Style)
- **IM_A_ROOKIE (Piece of Cake)**: Easy mode, more hints, slower pace
- **LETS_ROCK**: Standard mode, balanced guidance
- **COME_GET_SOME**: Hard mode, less help, more independence
- **DAMN_IM_GOOD**: Expert mode, minimal guidance, production-ready output

## 📐 Styleguide
- **Backend**: Python 3.11+, FastAPI, Pydantic v2. Type hints everywhere.
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Shadcn/ui.
- **Naming**: `snake_case` (Python), `camelCase` (JS/TS), `PascalCase` (Classes).

---

**Status:** Aktualizováno listopad 2025  
**Agent Architecture:** Perplexity (Architect) + Antigravity (Executor)  
**OSS/Gemini/ostatní agenti se NEpoužívají pro tento projekt**