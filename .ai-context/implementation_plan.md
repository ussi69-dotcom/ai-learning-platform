# Implementation Plan - Cycle 12: Content Standard & Mobile UX Fix

## 🎯 Goal
Establish the "Gold Standard" for lesson content (English, High Depth, 10+3 Structure) and finalize the Mobile UX (Sticky Navigation).

## 📝 Content Engineering (Lesson 1: What is AI?)
We are reverting to English and expanding the content significantly.
* **Structure**:
    * **Phase 1: Theory (Mobile Friendly)** - Break down "Rule-based vs AI" into granular slides. Explain "Training", "Inference", "Black Box".
    * **Phase 2: Lab (Desktop Friendly)** - A prompt engineering test to demonstrate hallucination or reasoning.
* **Assets**: Verify `<MDXImage>` paths are correct (`./images/filename.png`).
* **Components**: Use `<Callout>`, `<ConceptCard>`, and `<Steps>` extensively.

## 🎨 UX/UI: The Sticky Footer
* **Problem**: Navigation buttons are hard to reach on mobile.
* **Solution**: Implement a fixed bottom bar for navigation on screens < 768px.
    * **CSS**: `fixed bottom-0 w-full bg-background/80 backdrop-blur-md border-t p-4`.
    * **Layout**: Space-between (Prev - Pagination - Next).