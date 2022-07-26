import { isValidOrderIdFormat } from "./isValidOrderIdFormat"

describe("Validate order id format", () => {
  test("should have length of ten", () => {
    expect(isValidOrderIdFormat("longerThen10")).toBe(false)
    expect(isValidOrderIdFormat("short")).toBe(false)
    expect(isValidOrderIdFormat("istenchars")).toBe(true)
  })

  test("Should accept only a-z letters", () => {
    expect(isValidOrderIdFormat("ABCDEFGHJK")).toBe(true)
    expect(isValidOrderIdFormat("ABCDEFG123")).toBe(false)
    expect(isValidOrderIdFormat("1234567890")).toBe(false)
    expect(isValidOrderIdFormat("ABCDEFGH&*")).toBe(false)
  })

  test("Should accept lowercase and uppercase chars", () => {
    expect(isValidOrderIdFormat("NZrQhGDenX")).toBe(true)
    expect(isValidOrderIdFormat("NDerhZjAlO")).toBe(true)
  })
})
