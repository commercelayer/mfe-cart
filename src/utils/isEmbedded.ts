/**
 * Checks if the app is loaded within an iframe tag or if `embed=true` is found in URL query string.
 * @returns a boolean flag that will be `true` in case app is embedded.
 */
export const isEmbedded = () => {
  if (typeof window === "undefined") {
    // in case of SSR we don't need this
    return false
  }

  // we can force the embedded version by adding `embed=true` in query string
  const hasUrlParam = new URLSearchParams(window.location.search).get("embed")
  if (hasUrlParam === "true") {
    return true
  }

  try {
    return window.self !== window.top
  } catch {
    // when this fails it means the browser blocked `window.top` for security reason
    // and we know that this content has been loaded inside an iframe
    return true
  }
}
