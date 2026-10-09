import {
  expect,
  type Locator,
  type Page,
  type Request,
} from "@playwright/test"

import commonDe from "#assets/locales/de/common.json"
import commonEn from "#assets/locales/en/common.json"
import commonEs from "#assets/locales/es/common.json"
import commonFr from "#assets/locales/fr/common.json"
import commonHr from "#assets/locales/hr/common.json"
import commonHu from "#assets/locales/hu/common.json"
import commonIt from "#assets/locales/it/common.json"
import commonNl from "#assets/locales/nl/common.json"
import commonPl from "#assets/locales/pl/common.json"
import commonPt from "#assets/locales/pt/common.json"
import commonSl from "#assets/locales/sl/common.json"

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
      "[data-test-id=input-spinner-element]",
    )
    this.quantitySelectorBtnDecrement = this.quantitySelector.locator(
      "[data-test-id=input-spinner-btn-decrement]",
    )
    this.quantitySelectorBtnIncrement = this.quantitySelector.locator(
      "[data-test-id=input-spinner-btn-increment]",
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

    // not using "networkidle": third-party scripts (e.g. Stripe express
    // payments) keep sending beacons, so the network never goes idle.
    // We wait instead for Commerce Layer requests to settle.
    const inflight = new Set<Request>()
    const isCommerceLayer = (req: Request) =>
      new URL(req.url()).hostname.includes(".commercelayer.")
    const onRequest = (req: Request) => {
      if (isCommerceLayer(req)) inflight.add(req)
    }
    const onDone = (req: Request) => inflight.delete(req)
    this.page.on("request", onRequest)
    this.page.on("requestfinished", onDone)
    this.page.on("requestfailed", onDone)

    await this.page.goto(url, { waitUntil: "load" })
    await this.page
      .locator("[data-test-id=page-title]")
      .first()
      .waitFor({ state: "attached" })

    const idleMs = 500
    let quietSince = Date.now()
    while (Date.now() - quietSince < idleMs) {
      if (inflight.size > 0) quietSince = Date.now()
      await this.page.waitForTimeout(50)
    }

    this.page.off("request", onRequest)
    this.page.off("requestfinished", onDone)
    this.page.off("requestfailed", onDone)
  }

  async expectAppTitle() {
    const el = this.page.locator("[data-test-id=page-title]:visible")
    await expect(el).toBeVisible()
  }

  async checkOrderLanguage(
    language:
      | "en"
      | "it"
      | "de"
      | "hu"
      | "pl"
      | "pt"
      | "nl"
      | "es"
      | "fr"
      | "hr"
      | "sl",
  ) {
    const translations = {
      it: commonIt,
      en: commonEn,
      de: commonDe,
      hu: commonHu,
      pl: commonPl,
      pt: commonPt,
      nl: commonNl,
      es: commonEs,
      fr: commonFr,
      hr: commonHr,
      sl: commonSl,
    }
    const currentLang = translations[language]
    await expect(
      this.page.locator(
        `[data-test-id=page-title]:visible >> text=${currentLang.general.title}`,
      ),
    ).toBeVisible()

    await expect(
      this.page.locator(
        `[data-test-id=label-subtotal] >> text=${currentLang.general.subtotal}`,
      ),
    ).toBeVisible()

    await expect(
      this.page.locator(
        `[data-test-id=label-total] >> text=${currentLang.general.total}`,
      ),
    ).toBeVisible()
  }

  async checkCartId(id: string) {
    const el = this.page.locator(`[data-cart-id=${id}]`)
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
      this.page.locator("[data-test-id=line-item-bundles]").first(),
    ).toBeVisible()
  }

  async checkForSku() {
    await expect(
      this.page.locator("[data-test-id=line-item-skus]").first(),
    ).toBeVisible()
  }

  async checkForSkuOptions(options: string[]) {
    await expect(
      this.page.locator("[data-test-id=line-item-options]"),
    ).toHaveCount(options.length)
    await Promise.all(
      options.map((opt) =>
        expect(this.page.locator(`text=${opt}`)).toBeVisible(),
      ),
    )
  }

  async checkLineItemFrequency(frequency: string) {
    await expect(
      this.page.locator("[data-test-id=frequency]", {
        hasText: frequency,
      }),
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
      this.page.locator("[data-test-id=applied-gift_card]"),
    ).toBeVisible()
  }

  async checkForAppliedCoupon() {
    await expect(
      this.page.locator("[data-test-id=applied-coupon]"),
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
      this.page.locator(`[data-test-id=return-url][href='${href}']`),
    ).toBeVisible()
    await expect(
      this.page.locator(`[data-test-id=return-url-logo][href='${href}']`),
    ).toBeVisible()
  }

  async getAmounts() {
    await expect(this.page.locator("[data-test-id=total-amount]")).toBeVisible()
    return {
      subtotal: await getAttributeAmount(this.page, "subtotal-amount"),
      total: await getAttributeAmount(this.page, "total-amount"),
    }
  }

  async checkAmounts({ subtotal, total }: { subtotal: number; total: number }) {
    await expect(
      this.page.locator("[data-test-id=subtotal-amount]"),
    ).toHaveAttribute("data-amount", `${subtotal}`)
    await expect(
      this.page.locator("[data-test-id=total-amount]"),
    ).toHaveAttribute("data-amount", `${total}`)
  }

  async checkQuantityAndAmounts(
    quantity: number,
    unitAmounts: { subtotal: number; total: number },
  ) {
    // fixed costs (e.g. payment method fee) don't scale with quantity
    const fixedCosts = unitAmounts.total - unitAmounts.subtotal
    await this.checkItemQuantity(quantity)
    await this.checkAmounts({
      subtotal: unitAmounts.subtotal * quantity,
      total: unitAmounts.subtotal * quantity + fixedCosts,
    })
  }

  async checkCartSubtotal(amount: string) {
    await expect(
      this.page.locator("[data-test-id=subtotal-amount]"),
    ).toHaveText(amount)
  }

  async checkCartTotal(amount: string) {
    await expect(this.page.locator("[data-test-id=total-amount]")).toHaveText(
      amount,
    )
  }

  async checkHeaderAndFooter({ embedded }: { embedded: boolean }) {
    if (embedded) {
      await expect(this.page.locator("[data-test-id=cart-header]")).toBeHidden()
      await expect(this.page.locator("[data-test-id=cart-footer]")).toBeHidden()
    } else {
      await expect(
        this.page.locator("[data-test-id=cart-header]"),
      ).toBeVisible()
      await expect(
        this.page.locator("[data-test-id=cart-footer]:visible"),
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
    // payment method row is rendered only when the method has a price
    const paymentMethod =
      (await this.page
        .locator("[data-test-id=payment-method-amount]")
        .count()) > 0
        ? await getAttributeAmount(this.page, "payment-method-amount")
        : 0

    const computedTotal = subtotal + discount + giftcard + paymentMethod
    expect(computedTotal).toBe(total)
  }

  async expectErrorPage() {
    await expect(
      this.page.locator("text=This order is not accessible"),
    ).toBeVisible()
  }
}

const getAttributeAmount = async (page: Page, attributeName: string) => {
  const element = await page.locator(`[data-test-id=${attributeName}]`)
  const value = (await element.getAttribute("data-amount")) || "0"
  return Number.parseInt(value, 10)
}
