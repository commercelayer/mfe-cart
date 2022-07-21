import { test, expect } from "../fixtures/tokenizedPage"

test.describe("Enter the page as embedded", () => {
  test.use({
    options: {
      orderType: "plain",
      embed: true,
      attributes: {
        return_url: "https://commercelayer.io/",
      },
      organization: {},
    },
  })

  test("should not see header and footer", async ({ CartPage }) => {
    await CartPage.checkHeaderAndFooter({ embedded: true })
  })

  test("should have iframe capabilities", async ({ CartPage }) => {
    await expect(
      CartPage.page.locator(`[data-test-id=return-url][target=_top]`)
    ).toBeVisible()
    await expect(
      CartPage.page.locator(`[data-test-id=button-checkout][target=_top]`)
    ).toBeVisible()
  })

  test("should have iframe resizer script", async ({ CartPage }) => {
    await expect(
      CartPage.page.locator(`script[data-test-id=iframe-resizer-script]`)
    ).toHaveAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.js"
    )
  })
})
