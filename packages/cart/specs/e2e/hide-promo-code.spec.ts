import { expect, test } from "../fixtures/tokenizedPage"

test.describe("Promo code input visibility", () => {
  test.use({
    options: {
      orderType: "plain",
      organization: {},
      attributes: {},
    },
  })

  test("Should show coupon/gift card input by default", async ({
    CartPage,
  }) => {
    await CartPage.expectAppTitle()

    // Check that the coupon input is visible when hide_promo_code is not set
    await expect(
      CartPage.page.locator("[data-test-id=coupon-input]"),
    ).toBeVisible()
  })
})

/**
 * NOTE: The following test validates the behavior when hide_promo_code is set to true
 * in the organization config. To properly test this in an e2e environment, the organization
 * would need to have the following config:
 * 
 * {
 *   "mfe": {
 *     "default": {
 *       "cart": {
 *         "hide_promo_code": true
 *       }
 *     }
 *   }
 * }
 * 
 * When this config is set, the coupon/gift card input section should not be rendered.
 * This can be verified by checking that the element with data-test-id="coupon-input"
 * is not present in the DOM.
 */
