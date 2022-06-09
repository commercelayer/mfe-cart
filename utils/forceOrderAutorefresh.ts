import { CommerceLayerClient, Order } from "@commercelayer/sdk"

export const forceOrderAutorefresh = async ({
  client,
  order,
}: {
  client: CommerceLayerClient
  order: Order
}) => {
  if (order.autorefresh) {
    return
  }

  try {
    return await client.orders.update({
      id: order.id,
      _refresh: true,
      autorefresh: true,
    })
  } catch {
    console.log("error refreshing order. Autorefresh is ", order.autorefresh)
  }
}
