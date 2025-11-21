# Task List - Cycle 10: Rich MDX Components & Content Rewrite

## Frontend: Rich MDX Components
- [x] **Create Callout Component**
    - [x] Create `components/mdx/Callout.tsx` with props: type='info'|'warning'|'tip'
    - [x] Add icon support (info, warning, tip icons)
    - [x] Style with modern glassmorphism design
- [x] **Create Steps Component**
    - [x] Create `components/mdx/Steps.tsx` for tutorial step lists
    - [x] Add numbered steps with styling
    - [x] Support nested markdown content
- [x] **Create ConceptCard Component**
    - [x] Create `components/mdx/ConceptCard.tsx` with title prop
    - [x] Style as highlighted definition box
- [x] **Register Components in MarkdownRenderer**
    - [x] Update `MarkdownRenderer.tsx` to parse and render custom components
    - [x] Add support for `<Callout>`, `<Steps>`, `<ConceptCard>` tags

## Content: Rewrite Lesson 1
- [x] **Update Lesson 1 Content**
    - [x] Replace `content/courses/ai-basics-beginner/lessons/01-what-is-ai/content.mdx`
    - [x] Use new components (Callout, Steps, ConceptCard)
    - [x] Structure with Theory/Practice sections
    - [x] Add interactive hands-on lab

## Verification
- [/] **Test Components**
    - [ ] Run dev server and verify Callout renders correctly
    - [ ] Verify Steps component displays numbered steps
    - [ ] Verify ConceptCard highlights definitions
    - [ ] Test mobile responsiveness
- [ ] **Screenshot/Demo**
    - [ ] Capture screenshot of new Lesson 1 with components
    - [ ] Verify sticky footer on mobile (from previous task)