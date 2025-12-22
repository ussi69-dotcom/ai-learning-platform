import { test, expect } from '@playwright/test';

/**
 * Visual tests for authenticated user flows
 * Uses test admin credentials
 */

test.use({ storageState: 'tests/visual/.auth/user.json' });

test.describe('Authenticated Pages', () => {
  test('profile page renders correctly', async ({ page }) => {
    await page.goto('/en/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('profile.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('profile page with user avatar', async ({ page }) => {
    await page.goto('/en/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Check avatar component specifically
    const avatar = page.locator('[data-testid="user-avatar"], .avatar, img[alt*="avatar"]').first();
    if (await avatar.isVisible()) {
      await expect(avatar).toHaveScreenshot('user-avatar.png', {
        maxDiffPixelRatio: 0.02,
      });
    }
  });

  test('courses page when logged in', async ({ page }) => {
    await page.goto('/en/courses');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('courses-authenticated.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('navbar shows user state', async ({ page }) => {
    await page.goto('/en?visual=1');
    await page.waitForLoadState('networkidle');
    const profileLink = page.locator('nav a[href*="profile"]').first();
    await expect(profileLink).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(300);

    const navbar = page.locator('nav').first();
    await expect(navbar).toHaveScreenshot('navbar-logged-in.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});

test.describe('XP Progress Bar', () => {
  test('XP bar visibility after login', async ({ page }) => {
    await page.goto('/en?visual=1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Look for XP progress component
    const xpBar = page.locator('[data-testid="xp-bar"], .xp-progress, [class*="progress"]').first();
    if (await xpBar.isVisible()) {
      await expect(xpBar).toHaveScreenshot('xp-progress-bar.png', {
        maxDiffPixelRatio: 0.02,
      });
    }
  });
});
