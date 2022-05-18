/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommerceLayerClient } from "@commercelayer/sdk"

import { LineItemObject } from "#specs/types"

export const createLineItems = async ({
  cl,
  orderId,
  items,
}: {
  cl: CommerceLayerClient
  orderId: string
  items: Array<LineItemObject>
}) => {
  const lineItems = items.map((item) => {
    delete item.sku_options
    delete item.inventory

    const lineItem = {
      ...item,
      order: cl.orders.relationship(orderId),
    }

    return cl.line_items.create(lineItem)
  })

  try {
    const lineItemsCreated = await Promise.all(lineItems)

    const skuOptions = await cl.sku_options.list()
    if (skuOptions && skuOptions.length === 0) return
    const lineItemsOptions = items.map((item, index) => {
      if (item.sku_options && item.sku_options.length) {
        return item.sku_options.map(({ name, value }) => {
          const matchedOption = skuOptions.find((so) => so.name === name)
          if (matchedOption) {
            return cl.line_item_options.create({
              line_item: cl.line_items.relationship(lineItemsCreated[index].id),
              quantity: 1,
              options: value as object,
              sku_option: cl.sku_options.relationship(matchedOption),
            })
          }
          return undefined
        })
      }
      return undefined
    })

    await Promise.all(
      lineItemsOptions.filter((item) => item !== undefined).flat(2)
    )
  } catch (e) {
    console.log(e)
  }
}
