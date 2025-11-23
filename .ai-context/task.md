# Cycle 18.5: Visual Refinement (Clean & Glassy) 💎

**Goal:** Refactor Lesson 2 visuals to match user preference: "Clean design, no heavy colors, light banners with liquid glass texture."

## Phase 1: De-clutter & Clean Up
- [ ] **Task 1:** Refactor `Steps` Component
  - Remove/Replace "ugly" colorful icons (Target, Eye, Lightbulb)
  - Switch to minimal, clean typography or subtle monochrome icons
  - Reduce color intensity of the vertical line
- [ ] **Task 2:** Refactor `ConceptCard`
  - Remove heavy borders/backgrounds
  - Implement "Light Glass" aesthetic (subtle white/5 background, blur)
  - Ensure typography carries the weight, not colors

## Phase 2: "Light Glass Banners" Implementation
- [ ] **Task 3:** Create `GlassBanner` Component (or style variant)
  - **Style:** Light color shades (subtle blue/purple/emerald tints)
  - **Texture:** Liquid glass effect (`backdrop-blur-xl`, `bg-white/10`)
  - **Usage:** Replace standard Callouts for "Why This Matters" and "Try This Now"
- [ ] **Task 4:** Apply `GlassBanner` to Lesson 2
  - Replace existing `Callout`s with the new cleaner style

## Phase 3: Diagram Polish
- [ ] **Task 5:** Review & Refine Diagrams
  - Ensure diagrams match the new "Clean" aesthetic
  - Reduce saturation of colors in SVGs if necessary

## Phase 4: Verification
- [ ] **Task 6:** User Review
  - Verify the "Clean" look with the user
