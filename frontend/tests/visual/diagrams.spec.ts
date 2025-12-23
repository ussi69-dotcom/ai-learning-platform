import { test, expect } from "@playwright/test";
import { DIAGRAM_TYPES } from "../../components/mdx/Diagram";

test.describe("Diagram gallery", () => {
  test("renders all diagrams on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/en/visual/diagrams?visual=1");
    await page.waitForLoadState("networkidle");

    for (const type of DIAGRAM_TYPES) {
      const block = page.locator(`[data-diagram="${type}"]`);
      await block.scrollIntoViewIfNeeded();
      await expect(block).toBeVisible();

      const content = block.locator("[data-diagram-content]");
      await expect(content).toBeVisible();

      const visibleChildren = await content
        .locator(":scope > *:visible")
        .count();
      expect(visibleChildren).toBeGreaterThan(0);

      const box = await content.boundingBox();
      expect(box?.height || 0).toBeGreaterThan(40);
    }
  });
});
