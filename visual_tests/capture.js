const { chromium } = require('playwright');

(async () => {
  const targetUrl = process.env.TARGET_URL || 'http://localhost:3000';
  console.log(`Starting browser to capture: ${targetUrl}`);
  
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    await page.setViewportSize({ width: 1280, height: 720 });

    console.log('Navigating...');
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 10000 });

    console.log('Taking screenshot...');
    await page.screenshot({ path: 'current_view.png', fullPage: false });
    
    console.log('Success! Saved to current_view.png');
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
    process.exit(1);
  }
})();