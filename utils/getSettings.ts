import CommerceLayer from "@commercelayer/sdk"
import { Settings, InvalidSettings } from "HostedApp"

import { getInfoFromJwt } from "./getInfoFromJwt"
import { getOrderDetails } from "./getOrderDetails"
import { getOrganizationsDetails } from "./getOrganizationDetails"
import { isValidHost } from "./isValidHost"
import { isValidStatus } from "./isValidStatus"

// default settings are by their nature not valid to show a full cart
// they will be used as fallback for errors or 404 page
export const defaultSettings: InvalidSettings = {
  isValid: false,
  primaryColor: "#000000",
  language: "en",
  favicon: `${process.env.NEXT_PUBLIC_BASE_PATH}/favicon.png`,
  companyName: "Commerce Layer",
  retryable: false,
}

const makeInvalidSettings = (retryable?: boolean): InvalidSettings => ({
  ...defaultSettings,
  retryable: !!retryable,
})

export const getSettings = async ({
  accessToken,
  orderId,
}: {
  accessToken: string
  orderId: string
}): Promise<Settings | InvalidSettings> => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "commercelayer.io"
  const { slug, isTest } = getInfoFromJwt(accessToken)

  if (!slug) {
    return makeInvalidSettings()
  }

  const cl = CommerceLayer({
    organization: slug,
    accessToken,
    domain,
    timeout: 180,
  })

  // retrive order
  const orderResponse = await getOrderDetails({ orderId, client: cl })
  const order = orderResponse?.object
  if (!order) {
    return makeInvalidSettings(!orderResponse?.bailed)
  }

  // retrieve organization
  const organizationResponse = await getOrganizationsDetails({
    client: cl,
  })
  const organization = organizationResponse?.object
  if (!organization) {
    return makeInvalidSettings(!organizationResponse?.bailed)
  }

  // checking cart consistency
  if (!isValidStatus(order.status)) {
    return makeInvalidSettings()
  }
  const hostname = typeof window && window.location.hostname
  if (!isValidHost(hostname, accessToken)) {
    return makeInvalidSettings()
  }

  return {
    accessToken,
    endpoint: `https://${slug}.${domain}`,
    domain,
    orderNumber: order.number || 0,
    orderId: order.id,
    itemsCount: (order.line_items || []).length,
    logoUrl: organization.logo_url,
    companyName: organization.name || defaultSettings.companyName,
    language: order.language_code || defaultSettings.language,
    primaryColor: organization.primary_color || defaultSettings.primaryColor,
    favicon: organization.favicon_url || defaultSettings.favicon,
    gtmId: isTest ? organization.gtm_id_test : organization.gtm_id,
    supportEmail: organization.support_email,
    supportPhone: organization.support_phone,
    termsUrl: order.terms_url,
    privacyUrl: order.privacy_url,
    returnUrl: order.return_url,
    isValid: true,
  }
}
