/**
 * Checks if the order id matches Commerce Layer format.
 * This only validates the string format, not the order existance.
 *
 * @param orderId - Commerce Layer order id
 * @returns `true` if order id format is valid
 */
export const isValidOrderIdFormat = (orderId: string): boolean =>
  /^[a-z]{10}$/i.test(orderId)
