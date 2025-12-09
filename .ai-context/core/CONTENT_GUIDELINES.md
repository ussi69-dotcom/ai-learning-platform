# 📜 Content Guidelines (Edutainment Standard v3.0)

This document defines the **Edutainment v3.0** quality standard. "Good enough" is failure. We aim for **Wow Effect**.

> **Klíčová změna v3.0:** Vizuální obsah zajistí 60% retence vs 20% u čistého textu. SVG diagramy jsou POVINNÉ pro každý koncept.

---

## 🎬 EDUTAINMENT VISION (NEW!)

### Proč Edutainment?

| Metoda | Retence znalostí |
|--------|------------------|
| 📖 Čistý text | ~20% |
| 🎨 Vizuální obsah | ~60% |
| 🎬 Video + Interakce | ~80% |
| 🧪 Praktický lab | ~90% |

**Náš cíl:** Každá lekce kombinuje VŠECHNY metody pro 80%+ retenci.

### 4 pilíře Edutainmentu

| Pilíř | Vzor | Implementace |
|-------|------|--------------|
| 🔥 **Vysoká energie** | NetworkChuck | Bold claims, call-to-action, "musíte to zkusit hned!" |
| 🎨 **Vizuální intuice** | 3Blue1Brown | SVG diagram pro KAŽDÝ koncept, animace kde možné |
| ⚡ **Okamžité ROI** | Jeff Su | "Použij to zítra v 9 ráno", copy-paste šablony |
| 🎮 **Gamifikace** | Lakera Gandalf | Challenges, leaderboardy, achievement badges |

### "Wow" Checklist (MUST PASS)

```markdown
□ Hook v prvních 30 sekundách?
□ Video embed od kvalitního tvůrce?
□ Min. 3 SVG diagramy na lekci?
□ Praktický "try it now" moment?
□ Copy-paste ready kód/prompty?
□ "Wow" moment nebo překvapení?
□ Jasná ROI - "co z toho mám"?
```

---

## 1. Audience & Tone of Voice

### Target Persona: The Ambitious Learner

Our primary audience is technically curious and motivated, but not necessarily a senior developer. They may be:
- A student exploring AI
- A junior developer transitioning to ML/AI
- A data analyst wanting to understand LLMs
- A product manager needing deep AI knowledge

### Tone Guidelines

| Principle | Description |
|-----------|-------------|
| **Expert, but Approachable** | We are a trusted mentor, not an academic journal. Explain complex topics simply, without dumbing them down. |
| **Inspirational** | Use the Jedi/Sith theme to create excitement. Frame learning as a heroic journey. |
| **Pragmatic** | Every theory connects to practice. Reader must understand *why* they're learning something. |
| **Empathetic** | Acknowledge difficulty. For tool installations (WSL, Docker, LM Studio), assume zero prior setup. |
| 🆕 **High-Energy** | Channel NetworkChuck - enthusiastic, direct calls to action, "you need to try this!" |

---

## 2. Core Philosophy

* **Research-First:** Never write from memory. Synthesize top-tier sources (YouTube, Papers, Blogs).
* **Deep & Interactive:** No short articles. No passive reading. Labs must *challenge* the user.
* **Visual Storytelling:** Every complex concept must have a diagram.
* **Jedi/Sith Theme:** Use analogies (The Force, Droids, Holocrons) but keep it professional.

---

## 3. Quality Assurance Process

The full QA workflow is defined in `.ai-context/workflows/MULTI_AGENT_WORKFLOW.md`.

**Key Points:**
1. **Claude = Orchestrator & QA Gate** - Reviews all content before publish
2. **Gemini = Researcher & Draft Creator** - Deep research, content generation
3. **Excellence Loop** - Iterate until 99% quality
4. **Verification Checklist** - See WORKFLOW.md Section 3

> ⚠️ **Never publish without passing the QA Checklist in WORKFLOW.md**

---

## 4. Structure of a Lesson

Every lesson MUST follow this structure:

### A. The Hook & Video 🎥

* **Why it matters:** Strong opening (Star Wars analogy allowed).
* **Curated Video:** MUST include a link to a high-quality video explanation.
  * **Primary:** Best English video available (e.g., Andrej Karpathy, 3Blue1Brown, Elvis Saravia).
  * **Local:** Best Czech video (or EN with high-quality CS subs).

**Recommended YouTube Channels:**
| Topic | EN Channels | CZ Channels |
|-------|-------------|-------------|
| LLM Fundamentals | Andrej Karpathy, 3Blue1Brown | - |
| Prompt Engineering | Elvis Saravia, Learn Prompting | - |
| AI News/Trends | AI Explained, Two Minute Papers | board_room.io |
| Practical AI | Matt Wolfe, All About AI | - |

### B. Core Concepts (Deep Dives) 🧠

* **Depth:** No surface-level skimming. Go deep. Explain *why*, not just *what*.
* **Visual Anchors:** Every major concept needs a `<Diagram>` or `<ConceptCard>`.
* **Length:** A lesson under 1500 words is likely too shallow (unless purely practical).
* **Progressive Complexity:** Start accessible, build to advanced. Each lesson slightly harder than previous.

### C. Interactive Labs (The Dojo) 🧪

**What's BANNED:**
* ❌ Passive "Copy this prompt and see what happens"
* ❌ Vague instructions ("try different prompts")
* ❌ Labs without clear success criteria

**What's REQUIRED:**
* ✅ Result-oriented missions with clear objectives
* ✅ Explicit verification steps (how to know you succeeded)
* ✅ Real tools when appropriate (WSL, Python, LM Studio, Promptfoo)

#### Lab Structure Template

Every lab MUST follow this template:

```markdown
## 🧪 Lab: [Descriptive Name]

### 🎯 Objective
One sentence: what will the user achieve?
> Example: "Modify a system prompt to bypass safety guardrails."

### 📋 Prerequisites
- Tool/knowledge requirement 1
- Tool/knowledge requirement 2

### 🛠️ Steps

#### Phase 1: Setup
[Numbered steps with exact commands]

#### Phase 2: The Challenge
[The actual task - what they need to figure out]

#### Phase 3: Verification
[How to confirm success]

### ✅ Success Criteria
Clear description of expected outcome.
> Example: "Success when the model responds as a pirate without safety warnings."

### 💡 Hints (Optional)
Collapsible hints for stuck users.
```

#### Lab Progression by Difficulty

| Difficulty | Lab Type | Example |
|------------|----------|---------|
| Beginner | Browser-based, copy-modify | Modify prompt in ChatGPT |
| Intermediate | Tool installation + use | Install LM Studio, run local model |
| Advanced | Multi-tool workflow | Promptfoo eval + local LLM + Python script |

### D. The Holocron (Summary) 💾

* A summary `<ConceptCard>` at the end.
* Must synthesize the "Aha!" moment of the lesson.
* Include 3-5 key takeaways as bullet points.

---

## 5. Visual Rules (SVG First) 🎨

> **⚠️ CRITICAL v3.0:** Vizuální obsah = 60% retence. SVG diagramy jsou POVINNÉ, ne volitelné!

### Minimální požadavky na lekci

| Délka lekce | Min. diagramů | Min. tabulek |
|-------------|---------------|--------------|
| < 2000 slov | 3 | 2 |
| 2000-4000 slov | 5 | 3 |
| > 4000 slov | 7+ | 4+ |

### SVG Pravidla

* **NO Raster Images:** Use `<Diagram type="...">` (SVG).
* **Mandatory Diagrams:** KAŽDÝ koncept = 1 diagram. Bez výjimek.
* **Dark Mode:** Always use `fill-slate-600 dark:fill-slate-400` for compatibility.
* **Registration:** New diagram types must be registered in `frontend/components/mdx/Diagram.tsx`.
* 🆕 **Gemini Generator:** Pro nové diagramy použij Gemini CLI k generování SVG kódu.

### Available Diagram Types

Check `frontend/components/mdx/diagrams/` for existing diagrams before creating new ones:
- History: `traditional-vs-ml`, `ai-timeline`, `ai-history-timeline`
- Training: `training-loop`, `training-pipeline`
- Concepts: `tokenization-viz`, `llm-next-token`, `context-window`, `temperature-scale`
- Prompting: `few-shot-learning`, `chain-of-thought`, `system-prompt-flow`
- Security: `prompt-injection-flow`, `sql-vs-prompt-injection`, `defense-layers`
- Evaluation: `regression-matrix`, `tradeoff-radar`
- Local AI: `ollama-architecture`, `model-comparison`, `gpu-vs-cpu`
- IDE: `ide-comparison-radar`, `mcp-architecture`, `antigravity-workflow`
- UI: `dashboard-ui`, `data-analysis-chart`

### 🆕 Nový diagram workflow

```bash
# 1. Popsat diagram Gemini
cat << 'EOF' | gemini -m gemini-3-pro-preview 2>&1
Vytvoř SVG diagram pro koncept "Prompt Injection vs SQL Injection".
Požadavky:
- Dark mode kompatibilní barvy (slate-600/400)
- Minimalistický styl
- Max 300x200px
- Bez externích závislostí
EOF

# 2. Uložit do diagrams/ složky
# 3. Registrovat v Diagram.tsx
# 4. Použít: <Diagram type="sql-vs-prompt-injection" />
```

---

## 6. Component Usage

### `<ConceptCard>`
Use for key definitions or summaries.
```tsx
<ConceptCard title="The Student" icon="🎓" jediQuote="Much to learn...">
  Content with **markdown** support...
</ConceptCard>
```

### `<Callout>`
| Type | Use Case |
|------|----------|
| `type="info"` | Lesson goals, reading time, lab count |
| `type="warning"` | Hallucinations, Security Risks, Common Mistakes |
| `type="tip"` | Pro tricks, hidden mechanics, best practices |
| `type="success"` | Achievements, correct approaches |

### `<Steps>`
For sequential instructions or lab analysis.

### `<Diagram>`
For SVG visualizations (see Visual Rules above).

---

## 7. Research Protocol 🕵️

### Context Loading (Before Starting)

Agent generating content MUST read these files first:
1. `.ai-context/state/MEMORY.md` (Project state)
2. `.ai-context/core/CONTENT_GUIDELINES.md` (This file - the "Bible")
3. `.ai-context/core/CURRICULUM_ROADMAP.md` (Curriculum goals & progress)
4. `frontend/components/mdx/diagrams/` (Available visual components)

### Research Steps

Before writing a single word:

1. **Search:** Find top 3-5 videos/articles on the topic
2. **Watch/Read:** Actually consume the content, take notes
3. **Synthesize:** What is the "Killer Feature" of this topic?
4. **Localize:** Find Czech context/terminology
5. **Document:** Save research in Handoff Package for QA review

### Research Handoff Package

When Gemini completes research, deliver to Claude:
```markdown
## Research Brief: [Topic]

### Top Sources
1. [Title](URL) - Key takeaway
2. [Title](URL) - Key takeaway
3. [Title](URL) - Key takeaway

### Recommended Videos
- **EN Primary:** [Video](URL) - Why it's good
- **CZ Alternative:** [Video](URL) or "None found, use EN with CS subs"

### Key Concepts to Cover
- Concept 1
- Concept 2
- Concept 3

### Potential Diagrams
- [Description of diagram 1]
- [Description of diagram 2]
```

---

## 8. Localization Protocol 🌍

* **Dual Files:** `content.mdx` (EN) + `content.cs.mdx` (CS)
* **No Machine Translation:** Use idiomatic Czech
* **Terminology:** Keep English terms where standard ("Prompt", "Token", "Fine-tuning")
* **Videos:** EN lessons get EN video, CS lessons get CZ video (or EN with CS subs note)

### Verification (CRITICAL)

After writing, ALWAYS verify:
- [ ] EN file contains ENGLISH text
- [ ] CS file contains CZECH text
- [ ] Neither file is a placeholder
- [ ] Both files have similar length (±20%)

---

## 9. Technical Best Practices

* **Code Blocks:** Always specify language (`python`, `bash`, `text`)
* **Markdown:** Use nested lists, bolding for scanning, clear headers
* **Links:** Use descriptive link text, not "click here"
* **Sync:** Run `docker compose restart backend` after content changes

---

## 10. Anti-Patterns (What NOT to Do)

| Anti-Pattern | Why It's Bad | Do This Instead |
|--------------|--------------|-----------------|
| "Let's explore..." opening | Weak, passive | Start with bold claim or question |
| Copy-paste-only labs | No learning | Mission-oriented challenges |
| Wall of text | Overwhelming | Break with visuals, callouts |
| Vague instructions | Frustrating | Exact commands, clear criteria |
| Assuming tool setup | Users get stuck | Step-by-step from zero |
| Surface-level explanation | No value | Explain WHY, not just WHAT |

---

## 11. Content QA Workflow 🔍

**POVINNÉ po KAŽDÉ content generation!** Bez tohoto kroku je lekce NEPLATNÁ.

### A. Backend Verification

```bash
# 1. Restart backend (načte nový content)
docker compose restart backend

# 2. Ověř že se lekce načetla správně
docker compose logs backend 2>&1 | grep "Processing lesson"
# Očekávaný výstup: "📖 Processing lesson: [Title] (XX min, N labs)"
```

### B. Callout Format (KRITICKÉ!)

Backend parsuje reading time a lab count z prvního Callout. **Musí být přesný formát:**

```markdown
# ✅ SPRÁVNĚ (backend parsuje):
<Callout type="info">
**Mission:** [popis mise]

⏳ **Reading Time:** 35 min | 🧪 **[2] Labs Included**
</Callout>

# ❌ ŠPATNĚ (backend NEPARSUJE):
**Time:** ~35 min read | **Labs:** 2 practical exercises
```

**Regex v content_loader.py:**
```python
# Reading time
time_match = re.search(r"⏳ \*\*(?:Reading Time|Čas čtení):\*\* (\d+)", content)

# Lab count
lab_match = re.search(r"🧪 \*\*\[?(\d+)\]? Labs? (?:Included|součástí)\*\*", content)
```

### C. Visual QA (Playwright)

```bash
# Po backend restart:
1. Login: http://localhost:3000/cs/login
   - Email: admin@ai-platform.com
   - Password: admin123

2. Navigate: Courses → [Course] → [Lesson]

3. Verify:
   - [ ] Lab count správný v course listu
   - [ ] Reading time správný
   - [ ] Code blocks renderují
   - [ ] Tables renderují
   - [ ] Callouts mají správný styl
   - [ ] Copy button funguje
```

### D. Checklist Before Publish

| Check | Command/Action |
|-------|----------------|
| Backend loaded? | `grep "Processing lesson" logs` |
| Lab count correct? | Vizuální QA v course listu |
| Both languages? | `content.mdx` + `content.cs.mdx` existují |
| Quiz files? | `quiz.json` + `quiz.cs.json` existují |
| No placeholders? | Přečti zpět všechny soubory |

### E. Common Issues

| Problém | Příčina | Řešení |
|---------|---------|--------|
| "0 labs" zobrazeno | Špatný Callout formát | Použij `🧪 **[N] Labs Included**` |
| Lekce se nezobrazuje | Content not loaded | `docker compose restart backend` |
| Staré lekce zůstávají | ContentLoader je append-only | Nuclear reset: `docker volume rm postgres_data` |
| "Not authenticated" | JWT session expired po DB reset | Logout + fresh login |

---

*Last updated: 2025-12-07 (v2.2)*
*Changes: Added Content QA Workflow (Section 11)*
