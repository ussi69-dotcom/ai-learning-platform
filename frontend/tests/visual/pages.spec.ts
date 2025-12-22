import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for main pages
 *
 * Run: npx playwright test
 * Update snapshots: npx playwright test --update-snapshots
 * View report: npx playwright show-report
 */

test.describe('Public Pages', () => {
  test('homepage renders correctly', async ({ page }) => {
    await page.goto('/en?visual=1');
    await page.waitForLoadState('networkidle');

    // Wait for any animations to settle
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02, // Allow 2% difference
    });
  });

  test('homepage - Czech version', async ({ page }) => {
    await page.goto('/cs?visual=1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage-cs.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('about page renders correctly', async ({ page }) => {
    await page.goto('/en/about');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('about.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('login page renders correctly', async ({ page }) => {
    await page.goto('/en/login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('login.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('register page renders correctly', async ({ page }) => {
    await page.goto('/en/register');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('register.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});

test.describe('Theme Switching', () => {
  test('Jedi theme (light mode)', async ({ page }) => {
    await page.goto('/en?visual=1');
    await page.waitForLoadState('networkidle');

    // Ensure Jedi theme is active (default)
    const jediButton = page.locator('button:has-text("Jedi")');
    if (await jediButton.isVisible()) {
      await jediButton.click();
      await page.waitForTimeout(300);
    }

    await expect(page).toHaveScreenshot('theme-jedi.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('Sith theme (dark mode)', async ({ page }) => {
    await page.goto('/en?visual=1');
    await page.waitForLoadState('networkidle');

    // Switch to Sith theme
    const sithButton = page.locator('button:has-text("Sith")');
    if (await sithButton.isVisible()) {
      await sithButton.click();
      await page.waitForTimeout(300);
    }

    await expect(page).toHaveScreenshot('theme-sith.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});

test.describe('Responsive Design', () => {
  test('homepage mobile layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en?visual=1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('homepage tablet layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/en?visual=1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
});
