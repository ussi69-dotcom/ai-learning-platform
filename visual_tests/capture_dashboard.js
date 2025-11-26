const { chromium } = require('playwright');

(async () => {
  const baseUrl = process.env.TARGET_URL || 'http://localhost:3000';
  console.log(`Target Base URL: ${baseUrl}`);
  
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 1200 });

    // 1. Go to Dashboard
    console.log('Navigating to Dashboard...');
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    
    // 2. Screenshot
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'dashboard_view.png', fullPage: true });
    
    console.log('Success! Saved to dashboard_view.png');
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
    process.exit(1);
  }
})();
