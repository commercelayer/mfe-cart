import type { CommerceLayerClient } from "@commercelayer/sdk"

import { SkuItem } from "#specs/types"

export const updateInventory = async (
  cl: CommerceLayerClient,
  lineItems: SkuItem[],
  quantity: "quantity" | "inventory"
) => {
  const skus = await cl.skus.list({
    include: ["stock_items"],
    filters: {
      code_in: lineItems.map((line) => line.sku_code).join(","),
    },
  })
  const promises = skus.map((sku) => {
    if (sku && sku.stock_items) {
      const lineItem = lineItems.find((li) => li.sku_code === sku.code)
      if (lineItem) {
        return cl.stock_items.update({
          id: sku.stock_items[0].id,
          quantity: lineItem[quantity],
        })
      }
    }
    return undefined
  })
  await Promise.all(promises)
}
