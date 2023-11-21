export type OrderType =
  | "empty"
  | "plain"
  | "bundle"
  | "bundle+skus"
  | "digital"
  | "gift-card"
  | "with-items"

export type BaseLineItemObject = {
  quantity: number
  inventory?: number
  sku_options?: Array<Record<string, string | object>>
}

export type SkuItem = BaseLineItemObject & {
  sku_code: string
  frequency?: string
}

export type BundleItem = BaseLineItemObject & {
  bundle_code: string
}

export type LineItemObject = SkuItem | BundleItem

export type GiftCardOptions = {
  currency_code?: "EUR" | "USD"
  balance_cents?: number
  customer_email?: string
  apply?: boolean
}

export type TestOrderOptions = {
  token?: string
  orderId?: string
  orderType?: OrderType
  market?: string
  customer?: {
    email: string
    password: string
  }
  attributes?: {
    language_code?: "en" | "it"
    return_url?: string
  }
  organization?: Record<string, unknown>
  lineItemsAttributes?: LineItemObject[]
  giftCard?: GiftCardOptions
  couponCode?: string
  embed?: boolean
}
