import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { gotoStage, NODES } from "./helpers";

const fmt = (v: { id: string; impact?: string | null; nodes: { target: unknown }[]; help: string }[]) =>
  v.map((x) => `${x.impact} ${x.id}: ${x.help} (${x.nodes.length}) e.g. ${JSON.stringify(x.nodes[0]?.target)}`);

test.describe("accessibility (axe, WCAG A/AA)", () => {
  test("home stage", async ({ page }) => {
    await gotoStage(page);
    await page.waitForTimeout(1500);
    const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(fmt(r.violations)).toEqual([]);
  });

  for (const n of NODES) {
    test(`card: ${n.label}`, async ({ page }) => {
      await gotoStage(page);
      await page.locator(`button[aria-label^="${n.label}"]`).click({ force: true });
      await page.waitForTimeout(1600);
      const r = await new AxeBuilder({ page }).include('[role="dialog"]').withTags(["wcag2a", "wcag2aa"]).analyze();
      expect(fmt(r.violations)).toEqual([]);
    });
  }

  for (const route of ["/about", "/work", "/experience", "/contact"]) {
    test(`page ${route}`, async ({ page }) => {
      await gotoStage(page, route);
      await page.waitForTimeout(1500);
      const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
      expect(fmt(r.violations)).toEqual([]);
    });
  }

  test("document has a single h1 and a lang attribute", async ({ page }) => {
    await gotoStage(page);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});
