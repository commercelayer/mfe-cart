import { CommerceLayer } from "@commercelayer/sdk"
import { ENV } from "varlock/env"

export const getClient = async (token: string) => {
  return CommerceLayer({
    accessToken: token,
    domain: ENV.E2E_DOMAIN,
    apiVersion: "2026-05",
  })
}
