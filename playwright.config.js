// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });


const config = ({
  testDir: './tests',
  timeout: 50 * 1000,

  expect: {
    timeout: 40 * 1000,
  },
  reporter: 'html',
  use: {
    browserName: 'webkit',
    headless: false,
    trace: 'on',
    screenshot: 'off',
    video: 'retain-on-failure',
  },
});

module.exports = config


