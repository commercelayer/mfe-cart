import { test, expect } from "@playwright/test"

test("Sample test", async ({ page }) => {
  await page.goto("http://localhost:3000")
  const title = page.locator("[data-test-id='title']")
  await expect(title).toHaveText("Commerce Layer React Cart")
})
