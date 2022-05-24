import { test } from "../fixtures/tokenizedPage"

test.describe("Line items options", () => {
  test.use({
    options: {
      orderType: "with-items",
      lineItemsAttributes: [
        {
          sku_code: "PLAINTSHIRT001",
          quantity: 1,
          sku_options: [
            {
              name: "Front Text",
              value: {
                name: "Commerce Layer",
              },
            },
            {
              name: "Rear Text",
              value: {
                name: "Composable Commerce API",
              },
            },
          ],
        },
      ],
    },
  })

  test("should see a product with sku options", async ({ CartPage }) => {
    await CartPage.expectAppTitle()
    await CartPage.checkForSkuOptions(["Front Text", "Rear Text"])
  })
})
