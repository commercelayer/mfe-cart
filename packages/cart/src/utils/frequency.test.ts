import { isValidCronExpression } from "#utils/frequency"

describe("isValidCronExpression", () => {
  test("Should return true for valid cron expressions", () => {
    expect(isValidCronExpression("0 0 1 * *")).toBe(true)
    expect(isValidCronExpression("0 3  * 3 *")).toBe(true)
  })

  test("Should return false for invalid cron expressions", () => {
    expect(isValidCronExpression("0 0 A")).toBe(false)
    expect(isValidCronExpression("* 1 3 0 * * 2")).toBe(false)
  })
})
