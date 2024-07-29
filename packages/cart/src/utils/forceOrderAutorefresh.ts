import type { CommerceLayerClient, Order } from "@commercelayer/sdk"

type ForceOrderAutorefreshConfig = {
  /**
   *  The signed Commerce Layer SDK client
   */
  client: CommerceLayerClient
  /**
   *  The fetched `Order` object
   */
  order: Order
}

/**
 * Updates the order by enabling `autorefresh`, if it was disabled.
 * @param config - `ForceOrderAutorefreshConfig` configuration object containing both sdk `client` and fetched `order`
 * @returns a Promise that resolves with updated `Order` object.
 */
export const forceOrderAutorefresh = async (
  config: ForceOrderAutorefreshConfig
) => {
  const { client, order } = config
  if (order.autorefresh) {
    return order
  }

  try {
    return await client.orders.update({
      id: order.id,
      _refresh: true,
      autorefresh: true,
    })
  } catch {
    console.log("error refreshing order. Autorefresh is ", order.autorefresh)
    return order
  }
}
