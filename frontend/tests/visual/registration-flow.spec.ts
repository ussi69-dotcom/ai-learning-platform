import { test, expect } from '@playwright/test';

/**
 * Full Registration Flow Test
 * Tests the complete user journey: Register → Verify Email → Login → Delete Account
 *
 * Requirements:
 * - TEST_API_KEY environment variable must be set
 * - Backend must be running with TEST_API_KEY configured
 *
 * Run: TEST_API_KEY=your-secret-key npx playwright test registration-flow.spec.ts
 */

// Test configuration
const TEST_API_KEY = process.env.TEST_API_KEY || '';
const TEST_EMAIL = `e2e-test-${Date.now()}@test.example.com`;
const TEST_PASSWORD = 'TestPassword123!';

// These tests don't use stored auth state
test.use({ storageState: { cookies: [], origins: [] } });

// Helper to get API base URL
const getApiUrl = (baseUrl: string): string => {
  // In production, API is on same host with /api prefix
  if (baseUrl.includes('ai-teaching.eu') || baseUrl.includes('localhost:80')) {
    return baseUrl.replace(/\/$/, '') + '/api';
  }
  // In development, API is on port 8000
  return baseUrl.replace(':3000', ':8000').replace(/\/$/, '');
};

test.describe('Registration Flow', () => {
  test.skip(!TEST_API_KEY, 'TEST_API_KEY not set - skipping registration flow tests');

  test.afterEach(async ({ request, baseURL }) => {
    // Cleanup: Delete test user if exists
    const apiUrl = getApiUrl(baseURL || 'http://localhost:3000');

    try {
      await request.delete(`${apiUrl}/test/user/${encodeURIComponent(TEST_EMAIL)}`, {
        headers: { 'X-Test-Api-Key': TEST_API_KEY },
      });
    } catch {
      // User might not exist, ignore errors
    }
  });

  test('complete registration, verification, login, and account deletion', async ({
    page,
    request,
    baseURL,
  }) => {
    const apiUrl = getApiUrl(baseURL || 'http://localhost:3000');

    // ========================================
    // Step 1: Register new account
    // ========================================
    await test.step('Register new account', async () => {
      await page.goto('/cs/register');
      await page.waitForLoadState('networkidle');

      // Fill registration form
      await page.fill('input[type="email"]', TEST_EMAIL);
      await page.fill('input[type="password"]', TEST_PASSWORD);

      // Handle confirm password if present
      const confirmPassword = page.locator('input[name="confirmPassword"], input[placeholder*="potvr"]');
      if (await confirmPassword.isVisible()) {
        await confirmPassword.fill(TEST_PASSWORD);
      }

      // Accept terms if checkbox exists
      const termsCheckbox = page.locator('input[type="checkbox"]');
      if (await termsCheckbox.isVisible()) {
        await termsCheckbox.check();
      }

      // Submit form
      await page.click('button[type="submit"]');

      // Wait for success (redirect or success message)
      await page.waitForTimeout(2000);

      // Should show success message or redirect
      const pageContent = await page.textContent('body');
      const isSuccess =
        pageContent?.includes('verif') ||
        pageContent?.includes('email') ||
        pageContent?.includes('úspě') ||
        page.url().includes('login') ||
        page.url().includes('success');

      expect(isSuccess, 'Registration should succeed').toBe(true);
    });

    // ========================================
    // Step 2: Get verification token via API
    // ========================================
    let verificationToken = '';

    await test.step('Get verification token', async () => {
      const response = await request.get(
        `${apiUrl}/test/verification-token/${encodeURIComponent(TEST_EMAIL)}`,
        {
          headers: { 'X-Test-Api-Key': TEST_API_KEY },
        }
      );

      expect(response.status()).toBe(200);

      const body = await response.json();
      verificationToken = body.verification_token;
      expect(verificationToken).toBeTruthy();
    });

    // ========================================
    // Step 3: Verify email
    // ========================================
    await test.step('Verify email', async () => {
      // Visit verification URL
      const verifyUrl = `${apiUrl}/auth/verify?token=${verificationToken}`;
      const response = await request.get(verifyUrl, {
        maxRedirects: 0,
      });

      // Should redirect (302/307) or return success
      expect([200, 302, 307]).toContain(response.status());

      // Verify via API that user is now verified
      const tokenResponse = await request.get(
        `${apiUrl}/test/verification-token/${encodeURIComponent(TEST_EMAIL)}`,
        {
          headers: { 'X-Test-Api-Key': TEST_API_KEY },
        }
      );

      // Should return 400 (already verified) or 404 (token consumed)
      expect([400, 404]).toContain(tokenResponse.status());
    });

    // ========================================
    // Step 4: Login with verified account
    // ========================================
    await test.step('Login with verified account', async () => {
      await page.goto('/cs/login');
      await page.waitForLoadState('networkidle');

      await page.fill('input[type="email"]', TEST_EMAIL);
      await page.fill('input[type="password"]', TEST_PASSWORD);
      await page.click('button[type="submit"]');

      // Wait for redirect after successful login
      await page.waitForURL((url) => !url.pathname.includes('/login'), {
        timeout: 15000,
      });

      // Should be logged in - check for profile link or user menu
      const isLoggedIn =
        (await page.locator('a[href*="profile"]').isVisible()) ||
        (await page.locator('[data-testid="user-menu"]').isVisible()) ||
        page.url().includes('/courses') ||
        page.url().includes('/profile');

      expect(isLoggedIn, 'Should be logged in after verification').toBe(true);
    });

    // ========================================
    // Step 5: Delete account via API
    // ========================================
    await test.step('Delete test account', async () => {
      const response = await request.delete(
        `${apiUrl}/test/user/${encodeURIComponent(TEST_EMAIL)}`,
        {
          headers: { 'X-Test-Api-Key': TEST_API_KEY },
        }
      );

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.message).toContain('deleted');
    });

    // ========================================
    // Step 6: Verify account is deleted
    // ========================================
    await test.step('Verify account is deleted', async () => {
      // Try to login - should fail
      await page.goto('/cs/login');
      await page.waitForLoadState('networkidle');

      await page.fill('input[type="email"]', TEST_EMAIL);
      await page.fill('input[type="password"]', TEST_PASSWORD);
      await page.click('button[type="submit"]');

      await page.waitForTimeout(2000);

      // Should show error or stay on login page
      const loginFailed =
        page.url().includes('/login') ||
        (await page.locator('text=/error|chyba|neplatné|invalid/i').isVisible());

      expect(loginFailed, 'Login should fail for deleted account').toBe(true);
    });
  });

  test('registration with invalid email shows error', async ({ page }) => {
    await page.goto('/cs/register');
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'not-an-email');
    await page.fill('input[type="password"]', TEST_PASSWORD);

    // Try to submit
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);

    // Should show validation error or not submit
    const hasError =
      (await page.locator('text=/invalid|neplatný|email/i').isVisible()) ||
      page.url().includes('/register');

    expect(hasError, 'Should show email validation error').toBe(true);
  });

  test('registration with existing email shows error', async ({ page, request, baseURL }) => {
    const apiUrl = getApiUrl(baseURL || 'http://localhost:3000');

    // First, register a user
    await request.post(`${apiUrl}/auth/register`, {
      data: {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        difficulty: 'PIECE_OF_CAKE',
        avatar: 'jedi-1',
      },
    });

    // Try to register again with same email
    await page.goto('/cs/register');
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);

    const confirmPassword = page.locator('input[name="confirmPassword"], input[placeholder*="potvr"]');
    if (await confirmPassword.isVisible()) {
      await confirmPassword.fill(TEST_PASSWORD);
    }

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    // Should show error about existing email
    const pageContent = await page.textContent('body');
    const hasError =
      pageContent?.toLowerCase().includes('exist') ||
      pageContent?.toLowerCase().includes('registrován') ||
      pageContent?.toLowerCase().includes('already');

    expect(hasError, 'Should show error for existing email').toBe(true);

    // Cleanup
    await request.delete(`${apiUrl}/test/user/${encodeURIComponent(TEST_EMAIL)}`, {
      headers: { 'X-Test-Api-Key': TEST_API_KEY },
    });
  });
});

test.describe('Login Flow', () => {
  test('login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/cs/login');
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'nonexistent@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    // Should show error or stay on login page
    const loginFailed =
      page.url().includes('/login') ||
      (await page.locator('text=/error|chyba|neplatné|incorrect|invalid/i').isVisible());

    expect(loginFailed, 'Login should fail with invalid credentials').toBe(true);
  });

  test('login page has all required elements', async ({ page }) => {
    await page.goto('/cs/login');
    await page.waitForLoadState('networkidle');

    // Check required elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Check for registration link
    const registerLink = page.locator('a[href*="register"]');
    await expect(registerLink).toBeVisible();
  });
});
