import { test, expect } from "@playwright/test";

test.describe("Homepage (T-1.7)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads without errors", async ({ page }) => {
    await expect(page).toHaveTitle(/Génération du Lien/);
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.reload();
    expect(errors).toHaveLength(0);
  });

  test("hero section is visible", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Ensemble pour notre avenir")).toBeVisible();
  });

  test("CTA buttons are visible", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Découvrir le programme/i })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /S'inscrire/i }).first()).toBeVisible();
  });

  test("navigation works - click Programme", async ({ page }) => {
    await page.getByRole("link", { name: /Programme/i }).first().click();
    await expect(page).toHaveURL("/topics");
    await expect(
      page.getByRole("heading", { name: /Notre programme/i })
    ).toBeVisible();
  });

  test("navigation works - click S'inscrire", async ({ page }) => {
    await page.getByRole("link", { name: /S'inscrire/i }).last().click();
    await expect(page).toHaveURL("/auth/register");
  });

  test("footer is visible with legal links", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Politique de confidentialité/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Conditions d'utilisation/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Mentions légales/i })
    ).toBeVisible();
  });
});
