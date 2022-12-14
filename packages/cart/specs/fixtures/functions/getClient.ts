import CommerceLayer from "@commercelayer/sdk"

export const getClient = async (token: string) => {
  return CommerceLayer({
    organization: process.env.E2E_ORGANIZATION || "",
    accessToken: token,
    domain: process.env.E2E_DOMAIN,
  })
}
