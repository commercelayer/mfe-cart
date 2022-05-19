import { CommerceLayerClient } from "@commercelayer/sdk"

import { createAndPurchaseGiftCard } from "./createAndPurchaseGiftCard"
import { createLineItems } from "./createLineItems"
import { createSingleLineItem } from "./createSingleLineItem"
import { getClient } from "./getClient"
import { getSuperToken } from "./getSuperToken"
import { updateInventory } from "./updateInventory"

import { TestOrderOptions, SkuItem } from "#specs/types"

export const createOrder = async (
  cl: CommerceLayerClient,
  options: TestOrderOptions
) => {
  const { attributes, giftCard, orderType, lineItemsAttributes, couponCode } =
    options
  const order = await cl.orders.create(attributes)
  const superCl = await getClient(await getSuperToken())

  let giftCardCode

  switch (orderType) {
    case "empty":
      break

    case "plain":
      await createSingleLineItem(cl, order.id)
      break

    case "with-items": {
      const noStockSkuItems = (lineItemsAttributes || []).filter(
        ({ inventory }) => inventory && inventory >= 0
      ) as SkuItem[]

      if (noStockSkuItems.length > 0) {
        await updateInventory(superCl, noStockSkuItems, "quantity")
      }

      await createLineItems({
        cl,
        orderId: order.id,
        items: lineItemsAttributes || [],
      })

      if (noStockSkuItems.length > 0) {
        await updateInventory(superCl, noStockSkuItems, "quantity")
      }

      if (giftCard) {
        const card = await createAndPurchaseGiftCard(cl, giftCard)
        const activeCard = await superCl.gift_cards.update({
          id: card.id,
          _activate: true,
        })
        if (giftCard.apply) {
          await cl.orders.update({
            id: order.id,
            gift_card_code: activeCard.code,
          })
        } else {
          giftCardCode = activeCard.code
        }
      }
      if (couponCode) {
        await cl.orders.update({
          id: order.id,
          coupon_code: couponCode,
        })
      }

      break
    }
    case "bundle":
      await createLineItems({
        cl,
        orderId: order.id,
        items: [
          {
            bundle_code: "KIT001",
            quantity: 1,
          },
        ],
      })
      break
    case "bundle+skus":
      await createLineItems({
        cl,
        orderId: order.id,
        items: [
          {
            bundle_code: "KIT001",
            quantity: 1,
          },
          {
            sku_code: "TSHIRTMM000000FFFFF222",
            quantity: 2,
          },
        ],
      })
      break

    case "digital": {
      await createLineItems({
        cl,
        orderId: order.id,
        items: [
          {
            sku_code: "NFTEBOOK",
            quantity: 1,
          },
        ],
      })
      break
    }
    case "gift-card": {
      const createdCard = await createAndPurchaseGiftCard(superCl, giftCard)
      const lineItem = {
        quantity: 1,
        order: cl.orders.relationship(order),
        item: cl.gift_cards.relationship(createdCard),
      }
      await cl.line_items.create(lineItem)

      break
    }
  }

  return {
    orderId: order.id,
    attributes: {
      giftCard: giftCardCode,
      organization: {},
    },
  }
}
