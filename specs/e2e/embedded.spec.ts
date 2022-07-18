import { test } from "../fixtures/tokenizedPage"

test.describe("Enter the page as embedded", () => {
  test.use({
    options: {
      orderType: "plain",
      embed: true,
      attributes: {},
      organization: {},
    },
  })

  test("should not see header and footer", async ({ CartPage }) => {
    await CartPage.checkHeaderAndFooter(true)
  })
})
