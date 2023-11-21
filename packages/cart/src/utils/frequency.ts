import { parseExpression } from "cron-parser"

export function isValidCronExpression(
  cronExpression: any
): cronExpression is string {
  try {
    parseExpression(cronExpression)
    return true
  } catch (e) {
    return false
  }
}
