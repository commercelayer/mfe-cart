export const getAccessTokenFromUrl = () => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search)
    return params.get("accessToken")
  }
}
