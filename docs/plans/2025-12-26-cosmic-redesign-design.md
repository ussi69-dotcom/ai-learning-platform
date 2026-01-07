# Cosmic Redesign - Frontend Design Plan

**Created:** 2025-12-26
**Status:** Approved
**Consulted:** Gemini Pro, Frontend-Design Skill

## Overview

Complete frontend redesign of AI Learning Platform with "Cosmic/Space" direction, strengthening Star Wars Jedi/Sith identity.

## Design Decisions

### Visual Direction: Cosmic/Space
- Both themes have dark backgrounds (space is dark)
- Animated star field with parallax effect
- Lightsaber colors as primary identifiers

### Color System

#### Jedi Mode (Deep Space Blue)
| Token | Value | Usage |
|-------|-------|-------|
| `--jedi-primary` | `#4FC3F7` | Lightsaber blue, buttons, links |
| `--jedi-accent` | `#00E5FF` | Cyan spark, highlights |
| `--jedi-bg-start` | `#0A1628` | Background gradient start |
| `--jedi-bg-end` | `#0D1B2A` | Background gradient end |
| `--jedi-text` | `#F1F5F9` | Off-white text (WCAG compliant) |
| `--jedi-text-muted` | `#94A3B8` | Secondary text |
| `--jedi-card` | `rgba(255,255,255,0.05)` | Glass panel background |
| `--jedi-border` | `rgba(79,195,247,0.2)` | Subtle blue borders |
| `--jedi-glow` | `0 0 20px rgba(79,195,247,0.5)` | Button/element glow |

#### Sith Mode (Volcanic Black)
| Token | Value | Usage |
|-------|-------|-------|
| `--sith-primary` | `#EF5350` | Sith red, buttons, links |
| `--sith-accent` | `#FFD54F` | Imperial gold, highlights |
| `--sith-bg-start` | `#0A0A0A` | Pure black start |
| `--sith-bg-end` | `#1A0505` | Red-tinted vignette |
| `--sith-text` | `#FFEBEE` | Warm white text |
| `--sith-text-muted` | `#FFCDD2` | Secondary text |
| `--sith-card` | `rgba(255,255,255,0.03)` | Darker glass panels |
| `--sith-border` | `rgba(239,83,80,0.3)` | Red borders |
| `--sith-glow` | `0 0 20px rgba(239,83,80,0.5)` | Red glow effect |

### Typography

| Role | Font | Fallback | Notes |
|------|------|----------|-------|
| Headings | Exo 2 | system-ui | Geometric, sci-fi character |
| Body | Atkinson Hyperlegible | system-ui | Designed for accessibility |
| Mono | JetBrains Mono | monospace | Code blocks |

**Rationale:** Avoided Space Grotesk and Inter per frontend-design skill guidance (common AI choices).

### Components

#### 1. StarField Background
- 3-layer CSS parallax (performance optimized per Gemini)
- Static SVG star patterns with different densities
- `will-change: transform` for GPU acceleration
- Subtle twinkling via CSS animation (opacity pulse)
- Layers: distant (slow), mid (medium), near (faster)

#### 2. LightsaberToggle
- SVG handle (metallic gradient)
- Animated blade using width transition
- Framer Motion for smooth state changes
- Theme-colored glow (`drop-shadow`)
- Sound effect optional (user preference)

#### 3. Floating NavBar
- Pill-shaped, 80% max-width, centered
- Glass background with backdrop-blur
- Floats 16px from top edge
- Subtle shadow for depth
- Responsive: full-width on mobile

#### 4. Holocron Cards
- Glass panel with backdrop-blur-xl
- Minimal 1px border in theme color
- Glow effect on hover (theme primary)
- Staggered reveal animation on page load
- Corner accents (optional geometric detail)

#### 5. Glow Buttons
- Solid background in theme primary
- `box-shadow` glow in theme color
- Scale + intensify glow on hover
- Pulse animation for CTAs

### Animations

#### Page Load Sequence
1. Star field fades in (0-300ms)
2. NavBar slides down (200-400ms)
3. Hero content staggers in (300-700ms)
4. Cards reveal with delay cascade (500-1000ms)

#### Micro-interactions
- Button hover: scale(1.02) + glow intensify
- Card hover: border glow + slight lift
- Toggle switch: blade width + glow transition
- Link hover: underline slide-in

### Layout Grid

```
Container: max-w-7xl (1280px)
Content: max-w-4xl (896px) for lessons
Spacing scale: 4px base (Tailwind default)
Card gap: 24px (gap-6)
Section padding: 48-96px vertical
```

### Accessibility

- Text contrast: WCAG AA minimum (4.5:1)
- Off-white text (#F1F5F9) instead of pure white
- Focus states with visible ring
- Reduced motion media query support
- Star animation pausable

## Implementation Order

1. **Phase 1: Foundation**
   - [ ] Update globals.css with new color system
   - [ ] Add Google Fonts (Exo 2, Atkinson Hyperlegible)
   - [ ] Create StarField component

2. **Phase 2: Core Components**
   - [ ] Redesign LightsaberToggle
   - [ ] Update NavBar (floating style)
   - [ ] Update Card components

3. **Phase 3: Pages**
   - [ ] Homepage redesign
   - [ ] Lesson page redesign
   - [ ] Course listing page

4. **Phase 4: Polish**
   - [ ] Add page transition animations
   - [ ] Staggered reveal effects
   - [ ] Performance optimization
   - [ ] Visual QA

## Files to Modify

| File | Changes |
|------|---------|
| `frontend/app/globals.css` | Complete color system overhaul |
| `frontend/app/layout.tsx` | Add fonts, StarField wrapper |
| `frontend/components/JediSithToggle.tsx` | → `LightsaberToggle.tsx` redesign |
| `frontend/components/NavBar.tsx` | Floating pill style |
| `frontend/components/ui/card.tsx` | Holocron styling |
| `frontend/components/ui/button.tsx` | Glow effects |
| `frontend/app/[locale]/page.tsx` | Homepage layout |
| `frontend/app/[locale]/courses/[courseId]/lessons/[lessonId]/page.tsx` | Lesson layout |

## New Components

| Component | Purpose |
|-----------|---------|
| `StarField.tsx` | Animated background |
| `LightsaberToggle.tsx` | Theme switcher (replaces JediSithToggle) |
| `GlowButton.tsx` | Primary action button variant |
| `HolocronCard.tsx` | Themed card wrapper |

## Performance Budget

- Star field: < 5% CPU usage
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- No layout shift from animations

## Sign-off

- [x] User approved direction (Cosmic/Space)
- [x] User approved colors (Classic SW)
- [x] User approved all component choices
- [x] Gemini Pro reviewed (performance + accessibility)
- [x] Frontend-design skill applied (typography refined)

---

*Plan ready for implementation.*
