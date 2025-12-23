const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });

  const baseUrl = 'http://localhost:3000';
  
  // LOGIN
  console.log('Logging in...');
  await page.goto(`${baseUrl}/en/login`);
  await page.fill('input[type="email"]', 'admin@ai-platform.com');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForURL(url => url.pathname === '/en' || url.pathname === '/en/', { timeout: 10000 });

  const lessonUrl = `${baseUrl}/en/courses/practical-prompt-engineering/lessons/05-ai-powered-development`;
  console.log(`Navigating to ${lessonUrl}...`);
  await page.goto(lessonUrl, { waitUntil: 'networkidle' });

  // Look for the mobile-specific div list (from DiagramArchitecture)
  // It has text "MCP Architecture" or "1. MCP Host"
  const mobileDiagram = page.locator('div:has-text("MCP Architecture")').filter({ hasText: "1. MCP Host" }).first();
  
  if (await mobileDiagram.count() > 0) {
      console.log('Mobile-specific diagram view found! Taking screenshot...');
      await mobileDiagram.screenshot({ path: 'visual_tests/mobile_architecture_div.png' });
      console.log('SAVED: visual_tests/mobile_architecture_div.png');
  } else {
      console.log('Mobile architecture div NOT found. Checking generic SVGs again.');
      // Take screenshot of the area where the diagram should be
      await page.screenshot({ path: 'visual_tests/mobile_debug_area.png', fullPage: true });
  }

  await browser.close();
})();
