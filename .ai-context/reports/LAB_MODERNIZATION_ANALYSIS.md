# Lab Modernization Analysis Report

**Date:** 2025-12-11
**Analyst:** Claude Opus 4.5
**Status:** Analysis Complete - Awaiting Gemini Research

---

## Executive Summary

This report analyzes all 35 labs across 2 courses for compatibility with modern AI models (Claude Opus 4.5, GPT-5.1, Gemini 3 Pro). Labs are categorized by risk level based on whether they will "fail by succeeding" — i.e., modern AI handles them too well, defeating the educational purpose.

---

## Lab Inventory

### Course 1: AI Basics for Beginners (7 lessons, 21 labs)

| Lesson | Lab ID | Lab Name | Risk Level | Issue |
|--------|--------|----------|------------|-------|
| 01 | lab-universal-translator | The Universal Translator | 🟢 SAFE | Creative task, no AI limitation dependency |
| 01 | lab-chaos-detective | The Chaos Detective | 🟢 SAFE | Demonstrates AI capability positively |
| 01 | lab-socratic-teacher | The Socratic Teacher | 🟢 SAFE | Interaction pattern, always works |
| 02 | lab-pattern-teacher | The Pattern Teacher | 🟢 SAFE | Few-shot learning always succeeds |
| 02 | lab-space-language | The Space Language | 🟢 SAFE | Pattern recognition always succeeds |
| 02 | lab-associative-mixer | The Associative Mixer | 🟢 SAFE | Style transfer always works |
| 03 | lab-tokenizer-view | The Tokenizer View | 🟡 MODERATE | Models may refuse or give inaccurate tokenization |
| 03 | lab-temperature-dj | The Temperature DJ | 🟢 SAFE | Simulates temperature via prompt, always works |
| 03 | lab-hallucination-trap | The Hallucination Trap | 🟡 MODERATE | Modern models often catch fake Harry Potter book |
| 04 | lab-persona-shift | The Persona Shift | 🟢 SAFE | Persona assignment always works |
| 04 | lab-data-separator | The Data Separator | 🟢 SAFE | Delimiter usage always works |
| 04 | lab-pattern-master | The Pattern Master | 🟢 SAFE | Few-shot format always succeeds |
| 04 | lab-data-extractor | The Data Extractor | 🟢 SAFE | Table extraction always works |
| 04 | lab-reasoning-anchor | The Reasoning Anchor | 🟢 SAFE | CoT demo always works |
| 04 | lab-consultant | The Consultant | 🟢 SAFE | Reverse prompting always works |
| 05 | lab-fact-checker | The Fact Checker's Dilemma | 🟢 SAFE | Tests calibration, not failure |
| 05 | lab-rag-reality | The RAG Reality Check | 🔴 HIGH RISK | FIFA 2026 data might be known by Dec 2025! |
| 05 | lab-black-box-dilemma | The Black Box Dilemma | 🟢 SAFE | Ethical reasoning, always works |
| 06 | lab-meeting-minute-master | Meeting Minute Master | 🟢 SAFE | Summarization always works |
| 06 | lab-email-polish | Email Polish | 🟢 SAFE | Tone rewriting always works |
| 06 | lab-data-interrogation | Data Interrogation | 🟢 SAFE | Excel formula generation always works |

### Course 2: Practical Prompt Engineering (4 lessons, 13 labs)

| Lesson | Lab ID | Lab Name | Risk Level | Issue |
|--------|--------|----------|------------|-------|
| 01 | lab-aim-challenge | The AIM Challenge | 🟢 SAFE | Framework practice always works |
| 01 | lab-reverse-engineering | Reverse Engineering | 🟢 SAFE | Prompt analysis always works |
| 01 | lab-meta-prompt-battle | Meta-Prompt Battle | 🟢 SAFE | Meta-prompting always works |
| 02 | lab-cot-comparison | CoT Comparison | 🟢 SAFE | Always demonstrates CoT benefit |
| 02 | lab-blue-team | Blue Team Defense | 🟢 SAFE | Security practice always relevant |
| 02 | lab-red-team | Red Team CTF | 🟢 SAFE | Intentionally challenging |
| 02 | lab-gandalf | Gandalf Challenge | 🟢 SAFE | External game, professionally maintained |
| 04 | lab-ollama-setup | Ollama Setup | 🟢 SAFE | Installation always works |
| 04 | lab-python-integration | Python Integration | 🟢 SAFE | API always works |
| 04 | lab-image-gen | Local Image Generation | 🟢 SAFE | Setup always works |
| 05 | lab-mcp-server | MCP Server | 🟢 SAFE | Technical setup |
| 05 | lab-antigravity-prototype | Antigravity Prototype | 🟢 SAFE | Tool demo |
| 05 | lab-local-ide | Local IDE Connection | 🟢 SAFE | Configuration |

---

## Risk Analysis

### 🔴 HIGH RISK Labs (1)

#### 1. lab-rag-reality (Lesson 05: The Dark Side)
**Current Prompt:**
```text
QUESTION B (Recent - will fail without web access):
"Who won the FIFA World Cup in 2026?"
```

**Problem:**
- FIFA 2026 World Cup happens June-July 2026
- By late 2026, all models will know the answer
- Models with web access (GPT-5.1, Gemini 3) already know current events
- Even without web, newer models trained in 2026+ will have this data

**Educational Goal:** Demonstrate knowledge cutoff limitations

**Proposed Fix Options:**
1. **Dynamic question:** Use current date + 1 year: "Who won the Nobel Prize in Physics [current_year + 1]?"
2. **Personal question:** "What did I have for breakfast today?" (always unknowable)
3. **Future prediction:** "What will be the top song on Billboard Hot 100 next Friday?"

---

### 🟡 MODERATE RISK Labs (2)

#### 2. lab-tokenizer-view (Lesson 03: LLMs Explained)
**Current Prompt:**
```text
Please rewrite the word "Supercalifragilisticexpialidocious" but put a vertical bar "|" between every token you would perceive.
```

**Problem:**
- Models don't actually have access to their tokenizer
- They "hallucinate" tokenization based on patterns
- Results are often inconsistent or wrong
- Student may get confused when real tokenization differs

**Educational Goal:** Understand tokens as building blocks

**Proposed Fix Options:**
1. **Use official tool:** Link to OpenAI Tokenizer (https://platform.openai.com/tokenizer)
2. **Python lab:** Have student run `tiktoken` library to see real tokenization
3. **Reframe as estimation:** "Estimate how this might be split" + explain it's not exact

---

#### 3. lab-hallucination-trap (Lesson 03: LLMs Explained)
**Current Prompt:**
```text
I just finished reading the 5th book in the Harry Potter series by J.K. Rowling, titled "Harry Potter and the Eternal Phoenix". Can you give me a summary of the main plot points?
```

**Problem:**
- Modern models (Claude, GPT-5.1, Gemini 3) are trained to catch obvious false premises
- RLHF specifically targets "sycophancy" - agreeing with false user statements
- Model will likely say: "The 5th HP book is Order of the Phoenix, not Eternal Phoenix"
- Lab "fails by succeeding" - AI is now too honest

**Educational Goal:** Demonstrate hallucinations and sycophancy risks

**Proposed Fix Options:**
1. **Obscure domain:** Use niche academic paper citation that's harder to verify
2. **Subtle error:** Real book, wrong detail: "What happens in chapter 47 of Order of the Phoenix?"
3. **Creative fiction framing:** Ask to generate "in-universe" content that sounds plausible
4. **Sycophancy trap:** Present wrong "fact" confidently and test if AI pushes back

---

## Labs NOT Currently Implemented (From IDEAS.md)

These were identified as at-risk in the original IDEAS.md but have been **already updated** or **removed**:

| Original Lab | Status | Notes |
|--------------|--------|-------|
| lab-knowledge-cutoff | ✅ Updated | Now lab-rag-reality with 2018/2026 comparison |
| lab-hallucination-test ("Moon Bear War") | ✅ Replaced | Now uses more nuanced approaches |
| lab-tokenizer-trap ("Strawberry") | ✅ Updated | Now lab-tokenizer-view |
| lab-bias-hunter | ❌ Removed | Gender bias too obvious for modern models |

---

## Summary Statistics

| Category | Count | Percentage |
|----------|-------|------------|
| 🟢 SAFE | 31 | 91% |
| 🟡 MODERATE RISK | 2 | 6% |
| 🔴 HIGH RISK | 1 | 3% |
| **TOTAL** | **34** | **100%** |

---

## Recommended Actions

### Immediate (Must Fix)
1. **lab-rag-reality:** Update FIFA 2026 question to use dynamic future event

### Short-term (Should Fix)
2. **lab-tokenizer-view:** Add link to official tokenizer + reframe expectations
3. **lab-hallucination-trap:** Update to more subtle sycophancy test

### Research Needed
- Identify new AI limitations in 2025 models for fresh lab ideas
- Research "sycophancy traps" that still work
- Find domains where even frontier models still hallucinate

---

## Next Step

Run Gemini Research to:
1. Identify current limitations of GPT-5.1, Claude Opus 4.5, Gemini 3
2. Find documented cases of hallucinations in 2025
3. Propose specific replacement prompts for at-risk labs
4. Suggest new lab ideas for emerging AI behaviors

---

*Report generated by Claude Opus 4.5 for AI Learning Platform Lab Modernization Project*
