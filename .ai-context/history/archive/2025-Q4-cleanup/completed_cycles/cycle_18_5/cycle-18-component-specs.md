# Component Enhancement Specs - Cycle 18

## 1. ConceptCard Grid Layout

### Current State:
```jsx
<ConceptCard title="...">...</ConceptCard>
<ConceptCard title="...">...</ConceptCard>
<ConceptCard title="...">...</ConceptCard>
```
Renders as stacked cards (1 column)

### Target State:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <ConceptCard title="...">...</ConceptCard>
  <ConceptCard title="...">...</ConceptCard>
  <ConceptCard title="...">...</ConceptCard>
</div>
```

### Responsive Breakpoints:
- Mobile (< 768px): 1 column
- Tablet (768-1024px): 2 columns
- Desktop (> 1024px): 3 columns

### Hover Effect:
```css
/* Add to ConceptCard component */
.concept-card {
  transition: all 0.3s ease;
}

.concept-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}
```

---

## 2. Steps Component Icons

### Icon Mapping:
- **Action** → 🎯 (or Lucide `Target` icon)
- **Observation** → 👁️ (or Lucide `Eye` icon)
- **Reflection** → 💡 (or Lucide `Lightbulb` icon)

### Implementation:
```tsx
// Add icon prop to Steps headings
<Steps>
### Action 🎯
[content]

### Observation 👁️
[content]

### Reflection 💡
[content]
</Steps>
```

### Progress Indicator:
Add step counter: "Step 1 of 3", "Step 2 of 3", etc.

---

## 3. LabBadge Component

### Design:
```tsx
<div className="lab-badge">
  <span className="badge-icon">🏆</span>
  <span className="badge-text">Lab Complete! +10 XP</span>
</div>
```

### Styling (Liquid Glass):
```css
.lab-badge {
  background: linear-gradient(135deg, 
    rgba(34, 197, 94, 0.1) 0%, 
    rgba(59, 130, 246, 0.1) 100%);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  animation: fadeInScale 0.5s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## 4. ProgressDots Component

### Design:
10 dots representing lesson sections

### Position:
- Desktop: Fixed top-right (sticky)
- Mobile: Hidden (too much clutter)

### Interaction:
- Fill dots as user scrolls past sections
- Click dot to jump to section

### Implementation:
```tsx
<div className="progress-dots">
  {sections.map((section, i) => (
    <button 
      key={i}
      className={`dot ${currentSection >= i ? 'filled' : ''}`}
      onClick={() => scrollToSection(i)}
    />
  ))}
</div>
```

---

## 5. Diagram Wireframes

### Learning Types Overview:
```
     [AI Learning]
    /      |      \
   /       |       \
[Super] [Unsuper] [RL]
```
- Tree structure
- Glass nodes with labels
- SVG-based

### Supervised Learning Flow:
```
[Input] → [Label] → [Training] → [Prediction]
```
- Linear flow with arrows
- Color-coded stages

### Clustering Visualization:
```
Before:        After:
• • • •       (• •) (• •)
• • • •       (• •) (• •)
```
- Dots grouping into clusters
- Optional subtle animation

### RL Loop:
```
    [Action]
        ↓
  [Reward/Penalty]
        ↓
     [Learn]
        ↓
    [Repeat] ← (loops back)
```
- Circular diagram
- Green for reward, red for penalty

---

## Implementation Priority:

1. **Grid Layout** - Quick win, immediate visual impact
2. **Icons in Steps** - Simple, adds clarity
3. **LabBadge** - Celebration moment
4. **Diagrams** - Most complex, biggest wow
5. **ProgressDots** - Optional enhancement

---

**Status:** Ready for implementation
**Next:** Task 3 - Setup feature branch
