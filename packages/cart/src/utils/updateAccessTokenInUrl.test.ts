import { updateAccessTokenInUrl } from "./updateAccessTokenInUrl"

describe("updateAccessTokenInUrl", () => {
  it("should update the access token in the URL", () => {
    const result = updateAccessTokenInUrl({
      cartUrl: "https://example.com/cart?accessToken=oldAccessToken",
      accessToken: "newAccessToken",
    })
    expect(result).toBe("https://example.com/cart?accessToken=newAccessToken")
  })

  it("should keep existing query parameters", () => {
    const result = updateAccessTokenInUrl({
      cartUrl:
        "https://example.com/cart?foo=bar&accessToken=oldAccessToken&user=123",
      accessToken: "newAccessToken",
    })

    expect(result).toBe(
      "https://example.com/cart?foo=bar&accessToken=newAccessToken&user=123"
    )
  })

  it("should return same url, if accessToken does not exists", () => {
    const result = updateAccessTokenInUrl({
      cartUrl: "https://example.com/cart?foo=bar",
      accessToken: "newAccessToken",
    })

    expect(result).toBe("https://example.com/cart?foo=bar")
  })

  it("should return undefined if cartUrl is not valid or empty", () => {
    expect(
      updateAccessTokenInUrl({
        cartUrl: "http//broken-url?accessToken=123",
        accessToken: "",
      })
    ).toBe(undefined)

    expect(
      updateAccessTokenInUrl({
        cartUrl: "",
        accessToken: "abc",
      })
    ).toBe(undefined)
  })
})
