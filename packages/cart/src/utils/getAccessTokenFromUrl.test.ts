import { getAccessTokenFromUrl } from "./getAccessTokenFromUrl"

describe("Read JWT from URL", () => {
  const { location } = window
  beforeAll(function clearLocation() {
    // biome-ignore lint/suspicious/noExplicitAny: wee need it for testing
    delete (window as any).location
    ;(window as typeof globalThis).location = {
      ...location,
      href: "http://domain.com",
      search: "",
    }
  })
  afterAll(function resetLocation() {
    window.location = location as string & Location
  })

  test("accessToken is in URL query string", () => {
    window.location.search = "?accessToken=eyJhbGciOiJIUzUxMiJ9"
    expect(getAccessTokenFromUrl()).toBe("eyJhbGciOiJIUzUxMiJ9")
  })

  test("accessToken is not part of URL query string", () => {
    window.location.search = "?someOtherParam=foobar"
    expect(getAccessTokenFromUrl()).toBe(undefined)
  })

  test("Query string is empty", () => {
    window.location.search = ""
    expect(getAccessTokenFromUrl()).toBe(undefined)
  })
})
