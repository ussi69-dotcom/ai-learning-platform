# Cycle 20: Holographic Datapad UI Overhaul

## 🎯 Objective
Refine the UI to resolve the conflict between "Liquid Glass", "Duolingo Gamification", and "Star Wars Theme". 
Create a unified "Holographic Datapad" aesthetic that feels technical and futuristic in Dark Mode (Sith) and clean/optimistic in Light Mode (Jedi), while maintaining high usability for learning.

## 🛠️ Scope
1.  **Global Theme Engine (`globals.css`):**
    *   Redefine color variables for `oklch` to support "Glow" instead of "Shadow" in dark mode.
    *   Implement "Glass" utilities that work reliably in both modes.
2.  **Component Refactoring:**
    *   `Card`: Update to support the "Holographic" look (border glow in dark mode, soft shadow in light mode).
    *   `Button`: Sith buttons should feel like technical controls (borders, transparent backgrounds) rather than solid blocks.
    *   `NavBar`: Ensure proper glassmorphism and contrast for the Jedi/Sith toggle.
3.  **Gamification Integration:**
    *   Ensure `XPProgressBar` and Badges pop against the new backgrounds.
4.  **Clean Up:**
    *   Remove conflicting "solid" styles that break the immersion.

## 📋 Step-by-Step Plan

### Phase 1: The Holographic Foundation
- [ ] **Refactor `globals.css`:**
    - [ ] Define new `oklch` palettes for Sith (Deep Slate/Red/Orange) and Jedi (White/Indigo/Green).
    - [ ] Create utility class `.glass-panel` that adapts to theme (White glass vs Dark Slate glass).
    - [ ] Create utility class `.glow-border` for the active state in dark mode.

### Phase 2: Core Components
- [ ] **Update `ui/card.tsx`:**
    - [ ] Remove hardcoded backgrounds.
    - [ ] Apply `.glass-panel` logic.
    - [ ] Add conditional border styling for Sith mode.
- [ ] **Update `ui/button.tsx`:**
    - [ ] Review variants (default, outline, ghost).
    - [ ] Ensure "Outline" variant in Sith mode looks like a HUD element (glowing border).
- [ ] **Update `NavBar.tsx`:**
    - [ ] Verify backdrop blur and border contrast.

### Phase 3: Visual Polish
- [ ] **Check `HomePage` & `CoursePage`:**
    - [ ] Ensure text contrast is WCAG compliant on the new glass backgrounds.
    - [ ] Verify `JediSithToggle` visuals match the new theme.
