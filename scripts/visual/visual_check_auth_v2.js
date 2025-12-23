const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });

  const baseUrl = 'http://localhost:3000';
  
  console.log('Logging in with placeholders...');
  await page.goto(`${baseUrl}/en/login`);
  await page.fill('input[placeholder="your@email.com"]', 'admin@ai-platform.com');
  await page.fill('input[placeholder="••••••••"]', 'admin123');
  await page.click('button:has-text("Login"), button:has-text("Přihlásit"), button[type="submit"]');
  
  try {
      await page.waitForURL(url => url.pathname.includes('profile') || url.pathname === '/en' || url.pathname === '/en/', { timeout: 10000 });
      console.log('Login successful, redirected to:', page.url());
  } catch (e) {
      console.log('Login failed or timeout. Current URL:', page.url());
      await page.screenshot({ path: 'visual_tests/login_failed_final.png' });
  }

  const lessonUrl = `${baseUrl}/en/courses/practical-prompt-engineering/lessons/05-ai-powered-development`;
  console.log(`Navigating to ${lessonUrl}...`);
  await page.goto(lessonUrl, { waitUntil: 'networkidle' });

  const bodyText = await page.innerText('body');
  if (bodyText.includes('Lesson not found')) {
      console.log('FAILURE: Still seeing "Lesson not found" after login.');
      // Check if maybe we need to be on a different route for admin?
  } else if (bodyText.includes('Mission:')) {
      console.log('SUCCESS: Lesson content reached!');
      const diagramLocator = page.locator('svg[aria-label^="MCP Architecture"]');
      if (await diagramLocator.count() > 0) {
          await diagramLocator.screenshot({ path: 'visual_tests/mobile_diagram_actual.png' });
          console.log('Screenshot of diagram saved!');
      } else {
          console.log('Diagram not found, taking full page screenshot.');
          await page.screenshot({ path: 'visual_tests/lesson_page_no_diagram.png', fullPage: true });
      }
  } else {
      console.log('Unknown state. Body text sample:', bodyText.substring(0, 100));
      await page.screenshot({ path: 'visual_tests/unknown_state.png' });
  }

  await browser.close();
})();
