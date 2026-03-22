import { test, expect } from "@playwright/test";

test.describe("Registration Flow (T-1.8)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/register");
  });

  test("registration page loads", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /S'inscrire/i })
    ).toBeVisible();
  });

  test("form fields are present", async ({ page }) => {
    await expect(page.getByLabel("Prénom", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Nom", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Mot de passe", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Confirmer le mot de passe", { exact: true })).toBeVisible();
  });

  test("shows validation errors for empty form", async ({ page }) => {
    await page.getByRole("button", { name: /S'inscrire/i }).click();
    // Expect at least one validation error to be visible
    await expect(page.getByText(/obligatoire|required|conditions/i).first()).toBeVisible();
  });

  test("shows error for invalid email", async ({ page }) => {
    await page.getByLabel("Prénom", { exact: true }).fill("John");
    await page.getByLabel("Nom", { exact: true }).fill("Doe");
    await page.getByLabel("Email", { exact: true }).fill("not-an-email");
    await page.getByLabel("Mot de passe", { exact: true }).fill("Password123");
    await page.getByLabel("Confirmer le mot de passe", { exact: true }).fill("Password123");
    await page.locator("input[type='checkbox']").check();
    await page.getByRole("button", { name: /S'inscrire/i }).click();

    await expect(page.getByText(/email invalide/i)).toBeVisible();
  });

  test("shows error for password too short", async ({ page }) => {
    await page.getByLabel("Prénom", { exact: true }).fill("John");
    await page.getByLabel("Nom", { exact: true }).fill("Doe");
    await page.getByLabel("Email", { exact: true }).fill("john@example.com");
    await page.getByLabel("Mot de passe", { exact: true }).fill("short");
    await page.getByLabel("Confirmer le mot de passe", { exact: true }).fill("short");
    await page.locator("input[type='checkbox']").check();
    await page.getByRole("button", { name: /S'inscrire/i }).click();

    await expect(page.getByText(/8 caract/i)).toBeVisible();
  });

  test("shows error for non-matching passwords", async ({ page }) => {
    await page.getByLabel("Prénom", { exact: true }).fill("John");
    await page.getByLabel("Nom", { exact: true }).fill("Doe");
    await page.getByLabel("Email", { exact: true }).fill("john@example.com");
    await page.getByLabel("Mot de passe", { exact: true }).fill("Password123");
    await page.getByLabel("Confirmer le mot de passe", { exact: true }).fill("DifferentPassword");
    await page.locator("input[type='checkbox']").check();
    await page.getByRole("button", { name: /S'inscrire/i }).click();

    await expect(page.getByText(/mots de passe/i)).toBeVisible();
  });

  test("has link to login page", async ({ page }) => {
    await page.getByRole("link", { name: /Connectez-vous/i }).click();
    await expect(page).toHaveURL("/auth/login");
  });
});
