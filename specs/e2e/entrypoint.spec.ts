import { test, expect } from "../fixtures/tokenizedPage"

test("should navigate to the 404 page with wrong orderId, no token", async ({
  page,
}) => {
  await page.goto("/cart/Asdakfrsf")
  await expect(page.locator("text=This order is not accessible.")).toBeVisible()
})

test("should navigate to the 404 page with no params", async ({ page }) => {
  await page.goto("/cart")
  await expect(page.locator("text=This order is not accessible.")).toBeVisible()
})

test.describe("add default params to page", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: {},
      organization: {},
    },
  })

  test("Valid order", async ({ CartPage }) => {
    await expect(CartPage.page.locator("text=Your Cart")).toBeVisible()
  })
})
