import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Visual tests for authenticated user flows
 * Uses test admin credentials
 */

const loadEnvFile = () => {
  const envPath = path.resolve(__dirname, '../../../.env');
  if (!fs.existsSync(envPath)) {
    return {};
  }

  return fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trim().startsWith('#'))
    .reduce<Record<string, string>>((acc, line) => {
      const [key, ...rest] = line.split('=');
      if (!key) return acc;
      const rawValue = rest.join('=').trim();
      acc[key.trim()] = rawValue.replace(/^['"]|['"]$/g, '');
      return acc;
    }, {});
};

const envVars = loadEnvFile();
const TEST_USER = {
  email: process.env.FIRST_SUPERUSER || envVars.FIRST_SUPERUSER || 'admin@ai-platform.com',
  password: process.env.FIRST_SUPERUSER_PASSWORD || envVars.FIRST_SUPERUSER_PASSWORD || 'admin123',
};

test.describe('Authenticated Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/en/login');
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', TEST_USER.email);
    await page.fill('input[type="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    // Wait for redirect after login
    await page.waitForURL(/\/(en|cs)(\/|$)/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
  });

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
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    const navbar = page.locator('nav').first();
    await expect(navbar).toHaveScreenshot('navbar-logged-in.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});

test.describe('XP Progress Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/login');
    await page.fill('input[type="email"]', TEST_USER.email);
    await page.fill('input[type="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/(en|cs)(\/|$)/, { timeout: 10000 });
  });

  test('XP bar visibility after login', async ({ page }) => {
    await page.goto('/en');
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
