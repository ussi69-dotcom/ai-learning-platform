const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = 'http://localhost:3000/en/login';
  console.log(`Checking login page: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });

  const inputs = await page.locator('input').all();
  console.log(`Found ${inputs.length} inputs:`);
  for (const input of inputs) {
      console.log('Input type:', await input.getAttribute('type'), 'Name:', await input.getAttribute('name'), 'Placeholder:', await input.getAttribute('placeholder'));
  }
  
  await page.screenshot({ path: 'visual_tests/login_page_debug.png' });
  await browser.close();
})();
