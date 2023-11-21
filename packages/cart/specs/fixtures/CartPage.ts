import { Page, expect, Locator } from "@playwright/test"

import commonEn from "#assets/locales/en/common.json"
import commonIt from "#assets/locales/it/common.json"

type GoToProps = {
  orderId: string
  accessToken?: string
  embed?: boolean
}

export class CartPage {
  readonly page: Page
  readonly quantitySelector: Locator
  readonly quantitySelectorInput: Locator
  readonly quantitySelectorBtnIncrement: Locator
  readonly quantitySelectorBtnDecrement: Locator
  readonly itemsCount: Locator

  constructor(page: Page) {
    this.page = page
    this.quantitySelector = this.page
      .locator("[data-test-id=quantity-selector]")
      .first()
    this.quantitySelectorInput = this.quantitySelector.locator(
      "[data-test-id=input-spinner-element]"
    )
    this.quantitySelectorBtnDecrement = this.quantitySelector.locator(
      "[data-test-id=input-spinner-btn-decrement]"
    )
    this.quantitySelectorBtnIncrement = this.quantitySelector.locator(
      "[data-test-id=input-spinner-btn-increment]"
    )
    this.itemsCount = this.page.locator("[data-test-id=items-count]").first()
  }

  async goto({ orderId, accessToken, embed }: GoToProps) {
    const baseUrl = process.env.PUBLIC_PROJECT_PATH
      ? `/${process.env.PUBLIC_PROJECT_PATH}`
      : ""
    const embedQuery = embed ? "&embed=true" : ""
    const url = `${baseUrl}/${orderId}?accessToken=${accessToken}${embedQuery}`

    if (process.env.E2E_DEBUG === "true") {
      console.log("tested url: ", `http://localhost:3000${url}`)
    }

    await this.page.goto(url, {
      waitUntil: "networkidle",
    })
  }

  async expectAppTitle() {
    const el = this.page.locator("[data-test-id=page-title]")
    await expect(el).toBeVisible()
  }

  async checkOrderLanguage(language: "en" | "it") {
    const translations = {
      it: commonIt,
      en: commonEn,
    }
    const currentLang = translations[language]
    await expect(
      this.page.locator(
        `[data-test-id=page-title] >> text=${currentLang.general.title}`
      )
    ).toBeVisible()

    await expect(
      this.page.locator(
        `[data-test-id=label-subtotal] >> text=${currentLang.general.subtotal}`
      )
    ).toBeVisible()

    await expect(
      this.page.locator(
        `[data-test-id=label-total] >> text=${currentLang.general.total}`
      )
    ).toBeVisible()
  }

  async checkCartId(id: string) {
    const el = this.page.locator(
      `[data-test-id=page-title][data-cart-id=${id}]`
    )
    await expect(el).toBeVisible()
  }

  async checkItemQuantity(total: number | string) {
    if (total) {
      await expect(this.itemsCount).toHaveText(`${total}`)
    } else {
      await expect(this.itemsCount).toBeHidden()
    }
  }

  async checkForBundle() {
    await expect(
      this.page.locator("[data-test-id=line-item-bundles]").first()
    ).toBeVisible()
  }

  async checkForSku() {
    await expect(
      this.page.locator("[data-test-id=line-item-skus]").first()
    ).toBeVisible()
  }

  async checkForSkuOptions(options: string[]) {
    await expect(
      this.page.locator("[data-test-id=line-item-options]")
    ).toHaveCount(options.length)
    await Promise.all(
      options.map((opt) =>
        expect(this.page.locator(`text=${opt}`)).toBeVisible()
      )
    )
  }

  async checkLineItemFrequency(frequency: string) {
    await expect(
      this.page.locator("[data-test-id=frequency]", {
        hasText: frequency,
      })
    ).toBeVisible()
  }

  async addCouponOrGiftCard(code: string) {
    await this.page.locator("data-test-id=coupon-input").fill(code)
    await this.page.locator("data-test-id=coupon-submit").click()
  }

  async removeCouponOrGiftCard(what: "gift_card" | "coupon") {
    await this.page.locator(`data-test-id=button-remove-${what}`).click()
  }

  async checkForAppliedGiftCard() {
    await expect(
      this.page.locator("[data-test-id=applied-gift_card]")
    ).toBeVisible()
  }

  async checkForAppliedCoupon() {
    await expect(
      this.page.locator("[data-test-id=applied-coupon]")
    ).toBeVisible()
  }

  async checkButtonCheckout({ toBeActive }: { toBeActive: boolean }) {
    const el = this.page.locator("[data-test-id=button-checkout]")
    if (toBeActive) {
      await expect(el).toBeEnabled()
    } else {
      await expect(el).toBeDisabled()
    }
  }

  async checkReturnUrlLink(href: string) {
    await expect(
      this.page.locator(`[data-test-id=return-url][href='${href}']`)
    ).toBeVisible()
    await expect(
      this.page.locator(`[data-test-id=return-url-logo][href='${href}']`)
    ).toBeVisible()
  }

  async checkCartTotal(amount: string) {
    await expect(this.page.locator("[data-test-id=total-amount]")).toHaveText(
      amount
    )
  }

  async checkHeaderAndFooter({ embedded }: { embedded: boolean }) {
    if (embedded) {
      await expect(this.page.locator("[data-test-id=cart-header]")).toBeHidden()
      await expect(this.page.locator("[data-test-id=cart-footer]")).toBeHidden()
    } else {
      await expect(
        this.page.locator("[data-test-id=cart-header]")
      ).toBeVisible()
      await expect(
        this.page.locator("[data-test-id=cart-footer]")
      ).toBeVisible()
    }
  }

  async checkForTotalsToBeProperlyCalculated({
    couponApplied,
    giftCardApplied,
  }: {
    couponApplied: boolean
    giftCardApplied: boolean
  }) {
    const subtotal = await getAttributeAmount(this.page, "subtotal-amount")
    const total = await getAttributeAmount(this.page, "total-amount")
    const discount = couponApplied
      ? await getAttributeAmount(this.page, "discount-amount")
      : 0
    const giftcard = giftCardApplied
      ? await getAttributeAmount(this.page, "gift-card-amount")
      : 0

    const computedTotal = subtotal + discount + giftcard
    expect(computedTotal).toBe(total)
  }

  async expectErrorPage() {
    await expect(
      this.page.locator("text=This order is not accessible")
    ).toBeVisible()
  }
}

const getAttributeAmount = async (page: Page, attributeName: string) => {
  const element = await page.locator(`[data-test-id=${attributeName}]`)
  const value = (await element.getAttribute("data-amount")) || "0"
  return parseInt(value, 10)
}
