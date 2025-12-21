# MASTERPIECE Lesson Upgrade Workflow v6.0

**Trigger:** User says: "Upgrade [LESSON_PATH] na MASTERPIECE"

**Example:** "Upgrade content/courses/ai-basics-beginner/lessons/03-llms-explained na MASTERPIECE"

---

## 🎯 WORKFLOW OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 1: Research (Perplexity + YouTube)                           │
│  ├─ Find must-have videos for topic                                 │
│  ├─ Get transcripts from top videos                                 │
│  └─ Extract key insights + timestamps                               │
├─────────────────────────────────────────────────────────────────────┤
│  PHASE 2: Content Enrichment (Gemini generates)                     │
│  ├─ Update HOOK section with video insights                         │
│  ├─ Add missing concepts from transcripts                           │
│  └─ Optimize labs with real examples                                │
├─────────────────────────────────────────────────────────────────────┤
│  PHASE 3: Visual Anchors (Claude implements)                        │
│  ├─ Add SVG diagrams for each major concept                         │
│  ├─ Add product screenshots from official docs                      │
│  └─ Ensure visual density per CONTENT_GUIDELINES                    │
├─────────────────────────────────────────────────────────────────────┤
│  PHASE 4: Multi-Agent QA (GPT + Gemini evaluate)                    │
│  ├─ Check Edutainment Bible compliance                              │
│  ├─ Verify progressive learning curve                               │
│  └─ Score against Golden Template (L02/L03)                         │
├─────────────────────────────────────────────────────────────────────┤
│  PHASE 5: Visual QA (Playwright + Gemini)                           │
│  ├─ Desktop + Mobile screenshots                                    │
│  ├─ Gemini visual review                                            │
│  └─ Final polish                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📋 PHASE 1: Research

### Step 1.1: Find Must-Have Videos (Perplexity)

```bash
# Claude executes this:
cat << 'EOF' | codex exec -p orchestrator 2>&1
I need to find the best educational videos for a lesson about [TOPIC].

Requirements:
1. Videos must be from 2024-2025
2. Prefer: 3Blue1Brown, Fireship, NetworkChuck, ColdFusion, IBM, Microsoft official
3. Need both EN and CS options if available
4. Focus on: explanations, tutorials, real demos

For each video provide:
- YouTube ID
- Title
- Channel
- Why it's valuable
- Best timestamp ranges for key concepts

Topic: [INSERT TOPIC FROM LESSON]
EOF
```

### Step 1.2: Get Video Transcripts

```bash
# For each top video, get transcript:
mcp__youtube-data__get_video_transcript video_input="VIDEO_ID" language="en"

# Save to temp file:
# /tmp/transcripts/VIDEO_ID.txt
```

### Step 1.3: Extract Key Insights

```bash
# Gemini analyzes transcripts:
cat << 'EOF' | gemini -m gemini-3-pro-preview 2>&1
Analyze these video transcripts for lesson enrichment.

Extract:
1. **Key Concepts** not in current lesson
2. **Memorable Quotes** for HOOK section
3. **Real Examples** for labs
4. **Common Misconceptions** to address
5. **Timestamp References** for VideoSwitcher

Transcripts:
[PASTE TRANSCRIPT SUMMARIES]

Current Lesson Content:
[PASTE FIRST 500 CHARS OF CURRENT LESSON]
EOF
```

---

## 📋 PHASE 2: Content Enrichment

### Step 2.1: Generate Enhanced Content (Gemini)

```bash
cat << 'EOF' | gemini -m gemini-3-pro-preview 2>&1
You are upgrading a lesson to MASTERPIECE quality.

## Golden Template Reference
Use Copilot Lessons 02/03 as the standard:
- Strong HOOK in first 30 seconds
- Visual anchors every 3-5 paragraphs
- Labs are MISSIONS with copy-paste prompts
- Holocron summary at end

## Current Lesson
[PASTE FULL LESSON CONTENT]

## Video Insights to Integrate
[PASTE EXTRACTED INSIGHTS]

## Task
1. Rewrite HOOK section with shocking fact/question from videos
2. Add missing concepts identified from transcripts
3. Enhance labs with real examples from videos
4. Add VideoSwitcher with new videos found
5. Ensure EN/CS parity

Output: Full upgraded MDX content

DO NOT report to user. Write draft only.
EOF
```

### Step 2.2: GPT Reviews & Suggests Next Steps

```bash
cat << 'EOF' | codex exec -p orchestrator 2>&1
Review this lesson draft against Edutainment Bible:

## Draft Content
[PASTE GEMINI OUTPUT]

## Checklist
□ 30-Second Rule: Does HOOK grab attention immediately?
□ Cinematic Storytelling: Are there "bombs" (surprising facts)?
□ Visual Density: Enough diagrams for lesson length?
□ Lab Philosophy: Are labs MISSIONS with expected outputs?
□ Progressive Curve: Does complexity build gradually?

Score: X/10
Issues found:
Recommended fixes:
Next action:
EOF
```

---

## 📋 PHASE 3: Visual Anchors

### Step 3.1: Add SVG Diagrams

```bash
# Claude implements based on content:
# 1. Check existing diagrams in frontend/components/mdx/diagrams/
# 2. Create new if needed
# 3. Register in Diagram.tsx
# 4. Insert in MDX at key concept points
```

### Step 3.2: Add Product Screenshots

```bash
# For product-specific lessons:
# 1. Find official documentation screenshots
# 2. Download to content/.../images/
# 3. Insert with <MDXImage src="images/filename.png" alt="..." />
# 4. Add captions explaining the UI element
```

### Step 3.3: Visual Density Check

```
Lesson Length → Required Visuals:
<15 min: 2 diagrams
15-30 min: 3-4 diagrams
30-45 min: 5-6 diagrams
45+ min: 6+ diagrams

Each major section should have:
- 1 diagram OR
- 1 screenshot OR
- 1 ConceptCard with visual element
```

---

## 📋 PHASE 4: Multi-Agent QA

### Step 4.1: Gemini Rates Content

```bash
cat << 'EOF' | gemini -m gemini-3-pro-preview 2>&1
Rate this lesson against MASTERPIECE criteria:

## Lesson Content
[PASTE FULL LESSON]

## Scoring Rubric (1-10 each)
1. HOOK Effectiveness
2. Concept Clarity
3. Lab Quality (copy-paste ready?)
4. Visual Anchors
5. EN/CS Parity
6. Progressive Difficulty
7. Edutainment Factor
8. Technical Accuracy

Overall Score: X/80
Verdict: MASTERPIECE / NEEDS WORK / REJECT

If not MASTERPIECE, list specific fixes needed.
EOF
```

### Step 4.2: GPT Cross-Validates

```bash
cat << 'EOF' | codex exec -p orchestrator 2>&1
Cross-validate Gemini's assessment:

## Gemini's Score
[PASTE GEMINI RATING]

## Lesson Content
[PASTE KEY SECTIONS]

## Questions
1. Do you agree with the score?
2. Any issues Gemini missed?
3. Is this truly MASTERPIECE quality?
4. What's the ONE thing that would improve it most?

Provide final verdict and next action.
EOF
```

### Step 4.3: Iterate Until Consensus

```
LOOP:
  IF both agents say MASTERPIECE (score >= 72/80):
    → PROCEED to Phase 5
  ELSE:
    → Apply fixes
    → Re-run Phase 4
    → Max 3 iterations
```

---

## 📋 PHASE 5: Visual QA

### Step 5.1: Capture Screenshots

```bash
# Login and navigate to lesson
mcp__playwright__browser_navigate url="http://localhost:3000/cs/login"
# ... login flow ...
mcp__playwright__browser_navigate url="http://localhost:3000/cs/courses/[ID]/lessons/[ID]"
mcp__playwright__browser_take_screenshot filename="/tmp/lesson-visual/desktop.png"

# Mobile view
mcp__playwright__browser_resize width=375 height=812
mcp__playwright__browser_take_screenshot filename="/tmp/lesson-visual/mobile.png"
```

### Step 5.2: Gemini Visual Review

```bash
gemini -m gemini-3-pro-preview --file /tmp/lesson-visual/desktop.png "
Review this lesson screenshot for visual quality:
1. Is the layout clean and readable?
2. Are diagrams rendering correctly?
3. Is text contrast sufficient?
4. Any broken elements?
5. Does it look like a MASTERPIECE?
"
```

### Step 5.3: Final Polish

```
Apply any visual fixes identified.
Re-screenshot and confirm.
Mark lesson as MASTERPIECE in WORKING_CONTEXT.md
```

---

## 🎯 QUICK COMMAND

When user says: **"Upgrade [LESSON_PATH] na MASTERPIECE"**

Execute this workflow:

```
1. Read lesson content (EN + CS)
2. PHASE 1: Perplexity video research → transcripts → insights
3. PHASE 2: Gemini enriches → GPT reviews → iterate
4. PHASE 3: Add visuals (diagrams, screenshots)
5. PHASE 4: Multi-agent QA until consensus
6. PHASE 5: Visual QA with Playwright + Gemini
7. Update VideoSwitcher with new videos
8. Commit with message: "feat(content): upgrade [lesson] to MASTERPIECE"
```

---

## 📊 GOLDEN TEMPLATE REFERENCE

**Copilot Lesson 02 (workflows-agent):**
- 35 min read, 3 labs
- Strong HOOK: "Stop. Take a breath."
- Diagrams: workflow-impact-cards, agentic-vs-assistive, mcp-architecture
- VideoSwitcher: 4+ alternatives
- Full-bleed diagrams on mobile

**Copilot Lesson 03 (copilot-studio):**
- 45 min read, 4 labs
- HOOK: Enterprise agent factory metaphor
- Diagrams: enterprise-agent-triad, tradeoff-radar, security-attack-chain
- Screenshots: Copilot Studio UI
- Governance section with inline icons

---

## ⚠️ ANTI-PATTERNS

❌ Skipping video research (content becomes stale)
❌ Not getting transcripts (missing key insights)
❌ Single-agent review (needs consensus)
❌ Skipping visual QA (broken renders)
❌ Forgetting EN/CS parity
❌ Labs without expected output examples
❌ **Mentioning outdated models without WebSearch verification**
❌ **Complex diagrams that require zooming on mobile**

---

## 🚨 CRITICAL: Model/Product Verification (POVINNÉ!)

**PŘED zmíněním jakéhokoliv AI modelu nebo produktu v obsahu:**

```bash
# VŽDY proveď WebSearch pro ověření aktuálnosti!
WebSearch: "[model name] latest version 2025"

# Příklady zastaralých modelů (NEPOUŽÍVAT pokud nejde o historický kontext):
# ❌ GPT-4, GPT-4o, GPT-4 Turbo → ✅ GPT-5, GPT-5 mini
# ❌ o1, o1-mini, o1-pro → ✅ o3, o4-mini, o3-pro
# ❌ Claude 3, Claude 3.5 → ✅ Claude Opus 4.5, Sonnet 4
# ❌ Gemini 2.5 → ✅ Gemini 3
```

**Pravidlo:** Pokud zmiňuješ model/produkt, ověř přes WebSearch jestli je aktuální!
Výjimka: Historický kontext ("V roce 2023 přišel ChatGPT s GPT-4...")

**Instrukce pro Gemini při tvorbě obsahu:**
```
⚠️ DŮLEŽITÉ: Před zmíněním jakéhokoliv AI modelu (OpenAI, Anthropic, Google, etc.)
MUSÍŠ ověřit jeho aktuálnost. Nepoužívej zastaralé názvy modelů jako GPT-4, o1,
Claude 3 pokud nejde o historický kontext. Aktuální modely (prosinec 2025):
- OpenAI: GPT-5, o3, o4-mini
- Anthropic: Claude Opus 4.5, Claude Sonnet 4
- Google: Gemini 3 Pro, Gemini 3 Flash
```

---

## 📱 CRITICAL: Mobile-First SVG Diagrams (POVINNÉ!)

**Všechny SVG diagramy MUSÍ být čitelné na mobilu bez zoomování!**

### Pravidla pro diagramy:

```
1. VELIKOST TEXTU
   - Minimum: 14px na mobilu (font-size v SVG)
   - Labels musí být čitelné na 375px šířce

2. SLOŽITOST
   - Max 5-6 hlavních elementů na diagram
   - Pokud je diagram komplexnější → rozděl na více diagramů

3. MOBILE ALTERNATIVA
   - Pro složité diagramy implementuj `mobileVariant` prop
   - Nebo použij vertikální layout místo horizontálního

4. TESTOVÁNÍ
   - VŽDY pořiď screenshot na mobile (375x812)
   - Pokud text není čitelný → oprav nebo vytvoř alternativu
```

### Implementace v kódu:

```tsx
// V Diagram.tsx - podpora pro mobile variant
const DiagramComponent = ({ type, mobileSimplified = false }) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  if (isMobile && mobileSimplified) {
    return <SimplifiedMobileVersion type={type} />;
  }
  return <FullDiagram type={type} />;
};
```

### Checklist pro Visual QA (Phase 5):

```
□ Desktop screenshot (1920x1080) - diagramy čitelné?
□ Mobile screenshot (375x812) - diagramy čitelné BEZ ZOOMU?
□ Pokud mobile nečitelné → implementuj mobileVariant nebo zjednoduš
□ Text v diagramech min 14px
□ Max 5-6 elementů na diagram
```

---

_Created: 2025-12-21 by Claude Opus 4.5_
_Updated: 2025-12-21 - Added model verification + mobile-first SVG rules_
_Use with: "Upgrade [LESSON_PATH] na MASTERPIECE"_
