import { test } from "../fixtures/tokenizedPage"

test.describe("Cart in Eng", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "en" },
    },
  })

  test("should open a cart with texts in English", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("en")
  })
})

test.describe("Cart in Italian", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "it" },
    },
  })

  test("should open a cart with texts in Italian", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("it")
  })
})
