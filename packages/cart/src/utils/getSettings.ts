import CommerceLayer, { Organization } from "@commercelayer/sdk"
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
  faviconUrl:
    "https://data.commercelayer.app/assets/images/favicons/favicon-32x32.png",
  companyName: "Commerce Layer",
  retryable: false,
}

const makeInvalidSettings = ({
  retryable,
  organization,
  redirectTo,
}: {
  retryable?: boolean
  organization?: Organization
  redirectTo?: string
}): InvalidSettings => ({
  ...defaultSettings,
  retryable: !!retryable,
  logoUrl: organization?.logo_url ?? undefined,
  companyName: organization?.name || defaultSettings.companyName,
  primaryColor: organization?.primary_color || defaultSettings.primaryColor,
  faviconUrl: organization?.favicon_url || defaultSettings.faviconUrl,
  redirectTo,
})

/**
 * Retrieves a list of `Settings` required to show the cart page
 *
 * @param accessToken - Access Token for a sales channel API credentials to be used to authenticate all Commerce Layer API requests.
 * Read more at {@link https://docs.commercelayer.io/developers/authentication/client-credentials#sales-channel}
 * @param orderId - Order Id used to show cart info details.
 * Read more at {@link https://docs.commercelayer.io/developers/api-specification#base-endpoint}.
 *
 * @returns an union type of `Settings` or `InvalidSettings`
 */
export const getSettings = async ({
  accessToken,
  orderId,
  config,
}: {
  accessToken: string
  orderId: string
  config: CommerceLayerAppConfig
}): Promise<Settings | InvalidSettings> => {
  const domain = config.domain || "commercelayer.io"
  const { slug, isTest } = getInfoFromJwt(accessToken)

  if (!slug) {
    return makeInvalidSettings({})
  }

  // checking cart consistency
  const hostname = typeof window && window.location.hostname
  if (
    !isValidHost({
      hostname,
      accessToken,
      selfHostedSlug: config.selfHostedSlug,
    })
  ) {
    return makeInvalidSettings({})
  }

  const client = CommerceLayer({
    organization: slug,
    accessToken,
    domain,
  })

  // check order id format, to avoid calling api with a wrong id in url
  // we can still try to get organization info to display proper branding
  if (!isValidOrderIdFormat(orderId)) {
    const organizationResponse = await getOrganizationsDetails({
      client,
    })
    const organization = organizationResponse?.object
    return makeInvalidSettings({ organization })
  }

  const [organizationResponse, orderResponse] = await Promise.all([
    getOrganizationsDetails({
      client,
    }),
    getOrderDetails({ orderId, client }),
  ])

  // validating organization
  const organization = organizationResponse?.object
  if (!organization) {
    return makeInvalidSettings({
      retryable: !organizationResponse?.bailed,
    })
  }

  // validating order
  const order = orderResponse?.object
  if (!order) {
    return makeInvalidSettings({ retryable: !orderResponse?.bailed })
  }

  if (!isValidStatus(order.status)) {
    // invalid status means is a checkout page or thankyou page
    return makeInvalidSettings({
      organization,
      redirectTo: `${window.location.origin}/checkout/${orderId}?accessToken=${accessToken}`,
    })
  }

  await forceOrderAutorefresh({ client, order })

  return {
    accessToken,
    endpoint: `https://${slug}.${domain}`,
    orderId: order.id,
    itemsCount: (order.line_items || []).length,
    logoUrl: organization.logo_url ?? undefined,
    companyName: organization.name || defaultSettings.companyName,
    language: order.language_code || defaultSettings.language,
    primaryColor: organization.primary_color || defaultSettings.primaryColor,
    faviconUrl: organization.favicon_url || defaultSettings.faviconUrl,
    gtmId:
      (isTest ? organization.gtm_id_test : organization.gtm_id) ?? undefined,
    returnUrl: order.return_url ?? undefined,
    cartUrl: order.cart_url ?? undefined,
    isValid: true,
  }
}
