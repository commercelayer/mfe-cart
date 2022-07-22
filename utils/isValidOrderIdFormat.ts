export const isValidOrderIdFormat = (orderId: string): boolean =>
  /^[a-z]{10}$/i.test(orderId)
