import { getSalesChannelToken as clGetSalesChannelToken } from "@commercelayer/js-auth"

export const getSalesChannelToken = async (marketId?: string) => {
  const {
    E2E_SALES_CHANNEL_CLIENT_ID: clientId,
    E2E_ENDPOINT: endpoint,
    E2E_MARKET_ID: scope,
  } = process.env as Record<string, string>

  const authResponse = await clGetSalesChannelToken({
    clientId,
    endpoint,
    scope: marketId || scope,
  })

  return authResponse?.accessToken || ""
}
