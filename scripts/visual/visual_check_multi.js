const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });

  const baseUrl = 'http://localhost:3000';
  
  // Test Case 1: Standard Lesson (Legacy)
  const legacyUrl = `${baseUrl}/en/courses/ai-basics-beginner/lessons/01-what-is-ai`;
  console.log(`Checking legacy lesson: ${legacyUrl}`);
  await page.goto(legacyUrl, { waitUntil: 'networkidle' });
  const legacyText = await page.innerText('body');
  if (legacyText.includes('Lesson not found')) {
      console.log('FAIL: Legacy lesson also NOT FOUND.');
  } else {
      console.log('SUCCESS: Legacy lesson LOADED.');
  }

  // Test Case 2: New Lesson (Failed earlier)
  const newUrl = `${baseUrl}/en/courses/practical-prompt-engineering/lessons/05-ai-powered-development`;
  console.log(`Checking new lesson: ${newUrl}`);
  await page.goto(newUrl, { waitUntil: 'networkidle' });
  const newText = await page.innerText('body');
  if (newText.includes('Lesson not found')) {
      console.log('FAIL: New lesson NOT FOUND.');
  } else {
      console.log('SUCCESS: New lesson LOADED.');
  }

  await browser.close();
})();
