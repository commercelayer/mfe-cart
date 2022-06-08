declare module "HostedApp" {
  export type Settings = {
    accessToken: string
    endpoint: string
    domain: string
    orderNumber: number
    orderId: string
    logoUrl?: string
    companyName: string
    language: string
    primaryColor: string
    favicon: string
    gtmId?: string
    supportEmail?: string
    supportPhone?: string
    termsUrl?: string
    privacyUrl?: string
    returnUrl?: string
    isValid: true
    itemsCount: number
  }

  export type InvalidSettings = Pick<
    Settings,
    "primaryColor" | "language" | "favicon" | "companyName" | "logoUrl"
  > & {
    isValid: false
    retryable: boolean
  }
}
