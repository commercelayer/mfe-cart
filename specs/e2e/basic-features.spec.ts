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

test.describe("Check for ability to purchase gift cards", () => {
  test.use({
    options: {
      orderType: "gift-card",
      giftCard: {
        balance_cents: 1000,
        currency_code: "USD",
      },
      attributes: {},
      organization: {},
    },
  })

  test("Should see a gift card to be purchased", async ({ CartPage }) => {
    await CartPage.expectAppTitle()
    await CartPage.checkItemQuantity(1)
    await CartPage.checkCartTotal("$10.00")
    await CartPage.checkButtonCheckout({ toBeActive: true })
  })
})
