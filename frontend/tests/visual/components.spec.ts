import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for key components
 */

test.describe('Navigation', () => {
  test('navbar desktop view', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const navbar = page.locator('nav').first();
    await expect(navbar).toHaveScreenshot('navbar-desktop.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('navbar mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Open mobile menu if hamburger exists
    const hamburger = page.locator('[data-testid="mobile-menu-button"], button[aria-label*="menu"]');
    if (await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot('navbar-mobile-open.png', {
        maxDiffPixelRatio: 0.02,
      });
    }
  });
});

test.describe('Authentication Forms', () => {
  test('login form validation states', async ({ page }) => {
    await page.goto('/en/login');
    await page.waitForLoadState('networkidle');

    // Submit empty form to trigger validation
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('login-validation.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('register form', async ({ page }) => {
    await page.goto('/en/register');
    await page.waitForLoadState('networkidle');

    // Fill form partially
    await page.fill('input[type="email"]', 'test@example.com');
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('register-filled.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});

test.describe('Course Components', () => {
  test('course listing page', async ({ page }) => {
    await page.goto('/en/courses');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('courses-list.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
});
