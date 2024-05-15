import { test, expect } from "../fixtures/tokenizedPage"

test.describe("Check for ability to purchase only one gift card", () => {
  test.use({
    options: {
      orderType: "gift-card",
      giftCard: {
        balance_cents: 1000,
        currency_code: "USD",
      },
      attributes: {},
      organization: {},
    },
  })

  test("Should see a gift card to be purchased", async ({ CartPage }) => {
    await CartPage.expectAppTitle()
    await CartPage.checkCartTotal("$10.00")
    await CartPage.checkItemQuantity(1)
    await expect(CartPage.quantitySelector).toBeHidden()
    await CartPage.checkButtonCheckout({ toBeActive: true })
  })
})

test.describe("Apply a new gift card with some line items", () => {
  test.use({
    options: {
      orderType: "with-items",
      giftCard: {
        balance_cents: 2000,
        currency_code: "USD",
        apply: true,
      },
      lineItemsAttributes: [
        {
          sku_code: "TSHIRTMS000000FFFFFFLXXX",
          quantity: 2,
        },
        {
          sku_code: "PLAINTSHIRT001",
          quantity: 1,
        },
      ],
    },
  })

  test("should see a gift card applied to the cart", async ({ CartPage }) => {
    await CartPage.expectAppTitle()
    await CartPage.checkForAppliedGiftCard()
    await CartPage.checkForTotalsToBeProperlyCalculated({
      couponApplied: false,
      giftCardApplied: true,
    })
  })
})

test.describe("Cart with coupon code", () => {
  test.use({
    options: {
      orderType: "with-items",
      couponCode: "PROMOTEST10",
      lineItemsAttributes: [
        {
          sku_code: "TSHIRTMS000000FFFFFFLXXX",
          quantity: 2,
        },
        {
          sku_code: "PLAINTSHIRT001",
          quantity: 1,
        },
      ],
    },
  })

  test("should see a discount already applied to the cart", async ({
    CartPage,
  }) => {
    await CartPage.expectAppTitle()
    await CartPage.checkForAppliedCoupon()
    await CartPage.checkForTotalsToBeProperlyCalculated({
      couponApplied: true,
      giftCardApplied: false,
    })
  })
})

test.describe("Manually applying and removing gift card and coupon", () => {
  test.use({
    options: {
      orderType: "plain",
    },
  })

  test("should be able to add only one coupon and one gift card and get specific error messages", async ({
    CartPage,
  }) => {
    await CartPage.expectAppTitle()
    // add coupon
    await CartPage.addCouponOrGiftCard("PROMOTEST10")
    await CartPage.checkForAppliedCoupon()

    // try to add another coupon
    await CartPage.addCouponOrGiftCard("PROMOTEST10")
    await expect(
      CartPage.page.locator("text=Please enter a valid gift card")
    ).toBeVisible()

    // remove coupon
    await CartPage.removeCouponOrGiftCard("coupon")
    await expect(
      CartPage.page.locator("text=Please enter a valid gift card")
    ).not.toBeVisible()
    // await CartPage.page.locator("data-test-id=coupon-submit").click()
    await CartPage.addCouponOrGiftCard("PROMOTEST10")
    await CartPage.checkForAppliedCoupon()

    // add gift card
    await CartPage.addCouponOrGiftCard("11323995-790a-4ef3-9887-2a0489c53284")
    await CartPage.checkForAppliedGiftCard()

    // once both coupon and gift card are applied, input is hidden
    await expect(
      CartPage.page.locator("data-test-id=coupon-input")
    ).not.toBeVisible()

    // remove gift card, add an invalid one, then add a good one
    await CartPage.removeCouponOrGiftCard("gift_card")
    await CartPage.addCouponOrGiftCard("hello-i-am-an-invalid-gift-card")
    await expect(
      CartPage.page.locator("text=Please enter a valid gift card")
    ).toBeVisible()
    await CartPage.addCouponOrGiftCard("11323995-790a-4ef3-9887-2a0489c53284")
    await expect(
      CartPage.page.locator("text=Please enter a valid gift card")
    ).not.toBeVisible()
    await CartPage.checkForAppliedGiftCard()

    // then we remove the coupon and insert a wrong one
    await CartPage.removeCouponOrGiftCard("coupon")
    await CartPage.addCouponOrGiftCard("hello-i-am-an-invalid-code")
    await expect(
      CartPage.page.locator("text=Please enter a valid coupon")
    ).toBeVisible()

    // finally we add again the current one
    await CartPage.addCouponOrGiftCard("PROMOTEST10")
    await expect(
      CartPage.page.locator("text=Please enter a valid gift card")
    ).not.toBeVisible()
    await CartPage.checkForAppliedCoupon()

    // check final totals
    await CartPage.checkForTotalsToBeProperlyCalculated({
      couponApplied: true,
      giftCardApplied: true,
    })
  })
})
