import CommerceLayer from "@commercelayer/sdk"
import { Settings } from "HostedApp"

import { getInfoFromJwt } from "./getInfoFromJwt"
import { getOrderDetails } from "./getOrderDetails"
import { getOrganizationsDetails } from "./getOrganizationDetails"

export const getSettings = async ({
  accessToken,
  orderId,
}: {
  accessToken: string
  orderId: string
}): Promise<Settings | null> => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "commercelayer.io"
  const { slug, isTest } = getInfoFromJwt(accessToken)
  if (!slug) {
    return null
  }

  const cl = CommerceLayer({
    organization: slug,
    accessToken,
    domain,
  })

  const order = await getOrderDetails({ orderId, client: cl })
  const organization = await getOrganizationsDetails({
    client: cl,
  })
  if (!order || !organization) {
    return null
  }

  return {
    accessToken,
    endpoint: `https://${slug}.${domain}`,
    domain,
    orderNumber: order.number || 0,
    orderId: order.id,
    logoUrl: organization.logo_url || "/favicon.png",
    companyName: organization.name || "Test company",
    language: order.language_code || "en",
    primaryColor: organization.primary_color || "",
    favicon: organization.favicon_url || "/favicon.png",
    gtmId: isTest ? organization.gtm_id_test : organization.gtm_id,
    supportEmail: organization.support_email,
    supportPhone: organization.support_phone,
    termsUrl: order.terms_url,
    privacyUrl: order.privacy_url,
  }
}
