import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || 4173;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  workers: process.env.CI ? 1 : undefined,
  webServer: {
    command: 'npm run build:prod && npm run start:preview',
    port: Number(PORT),
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
