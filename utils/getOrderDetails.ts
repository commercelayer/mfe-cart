import { CommerceLayerClient, Order } from "@commercelayer/sdk"

import { retryCall } from "./retryCall"

export const getOrderDetails = async ({
  client,
  orderId,
}: {
  client: CommerceLayerClient
  orderId: string
}) => {
  const apiResponse = await retryCall<Order>(
    client.orders.retrieve(orderId, {
      fields: {
        orders: [
          "id",
          "autorefresh",
          "status",
          "number",
          "guest",
          "language_code",
          "terms_url",
          "privacy_url",
          "return_url",
          "line_items",
        ],
        line_items: ["item_type"],
      },
      include: ["line_items"],
    })
  )

  return (apiResponse?.success && apiResponse.object) || null
}
