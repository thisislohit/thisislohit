import { test, expect } from "@playwright/test";
import { gotoStage } from "./helpers";

const ROUTES = ["/", "/about", "/work", "/experience", "/contact"];

test.describe("routes & assets", () => {
  for (const r of ROUTES) {
    test(`${r} renders with no console errors or failed requests`, async ({ page }) => {
      const errors: string[] = [];
      const failed: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
      page.on("requestfailed", (q) => failed.push(q.url() + " " + q.failure()?.errorText));
      page.on("response", (res) => res.status() >= 400 && failed.push(`${res.status()} ${res.url()}`));
      await gotoStage(page, r);
      await page.waitForTimeout(1500);
      await expect(page.locator("h1, h2").first()).toBeVisible();
      expect(errors, "console errors").toEqual([]);
      expect(failed, "failed requests").toEqual([]);
    });
  }

  test("unknown route returns a 404 page", async ({ page }) => {
    const res = await page.goto("/definitely-not-a-page");
    expect(res?.status()).toBe(404);
  });

  for (const a of ["/robots.txt", "/sitemap.xml", "/icon", "/opengraph-image"]) {
    test(`${a} is served`, async ({ request }) => {
      const res = await request.get(a);
      expect(res.status()).toBe(200);
    });
  }

  test("metadata: title, description, canonical-ish URLs", async ({ page }) => {
    await gotoStage(page);
    await expect(page).toHaveTitle(/Lohit/i);
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc?.length ?? 0).toBeGreaterThan(40);
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og).toBeTruthy();
    const sitemap = await (await page.request.get("/sitemap.xml")).text();
    const host = new URL(sitemap.match(/<loc>(.*?)<\/loc>/)![1]).host;
    // eslint-disable-next-line no-console
    console.log("sitemap host:", host);
  });

  test("inner page nav link to a stage card deep-links correctly", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop nav");
    await gotoStage(page, "/about");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Case Files" }).click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Case Files" })).toBeVisible();
  });
});
