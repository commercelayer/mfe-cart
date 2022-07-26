import CommerceLayer from "@commercelayer/sdk"
import { Settings, InvalidSettings } from "HostedApp"

import { forceOrderAutorefresh } from "./forceOrderAutorefresh"
import { getInfoFromJwt } from "./getInfoFromJwt"
import { getOrderDetails } from "./getOrderDetails"
import { getOrganizationsDetails } from "./getOrganizationDetails"
import { isValidHost } from "./isValidHost"
import { isValidStatus } from "./isValidStatus"

import { isValidOrderIdFormat } from "#utils/isValidOrderIdFormat"

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

  // checking cart consistency
  const hostname = typeof window && window.location.hostname
  if (!isValidHost(hostname, accessToken)) {
    return makeInvalidSettings()
  }

  // check order id format, to avoid calling api with a wrong id in url
  if (!isValidOrderIdFormat(orderId)) {
    return makeInvalidSettings()
  }

  const client = CommerceLayer({
    organization: slug,
    accessToken,
    domain,
  })

  const [organizationResponse, orderResponse] = await Promise.all([
    getOrganizationsDetails({
      client,
    }),
    getOrderDetails({ orderId, client }),
  ])

  // validating organization
  const organization = organizationResponse?.object
  if (!organization) {
    return makeInvalidSettings(!organizationResponse?.bailed)
  }

  // validating order
  const order = orderResponse?.object
  if (!order) {
    return makeInvalidSettings(!orderResponse?.bailed)
  }

  if (!isValidStatus(order.status)) {
    return makeInvalidSettings()
  }

  await forceOrderAutorefresh({ client, order })

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
    cartUrl: order.cart_url,
    isValid: true,
  }
}
