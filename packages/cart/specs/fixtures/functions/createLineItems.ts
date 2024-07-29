/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CommerceLayerClient } from "@commercelayer/sdk"

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
    const { sku_options, inventory, ...cleanItem } = item

    return cl.line_items.create({
      ...cleanItem,
      order: cl.orders.relationship(orderId),
    })
  })

  try {
    const lineItemsCreated = await Promise.all(lineItems)
    const allAvailableSkuOptions = await cl.sku_options.list()

    if (!allAvailableSkuOptions || allAvailableSkuOptions.length === 0) {
      return
    }

    const lineItemsOptions = items.map(({ sku_options }, index) => {
      if (!sku_options || !sku_options.length) {
        return undefined
      }

      return sku_options.map(({ name, value }) => {
        const matchedOption = allAvailableSkuOptions.find(
          (so) => so.name === name
        )
        return matchedOption
          ? cl.line_item_options.create({
              line_item: cl.line_items.relationship(lineItemsCreated[index].id),
              quantity: 1,
              options: value as object,
              sku_option: cl.sku_options.relationship(matchedOption),
            })
          : undefined
      })
    })

    await Promise.all(
      lineItemsOptions.filter((item) => item !== undefined).flat(2)
    )
  } catch (e) {
    console.log(e)
  }
}
