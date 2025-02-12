import { getConfig } from "@commercelayer/organization-config"
import CommerceLayer, { type Organization } from "@commercelayer/sdk"
import type { InvalidSettings, Settings } from "HostedApp"

import { forceOrderAutorefresh } from "./forceOrderAutorefresh"
import { getInfoFromJwt } from "./getInfoFromJwt"
import { getOrderDetails } from "./getOrderDetails"
import { getOrganizationsDetails } from "./getOrganizationDetails"
import { isValidHost } from "./isValidHost"
import { isValidStatus } from "./isValidStatus"

import { isValidOrderIdFormat } from "#utils/isValidOrderIdFormat"
import { updateAccessTokenInUrl } from "#utils/updateAccessTokenInUrl"

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
  appConfig,
}: {
  accessToken: string
  orderId: string
  appConfig: CommerceLayerAppConfig
}): Promise<Settings | InvalidSettings> => {
  const domain = appConfig.domain || "commercelayer.io"
  const { slug, isTest, market } = getInfoFromJwt(accessToken)

  if (!slug) {
    return makeInvalidSettings({})
  }

  // checking cart consistency
  const hostname = typeof window && window.location.hostname
  if (
    !isValidHost({
      hostname,
      accessToken,
      selfHostedSlug: appConfig.selfHostedSlug,
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

  const organizationConfig = getConfig({
    jsonConfig: organization.config ?? {},
    market: market.id.length === 1 ? `market:id:${market.id[0]}` : undefined,
    params: {
      lang: order.language_code,
      orderId: order.id,
      accessToken,
    },
  })

  const cartUrl =
    order.cart_url != null && order.cart_url !== ""
      ? updateAccessTokenInUrl({
          cartUrl: order.cart_url,
          accessToken,
        })
      : organizationConfig?.links?.cart

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
    cartUrl,
    isValid: true,
    organizationConfig,
  }
}
