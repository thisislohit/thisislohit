import { defineConfig, devices } from "@playwright/test";

// End-to-end suite. Runs against a production build (what users actually get)
// using the locally installed Chrome — no browser download needed.
//   npm run build && npx playwright test
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3100",
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npx next start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "chrome" }, testMatch: /(responsive|stage|routes)\.spec\.ts/ },
  ],
});
