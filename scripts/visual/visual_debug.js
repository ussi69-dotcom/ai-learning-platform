const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });

  const url = 'http://localhost:3000/en/courses/practical-prompt-engineering/lessons/05-ai-powered-development';
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });

  console.log('Page Title:', await page.title());
  
  // Check if we are redirected to login
  if (page.url().includes('login') || page.url().includes('sign-in')) {
      console.log('Redirected to login!');
  }

  // List all SVGs found
  const svgs = await page.locator('svg').all();
  console.log(`Found ${svgs.length} SVGs.`);
  
  for (const svg of svgs) {
      const label = await svg.getAttribute('aria-label');
      console.log('SVG Label:', label);
  }

  await browser.close();
})();
