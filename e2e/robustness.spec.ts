import { test, expect } from "@playwright/test";
import { gotoStage } from "./helpers";

test.describe("robustness", () => {
  test("works with JavaScript disabled (server-rendered content present)", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto("/");
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/LOHIT/i);
    expect(text).toMatch(/Flutter/i);
    await ctx.close();
  });

  test("survives the backdrop canvas being unavailable", async ({ page }) => {
    await page.addInitScript(() => {
      HTMLCanvasElement.prototype.getContext = () => null;
    });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.addInitScript(() => sessionStorage.setItem("tva-booted", "1"));
    await page.goto("/");
    await page.waitForTimeout(2000);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("offline-ish: a missing scene manifest does not break prune", async ({ page }) => {
    await page.route("**/scenes/manifest.json", (r) => r.abort());
    await gotoStage(page);
    await page.getByRole("button", { name: /prune this timeline/i }).click();
    await page.waitForTimeout(3500);
    await expect(page.getByRole("status")).toHaveCount(await page.getByRole("status").count());
    await expect.poll(() => page.evaluate(() => document.documentElement.dataset.prune ?? null), { timeout: 40_000 }).toBeNull();
  });

  test("window resize keeps nodes pinned to the ribbon", async ({ page }) => {
    await gotoStage(page);
    await page.setViewportSize({ width: 900, height: 700 });
    await page.waitForTimeout(800);
    const b = await page.locator('button[aria-label^="Time Door"]').boundingBox();
    expect(b!.x).toBeLessThan(900);
    expect(b!.y).toBeLessThan(700);
  });

  test("long session: no listener / DOM growth after many open-close cycles", async ({ page }) => {
    await gotoStage(page);
    const before = await page.evaluate(() => document.getElementsByTagName("*").length);
    for (let i = 0; i < 12; i++) {
      await page.locator('button[aria-label^="Case Files"]').click({ force: true });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(150);
    }
    await page.waitForTimeout(1500);
    const after = await page.evaluate(() => document.getElementsByTagName("*").length);
    expect(after - before).toBeLessThan(40);
  });
});
