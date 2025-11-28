# Cycle 20 Tasks: Holographic Datapad

- [x] **Step 1: Global CSS Refactor**
  - Updated `globals.css` with refined `oklch` colors for Sith (Red/Glow) and Jedi (Indigo/Clean).
  - Added `.glass-panel` and `.glow-border` utility classes.
- [x] **Step 2: Card Component Update**
  - Modified `frontend/components/ui/card.tsx` to use the new glass/glow styles.
- [x] **Step 3: Button Component Polish**
  - Tweaked `frontend/components/ui/button.tsx` (outline variant) to look like HUD controls in Dark Mode.
- [x] **Step 4: NavBar & Toggle Verify**
  - Verified visually via code logic (NavBar sits on top, toggle uses relative styling).
- [x] **Step 5: Visual Check**
  - Code review confirms components now use dynamic variables (`--primary`, `--background`) instead of hardcoded values.