import type { InvalidSettings, Settings } from "HostedApp"
import { getMfeConfig } from "@commercelayer/organization-config"
import CommerceLayer, { type Organization } from "@commercelayer/sdk"
import { isValidOrderIdFormat } from "#utils/isValidOrderIdFormat"
import { updateAccessTokenInUrl } from "#utils/updateAccessTokenInUrl"
import { forceOrderAutorefresh } from "./forceOrderAutorefresh"
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
  language: getBrowserLanguage(),
  faviconUrl:
    "https://data.commercelayer.app/assets/images/favicons/favicon-32x32.png",
  companyName: "Commerce Layer",
  retryable: false,
}

const makeInvalidSettings = ({
  retryable,
  organization,
  redirectTo,
  marketId,
}: {
  retryable?: boolean
  organization?: Organization
  redirectTo?: string
  marketId?: string
}): InvalidSettings => {
  const organizationConfig =
    organization != null
      ? getMfeConfig({
          jsonConfig: organization.config ?? {},
          market: marketId != null ? `market:id:${marketId}` : undefined,
        })
      : null
  return {
    ...defaultSettings,
    retryable: !!retryable,
    logoUrl: organization?.logo_url ?? undefined,
    companyName: organization?.name || defaultSettings.companyName,
    primaryColor: organization?.primary_color || defaultSettings.primaryColor,
    faviconUrl: organization?.favicon_url || defaultSettings.faviconUrl,
    language: getDefaultLanguage(organizationConfig),
    redirectTo,
  }
}

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
  const marketId = market?.id.length === 1 ? market.id[0] : undefined

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
    return makeInvalidSettings({ organization, marketId })
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
      marketId,
    })
  }

  const order = orderResponse?.object

  // validating order
  if (!order) {
    return makeInvalidSettings({
      retryable: !orderResponse?.bailed,
      organization,
      marketId,
    })
  }

  if (!isValidStatus(order.status)) {
    // invalid status means is a checkout page or thankyou page
    return makeInvalidSettings({
      organization,
      redirectTo: `${window.location.origin}/checkout/${orderId}?accessToken=${accessToken}`,
    })
  }

  const orderLanguage = order?.language_code?.split("-")[0]

  const organizationConfig = getMfeConfig({
    jsonConfig: organization.config ?? {},
    market: marketId != null ? `market:id:${marketId}` : undefined,
    params: {
      lang: orderLanguage,
      orderId: order?.id,
      accessToken,
    },
  })

  await forceOrderAutorefresh({ client, order })

  const cartUrl =
    order.cart_url != null && order.cart_url !== ""
      ? updateAccessTokenInUrl({
          cartUrl: order.cart_url,
          accessToken,
        })
      : organizationConfig?.links?.cart

  // order is: order language > organization config language > default browser language
  const language = orderLanguage ?? getDefaultLanguage(organizationConfig)

  return {
    accessToken,
    endpoint: `https://${slug}.${domain}`,
    orderId: order.id,
    itemsCount: (order.line_items || []).length,
    logoUrl: organization.logo_url ?? undefined,
    companyName: organization.name || defaultSettings.companyName,
    language,
    primaryColor: organization.primary_color || defaultSettings.primaryColor,
    faviconUrl: organization.favicon_url || defaultSettings.faviconUrl,
    gtmId:
      (isTest ? organization.gtm_id_test : organization.gtm_id) ?? undefined,
    returnUrl: order.return_url ?? undefined,
    cartUrl,
    isValid: true,
    hideItemCodes: organizationConfig?.cart?.hide_item_codes ?? false,
  }
}

/**
 * Retrieves the default language from the organization configuration.
 * If the organization configuration does not have a language set, it will fallback to the browser language.
 * If the browser language is not available, it will fallback to English.
 */
function getDefaultLanguage(
  organizationConfig: ReturnType<typeof getMfeConfig>,
) {
  if (
    organizationConfig?.language != null &&
    organizationConfig.language.trim() !== ""
  ) {
    return organizationConfig.language.split("-")[0]
  }

  return getBrowserLanguage()
}

/**
 * Retrieves the browser language code or fallback to English
 */
function getBrowserLanguage() {
  return typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
    ? window.navigator.language?.split("-")[0]
    : "en"
}
