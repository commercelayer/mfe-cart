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
    await CartPage.quantitySelectorInput.fill("2")
    await CartPage.checkItemQuantity(2)
  })

  test("Should be able to increment quantity with button", async ({
    CartPage,
  }) => {
    await CartPage.checkItemQuantity(1)
    await CartPage.quantitySelectorBtnIncrement.click()
    await CartPage.quantitySelectorBtnIncrement.click()
    await CartPage.checkItemQuantity(3)
  })

  test("Should be able to decrement quantity with button", async ({
    CartPage,
  }) => {
    await CartPage.checkItemQuantity(1)
    await CartPage.quantitySelectorInput.fill("3")
    await CartPage.quantitySelectorBtnDecrement.click()
    await CartPage.checkItemQuantity(2)
  })
})
