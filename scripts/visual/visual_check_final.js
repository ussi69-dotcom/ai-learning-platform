const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });

  const baseUrl = 'http://localhost:3000';
  
  // 1. LOGIN
  console.log('Logging in...');
  await page.goto(`${baseUrl}/en/login`);
  
  // Use generic selectors since names are null
  await page.waitForSelector('input[type="email"]');
  await page.fill('input[type="email"]', 'admin@ai-platform.com');
  await page.fill('input[type="password"]', 'admin123');
  
  // Screenshot before click
  await page.screenshot({ path: 'visual_tests/before_login_click.png' });
  
  // Find and click the login button
  await page.click('button[type="submit"]');
  
  console.log('Clicked login, waiting for navigation...');
  
  try {
      // Wait for navigation or look for signs of success (e.g., "Logout" button or profile link)
      await page.waitForURL(url => url.pathname.includes('profile') || url.pathname === '/en' || url.pathname === '/en/', { timeout: 10000 });
      console.log('Login success! Final URL:', page.url());
  } catch (e) {
      console.log('Navigation timeout, checking for error messages...');
      const errorMsg = await page.innerText('body');
      console.log('Error message on page (sample):', errorMsg.substring(0, 100));
      await page.screenshot({ path: 'visual_tests/login_failed_error.png' });
      // Even if navigation fails, we might still be logged in (session cookie)
  }

  // 2. NAVIGATE TO LESSON
  const lessonUrl = `${baseUrl}/en/courses/practical-prompt-engineering/lessons/05-ai-powered-development`;
  console.log(`Navigating to ${lessonUrl}...`);
  await page.goto(lessonUrl, { waitUntil: 'networkidle' });

  // 3. CAPTURE DIAGRAM
  const content = await page.innerText('body');
  if (content.includes('Lesson not found')) {
      console.log('STILL NOT FOUND. Page content summary:', content.substring(0, 200).replace(/\n/g, ' '));
      await page.screenshot({ path: 'visual_tests/final_fail.png' });
  } else {
      console.log('SUCCESS: Content found!');
      // Wait for diagrams to render (they might be client-side SVGs)
      await page.waitForTimeout(2000); 
      
      const diagram = page.locator('svg[aria-label*="MCP Architecture"]');
      if (await diagram.count() > 0) {
          console.log('Diagram found, taking screenshot...');
          await diagram.screenshot({ path: 'visual_tests/mobile_diagram_final.png' });
          console.log('SAVED: visual_tests/mobile_diagram_final.png');
      } else {
          console.log('Diagram NOT found in DOM. Taking full page screenshot.');
          await page.screenshot({ path: 'visual_tests/final_content_no_diagram.png', fullPage: true });
      }
  }

  await browser.close();
})();
