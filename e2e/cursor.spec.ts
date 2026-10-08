import { test, expect } from "@playwright/test";
import { gotoStage } from "./helpers";

test.describe("custom cursor", () => {
  test.skip(({ isMobile }) => isMobile, "fine pointers only");

  test("the dot tracks the pointer instantly (no animation lag)", async ({ page }) => {
    await gotoStage(page);
    await page.mouse.move(400, 300);
    await page.mouse.move(777, 411);
    const t = await page.evaluate(() => {
      const dots = [...document.querySelectorAll<HTMLElement>("div.fixed.z-\\[1000\\]")];
      return dots.map((d) => d.style.transform);
    });
    expect(t.some((s) => s.includes("777px") && s.includes("411px"))).toBe(true);
  });

  test("the cursor stays above an open popup", async ({ page }) => {
    await gotoStage(page);
    await page.locator('button[aria-label^="Case Files"]').click({ force: true });
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.mouse.move(640, 400);
    const z = await page.evaluate(() => {
      const cursor = document.querySelector<HTMLElement>("div.fixed.z-\\[1000\\]");
      const dlg = document.querySelector<HTMLElement>('[role="dialog"]');
      const wrap = dlg?.parentElement as HTMLElement | null;
      const zi = (e: Element | null) => (e ? Number(getComputedStyle(e).zIndex) || 0 : 0);
      return { cursor: zi(cursor), overlayWrap: zi(wrap), dialog: zi(dlg) };
    });
    expect(z.cursor).toBeGreaterThan(Math.max(z.overlayWrap, z.dialog));
    expect(z.cursor).toBeGreaterThan(120);
  });

  test("ring grows over interactive elements and shows its label", async ({ page }) => {
    await gotoStage(page);
    const node = page.locator('button[aria-label^="Case Files"]');
    const b = (await node.boundingBox())!;
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await expect.poll(() => page.evaluate(() => document.querySelector<HTMLElement>('[data-hot]')?.dataset.hot)).toBe("1");
    await expect(page.locator("span", { hasText: "DIVE IN" }).first()).toHaveText("DIVE IN");
    await page.mouse.move(900, 220); // empty space
    await expect.poll(() => page.evaluate(() => document.querySelector<HTMLElement>('[data-hot]')?.dataset.hot)).toBe("0");
  });
});
