const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to login...');
  await page.goto('http://localhost:3000/cs/login');
  
  console.log('Filling credentials...');
  await page.fill('input[name="email"]', 'admin@ai-platform.com');
  await page.fill('input[name="password"]', 'admin123');
  
  console.log('Clicking login...');
  await page.click('button[type="submit"]');
  
  console.log('Waiting for navigation...');
  await page.waitForTimeout(3000); // Wait for redirect
  
  console.log('Navigating to Lesson 01 (CS)...');
  await page.goto('http://localhost:3000/cs/courses/practical-prompt-engineering/lessons/01-prompt-architecture');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'qa-lesson01-cs-auth.png', fullPage: true });
  console.log('Saved qa-lesson01-cs-auth.png');

  console.log('Navigating to Lesson 01 (EN)...');
  await page.goto('http://localhost:3000/en/courses/practical-prompt-engineering/lessons/01-prompt-architecture');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'qa-lesson01-en-auth.png', fullPage: true });
  console.log('Saved qa-lesson01-en-auth.png');

  await browser.close();
})();
