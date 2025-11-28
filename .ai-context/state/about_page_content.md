# About This Project

## The Vision: AI Education Built by AI, For Everyone

AI Learning Platform isn't just another online course — it's a **living ecosystem** where learners don't just consume content, they actively shape it. The ultimate goal? By the end of your journey, you'll build your own version of this platform. That's not a metaphor — that's literally the final project.

We believe the best way to learn AI is to **build with AI, alongside AI agents**, in a transparent, auditable, and collaborative environment.

---

## How It All Started: The Multi-Agent Genesis

This project didn't begin with a traditional dev team. It started with a **question**: *What if we could leverage multiple AI models — each with unique strengths — to collaboratively build something greater than any single model could achieve alone?*

### The Research Phase (2023–2024)
- Early experiments with **Galaxy AI** and **Gemini 2.5 Pro** to test multi-agent coordination
- Discovery of **MCP (Model Context Protocol)** as the orchestration layer
- Manual context transfer between platforms (painful, but educational)

### The Evolution (2024–2025)
As new models emerged, we integrated them:
- **Antigravity IDE** for visual development and quick edits
- **Gemini 3 Pro CLI** for deep technical work with full repo context
- **Claude Opus 4.5** and **Sonnet 4.5** for strategic planning and validation
- **Perplexity (with MCP)** as Lead Architect for research, planning, and cross-platform context synthesis

Each new agent didn't replace the previous ones — they **specialized**. Some handle research, others write code, some validate, and others orchestrate. The platform you're using right now was built by this exact workflow.

---

## The Tech Stack: Chosen for a Reason

Every technology decision was made to support **transparency, collaboration, and scale**:

| Technology | Why This Choice |
|------------|-----------------|
| **Next.js 14+** | Server-side rendering, optimal performance, modern React patterns |
| **WSL2 (local dev)** | Cross-platform compatibility, Linux tooling, seamless CI/CD |
| **GitHub as Source of Truth** | Single, auditable history; every change is tracked |
| **MCP (Model Context Protocol)** | Standardized agent communication, context sharing across platforms |
| **MDX for Content** | Code + content in one place, reusable components (ConceptCard, Diagram) |
| **Small, Atomic Commits** | Easier rollbacks, clear history, better collaboration |

We didn't chase trends. We chose tools that let **humans and AI agents work together efficiently**.

---

## The Secret Sauce: Context Transfer & Clear Rules

Most AI-assisted projects fail because **context gets lost**. When you switch tools (CLI → IDE), change team members, or resume work after a break, you lose continuity.

### How We Solved It

We built a **context preservation system** into the project structure:

```
.ai-context/
├── AGENT-STATE.md       # Current state, decisions, next steps
├── WORKFLOW.md          # How we work (roles, cycles, handoffs)
├── PROJECT_CORE.md      # Mission, philosophy, core rules
├── CURRICULUM_STRATEGY.md  # Educational philosophy
└── CONTENT_GUIDELINES.md   # Lesson design principles

.agent/
└── rules.md             # Agent behavior rules (CLI + IDE)
```

Every agent (CLI, IDE, human) reads these files before working. This ensures:
- ✅ No duplicate work
- ✅ Consistent quality across cycles
- ✅ Seamless handoffs between tools/people
- ✅ Full auditability (every decision is documented)

**Result**: We can pause development, come back weeks later, and pick up exactly where we left off — with full context.

---

## The Workflow: Iterative Cycles, Not Sprints

We don't use traditional sprint planning. Instead, we work in **Cycles**:

1. **Research & Planning** (Perplexity + Gemini)
2. **Implementation** (CLI agents with GitHub integration)
3. **Validation** (IDE agents + manual browser testing)
4. **Documentation** (Update AGENT-STATE.md, commit, push)
5. **Handoff** (Next cycle starts with full context)

Each cycle is **small, atomic, and reversible**. If something breaks, we roll back one cycle — not an entire sprint.

---

## Gamification: Learning by Becoming

The platform uses **progressive character evolution**:
- Start as a "Rookie" (beginner-friendly lessons, 15-30 min/day)
- Earn XP through labs and projects
- Unlock advanced content and features
- Visual avatar evolves (inspired by "Clippy → AI Cyborg")
- Optional Light/Dark mode themes (Jedi vs. Sith paths)

But gamification isn't just for engagement — it's **pedagogical**:
- Early lessons are gentle, concept-focused
- Mid-level content increases hands-on labs
- Advanced stages are 80% practical projects
- **Final challenge**: Build your own AI learning platform (yes, this one)

---

## What Makes This Project Unique

### 1. **Built WITH AI, Not Just ABOUT AI**
Every feature, lesson, and component was developed collaboratively with AI agents. You're learning from a platform that practices what it teaches.

### 2. **Transparent Multi-Agent Orchestration**
Most AI projects hide their process. We document everything:
- Which agent did what
- Why decisions were made
- How context was preserved
- What worked (and what didn't)

### 3. **Progressive, Practical Curriculum**
Theory is minimal. Labs are mandatory. The final project is **building this platform from scratch** — using the same tools and workflows we used.

### 4. **Open Collaboration Model**
The `.ai-context/` structure isn't just for us — it's a **template** for any team (human or AI) to collaborate effectively on complex projects.

---

## Current Status & What's Next

**Cycle 17 (November 2025)**: Core curriculum complete, gamification system live, multi-agent workflow fully documented.

**Next Goals**:
- Localization (EN/CZ) with smart i18n strategy
- Community contributions (your PRs are welcome!)
- Advanced labs using latest models (GPT-5, Gemini 3.5, Claude Opus 5)
- Mobile-first redesign for on-the-go learning

---

## Want to Contribute?

This project is **open-source and agent-friendly**. Whether you're a developer, designer, educator, or AI enthusiast:

1. Read `.ai-context/WORKFLOW.md` to understand how we work
2. Check open issues on GitHub
3. Submit PRs (we love atomic commits!)
4. Share your own multi-agent workflows

**The platform is built by the community, for the community — human AND AI.**

---

## Try It, Break It, Build It

Start with Lesson 1, earn your first XP, and see how far you can go. By the end, you won't just understand AI — you'll have built your own platform to teach others.

**That's the vision. That's the mission. That's AI Learning Platform.**
