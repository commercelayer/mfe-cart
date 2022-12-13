import { getIntegrationToken } from "@commercelayer/js-auth"

export const getSuperToken = async () => {
  const {
    E2E_INTEGRATION_CLIENT_ID: clientId,
    E2E_INTEGRATION_CLIENT_SECRET: clientSecret,
    E2E_ENDPOINT: endpoint,
    E2E_MARKET_ID: scope,
  } = process.env as Record<string, string>

  const authResponse = await getIntegrationToken({
    clientId,
    clientSecret,
    endpoint,
    scope,
  })

  return authResponse?.accessToken || ""
}
