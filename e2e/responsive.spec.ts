import { test, expect } from "@playwright/test";
import { gotoStage, NODES } from "./helpers";

const SIZES = [
  { name: "phone-small", width: 320, height: 640 },
  { name: "phone", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 720 },
  { name: "wide", width: 1920, height: 1080 },
  { name: "short-wide", width: 1280, height: 520 },
];

for (const s of SIZES) {
  test.describe(`${s.name} ${s.width}x${s.height}`, () => {
    test.use({ viewport: { width: s.width, height: s.height } });

    test("no horizontal overflow on any route", async ({ page }) => {
      for (const r of ["/", "/about", "/work", "/experience", "/contact"]) {
        await gotoStage(page, r);
        const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(over, `${r} overflows horizontally`).toBeLessThanOrEqual(1);
      }
    });

    test("stage: nodes and prune button are inside the viewport and tappable", async ({ page }) => {
      await gotoStage(page);
      await page.waitForTimeout(800);
      for (const n of NODES) {
        const box = await page.locator(`button[aria-label^="${n.label}"]`).boundingBox();
        expect(box, n.label).not.toBeNull();
        expect(box!.x + box!.width / 2, `${n.label} x`).toBeGreaterThan(0);
        expect(box!.x + box!.width / 2, `${n.label} x`).toBeLessThan(s.width);
        expect(box!.y + box!.height / 2, `${n.label} y`).toBeGreaterThan(0);
        expect(box!.y + box!.height / 2, `${n.label} y`).toBeLessThan(s.height);
      }
      const prune = await page.getByRole("button", { name: /prune this timeline/i }).boundingBox();
      expect(prune, "prune button").not.toBeNull();
      expect(prune!.y + prune!.height, "prune button bottom").toBeLessThanOrEqual(s.height + 1);
    });

    test("stage: hero text does not collide with the node row", async ({ page }) => {
      await gotoStage(page);
      await page.waitForTimeout(800);
      const hero = await page.locator("h1").boundingBox();
      const tagline = page.getByText("No demos. No maybes.").first();
      const tb = await tagline.boundingBox(); // intentionally hidden on short screens
      const links = page.getByRole("link", { name: /email/i }).first();
      const lb = await links.boundingBox();
      const bottomOfCopy = Math.max(hero!.y + hero!.height, tb ? tb.y + tb.height : 0, lb ? lb.y + lb.height : 0);
      for (const n of NODES) {
        const b = await page.locator(`button[aria-label^="${n.label}"]`).boundingBox();
        expect(b!.y, `${n.label} orb overlaps hero copy`).toBeGreaterThan(bottomOfCopy - 6);
      }
    });

    test("every card fits the screen and can be scrolled/closed", async ({ page }) => {
      await gotoStage(page);
      for (const n of NODES) {
        await page.locator(`button[aria-label^="${n.label}"]`).click({ force: true });
        const dlg = page.getByRole("dialog");
        await expect(dlg).toBeVisible();
        await page.waitForTimeout(900);
        const box = await dlg.boundingBox();
        expect(box!.width, `${n.label} card width`).toBeLessThanOrEqual(s.width + 1);
        expect(box!.y, `${n.label} card top`).toBeGreaterThanOrEqual(-1);
        expect(box!.y + box!.height, `${n.label} card bottom`).toBeLessThanOrEqual(s.height + 1);
        await dlg.getByRole("button", { name: /close/i }).click();
        await expect(dlg).toBeHidden();
      }
    });
  });
}
