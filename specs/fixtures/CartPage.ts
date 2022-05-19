import { Page, expect } from "@playwright/test"

interface GoToProps {
  orderId: string
  accessToken?: string
}

interface AttributesProps {
  giftCard?: string
  organization?: unknown
}

export class CartPage {
  readonly page: Page
  readonly attributes?: AttributesProps

  constructor(page: Page, attributes?: AttributesProps) {
    this.page = page
    this.attributes = attributes || {}
  }

  async goto({ orderId, accessToken }: GoToProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || ""
    const url = `${baseUrl}/${orderId}?accessToken=${accessToken}`
    await this.page.goto(url, {
      waitUntil: "networkidle",
    })
  }

  async expectAppTitle() {
    const el = this.page.locator("[data-test-id=page-title]")
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

  async checkButtonCheckout({ toBeActive }: { toBeActive: boolean }) {
    const el = this.page.locator("[data-test-id=button-checkout]")
    if (toBeActive) {
      await expect(el).toBeEnabled()
    } else {
      await expect(el).toBeDisabled()
    }
  }

  async expectErrorPage() {
    await expect(
      this.page.locator("text=This order is not accessible")
    ).toBeVisible()
  }
}
