import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';

const config = ({
  testDir: './tests',
  timeout: 60000,

  expect: {
    timeout: 40 * 1000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    trace: 'on',
    screenshot: 'on',
    video: 'retain-on-failure',
  },
});

module.exports = config


