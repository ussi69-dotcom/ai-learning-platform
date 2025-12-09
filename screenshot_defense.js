const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Login
  console.log('Logging in...');
  await page.goto('http://localhost:3000/cs/login');
  await page.fill('input[type="email"]', 'admin@ai-platform.com');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  
  // Force wait for login (instead of waitForURL which can flake on redirects)
  await page.waitForTimeout(5000); 
  
  // Go directly to Lesson
  console.log('Navigating to lesson...');
  // Note: Using course slug 'practical-prompt-engineering' and lesson slug '02-prompt-injection'
  await page.goto('http://localhost:3000/cs/courses/practical-prompt-engineering/lessons/02-prompt-injection', { timeout: 60000 });
  
  // Wait for content
  await page.waitForSelector('h1', { timeout: 30000 });
  console.log('Page loaded:', await page.title());
  
  // Scroll to diagram
  const diagram = await page.$('svg[aria-label="Defense-in-Depth Shield: 5 Layers"]');
  if (diagram) {
      console.log('Diagram found!');
      await diagram.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000); // Wait for animations
      await page.screenshot({ path: 'defense_shield_diagram.png' });
      console.log('Screenshot saved: defense_shield_diagram.png');
  } else {
      console.error('Diagram NOT found!');
      // Take debug screenshot of what is there
      await page.screenshot({ path: 'lesson_page_debug.png', fullPage: true });
      console.log('Saved debug screenshot');
  }

  await browser.close();
})();
