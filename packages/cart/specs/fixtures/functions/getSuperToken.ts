import authentication from "@commercelayer/js-auth"

export const getSuperToken = async () => {
  const {
    E2E_INTEGRATION_CLIENT_ID: clientId,
    E2E_INTEGRATION_CLIENT_SECRET: clientSecret,
    E2E_ORGANIZATION: slug,
    E2E_DOMAIN: domain,
    E2E_MARKET_ID: scope,
  } = process.env as Record<string, string>

  const authResponse = await authentication("client_credentials", {
    clientId,
    clientSecret,
    slug,
    domain,
    scope,
  })

  return authResponse?.accessToken || ""
}
