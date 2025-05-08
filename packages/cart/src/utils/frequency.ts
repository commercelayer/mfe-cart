import CronExpressionParser from "cron-parser"

export function isValidCronExpression(
  // biome-ignore lint/suspicious/noExplicitAny: we receive any from react components
  cronExpression: any,
): cronExpression is string {
  try {
    CronExpressionParser.parse(cronExpression)
    return true
  } catch {
    return false
  }
}
