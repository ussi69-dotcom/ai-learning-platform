# Golden Standard Template for Lessons

**Extracted from:** Copilot Mastery Lessons 02 & 03
**Created:** 2025-12-21

---

## Structure Overview

```
1. TITLE with emoji
2. Mission Callout (Reading time + Labs count)
3. VideoSwitcher (3-5 alternative videos)
4. HOOK SECTION (Strong opening, paradigm shift)
5. Evolution/Context Table
6. Core Concept with Diagram
7. Comparison Tables (vs alternatives)
8. Reality Check Callouts (Frontier/Preview status)
9. LABS (3-4 hands-on exercises)
10. Micro-Case (Pilot template with KPIs)
11. Real-World Success Stories
12. Security & Governance
13. Best Practices / Anti-Patterns
14. Holocron Summary (Key Takeaways)
```

---

## Component Details

### 1. Header

```mdx
# Title with Emoji 🚀

<Callout type="info">
**Mission:** One-sentence outcome statement

⏳ **Reading Time:** XX min | 🧪 **[N] Labs Included**
</Callout>
```

### 2. Video Section

```mdx
<VideoSwitcher alternatives={[
  {"id":"VIDEO_ID_1","title":"Primary Video Title"},
  {"id":"VIDEO_ID_2","title":"Alternative Video 1"},
  {"id":"VIDEO_ID_3","title":"Alternative Video 2"}
]} />
```

- Include 3-5 YouTube videos
- Primary = best quality/most comprehensive
- Alternatives = different perspectives, newer content

### 3. Hook Section

**Structure:**
- Bold provocative statement
- Contrast old vs new approach
- "You are not here to learn X. You are here to Y."
- Clear paradigm shift

**Example:**
```
**You used to need [OLD WAY].**
Now? You just [NEW WAY].
The era of [OLD] is ending. The era of **[NEW]** has arrived.
```

### 4. Evolution/Context Table

| Generation | Approach | Example | Your Role |
|------------|----------|---------|-----------|
| 1st | Old way | Example | Role 1 |
| 2nd | Middle | Example | Role 2 |
| 3rd | New way | Example | **New Role** |

### 5. Diagrams

Use `<Diagram type="..." />` for:
- Architecture overviews
- Process flows
- Comparison pyramids
- Security layers
- Timeline visualizations

### 6. Labs

```mdx
## 🔬 Lab N: Descriptive Title

**Objective:** One sentence goal

**Prerequisites:** (if any)

**The Setup:**
1. Step 1
2. Step 2
3. Step 3

**The Prompt/Code:**
```text
Actual prompt or code to use
```

**Analysis:**
- What happens
- Why it matters

**Expected behavior:**
- Bullet 1
- Bullet 2

**💡 Aha Moment:** *"Insight the learner should have"*

<LabComplete labId="lab-id" />
```

### 7. Callout Types

- `info` - Neutral information
- `tip` - Pro tips
- `warning` - Cautions, limitations
- `success` - Positive outcomes

### 8. ConceptCard

```mdx
<ConceptCard title="Title" icon="🎯">
Content with bullet points
</ConceptCard>
```

### 9. Steps Component

```mdx
<Steps>
#### Step 1 Title
Description

#### Step 2 Title
Description
</Steps>
```

### 10. Images

```mdx
<MDXImage
  src="images/filename.png"
  alt="Descriptive alt text"
  caption="Caption explaining the image"
/>
```

### 11. Micro-Case Template

```mdx
## 📌 Micro-Case: X-Week Pilot (Template)

**Goal:** One sentence

**Scope:**
- Constraint 1
- Constraint 2

**KPIs to track:**
- Metric 1
- Metric 2

**Suggested success criteria:**
- ≥XX% improvement
- ≤XX% failure rate
```

### 12. Holocron Summary

```mdx
<ConceptCard title="Holocron: Topic Mastery" icon="💎">

### 🔑 Key Takeaways
* Bullet 1
* Bullet 2
* Bullet 3

### 🧠 Mental Model
Metaphor or framework for understanding

### 🛡️ Security/Best Practices
Warnings and guidelines

### ⚡ Next Steps
1. Action 1
2. Action 2

</ConceptCard>
```

---

## Quality Checklist

### Content
- [ ] Strong hook (first 3 sentences grab attention)
- [ ] Clear paradigm shift explained
- [ ] 3-4 hands-on labs
- [ ] Real-world examples/case studies
- [ ] Comparison tables (vs alternatives)
- [ ] Micro-case pilot template

### Technical
- [ ] difficulty set (beginner/intermediate/advanced)
- [ ] duration_minutes set
- [ ] VideoSwitcher with 3+ videos
- [ ] All Diagrams defined
- [ ] All images exist
- [ ] Both EN and CS versions

### Edutainment
- [ ] Emoji in title
- [ ] Conversational tone
- [ ] "Aha Moments" in labs
- [ ] No wall-of-text sections
- [ ] Progressive complexity

---

## Difficulty Guidelines

| Level | Audience | Prerequisites | Concepts |
|-------|----------|---------------|----------|
| **beginner** | No AI experience | None | Fundamentals, overview |
| **intermediate** | Used AI tools | Basic prompting | Workflows, integrations |
| **advanced** | AI practitioners | Multiple tools | Architecture, governance |

---

*Last Updated: 2025-12-21*
