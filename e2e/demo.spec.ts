import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je choisis Claire", async () => {
    await page.getByRole("button", { name: "Claire" }).click();
  });

  await test.step("Je vois mon Passeport J0", async () => {
    await expect(page.getByText("50 €")).toBeVisible();
    await expect(page.getByText("le 18 novembre 2024")).toBeVisible();
  });
});
