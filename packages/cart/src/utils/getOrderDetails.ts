import type { CommerceLayerBundle } from "@commercelayer/sdk/bundle"
import { retryCall } from "./retryCall"

type GetOrderDetailsConfig = {
  /**
   * The signed Commerce Layer SDK client
   */
  client: CommerceLayerBundle
  /**
   * The id of the Order resource we want to fetch
   */
  orderId: string
}

/**
 * Retrieves the order details by its id with auto-retries in case of network or timeout errors.
 *
 * @param config - the `GetOrderDetailsConfig` object containing both sdk `client` and `orderId`
 * @returns an object containing the resolved `Order` and the status of async operation.
 */
export const getOrderDetails = async (config: GetOrderDetailsConfig) => {
  const { client, orderId } = config
  return retryCall(() => getAsyncOrder(client, orderId))
}

const getAsyncOrder = async (client: CommerceLayerBundle, orderId: string) => {
  return await client.orders.retrieve(orderId, {
    fields: {
      orders: [
        "id",
        "autorefresh",
        "status",
        "number",
        "guest",
        "language_code",
        "return_url",
        "cart_url",
        "line_items",
      ],
      line_items: ["item_type"],
    },
    include: ["line_items"],
  })
}
