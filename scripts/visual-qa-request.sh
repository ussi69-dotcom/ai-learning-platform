#!/bin/bash
# Visual QA Request Generator - creates checklist for Gemini
# Usage: ./scripts/visual-qa-request.sh "Page or component name"
# Output: Screenshot directory + QA checklist

set -e

TARGET="${1:-Unspecified page}"
TIMESTAMP=$(date +%Y%m%d-%H%M)
SCREENSHOT_DIR=".playwright-mcp/qa-${TIMESTAMP}"
OUTPUT_FILE="${SCREENSHOT_DIR}/qa-request.md"

# Create screenshot directory
mkdir -p "$SCREENSHOT_DIR"

cat << EOF > "$OUTPUT_FILE"
## Visual QA Request
Generated: $(date +"%Y-%m-%d %H:%M:%S")

## Target
**Page/Component:** $TARGET
**Screenshot Directory:** $SCREENSHOT_DIR

---

## Pre-QA Checklist (Manual)
- [ ] Take screenshot at 375px (mobile)
- [ ] Take screenshot at 768px (tablet)
- [ ] Take screenshot at 1440px (desktop)
- [ ] Take screenshot in dark mode
- [ ] Take screenshot in light mode

## Screenshot Naming Convention
\`\`\`
${SCREENSHOT_DIR}/
├── mobile-375.png
├── tablet-768.png
├── desktop-1440.png
├── dark-mode.png
└── light-mode.png
\`\`\`

---

## QA Checklist for Gemini

### Layout & Responsiveness
- [ ] Content fits viewport without horizontal scroll
- [ ] Touch targets are min 44x44px on mobile
- [ ] Text is readable without zooming
- [ ] No content overflow or clipping

### Visual Consistency
- [ ] Colors match design system
- [ ] Typography is consistent
- [ ] Spacing follows grid system
- [ ] Icons are properly aligned

### Accessibility (WCAG AA)
- [ ] Text contrast ratio >= 4.5:1
- [ ] Focus indicators visible
- [ ] No color-only information
- [ ] Interactive elements are distinguishable

### Dark/Light Mode
- [ ] All elements visible in both modes
- [ ] No ghosting or transparency issues
- [ ] Images have appropriate backgrounds

### Content-Specific
- [ ] Code blocks have Copy button
- [ ] Callouts render correctly
- [ ] Tables are scrollable on mobile
- [ ] Lab sections have proper formatting

---

## Gemini Prompt Template
\`\`\`
Analyze these screenshots of "$TARGET":

1. Check all items in the QA checklist above
2. Report any visual issues found
3. Score overall quality (0-10)
4. Suggest specific fixes if needed

Screenshots: $SCREENSHOT_DIR/
\`\`\`

---
*Use with: gemini -m gemini-3-pro-preview -i ${SCREENSHOT_DIR}/*.png*
EOF

echo "Visual QA request created!"
echo ""
echo "Next steps:"
echo "  1. Take screenshots and save to: $SCREENSHOT_DIR/"
echo "  2. Run: gemini -m gemini-3-pro-preview -i ${SCREENSHOT_DIR}/*.png < ${OUTPUT_FILE}"
echo ""
echo "Request file: $OUTPUT_FILE"
