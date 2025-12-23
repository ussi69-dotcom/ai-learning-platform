const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });

  const baseUrl = 'http://localhost:3000';
  
  // 1. LOGIN
  console.log('Logging in...');
  await page.goto(`${baseUrl}/en/login`);
  await page.fill('input[name="email"]', 'admin@ai-platform.com');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  
  // Wait for redirect to profile or homepage
  await page.waitForURL(url => url.includes('profile') || url.pathname === '/en' || url.pathname === '/', { timeout: 5000 });
  console.log('Login successful, redirected to:', page.url());

  // 2. NAVIGATE TO LESSON
  const lessonUrl = `${baseUrl}/en/courses/practical-prompt-engineering/lessons/05-ai-powered-development`;
  console.log(`Navigating to ${lessonUrl}...`);
  await page.goto(lessonUrl, { waitUntil: 'networkidle' });

  // 3. CHECK CONTENT
  const bodyText = await page.innerText('body');
  if (bodyText.includes('Lesson not found')) {
      console.log('FAILURE: Still seeing "Lesson not found" after login.');
      await page.screenshot({ path: 'visual_tests/still_not_found.png', fullPage: true });
  } else {
      console.log('SUCCESS: Lesson content reached!');
      const diagramLocator = page.locator('svg[aria-label^="MCP Architecture"]');
      if (await diagramLocator.count() > 0) {
          await diagramLocator.screenshot({ path: 'visual_tests/mobile_diagram_actual.png' });
          console.log('Screenshot of diagram saved!');
      } else {
          console.log('Diagram component not found on page, but content loaded.');
          await page.screenshot({ path: 'visual_tests/content_loaded_no_diagram.png', fullPage: true });
      }
  }

  await browser.close();
})();
