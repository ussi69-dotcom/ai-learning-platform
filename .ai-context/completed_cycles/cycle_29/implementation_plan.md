# Feedback UI Polish Implementation Plan

## Goal
- [x] **Feedback System Polish**
    - [x] Fix "Liquid Glass" theme colors (remove hardcoded blue/purple).
    - [x] Fix missing icons in FAB.
    - [x] Fix drag-and-drop functionality.
    - [x] Polish FAB styling (circular buttons, neon effects).
    - [ ] Add Feedback FAB to Course Overview (`courses/[courseId]/page.tsx`).

## User Review Required
None.

## Proposed Changes

### Frontend

#### [MODIFY] [FeedbackSubmissionModal.tsx](file:///home/ussi/ai-learning-platform/frontend/components/FeedbackSubmissionModal.tsx)
- **Inputs**: Replace standard `textarea` with a styled container: `bg-black/20 backdrop-blur-md border-white/10 focus-within:border-primary/50`.
- **Buttons**:
    - "Cancel": `variant="ghost"` -> `hover:bg-white/5 text-white/60 hover:text-white`.
    - "Submit": Use a gradient background `bg-gradient-to-r from-blue-600 to-purple-600` with a glow effect `shadow-[0_0_20px_rgba(var(--primary),0.3)]`.
- **Type Selector**: Enhance active state with a stronger neon glow and border.

#### [MODIFY] [FeedbackDetailModal.tsx](file:///home/ussi/ai-learning-platform/frontend/components/FeedbackDetailModal.tsx)
- **Reply Input**:
    - Style as a "capsule" with `bg-white/5 border-white/10 backdrop-blur-sm`.
    - Add a "Send" button with a gradient icon.
- **Vote Buttons**:
    - Active state: `bg-primary/20 text-primary border-primary/50`.
    - Inactive state: `bg-transparent border-white/10 hover:bg-white/5`.
- **General**: Ensure all borders are `border-white/10` and backgrounds use `black/X` or `white/X` with `backdrop-blur`.

## Verification Plan
1.  **Build**: Run `npm run build` to ensure no syntax errors.
2.  **Visual Check**: (Implicit) Code should use the specific Tailwind classes defined in `CONTENT_GUIDELINES.md` (or similar established patterns).
