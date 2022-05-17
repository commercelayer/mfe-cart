import { getInfoFromJwt } from "./getInfoFromJwt"

export const makeSubdomain = (hostname: string) => {
  return hostname?.split(":")[0].split(".")[0]
}

const isProduction = (forceProductionEnv?: boolean) =>
  forceProductionEnv ? true : process.env.NODE_ENV === "production"

const isHosted = () => !!process.env.NEXT_PUBLIC_HOSTED

export const isValidHost = (
  hostname: string,
  accessToken: string,
  forceProductionEnv?: boolean
) => {
  const subdomain = makeSubdomain(hostname)
  const { slug, kind } = getInfoFromJwt(accessToken)

  const isInvalidChannel = kind !== "sales_channel"
  const isInvalidSubdomain = subdomain !== slug || isInvalidChannel
  if (
    (isProduction(forceProductionEnv) && isHosted() && isInvalidSubdomain) ||
    isInvalidChannel
  ) {
    return false
  }

  return true
}
