import { CartPage } from "../fixtures/CartPage"
import { test } from "../fixtures/tokenizedPage"

test.describe("Check not valid entry points", () => {
  const basePath = process.env.PUBLIC_PROJECT_PATH
    ? `/${process.env.PUBLIC_PROJECT_PATH}/`
    : "/"

  test("should navigate to the 404 page with wrong orderId, no token", async ({
    page,
  }) => {
    await page.goto(`${basePath}abc12345`)
    const cartPage = new CartPage(page)
    await cartPage.expectErrorPage()
  })

  test("should navigate to the 404 page with no params", async ({ page }) => {
    await page.goto(basePath)
    const cartPage = new CartPage(page)
    await cartPage.expectErrorPage()
  })
})

test.describe("Enter the page with valid URL and params", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: {},
      organization: {},
    },
  })

  test("should open a valid cart page", async ({ CartPage }) => {
    await CartPage.checkHeaderAndFooter({ embedded: false })
    await CartPage.expectAppTitle()
    await CartPage.checkItemQuantity(1)
    await CartPage.checkButtonCheckout({ toBeActive: true })
  })
})

test.describe("Enter a valid URL but empty cart", () => {
  test.use({
    options: {
      orderType: "empty",
      attributes: {},
      organization: {},
    },
  })

  test("should open a valid cart page", async ({ CartPage }) => {
    await CartPage.expectAppTitle()
    await CartPage.checkItemQuantity(0)
    await CartPage.checkButtonCheckout({ toBeActive: false })
  })
})
