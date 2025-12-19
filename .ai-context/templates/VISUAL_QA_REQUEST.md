# Visual QA Request Template

Use this template when requesting Visual QA from Gemini.

---

## Visual QA Request
## Target: [Page/component name]

## Screenshots Required:
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1440px)
- [ ] Dark mode
- [ ] Light mode

## Focus Areas:
- [ ] [Specific element 1]
- [ ] [Specific element 2]

## Known Issues (if any):
- [List any known issues to verify fixed]

## Acceptance Criteria:
- [ ] No visual regressions
- [ ] WCAG AA contrast compliance
- [ ] Responsive at all breakpoints
- [ ] Consistent with design system

---

## Usage

```bash
# Generate QA request with screenshot directory:
./scripts/visual-qa-request.sh "Lesson page header"

# Take screenshots, then send to Gemini:
gemini -m gemini-3-pro-preview -i .playwright-mcp/qa-*/*.png
```

## Screenshot Naming Convention

```
.playwright-mcp/qa-YYYYMMDD-HHMM/
├── mobile-375.png
├── tablet-768.png
├── desktop-1440.png
├── dark-mode.png
└── light-mode.png
```
