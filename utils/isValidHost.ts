import { getInfoFromJwt } from "./getInfoFromJwt"

export const makeSubdomain = (hostname: string) => {
  return hostname?.split(":")[0].split(".")[0]
}

const isProduction = (forceProductionEnv?: boolean) =>
  forceProductionEnv ? true : process.env.NODE_ENV === "production"

const isCommerceLayerHosted = () => Boolean(process.env.NEXT_PUBLIC_HOSTED)

export const isValidHost = (
  hostname: string,
  accessToken: string,
  forceProductionEnv?: boolean
) => {
  const { slug, kind } = getInfoFromJwt(accessToken)

  const isInvalidChannel = kind !== "sales_channel"
  if (isInvalidChannel) {
    return false
  }

  // when app is not hosted by CL we can't rely on subdomain to match organization slug
  // so we require to fill `NEXT_PUBLIC_SLUG` env
  const subdomain = isCommerceLayerHosted()
    ? makeSubdomain(hostname)
    : process.env.NEXT_PUBLIC_SLUG

  const isInvalidSubdomain = subdomain !== slug
  if (isProduction(forceProductionEnv) && isInvalidSubdomain) {
    return false
  }

  return true
}
