import { test } from "../fixtures/tokenizedPage"

test.describe("Frequency", () => {
  test.use({
    options: {
      orderType: "with-items",

      lineItemsAttributes: [
        {
          sku_code: "TSHIRTMS000000FFFFFFLXXX",
          quantity: 1,
          frequency: "monthly",
        },
        {
          sku_code: "PLAINTSHIRT001",
          quantity: 1,
          frequency: "yearly",
        },
        {
          sku_code: "HOODIEUZ000000FFFFFFSXXX",
          quantity: 1,
        },
      ],
    },
  })

  test("Should see frequency monthly", async ({ CartPage }) => {
    await CartPage.checkLineItemFrequency("Monthly")
  })

  test("Should see frequency yearly", async ({ CartPage }) => {
    await CartPage.checkLineItemFrequency("Yearly")
  })
})
