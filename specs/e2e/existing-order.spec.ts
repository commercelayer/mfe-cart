import { test } from "../fixtures/tokenizedPage"

test.describe("Existing order id", () => {
  test.use({
    options: {
      orderId: "NDerhZjAlO",
      customer: {
        email: "customertest1@commercelayer.test",
        password: "asf31341!Dacx1aDGV",
      },
      attributes: {
        return_url: "https://commercelayer.io",
      },
    },
  })

  test("should see an existing cart", async ({ CartPage }) => {
    await CartPage.expectAppTitle()
    await CartPage.checkCartId("NDerhZjAlO")
    await CartPage.checkItemQuantity(1)
    await CartPage.checkReturnUrlLink("https://commercelayer.io")
  })
})
