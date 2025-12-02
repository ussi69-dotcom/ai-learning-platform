import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for visual testing
 * Run with: npx playwright test
 * Update snapshots: npx playwright test --update-snapshots
 */
export default defineConfig({
  testDir: './tests/visual',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is left in
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Parallel workers
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  // Shared settings for all projects
  use: {
    // Base URL for the frontend
    baseURL: 'http://localhost:3000',

    // Collect trace on failure
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',
  },

  // Test projects for different viewports (all using Chromium)
  projects: [
    {
      name: 'desktop-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'tablet',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 1366 }, // iPad Pro dimensions
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 }, // iPhone 14 dimensions
        isMobile: true,
        hasTouch: true,
      },
    },
  ],

  // Web server to start before tests (optional - use if you want auto-start)
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
