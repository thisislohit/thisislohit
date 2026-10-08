import { test, expect } from "@playwright/test";
import { gotoStage } from "./helpers";

const stateClean = (page: import("@playwright/test").Page) =>
  page.evaluate(() => ({
    attr: document.documentElement.dataset.prune ?? null,
    overflow: document.documentElement.style.overflow,
    targets: document.querySelectorAll(".prune-target").length,
    scene: !!document.querySelector('[role="status"][aria-label*="threads"]'),
  }));

test.describe("prune cinematic", () => {
  test("completes and leaves the page fully restored", async ({ page }) => {
    test.setTimeout(60_000);
    await gotoStage(page);
    await page.getByRole("button", { name: /prune this timeline/i }).click();
    await expect.poll(async () => (await stateClean(page)).attr, { timeout: 5000 }).not.toBeNull();
    // the scene appears, then everything clears itself
    await expect.poll(async () => (await stateClean(page)).attr, { timeout: 40_000 }).toBeNull();
    const s = await stateClean(page);
    expect(s).toEqual({ attr: null, overflow: "", targets: 0, scene: false });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('button[aria-label^="Case Files"]')).toBeVisible();
    // cards still work afterwards
    await page.locator('button[aria-label^="Case Files"]').click({ force: true });
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("skip button ends the scene early", async ({ page }) => {
    test.setTimeout(60_000);
    await gotoStage(page);
    await page.getByRole("button", { name: /prune this timeline/i }).click();
    const skip = page.getByRole("button", { name: /skip scene/i });
    await skip.waitFor({ timeout: 10_000 });
    await skip.click();
    await expect.poll(async () => (await stateClean(page)).attr, { timeout: 25_000 }).toBeNull();
  });

  test("clicking prune twice does not start two scenes", async ({ page }) => {
    test.setTimeout(60_000);
    await gotoStage(page);
    const btn = page.getByRole("button", { name: /prune this timeline/i });
    await btn.click();
    await btn.click({ force: true }).catch(() => {});
    await page.waitForTimeout(3500);
    expect(await page.locator('[role="status"][aria-label*="threads"]').count()).toBeLessThanOrEqual(1);
    await expect.poll(async () => (await stateClean(page)).attr, { timeout: 40_000 }).toBeNull();
  });

  test("pruning while a card is open closes the card", async ({ page }) => {
    test.setTimeout(60_000);
    await gotoStage(page);
    await page.locator('button[aria-label^="Case Files"]').click({ force: true });
    await expect(page.getByRole("dialog")).toBeVisible();
    // the prune button is behind the modal overlay; fire the same event it does
    await page.evaluate(() => window.dispatchEvent(new Event("tva:prune")));
    await expect(page.getByRole("dialog")).toBeHidden({ timeout: 5000 });
    await expect.poll(async () => (await stateClean(page)).attr, { timeout: 40_000 }).toBeNull();
  });

  test("reduced motion: resets quickly without the cinematic", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 720 } });
    const page = await ctx.newPage();
    await gotoStage(page);
    await page.getByRole("button", { name: /prune this timeline/i }).click();
    await expect.poll(async () => (await stateClean(page)).attr, { timeout: 12_000 }).toBeNull();
    await ctx.close();
  });
});

test.describe("boot sequence", () => {
  test("plays on first visit, can be skipped, and does not replay in the same session", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page.getByRole("dialog", { name: /boot sequence/i })).toBeVisible();
    await page.getByRole("button", { name: /skip/i }).click();
    await expect(page.getByRole("dialog", { name: /boot sequence/i })).toBeHidden({ timeout: 6000 });
    await page.reload();
    await page.waitForTimeout(800);
    await expect(page.getByRole("dialog", { name: /boot sequence/i })).toHaveCount(0);
    await ctx.close();
  });

  test("reduced motion skips the boot overlay entirely", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    await page.waitForTimeout(600);
    await expect(page.getByRole("dialog", { name: /boot sequence/i })).toHaveCount(0);
    await ctx.close();
  });
});
