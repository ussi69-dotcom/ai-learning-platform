# 🎓 AI Learning Platform - Curriculum Roadmap

> **LAST REVIEW:** Cycle 48 (Phase 2 Complete Restructure)
> **STATUS:** Phase 2 restructured with 11 lessons. Ready for content creation.
> **DATE:** 2025-12-06

---

## Vision
**"Don't just learn about the Force. Learn to wield it."**
Students start as **Padawans** (Users) and graduate as **Jedi Knights** (Builders). The final project is rebuilding this very platform.

**Target Persona: The Sovereign Builder**
- AI enthusiasts who completed basics
- NOT fully technical yet, but willing to learn tools
- Want practical skills usable at work/home TODAY
- Preparing for Advanced course (APIs, production systems)

---

## 🗺️ Roadmap Status

### ✅ Phase 1: The Padawan (AI Basics) - COMPLETED
**Goal:** Master the tools and understand the mechanics. "Golden Standard" achieved in Cycle 27.
**Course:** `ai-basics-beginner` (Difficulty: PIECE_OF_CAKE)

**The Completed Curriculum:**
1. **What is AI?** (Programming vs Training) - *SVG Visualized*
2. **How Machines Learn** (Supervised/Unsupervised/RL) - *Visual Workflows*
3. **LLMs Explained** (Tokens, Context, Temperature) - *Interactive Labs*
4. **Prompt Engineering** (6 Pillars of Precision) - *Few-Shot Diagrams*
5. **The Dark Side** (Hallucinations & Bias) - *Safety First*
6. **AI at Work** (Enterprise Tools) - *Dashboard Simulation*
7. **Mission Summary** (Toolkit & Next Steps) - *Grand Finale*

---

### 🚧 Phase 2: Practical Prompt Engineering - RESTRUCTURED (Dec 2025)
**Goal:** From "Chatting with AI" to "Building Reliable Systems"
**Course:** `practical-prompt-engineering` (Difficulty: LETS_ROCK)
**Format:** 20 min theory (commute) + 60-90 min hands-on lab (evening)
**Pedagogy:** "Fail First" - students see failure, analyze why, then fix

#### 📚 The 11-Lesson Curriculum

| # | Lesson | Core Concept | Key Tools (Dec 2025) | Duration |
|---|--------|--------------|---------------------|----------|
| 01 | **Prompt Architecture Masterclass** | Structure > magic words, System Prompts as OS | Claude 4.5, Gemini 3 Pro, GPT-4o | 2h |
| 02 | **Advanced Reasoning & Red Teaming** | CoT, CoVe, Self-Consistency, ToT, Injection Defense | Playgrounds | 2h |
| 03 | **Reliability, Testing & Cost** | Promptfoo, Prompt Caching, Token Economics, Versioning | Promptfoo, Helicone | 2.5h |
| 04 | **Local Intelligence** | VRAM math, Quantization, Model Scouting | Ministral 8B, Gemma 3 4B, Qwen3-14B, LM Studio, Ollama | 2h |
| 05 | **Structured Data Extraction** | JSON Mode, Schema validation, DSPy intro | Ollama JSON mode | 2h |
| 06 | **RAG & Knowledge Systems** | Embeddings, Vector search, Privacy-first | Chroma, nomic-embed | 2.5h |
| 07 | **AI-Powered Development** | IDE setup, MCP servers, Multi-model workflow | Antigravity, Cursor, Cline, MCP | 2h |
| 08 | **No-Code Automation** | Visual workflows, Triggers, Error handling | n8n v2.0 | 2h |
| 09 | **Docker & Self-Hosting** | Containers, Persistence, Networking | Docker, Ollama server | 2h |
| 10 | **Agentic Orchestration** | Router pattern, Tool calling, Ensemble, Memory | LangGraph, CrewAI v1.6 | 2.5h |
| 11 | **Capstone: Multi-Agent Swarm** | Swarm architecture, AI Handoff patterns | n8n + Ollama + Search | 3h |

**Total Course Duration:** ~25 hours

#### 🎥 YouTube Resources per Lesson

| Lesson | EN Video | CZ Alternative |
|--------|----------|----------------|
| 01 | Karpathy "State of GPT" | David Grudl |
| 02 | AI Explained (CoT/ToT) | Petr Mára |
| 03 | Jason Coup (Promptfoo) | - |
| 04 | Matt Williams (Ollama) | AlzaTech |
| 05 | IndyDevDan (Structured Data) | David Grudl |
| 06 | Pixegami (ChromaDB RAG) | ML Prague |
| 07 | Traversy Media (Cursor) | David Grudl |
| 08 | NeuralNine (n8n) | - |
| 09 | NetworkChuck (Docker) | - |
| 10 | Dave Ebbelaar (AI Agents) | Petr Mára |
| 11 | OpenAI Swarm Demo | - |

#### 🔑 Key Differentiators (vs Competitors)
- **Local-First:** Privacy, cost savings, sovereignty
- **Fail-First Pedagogy:** Learn from mistakes, not just success
- **Real Tools:** Not just theory - actual installations and workflows
- **MCP Integration:** Cutting-edge Model Context Protocol
- **Multi-Model:** Claude + Gemini + Local workflow

---

### 📋 Phase 3: The Master (Production Systems) - PLANNED
**Goal:** Ship scalable, secure AI systems. Python APIs and beyond.
**Course:** `advanced-ai-techniques` (Difficulty: COME_GET_SOME)

**Planned Topics:**
1. **Python API Mastery** - OpenAI/Anthropic SDK, async patterns
2. **Production RAG** - Pinecone, Weaviate, scaling vectors
3. **AI Agents in Code** - LangGraph, CrewAI advanced patterns
4. **Eval & Monitoring** - Production observability, A/B testing
5. **Fine-tuning** - When and how to train custom models
6. **Deployment** - Docker, Kubernetes, serverless AI

---

### 🔮 Phase 4: The Architect (Deep Dive) - FUTURE
**Goal:** Build AI-native applications from scratch.
**Course:** `ai-engineering-deep-dive` (Difficulty: DAMN_IM_GOOD)

**Vision Topics:**
- Building this very platform from scratch
- AI-native architecture patterns
- Multi-agent production systems
- Cost optimization at scale

---

## 📚 "Golden Standard" Content Rules

### Structure of Every Lesson
1. **Header Callout:** Mission goal, reading time, lab count
2. **The Hook:** Why this matters (Star Wars analogy allowed)
3. **Core Concepts:** Sections with visual anchors (Diagrams)
4. **Interactive Lab:** "Fail First" design with clear success criteria
5. **The Holocron:** Summary ConceptCard with key takeaways

### Visual Rules
- **SVG-First:** Use `<Diagram type="...">` components
- **Dark Mode:** Always use `fill-slate-600 dark:fill-slate-400`
- **No Raster Images:** Register new diagram types in `frontend/components/mdx/diagrams/`

### Lab Standards
- **Copy-Paste Ready:** Exact commands, no vague instructions
- **Fail First:** Show broken example, analyze, then fix
- **Verification:** Clear success criteria ("You'll know it works when...")
- **Real Tools:** Actual installations, not simulations

### Localization
- **Dual Files:** `content.mdx` (EN) + `content.cs.mdx` (CS)
- **No Machine Translation:** Idiomatic Czech
- **Terminology:** Keep English terms where standard (Token, Prompt, etc.)

---

## 🏭 Content Creation Workflow

```
1. RESEARCH (Gemini)
   - Web search for latest docs
   - YouTube video research
   - Competitive analysis

2. BRIEF (Claude)
   - Learning outcome definition
   - Persona and tone
   - Lab requirements

3. DRAFT (Gemini)
   - Full MDX content (Theory + Lab)
   - Diagram proposals
   - Quiz questions

4. REVIEW (Claude - Senior QA)
   - Quality check
   - Fact verification
   - Content Guidelines compliance

5. VERIFY (Claude)
   - Playwright visual check
   - Diagram rendering
   - Final commit
```

---

**Last Updated:** Cycle 48 (2025-12-06) - Complete Phase 2 Restructure
**Research Sources:** ChatGPT, Gemini Deep Research, Perplexity Pro, Reddit, YouTube
