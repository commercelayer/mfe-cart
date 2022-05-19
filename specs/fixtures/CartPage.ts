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
    await expect(this.page.locator("text=Your Cart")).toBeVisible()
  }

  async expectErrorPage() {
    await expect(
      this.page.locator("text=This order is not accessible")
    ).toBeVisible()
  }
}
