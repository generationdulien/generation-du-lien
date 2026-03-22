import { test, expect } from "@playwright/test";

test.describe("Responsive Layout (T-1.10)", () => {
  test("homepage has no horizontal scroll on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("homepage has no horizontal scroll on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("homepage has no horizontal scroll on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("topics page renders on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/topics");

    await expect(
      page.getByRole("heading", { name: /Notre programme/i })
    ).toBeVisible();
  });

  test("register form is usable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/auth/register");

    const emailInput = page.getByLabel("Email", { exact: true });
    await expect(emailInput).toBeVisible();

    const box = await emailInput.boundingBox();
    expect(box?.width).toBeGreaterThan(100); // Mobile width is narrower
  });
});
