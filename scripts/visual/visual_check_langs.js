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

  // TEST BOTH LANGUAGES
  const langs = ['en', 'cs'];
  for (const lang of langs) {
      const lessonUrl = `${baseUrl}/${lang}/courses/practical-prompt-engineering/lessons/05-ai-powered-development`;
      console.log(`Checking [${lang}] lesson: ${lessonUrl}`);
      await page.goto(lessonUrl, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000); // Give it time to render React components

      const svgs = await page.locator('svg').all();
      console.log(`Found ${svgs.length} SVGs in [${lang}]`);
      
      for (let i = 0; i < svgs.length; i++) {
          const label = await svgs[i].getAttribute('aria-label');
          const id = await svgs[i].getAttribute('id');
          console.log(`SVG ${i}: Label="${label}", ID="${id}"`);
          
          if (label && label.includes('Architecture')) {
              await svgs[i].screenshot({ path: `visual_tests/mobile_diagram_${lang}.png` });
              console.log(`SAVED diagram for ${lang}`);
          }
      }
      
      await page.screenshot({ path: `visual_tests/full_page_${lang}.png`, fullPage: true });
  }

  await browser.close();
})();
