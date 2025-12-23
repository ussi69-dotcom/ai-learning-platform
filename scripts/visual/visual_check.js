const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set Mobile Viewport (iPhone 13 mini-ish)
  await page.setViewportSize({ width: 375, height: 812 });

  // URL - checking the "practical-prompt-engineering" lesson
  const url = 'http://localhost:3000/en/courses/practical-prompt-engineering/lessons/05-ai-powered-development';
  
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });

  // Locate the diagram
  // Diagrams are usually wrapped in a div. We'll look for the SVG or the wrapper.
  // The code showed: <svg aria-label="MCP Architecture...
  const diagramLocator = page.locator('svg[aria-label^="MCP Architecture"]');
  
  if (await diagramLocator.count() > 0) {
    console.log('Diagram found. Taking screenshot...');
    await diagramLocator.screenshot({ path: 'visual_tests/mobile_diagram_fail.png' });
    console.log('Screenshot saved to frontend/visual_tests/mobile_diagram_fail.png');
  } else {
    console.error('Diagram NOT found!');
    // Take full page screenshot to debug
    await page.screenshot({ path: 'visual_tests/debug_fullpage.png', fullPage: true });
  }

  await browser.close();
})();
