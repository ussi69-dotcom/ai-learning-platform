# 👁️ Visual Inspection & Regression Testing

This document covers two approaches to visual testing:
1. **Automated Visual Regression Testing** (Playwright in frontend) - PRIMARY
2. **Ad-hoc Screenshot Capture** (Docker-based) - LEGACY

---

## 🎯 Playwright Visual Regression Testing (Recommended)

Automated visual regression testing using Playwright with baseline snapshots.

### Location
```
frontend/
├── playwright.config.ts              # Test configuration
├── tests/visual/
│   ├── pages.spec.ts                 # Public pages tests
│   ├── components.spec.ts            # Component tests
│   ├── auth-flows.spec.ts            # Authenticated user tests
│   └── *.spec.ts-snapshots/          # Baseline screenshots (48 files)
```

### Quick Commands

```bash
cd frontend

# Run visual tests (compare with baseline)
npm run test:visual

# Update baselines after intentional UI changes
npm run test:visual:update

# View HTML report with visual diffs
npm run test:visual:report

# Interactive UI for debugging
npm run test:visual:ui
```

### What's Tested

| Test File | Coverage |
|-----------|----------|
| `pages.spec.ts` | Homepage (EN/CS), Login, Register, About, Theme switching (Jedi/Sith), Responsive layouts |
| `components.spec.ts` | Navbar, Login form validation, Register form, Course listing |
| `auth-flows.spec.ts` | Profile page, Authenticated navbar, Courses page, XP progress bar |

### Viewports

All tests run on 3 viewports:
- **Desktop**: 1920×1080
- **Tablet**: 1024×1366
- **Mobile**: 390×844

### QA Workflow

1. **Before UI Changes**: Run `npm run test:visual` to ensure baseline passes
2. **After UI Changes**:
   - Run `npm run test:visual`
   - If tests fail, review diff in `npm run test:visual:report`
   - If changes are intentional: `npm run test:visual:update`
   - Commit updated snapshots
3. **CI Integration**: Add `npm run test:visual` to CI pipeline

### Adding New Visual Tests

```typescript
// frontend/tests/visual/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test('my feature looks correct', async ({ page }) => {
  await page.goto('/en/my-feature');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500); // Let animations settle

  await expect(page).toHaveScreenshot('my-feature.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.02, // Allow 2% difference
  });
});
```

### Prerequisites (WSL/Linux)

```bash
# Install system dependencies (one-time)
sudo apt-get install -y libnspr4 libnss3 libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 \
  libxrandr2 libgbm1 libasound2t64

# Install Chromium browser
cd frontend && npx playwright install chromium
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| "Executable doesn't exist" | Run `npx playwright install chromium` |
| "libXXX.so not found" | Install missing apt package |
| Tests timing out | Ensure `docker compose up -d` is running |
| Flaky tests | Increase `waitForTimeout` or `maxDiffPixelRatio` |

---

## 📸 Ad-hoc Screenshot Capture (Legacy)

For one-off screenshots when Playwright tests aren't suitable.

### Docker-based Capture

```bash
docker run --rm \
  --network ai-learning-platform_default \
  -v $(pwd)/visual_tests:/app \
  -w /app \
  -e TARGET_URL=http://ai-frontend:3000 \
  mcr.microsoft.com/playwright:v1.57.0-jammy \
  /bin/bash -c "npm install playwright && node capture.js"
```

Output: `visual_tests/current_view.png`

### Script (`visual_tests/capture.js`)

```javascript
const { chromium } = require('playwright');

(async () => {
  const targetUrl = process.env.TARGET_URL || 'http://localhost:3000';
  console.log(`Starting browser to capture: ${targetUrl}`);

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 10000 });
    await page.screenshot({ path: 'current_view.png', fullPage: false });
    console.log('Success! Saved to current_view.png');
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
    process.exit(1);
  }
})();
```

---

## 🔄 Migration Notes

The old Docker-based approach in `visual_tests/` is kept for backwards compatibility but the recommended approach is the Playwright test suite in `frontend/tests/visual/`.

Benefits of the new approach:
- Baseline comparison (detects unintended changes)
- Multiple viewports automatically
- HTML reports with visual diffs
- Integrated with npm scripts
- No Docker required for local runs
