# 👁️ Visual Inspection Workflow

As an AI agent without a native browser, I can "see" the application by generating screenshots using Playwright running in a Docker container. This bypasses local system dependency issues and ensures network access to the running containers.

## 🛠️ Setup

The following files are located in `visual_tests/`:
- `capture.js`: Node.js script to take the screenshot.
- `current_view.png`: The output screenshot.

## 📸 How to Capture a Screenshot

Run this command from the project root. It spins up a temporary Playwright container, connects it to the app's network, and runs the capture script.

```bash
docker run --rm \
  --network ai-learning-platform_default \
  -v $(pwd)/visual_tests:/app \
  -w /app \
  -e TARGET_URL=http://ai-frontend:3000 \
  mcr.microsoft.com/playwright:v1.57.0-jammy \
  /bin/bash -c "npm install playwright && node capture.js"
```

## 🧐 How to Analyze

After the command finishes:
1.  Use the tool `read_file` on `visual_tests/current_view.png`.
2.  I will receive a description/binary of the image and can describe the UI layout, colors, and content.

## 📝 Script Content (`visual_tests/capture.js`)

```javascript
const { chromium } = require('playwright');

(async () => {
  const targetUrl = process.env.TARGET_URL || 'http://localhost:3000';
  console.log(`Starting browser to capture: ${targetUrl}`);
  
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Desktop Viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    console.log('Navigating...');
    // Networkidle ensures styles/images are loaded
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 10000 });

    console.log('Taking screenshot...');
    await page.screenshot({ path: 'current_view.png', fullPage: false });
    
    console.log('Success! Saved to current_view.png');
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
    process.exit(1);
  }
})();
```
