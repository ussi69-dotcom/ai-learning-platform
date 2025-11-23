# Implementation Plan - Cycle 18.5: Visual Refinement

## Goal Description
Refactor the visual components in Lesson 2 to move away from "colorful/icon-heavy" design to a "clean, light, liquid glass" aesthetic as requested by the user.

## User Review Required
- **Design Direction:** Confirming "Light Glass Banners" means subtle pastel backgrounds with blur, rather than solid colors.

## Proposed Changes

### Frontend Components

#### [MODIFY] [Steps.tsx](file:///home/ussi/ai-learning-platform/frontend/components/mdx/Steps.tsx)
- **Current:** Uses colorful Lucide icons (Target, Eye, Lightbulb) and colored circles.
- **New:** Minimalist design.
  - Remove or replace icons with simple numbers or subtle dots.
  - Use `border-l` (left border) line instead of complex icon positioning if needed for "clean" look, or keep the timeline but make it monochrome/subtle.
  - Colors: Slate/Gray scale with very subtle accent tints.

#### [MODIFY] [ConceptCard.tsx](file:///home/ussi/ai-learning-platform/frontend/components/mdx/ConceptCard.tsx)
- **Current:** `border-l-4 border-l-purple-500`, gradient icon backgrounds.
- **New:** "Liquid Glass" style.
  - `bg-white/40` (light mode) / `bg-white/5` (dark mode).
  - `backdrop-blur-xl`.
  - Remove heavy left border.
  - Subtle border `border-white/20`.

#### [NEW] [GlassBanner.tsx](file:///home/ussi/ai-learning-platform/frontend/components/mdx/GlassBanner.tsx) (or enhance Callout)
- **Purpose:** For "Try This Now" and "Why This Matters".
- **Style:**
  - Full width or wide container.
  - Background: Very subtle gradient (e.g., `from-blue-50/50 to-indigo-50/50`).
  - Texture: `backdrop-blur-md`.
  - Border: Thin, elegant `border-white/40`.

### Content

#### [MODIFY] [content.mdx](file:///home/ussi/ai-learning-platform/content/courses/ai-basics-beginner/lessons/02-how-does-ai-learn/content.mdx)
- Replace `Callout`s with `GlassBanner` (or update Callout styling globally if preferred, but likely safer to make a variant).

## Verification Plan
### Manual Verification
- Check `http://localhost:3000/courses/43/lessons/116`
- Ensure no "ugly icons" remain.
- Verify "clean" aesthetic (no jarring colors).
