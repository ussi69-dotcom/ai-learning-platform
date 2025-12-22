import { test, expect } from '@playwright/test';

/**
 * Production Smoke Tests
 * Quick verification that all critical systems are operational
 * Run after deployment: npx playwright test production-smoke.spec.ts
 */

// These tests don't require authentication
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Production Smoke Tests', () => {

  test.describe('Frontend Availability', () => {
    test('homepage loads', async ({ page }) => {
      const response = await page.goto('/');
      expect(response?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(/AI/i);
    });

    test('login page renders', async ({ page }) => {
      await page.goto('/cs/login');
      await page.waitForLoadState('networkidle');

      // Check for login form
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('registration page renders', async ({ page }) => {
      await page.goto('/cs/register');
      await page.waitForLoadState('networkidle');

      // Check for registration form
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
    });

    test('courses page loads', async ({ page }) => {
      await page.goto('/cs/courses');
      await page.waitForLoadState('networkidle');

      // Should have course cards
      await expect(page.locator('[class*="course"], [data-testid*="course"]').first()).toBeVisible({ timeout: 10000 });
    });

    test('news page loads', async ({ page }) => {
      await page.goto('/cs/news');
      await page.waitForLoadState('networkidle');

      // Should have news items
      await expect(page.locator('article, [class*="news"]').first()).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('API Health', () => {
    test('health endpoint returns healthy', async ({ request }) => {
      const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
      const apiUrl = baseUrl.replace(':3000', ':8000').replace('/api', '');

      const response = await request.get(`${apiUrl}/api/health`);
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.status).toBe('healthy');
      expect(body.database).toBe('connected');
    });

    test('courses API returns data', async ({ request }) => {
      const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
      const apiUrl = baseUrl.replace(':3000', ':8000').replace('/api', '');

      const response = await request.get(`${apiUrl}/api/courses`);
      expect(response.status()).toBe(200);

      const courses = await response.json();
      expect(Array.isArray(courses)).toBe(true);
      expect(courses.length).toBeGreaterThan(0);
    });

    test('news API returns data', async ({ request }) => {
      const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
      const apiUrl = baseUrl.replace(':3000', ':8000').replace('/api', '');

      const response = await request.get(`${apiUrl}/api/news?limit=5`);
      expect(response.status()).toBe(200);

      const news = await response.json();
      expect(Array.isArray(news)).toBe(true);
    });
  });

  test.describe('Visual Smoke Tests', () => {
    test('homepage visual check', async ({ page }) => {
      await page.goto('/cs');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Wait for animations

      // Just check it doesn't have obvious errors
      const errorMessages = await page.locator('text=/error|chyba|500|404/i').count();
      expect(errorMessages).toBe(0);
    });

    test('login page visual check', async ({ page }) => {
      await page.goto('/cs/login');
      await page.waitForLoadState('networkidle');

      // Check no broken images
      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        // Image should have loaded (naturalWidth > 0 for valid images)
        // Skip SVG/data URLs which may report 0
        const src = await img.getAttribute('src') || '';
        if (!src.startsWith('data:') && !src.endsWith('.svg')) {
          expect(naturalWidth, `Image ${src} should be loaded`).toBeGreaterThan(0);
        }
      }
    });

    test('dark mode toggle works', async ({ page }) => {
      await page.goto('/cs');
      await page.waitForLoadState('networkidle');

      // Find and click theme toggle
      const themeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="theme"], button[aria-label*="mode"]').first();

      if (await themeToggle.isVisible()) {
        const htmlBefore = await page.locator('html').getAttribute('class') || '';
        await themeToggle.click();
        await page.waitForTimeout(500);
        const htmlAfter = await page.locator('html').getAttribute('class') || '';

        // Theme class should have changed
        expect(htmlAfter).not.toBe(htmlBefore);
      }
    });
  });

  test.describe('Localization', () => {
    test('Czech locale works', async ({ page }) => {
      await page.goto('/cs');
      await page.waitForLoadState('networkidle');

      // Page should contain Czech text
      const pageContent = await page.textContent('body');
      expect(pageContent).toMatch(/kurz|přihlásit|registr/i);
    });

    test('English locale works', async ({ page }) => {
      await page.goto('/en');
      await page.waitForLoadState('networkidle');

      // Page should contain English text
      const pageContent = await page.textContent('body');
      expect(pageContent).toMatch(/course|login|register/i);
    });

    test('language switch works', async ({ page }) => {
      await page.goto('/cs');
      await page.waitForLoadState('networkidle');

      // Find language switcher
      const langSwitch = page.locator('[data-testid="lang-switch"], a[href*="/en"], button:has-text("EN")').first();

      if (await langSwitch.isVisible()) {
        await langSwitch.click();
        await page.waitForLoadState('networkidle');

        // Should be on English page now
        expect(page.url()).toMatch(/\/en/);
      }
    });
  });
});
