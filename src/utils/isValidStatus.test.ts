import { isValidStatus } from "./isValidStatus"

describe("Check for a valid order status", () => {
  test("Cart is for draft orders", () => {
    expect(isValidStatus("draft")).toBe(true)
  })

  test("Cart is for pending orders", () => {
    expect(isValidStatus("pending")).toBe(true)
  })

  test("Cart is not for different order statuses", () => {
    expect(isValidStatus("approved")).toBe(false)
    expect(isValidStatus("placed")).toBe(false)
    expect(isValidStatus("cancelled")).toBe(false)
  })

  test("Cart is not for falsy order status", () => {
    expect(isValidStatus("")).toBe(false)
    expect(isValidStatus(undefined)).toBe(false)
  })
})
