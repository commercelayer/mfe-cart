import { parseExpression } from "cron-parser"

export function isValidCronExpression(
  // biome-ignore lint/suspicious/noExplicitAny: we receive any from react components
  cronExpression: any,
): cronExpression is string {
  try {
    parseExpression(cronExpression)
    return true
  } catch {
    return false
  }
}
