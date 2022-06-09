import { CommerceLayerClient } from "@commercelayer/sdk"

import { retryCall } from "./retryCall"

export const getOrderDetails = async ({
  client,
  orderId,
}: {
  client: CommerceLayerClient
  orderId: string
}) => retryCall(() => getAsyncOrder(client, orderId))

const getAsyncOrder = async (client: CommerceLayerClient, orderId: string) => {
  return await client.orders.retrieve(orderId, {
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
}
