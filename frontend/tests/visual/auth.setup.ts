import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

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

export default async function globalSetup(config: FullConfig) {
  const baseURL =
    process.env.PLAYWRIGHT_BASE_URL ||
    config.projects[0]?.use?.baseURL ||
    'http://localhost:3000';
  const storageStatePath = path.resolve(__dirname, '.auth/user.json');

  fs.mkdirSync(path.dirname(storageStatePath), { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${baseURL}/en/login`);
  await page.waitForLoadState('networkidle');

  await page.fill('input[type="email"]', TEST_USER.email);
  await page.fill('input[type="password"]', TEST_USER.password);
  await page.click('button[type="submit"]');

  await page.waitForURL((url) => !url.pathname.endsWith('/login'), {
    timeout: 15000,
  });
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => localStorage.getItem('auth_token'));

  await context.storageState({ path: storageStatePath });
  await browser.close();
}
