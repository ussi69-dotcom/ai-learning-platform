const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Capture console logs
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', exception => console.log(`PAGE ERROR: "${exception}"`));

  const url = 'http://localhost:3000/en/courses/practical-prompt-engineering/lessons/05-ai-powered-development';
  console.log(`Navigating to ${url}...`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
  } catch (e) {
    console.log('Navigation timeout or error:', e.message);
  }

  console.log('Final URL:', page.url());
  
  const bodyText = await page.innerText('body');
  console.log('BODY TEXT SAMPLE:\n', bodyText.substring(0, 500));

  const content = await page.content();
  
  if (content.includes('Sign in') || content.includes('Log in') || content.includes('Přihlásit')) {
      console.log('INFO: Detected Login Page elements.');
  }

  // Check for the specific diagram string in the HTML
  if (content.includes('MCP Architecture')) {
      console.log('SUCCESS: "MCP Architecture" string found in HTML!');
  } else {
      console.log('FAILURE: "MCP Architecture" string NOT found.');
  }

  if (content.includes('Mission:')) {
      console.log('SUCCESS: "Mission:" text found in HTML (Content loaded).');
  } else {
      console.log('FAILURE: "Mission:" text NOT found (Content not loaded).');
  }

  await browser.close();
})();
