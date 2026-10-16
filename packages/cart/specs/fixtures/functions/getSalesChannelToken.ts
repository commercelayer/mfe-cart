import { authenticate } from "@commercelayer/js-auth"
import { ENV } from "varlock/env"

export const getSalesChannelToken = async (marketId?: string) => {
  const {
    E2E_SALES_CHANNEL_CLIENT_ID: clientId,
    E2E_DOMAIN: domain,
    E2E_MARKET_ID: scope,
  } = ENV

  const authResponse = await authenticate("client_credentials", {
    clientId,
    domain,
    scope: marketId || scope,
  })

  return authResponse?.accessToken || ""
}
