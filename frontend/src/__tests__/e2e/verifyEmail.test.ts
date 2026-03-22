import { test, expect } from "@playwright/test";

test.describe("Email Verification (T-1.9)", () => {
  test("shows waiting state when no token", async ({ page }) => {
    await page.goto("/auth/verify-email");
    await expect(page.getByText(/Vérifiez votre email/i)).toBeVisible();
    await expect(page.getByText(/Renvoyer l'email/i)).toBeVisible();
  });

  test("shows waiting state with email param", async ({ page }) => {
    await page.goto("/auth/verify-email?email=test@example.com");
    await expect(page.getByText(/test@example.com/)).toBeVisible();
  });

  test("shows error for invalid token", async ({ page }) => {
    await page.goto("/auth/verify-email?token=invalid-token-here");
    // Wait for API call to complete
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Erreur|erreur/i).first()).toBeVisible();
  });
});
