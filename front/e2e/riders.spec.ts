// e2e/riders.spec.ts
// TODO: next/playwright/msw が正式版になったら差し替える
// @see https://github.com/vercel/next.js/pull/52520/files#diff-e1cbfe3597e7b858eb2d6afa3ab71ea6ef823709ad3f2a1b0ddf939792e5fea9
import { test, expect } from "next/experimental/testmode/playwright/msw";
import { handlers } from "../src/mocks/handlers";

test.use({
  mswHandlers: handlers,
});

test("ライダー一覧を表示できる", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("http://localhost:8000/riders");
  await expect(page.locator("h1")).toContainText("Cyclist Podium");

  await expect(page.getByRole("link", { name: "Tadej Pogacar" })).toBeVisible();
});

test("ライダー情報を編集できる", async ({ page }) => {
  await page.goto("http://localhost:8000/riders/1");
  await expect(
    page.getByRole("heading", { name: "Tadej Pogacar" })
  ).toBeVisible();

  await page.getByLabel("姓").fill("Poga");
  await page.getByLabel("名").fill("Tade");
  await page.getByRole("button", { name: "Submit" }).click();
});
