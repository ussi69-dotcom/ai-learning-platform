const { chromium } = require('playwright');

(async () => {
  const baseUrl = process.env.TARGET_URL || 'http://localhost:3000';
  console.log(`Target Base URL: ${baseUrl}`);
  
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 2000 });

    // 1. Login
    console.log('Navigating to login...');
    await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
    
    console.log('Filling credentials...');
    await page.fill('input[type="email"]', 'admin@ai-platform.com');
    await page.fill('input[type="password"]', 'admin123');
    
    console.log('Submitting...');
    await page.click('button[type="submit"]');
    
    // Wait for navigation (redirects to /)
    await page.waitForURL(baseUrl + '/', { timeout: 10000 }).catch(() => console.log('Redirection to home timed out...'));
    console.log(`Current URL: ${page.url()}`);

    // 2. Activate Dark Mode (Sith)
    console.log('Activating Sith Mode (Dark)...');
    // Using :has-text selector which is specific to Playwright
    await page.click('button:has-text("Sith")');
    // Wait for transition/local storage persistence
    await page.waitForTimeout(1000);

    // 3. Navigate to Lesson
    const lessonUrl = `${baseUrl}/courses/3/lessons/5`; 
    console.log(`Navigating to lesson: ${lessonUrl}`);
    
    await page.goto(lessonUrl, { waitUntil: 'networkidle', timeout: 15000 });

    // 4. Screenshot
    console.log('Taking dark mode screenshot...');
    await page.screenshot({ path: 'lesson_view_dark.png', fullPage: true });
    
    console.log('Success! Saved to lesson_view_dark.png');
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
    process.exit(1);
  }
})();
