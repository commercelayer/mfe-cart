import { test } from "../fixtures/tokenizedPage"

test.describe("Remove a product to show empty cart", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: {},
      organization: {},
    },
  })

  test("Should be able to empty the cart by removing the only item available", async ({
    CartPage,
  }) => {
    // plain cart, initial state
    await CartPage.expectAppTitle()
    await CartPage.checkItemQuantity(1)
    await CartPage.checkButtonCheckout({ toBeActive: true })

    // we empty the cart
    const buttonRemove = CartPage.page
      .locator("[data-test-id=button-remove-item]")
      .first()
    await buttonRemove.click()
    await CartPage.checkItemQuantity(0)
    await CartPage.checkButtonCheckout({ toBeActive: false })
  })
})
