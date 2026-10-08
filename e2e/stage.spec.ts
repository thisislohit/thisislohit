import { test, expect } from "@playwright/test";
import { gotoStage, NODES } from "./helpers";

test.describe("home stage", () => {
  test("shows the hero, five nodes and no scrollbar", async ({ page }) => {
    await gotoStage(page);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("LOHIT");
    for (const n of NODES) await expect(page.locator(`button[aria-label^="${n.label}"]`)).toBeVisible();
    const scrollable = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    expect(scrollable, "home stage should not scroll").toBeLessThanOrEqual(2);
  });

  for (const n of NODES) {
    test(`node "${n.label}" opens its card and Esc closes it`, async ({ page }) => {
      await gotoStage(page);
      await page.locator(`button[aria-label^="${n.label}"]`).click({ force: true });
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("heading", { name: n.title })).toBeVisible();
      await expect(page).toHaveURL(new RegExp(`#${n.id}$`));
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(page).not.toHaveURL(/#/);
    });
  }

  test("close button, browser back and overlay click all close a card", async ({ page }) => {
    await gotoStage(page);
    const dialog = page.getByRole("dialog");
    await page.locator('button[aria-label^="Case Files"]').click({ force: true });
    await dialog.getByRole("button", { name: /close/i }).click();
    await expect(dialog).toBeHidden();

    await page.locator('button[aria-label^="Incident Log"]').click({ force: true });
    await expect(dialog).toBeVisible();
    await page.goBack();
    await expect(dialog).toBeHidden();
    await page.goForward();
    await expect(dialog).toBeVisible();

    await page.mouse.click(8, 450); // outside the card
    await expect(dialog).toBeHidden();
  });

  test("deep links open the right card (and survive reload)", async ({ page }) => {
    await gotoStage(page, "/#skills");
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Temporal Loom" })).toBeVisible();
    await page.reload();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Temporal Loom" })).toBeVisible();
  });

  test("unknown hash is ignored", async ({ page }) => {
    await gotoStage(page, "/#nonsense");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("nav links open cards on the stage", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop nav");
    await gotoStage(page);
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Time Door" }).click();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "The Time Door" })).toBeVisible();
  });

  test("rapid switching between nodes never leaves two cards", async ({ page }) => {
    await gotoStage(page);
    for (const n of [...NODES, ...NODES]) {
      await page.locator(`button[aria-label^="${n.label}"]`).click({ force: true });
      await page.keyboard.press("Escape");
    }
    await page.waitForTimeout(1200);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});

test.describe("card contents", () => {
  test("case files: arrows, dots, keyboard, expand", async ({ page }) => {
    await gotoStage(page);
    await page.locator('button[aria-label^="Case Files"]').click({ force: true });
    const dlg = page.getByRole("dialog");
    await expect(dlg).toContainText("Grafterr POS System");
    await dlg.getByRole("button", { name: "Next case" }).click();
    await expect(dlg).toContainText("Grafterr GO!");
    await page.keyboard.press("ArrowRight");
    await expect(dlg).toContainText("Collection Display App");
    await page.keyboard.press("ArrowLeft");
    await expect(dlg).toContainText("Grafterr GO!");
    await dlg.getByRole("button", { name: "Previous case" }).click();
    await dlg.getByRole("button", { name: /open full file/i }).click();
    await expect(dlg).toContainText("Flutter 3");
    await expect(dlg.getByRole("tab")).toHaveCount(4);
  });

  test("case files wraps around at both ends", async ({ page }) => {
    await gotoStage(page);
    await page.locator('button[aria-label^="Case Files"]').click({ force: true });
    const dlg = page.getByRole("dialog");
    await dlg.getByRole("button", { name: "Previous case" }).click();
    await expect(dlg).toContainText("Bus Tracking Flutter");
    await dlg.getByRole("button", { name: "Next case" }).click();
    await expect(dlg).toContainText("Grafterr POS System");
  });

  test("incident log accordion toggles", async ({ page }) => {
    await gotoStage(page);
    await page.locator('button[aria-label^="Incident Log"]').click({ force: true });
    const dlg = page.getByRole("dialog");
    const rows = dlg.getByRole("button", { expanded: true });
    await expect(rows).toHaveCount(1);
    await dlg.getByRole("button", { name: /Abilio/ }).click();
    await expect(dlg).toContainText("Clean Architecture");
    await dlg.getByRole("button", { name: /Abilio/ }).click();
    await expect(dlg.getByRole("button", { expanded: true })).toHaveCount(0);
  });

  test("skills tabs switch content", async ({ page }) => {
    await gotoStage(page);
    await page.locator('button[aria-label^="Temporal Loom"]').click({ force: true });
    const dlg = page.getByRole("dialog");
    await dlg.getByRole("tab", { name: /Payments/ }).click();
    await expect(dlg).toContainText("Tap-to-Pay");
    await dlg.getByRole("tab", { name: /State Management/ }).click();
    await expect(dlg).toContainText("BLoC");
  });

  test("contact links are real mailto / tel / https links", async ({ page }) => {
    await gotoStage(page);
    await page.locator('button[aria-label^="Time Door"]').click({ force: true });
    const dlg = page.getByRole("dialog");
    await expect(dlg.locator('a[href^="mailto:"]')).toHaveCount(1);
    await expect(dlg.locator('a[href^="tel:"]')).toHaveCount(1);
    for (const a of await dlg.locator('a[href^="http"]').all()) {
      await expect(a).toHaveAttribute("rel", /noopener/);
      await expect(a).toHaveAttribute("target", "_blank");
    }
  });

  test("variant file shows the full name", async ({ page }) => {
    await gotoStage(page);
    await page.locator('button[aria-label^="Variant File"]').click({ force: true });
    await expect(page.getByRole("dialog")).toContainText(/Lohit Satya Sai Kuntamukkala/i);
  });
});

test.describe("keyboard & focus", () => {
  test("nodes are reachable by Tab and open with Enter; focus returns on close", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard");
    await gotoStage(page);
    const node = page.locator('button[aria-label^="Case Files"]');
    await node.focus();
    await page.keyboard.press("Enter");
    const dlg = page.getByRole("dialog");
    await expect(dlg).toBeVisible();
    // focus is inside the dialog
    expect(await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))).toBe(true);
    // tabbing never escapes the dialog
    for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dlg).toBeHidden();
    await expect(node).toBeFocused();
  });

  test("g-then-letter shortcuts still navigate", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard");
    await gotoStage(page);
    await page.keyboard.press("g");
    await page.keyboard.press("p");
    await expect(page).toHaveURL(/\/work$/);
  });
});
