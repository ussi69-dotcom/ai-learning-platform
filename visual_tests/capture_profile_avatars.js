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
    
    // Wait for navigation to home/dashboard first
    try {
        await page.waitForURL(baseUrl + '/', { timeout: 20000 });
    } catch (e) {
        console.log('Login timeout! Taking debug screenshot...');
        await page.screenshot({ path: 'login_debug.png', fullPage: true });
        throw e;
    }
    console.log('Logged in.');

    // 2. Go to Profile
    console.log('Navigating to profile...');
    await page.goto(`${baseUrl}/profile`, { waitUntil: 'networkidle' });

    // 3. Open Avatar Selector
    console.log('Opening avatar selector...');
    // The edit overlay is hidden by default (opacity 0) but clickable.
    // We can force click the settings icon or the overlay div.
    // The overlay is inside the avatar container.
    // Let's try clicking the Settings icon directly.
    // We might need to hover first to make it "visible" for Playwright's strict checks, or force: true.
    
    // Hover over the avatar container to trigger group-hover
    // The avatar container has the class 'rounded-full p-1 shadow-2xl'
    await page.hover('.rounded-full.p-1.shadow-2xl');
    
    // Wait a moment for transition
    await page.waitForTimeout(500);

    // Click the settings icon wrapper
    // Finding the div that contains the Settings icon
    // We can search for the SVG or the div with cursor-pointer inside the relative container
    await page.click('.absolute.inset-0.bg-black\/60', { force: true });

    // 4. Wait for Selector to appear
    console.log('Waiting for selector...');
    // The selector is in a Card with title "Choose Avatar" (or translated)
    // We can look for the grid container
    await page.waitForSelector('.grid.grid-cols-4');

    // Wait for images/icons to settle
    await page.waitForTimeout(2000);

    // 5. Screenshot
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'profile_avatars.png', fullPage: false });
    
    console.log('Success! Saved to profile_avatars.png');
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
    process.exit(1);
  }
})();
