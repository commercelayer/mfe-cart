/**
 * Update the access token in the URL, if it exists as query parameter.
 */
export function updateAccessTokenInUrl({
  cartUrl,
  accessToken,
}: {
  cartUrl: string
  accessToken: string
}) {
  try {
    const url = new URL(cartUrl)
    if (url.searchParams.has("accessToken")) {
      url.searchParams.set("accessToken", accessToken)
    }
    return url.toString()
  } catch {
    return undefined
  }
}
