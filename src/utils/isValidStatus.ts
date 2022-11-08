const validStatuses = ["pending", "draft"]

/**
 * Checks if the order status is valid to show the cart page.
 *
 * @param orderStatus - The status returned from the `Order` resource object
 * @returns `true` if order status is valid for cart.
 */
export const isValidStatus = (orderStatus?: string) =>
  validStatuses.includes(orderStatus || "")
