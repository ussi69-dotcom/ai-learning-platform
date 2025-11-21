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