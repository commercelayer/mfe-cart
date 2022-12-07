import { test, expect } from "../fixtures/tokenizedPage"

test.describe("Quantity not available", () => {
  test.use({
    options: {
      orderType: "with-items",
      lineItemsAttributes: [
        {
          sku_code: "TSHIRTMM000000FFFFFFXLXX",
          quantity: 2,
        },
      ],
    },
  })

  test("should see an error when selecting non available quantity", async ({
    CartPage,
  }) => {
    await CartPage.checkItemQuantity(2)
    await CartPage.quantitySelectorInput.fill("10")
    await CartPage.checkItemQuantity(2)
    await expect(
      CartPage.page.locator("text=The selected quantity is not available")
    ).toBeVisible()
  })
})
