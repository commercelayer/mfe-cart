import authentication from "@commercelayer/js-auth"

export const getSalesChannelToken = async (marketId?: string) => {
  const {
    E2E_SALES_CHANNEL_CLIENT_ID: clientId,
    E2E_ORGANIZATION: slug,
    E2E_DOMAIN: domain,
    E2E_MARKET_ID: scope,
  } = process.env as Record<string, string>

  const authResponse = await authentication("client_credentials", {
    clientId,
    slug,
    domain,
    scope: marketId || scope,
  })

  return authResponse?.accessToken || ""
}
