# Implementation Plan - Cycle 14: Liquid Glass UI & Design Standardization

## 🎯 Goal
Establish a strict design language ("The Glass Standard") to elevate the platform's visual quality. We will refactor the UI to remove visual noise, implement professional "Glassmorphism" components, and fix mobile navigation.

## 📜 Step 1: The Constitution (CONTENT_GUIDELINES.md)
We will create a master reference file in the project root. This file dictates:
* **Visuals**: No generic assets (robots/brains). Only code or functional diagrams.
* **UI**: Liquid Glass styling for all cards. No solid opacity.
* **Navigation**: Mobile Sticky Footer is mandatory.

## 🛠️ Step 2: Component Refactor (The "Glass" System)

### A. CodeBlock with Copy Functionality 📋
* **Visual**: Dark Glass (`bg-slate-950/80`, `backdrop-blur`).
* **Feature**: A "Copy to Clipboard" button in the top-right header.
* **Interaction**: On click -> Write to clipboard -> Change icon to Checkmark for 2s -> Revert.

### B. Glass Callouts & Cards 💡
* **Style**: Remove solid background colors (e.g., `bg-blue-100`).
* **New Style**:
    * Background: `bg-background/40` (or `white/5`).
    * Border: `border border-white/10`.
    * Accent: `border-l-4` (Blue for Info, Amber for Warning).
* **Typography**: Ensure adequate padding so text breathes.

### C. Navigation (Sticky Footer) 📱
* **Mobile (< md)**: Hide inline buttons. Show **Fixed Bottom Bar**.
* **Layout**:
    * Left: `Prev Slide` (Icon).
    * Center: `Progress` (Text "Slide 3/8" or Bar).
    * Right: `Next Slide` (Icon - Solid Color).
* **Logic**: "Next Lesson" button is hidden until the very last slide.

## 🧹 Step 3: Content Deep Clean
* **Action**: Open `01-what-is-ai/content.mdx`.
* **Purge**: Remove ALL `![image](...)` references.
* **Verify**: Ensure structure uses `##` for slides and `###` for internal sections.