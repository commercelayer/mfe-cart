import { test } from "../fixtures/tokenizedPage"

test.describe("Check basic cart features", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: {
        return_url: "https://www.commercelayer.io",
      },
      organization: {},
    },
  })

  test("Should see a Continue Shopping link", async ({ CartPage }) => {
    await CartPage.checkReturnUrlLink("https://www.commercelayer.io")
  })

  test("Should be able to update quantity", async ({ CartPage }) => {
    await CartPage.checkItemQuantity(1)
    await CartPage.page
      .locator("data-test-id=quantity-selector")
      .first()
      .selectOption("2")
    await CartPage.checkItemQuantity(2)
  })
})
