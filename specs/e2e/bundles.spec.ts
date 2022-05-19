import { test } from "../fixtures/tokenizedPage"

test.describe("Check order with bundles", () => {
  test.use({
    options: {
      orderType: "bundle",
      attributes: {},
      organization: {},
    },
  })

  test("Should see a bundle within the product list", async ({ CartPage }) => {
    await CartPage.expectAppTitle()
    await CartPage.checkForBundle()
    await CartPage.checkButtonCheckout({ toBeActive: true })
  })
})
