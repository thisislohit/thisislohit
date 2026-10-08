import type { Page } from "@playwright/test";

// Skip the first-visit boot overlay so tests start on the stage.
export async function gotoStage(page: Page, path = "/") {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("tva-booted", "1");
    } catch {}
  });
  await page.goto(path);
  if (!/^\/(#.*)?$/.test(path)) {
    await page.locator("h1, h2").first().waitFor({ state: "visible" });
    return;
  }
  // nodes pin themselves once the backdrop has published positions
  await page.locator('button[aria-label^="Case Files"]').waitFor({ state: "attached" });
  await page.waitForFunction(() => {
    const b = document.querySelector('button[aria-label^="Case Files"]') as HTMLElement | null;
    return !!b && /translate3d/.test(b.style.transform);
  });
}

export const NODES = [
  { id: "file", label: "Variant File", title: "Variant File" },
  { id: "work", label: "Case Files", title: "Case Files" },
  { id: "experience", label: "Incident Log", title: "Incident Log" },
  { id: "skills", label: "Temporal Loom", title: "Temporal Loom" },
  { id: "contact", label: "Time Door", title: "The Time Door" },
] as const;
