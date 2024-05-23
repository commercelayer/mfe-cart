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

  test("should not be able to update a quantity not available", async ({
    CartPage,
  }) => {
    await CartPage.checkItemQuantity(2)
    await CartPage.quantitySelectorInput.fill("5") // max available quantity is 5
    await CartPage.checkItemQuantity(5)

    await CartPage.quantitySelectorInput.fill("6")

    await CartPage.checkItemQuantity(5)

    await expect(
      CartPage.page.locator("[data-test-id=input-spinner-btn-increment]")
    ).toBeDisabled()

    await CartPage.quantitySelectorInput.fill("3")
    await expect(
      CartPage.page.locator("[data-test-id=input-spinner-btn-increment]")
    ).toBeEnabled()
  })
})
