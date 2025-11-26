const { chromium } = require('playwright');

(async () => {
  const baseUrl = process.env.TARGET_URL || 'http://localhost:3000';
  console.log(`Target Base URL: ${baseUrl}`);
  
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 2000 }); // Taller viewport to see more content

    // 1. Login
    console.log('Navigating to login...');
    await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
    
    console.log('Filling credentials...');
    // Using type selectors which are more robust here
    await page.fill('input[type="email"]', 'admin@ai-platform.com');
    await page.fill('input[type="password"]', 'admin123');
    
    console.log('Submitting...');
    await page.click('button[type="submit"]');
    
    // Wait for navigation (redirects to /)
    await page.waitForURL(baseUrl + '/', { timeout: 10000 }).catch(() => console.log('Redirection to home timed out, checking current URL...'));
    console.log(`Current URL after login: ${page.url()}`);

    // 2. Navigate to Lesson
    const lessonUrl = `${baseUrl}/courses/3/lessons/13`; 
    console.log(`Navigating to lesson: ${lessonUrl}`);
    
    await page.goto(lessonUrl, { waitUntil: 'networkidle', timeout: 15000 });
    console.log(`Arrived at: ${page.url()}`);

    // 3. Screenshot
    console.log('Taking full page screenshot...');
    await page.screenshot({ path: 'lesson_view.png', fullPage: true });
    
    console.log('Success! Saved to lesson_view.png');
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
    // Take a debug screenshot if we fail
    // try { await page.screenshot({ path: 'error_state.png' }); } catch (e) {} 
    process.exit(1);
  }
})();