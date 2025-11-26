const { chromium } = require('playwright');

(async () => {
  const baseUrl = process.env.TARGET_URL || 'http://localhost:3000';
  console.log(`Target Base URL: ${baseUrl}`);
  
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 1200 });

    // 1. Login
    console.log('Navigating to login...');
    await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
    
    await page.fill('input[type="email"]', 'admin@ai-platform.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for navigation to home
    await page.waitForURL(baseUrl + '/', { timeout: 10000 });
    console.log('Logged in. Waiting for content...');
    
    // Wait for network idle to ensure images/svgs are loaded
    await page.waitForLoadState('networkidle');

    // 2. Screenshot
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'dashboard_logged_in.png', fullPage: true });
    
    console.log('Success! Saved to dashboard_logged_in.png');
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
    process.exit(1);
  }
})();
