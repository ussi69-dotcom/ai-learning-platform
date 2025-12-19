# Implementation Plan - Cycle 30: Lesson Expansion

**Goal:** Expand Lessons 1, 3, 4, 5, and 6 with 1-2 new SVG diagrams and ~1 page of content each.

## Proposed Changes

### 1. Lesson 1: What is AI?
*   **New Section:** "A Brief History of Intelligence" (placed after "What is AI?").
*   **New Diagram:** `ai-history-timeline` (Symbolic timeline: Logic -> Learning -> Generative).
*   **Content:** Expand on the shift from "Rules" to "Learning".

### 2. Lesson 3: LLMs Explained
*   **New Section:** "The Engine: The Transformer" (placed before "Next Token Prediction").
*   **New Diagram:** `transformer-architecture-simplified` (Input -> Attention -> Feed Forward -> Output).
*   **Content:** Simplified explanation of "Attention" mechanism (how words look at each other).

### 3. Lesson 4: Your First Prompt
*   **New Section:** "The Anatomy of a Perfect Prompt" (placed after "Hello World").
*   **New Diagram:** `prompt-structure-pyramid` (Context > Instruction > Data > Output Format).
*   **Content:** Breakdown of the 4 key components of a prompt.

### 4. Lesson 5: The Dark Side
*   **New Section:** "The Alignment Problem" (placed after "Bias").
*   **New Diagram:** `alignment-misalignment` (Human Goal vs AI Goal divergence).
*   **Content:** The "Paperclip Maximizer" thought experiment simplified.

### 5. Lesson 6: AI at Work
*   **New Section:** "The Human-in-the-Loop Workflow" (placed after "Coding").
*   **New Diagram:** `human-in-the-loop` (Draft -> Review -> Refine).
*   **Content:** How to integrate AI into daily work without losing control.

## Verification Plan
*   **Automated:** `npm run build` to ensure no MDX errors.
*   **Manual:** Verify each lesson renders the new diagram and content correctly.
