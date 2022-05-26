import { Page, expect } from "@playwright/test"

import commonEn from "../../public/locales/en/common.json"
import commonIt from "../../public/locales/it/common.json"

interface GoToProps {
  orderId: string
  accessToken?: string
}

export class CartPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto({ orderId, accessToken }: GoToProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || ""
    const url = `${baseUrl}/${orderId}?accessToken=${accessToken}`

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
    const el = this.page.locator("[data-test-id=item-quantity]")
    if (total) {
      await expect(el).toHaveText(`${total}`)
    } else {
      await expect(el).toBeHidden()
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
  }

  async checkCartTotal(amount: string) {
    await expect(this.page.locator("[data-test-id=total]")).toHaveText(amount)
  }

  async expectErrorPage() {
    await expect(
      this.page.locator("text=This order is not accessible")
    ).toBeVisible()
  }
}
