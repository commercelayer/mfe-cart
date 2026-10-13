import { CommerceLayer } from "@commercelayer/sdk"

export const getClient = async (token: string) => {
  return CommerceLayer({
    accessToken: token,
    domain: process.env.E2E_DOMAIN,
    apiVersion: "2026-05",
  })
}
