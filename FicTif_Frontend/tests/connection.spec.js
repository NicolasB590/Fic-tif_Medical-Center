import { test, expect } from "@playwright/test";

test("vérifie le titre de la page", async ({ page }) => {
  await page.goto("https://fictif.freyza.net/");
  const linkText = await page.locator("a.btn").textContent();
  expect(linkText.trim()).toBe("Fic'Tif");
});
