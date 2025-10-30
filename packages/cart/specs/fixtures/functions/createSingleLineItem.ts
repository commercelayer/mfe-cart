import type { CommerceLayerBundle } from "@commercelayer/sdk/bundle"

export const createSingleLineItem = async (
  cl: CommerceLayerBundle,
  orderId: string,
) => {
  const skus = await cl.skus.list()

  const lineItem = {
    sku_code: skus.first()?.code,
    quantity: 1,
    order: cl.orders.relationship(orderId),
  }

  await cl.line_items.create(lineItem)
}
