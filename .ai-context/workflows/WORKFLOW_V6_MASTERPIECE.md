# MASTERPIECE Lesson Upgrade Workflow v7.0

**Trigger:** User says: "Upgrade [LESSON_PATH] na MASTERPIECE"

**Example:** "Upgrade content/courses/ai-basics-beginner/lessons/03-llms-explained na MASTERPIECE"

---

## 🔑 KEY PRINCIPLE: Codex as Final Gatekeeper

**Only Codex (GPT-5.2) declares MASTERPIECE** - not Gemini alone!

- **Codex Role:** Orchestrator + critical reviewer + final approver
- **Dual-Gate Rule:** Hard gates green + Gemini ≥59/60 + Codex ≥59/60
- **Max Iterations:** 2 full cycles before human escalation

---

## 🎯 WORKFLOW OVERVIEW (v7.0)

```
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 0: Spec (Codex creates lesson_spec)                          │
│  ├─ Learning outcomes + prerequisites                               │
│  ├─ "Must-be-true" facts + "Don't-claim" list                       │
│  └─ Rubric + pass thresholds                                        │
├─────────────────────────────────────────────────────────────────────┤
│  PHASE 1: Research (Perplexity/YouTube → Codex extracts)            │
│  ├─ Find must-have videos for topic                                 │
│  ├─ Get transcripts from top videos                                 │
│  └─ Codex extracts minimum claims + citations                       │
├─────────────────────────────────────────────────────────────────────┤
│  PHASE 2: Draft/Enrich (Gemini → Codex pre-check)                   │
│  ├─ Gemini generates MDX + quiz + diagram specs                     │
│  ├─ Codex does fast rubric pre-check                                │
│  └─ Codex emits prioritized issue_ledger for Claude                 │
├─────────────────────────────────────────────────────────────────────┤
│  PHASE 3: Implement (Claude → Codex local QA)                       │
│  ├─ Claude applies changes in repo                                  │
│  ├─ Codex runs local QA (MDX/build/link checks)                     │
│  └─ Codex updates issue_ledger                                      │
├─────────────────────────────────────────────────────────────────────┤
│  PHASE 4: Visual QA (automation-first, artifacts to files)          │
│  ├─ Subagent runs Playwright → screenshots to disk                  │
│  ├─ Output: short JSON/MD summary (pass/fail + paths)               │
│  └─ Codex only reviews failures (targeted)                          │
├─────────────────────────────────────────────────────────────────────┤
│  PHASE 5: Final Score (Gemini + Codex dual gate)                    │
│  ├─ Gemini returns rubric JSON score                                │
│  ├─ Codex independently scores + enforces hard gates                │
│  └─ Both pass → MASTERPIECE | Else → loop to PHASE 3                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ DUAL-GATE CONFIRMATION

```
┌─────────────────────────────────────────────────────────────────────┐
│  MASTERPIECE = ALL of these conditions:                             │
│                                                                     │
│  ✓ Hard gates green (build passes, links valid, MDX valid)          │
│  ✓ Gemini score ≥59/60 (no weak category <8/10)                     │
│  ✓ Codex score ≥59/60 (independent verification)                    │
│                                                                     │
│  If ANY fails → Codex creates issue_ledger → loop to PHASE 3        │
│  Max 2 full cycles → then escalate to human                         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📋 PHASE 0: Spec (Codex)

**Goal:** Create verifiable lesson specification before any content work.

```bash
cat << 'EOF' | codex exec -p orchestrator 2>&1
Create a lesson_spec for: [LESSON TOPIC]

## Required Output (JSON-like structure):

1. **Learning Outcomes** (3-5 bullet points)
   - What student will be able to DO after lesson

2. **Prerequisites**
   - Required prior knowledge
   - Lessons that should come before

3. **Target Level**
   - beginner / intermediate / advanced

4. **Must-Be-True Facts** (with sources)
   - Facts that MUST appear in lesson
   - Citations for each

5. **Don't-Claim List**
   - Common misconceptions to avoid
   - Outdated information to skip

6. **Rubric + Pass Thresholds**
   - HOOK Effectiveness: min 8/10
   - Concept Clarity: min 8/10
   - Lab Quality: min 8/10
   - Visual Anchors: min 8/10
   - Progressive Difficulty: min 8/10
   - Edutainment Factor: min 8/10
   - TOTAL: min 59/60 for MASTERPIECE

Current lesson path: [LESSON_PATH]
EOF
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

## 📋 PHASE 4: Visual QA (Automation-First)

**⚠️ CRITICAL: Minimize context cost!**

- **DON'T** feed browser_snapshot/accessibility trees into LLM (14k+ tokens!)
- **DO** save screenshots to files, output short summary

### Step 4.1: Subagent Captures Screenshots

```bash
# Use Task tool with Explore subagent OR dedicated script
# NEVER use browser_snapshot in main context!

# Option A: Subagent (recommended)
Task tool: subagent_type="Explore"
prompt: "Navigate to lesson [URL], take desktop (1920x1080) and mobile (375x812)
screenshots, save to visual_tests/lesson-XX-*.png, report only pass/fail + paths"

# Option B: Direct Playwright (only screenshots, no snapshots)
mcp__playwright__browser_navigate url="[LESSON_URL]"
mcp__playwright__browser_take_screenshot filename="visual_tests/lesson-XX-desktop.png"
mcp__playwright__browser_resize width=375 height=812
mcp__playwright__browser_take_screenshot filename="visual_tests/lesson-XX-mobile.png"
mcp__playwright__browser_close  # ALWAYS close to free resources
```

### Step 4.2: Output Summary (NOT full snapshot!)

```json
{
  "lesson": "03-llms-explained",
  "desktop": { "path": "visual_tests/lesson-03-desktop.png", "status": "pass" },
  "mobile": { "path": "visual_tests/lesson-03-mobile.png", "status": "pass" },
  "issues": []
}
```

### Step 4.3: Codex Reviews Failures Only

```bash
# ONLY if issues found:
cat << 'EOF' | codex exec -p review -i visual_tests/lesson-XX-mobile.png 2>&1
Review this screenshot for visual issues:
- Is text readable without zoom?
- Are diagrams rendering correctly?
- Any layout breaks?

If issues found, specify exact fixes needed.
EOF
```

---

## 📋 PHASE 5: Final Score (Dual Gate)

### Step 5.1: Gemini Scores Content

```bash
cat << 'EOF' | gemini -m gemini-3-pro-preview 2>&1
Rate this lesson against MASTERPIECE criteria:

## Lesson Content
[PASTE FULL LESSON MDX]

## Scoring Rubric (1-10 each)
| Criterion | Score | Notes |
|-----------|-------|-------|
| HOOK Effectiveness | ?/10 | |
| Concept Clarity | ?/10 | |
| Lab Quality | ?/10 | |
| Visual Anchors | ?/10 | |
| Progressive Difficulty | ?/10 | |
| Edutainment Factor | ?/10 | |

**TOTAL: ?/60**
**Verdict:** MASTERPIECE (≥59) / NEEDS WORK (<59)

If not MASTERPIECE, list specific fixes as issue_ledger.
EOF
```

### Step 5.2: Codex Cross-Validates + Final Gate

```bash
cat << 'EOF' | codex exec -p orchestrator 2>&1
Cross-validate and make final MASTERPIECE decision.

## Gemini's Score
[PASTE GEMINI RATING]

## Lesson Spec (from PHASE 0)
[PASTE LESSON_SPEC]

## Hard Gates Status
- [ ] Build passes
- [ ] MDX valid
- [ ] Links valid
- [ ] All diagrams render

## Your Tasks
1. Score independently using same rubric (1-10 per criterion)
2. Check: Do Gemini's scores match lesson_spec requirements?
3. Check: Any must-be-true facts missing?
4. Check: Any don't-claim violations?

## Final Verdict
If ALL conditions met:
- Hard gates: ✅
- Gemini: ≥59/60
- Your score: ≥59/60
→ Output: "**MASTERPIECE CONFIRMED**"

Otherwise:
→ Output: issue_ledger with prioritized fixes
→ Recommend: "Loop to PHASE 3" or "Escalate to human"
EOF
```

### Step 5.3: Loop or Complete

```
IF Codex says "MASTERPIECE CONFIRMED":
  → Commit changes
  → Update WORKING_CONTEXT.md
  → Done!

ELSE:
  → Apply issue_ledger fixes (PHASE 3)
  → Re-run PHASE 4-5
  → Max 2 iterations, then human review
```

---

## 🎯 QUICK COMMAND

When user says: **"Upgrade [LESSON_PATH] na MASTERPIECE"**

Execute this workflow:

```
0. PHASE 0: Codex creates lesson_spec (outcomes, facts, rubric)
1. Read lesson content (EN + CS)
2. PHASE 1: Research → Codex extracts claims
3. PHASE 2: Gemini enriches → Codex pre-check → issue_ledger
4. PHASE 3: Claude implements → Codex local QA
5. PHASE 4: Visual QA (subagent → screenshots to files → summary only)
6. PHASE 5: Dual gate (Gemini score + Codex score)
   - IF both ≥59/60 → Codex says "MASTERPIECE CONFIRMED"
   - ELSE → Loop to PHASE 3 (max 2x)
7. Commit with message: "feat(content): upgrade [lesson] to MASTERPIECE"
```

**⚠️ CRITICAL:** Only Codex declares MASTERPIECE, not Gemini alone!

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

❌ Skipping PHASE 0 (no lesson_spec = no verification)
❌ Skipping video research (content becomes stale)
❌ Not getting transcripts (missing key insights)
❌ **Single-agent review (Gemini alone ≠ MASTERPIECE)**
❌ **Using browser_snapshot in main context (14k+ tokens!)**
❌ Skipping visual QA (broken renders)
❌ Forgetting EN/CS parity
❌ Labs without expected output examples
❌ Mentioning outdated models without WebSearch verification
❌ Complex diagrams that require zooming on mobile
❌ **Declaring MASTERPIECE without Codex confirmation**

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
_Updated: 2025-12-21 - v7.0: Codex as final gatekeeper, dual-gate confirmation, Visual QA context optimization_
_Use with: "Upgrade [LESSON_PATH] na MASTERPIECE"_
