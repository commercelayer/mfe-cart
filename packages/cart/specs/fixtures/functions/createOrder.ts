import type { CommerceLayerClient } from "@commercelayer/sdk"

import { createAndPurchaseGiftCard } from "./createAndPurchaseGiftCard"
import { createLineItems } from "./createLineItems"
import { createSingleLineItem } from "./createSingleLineItem"
import { getClient } from "./getClient"
import { getSuperToken } from "./getSuperToken"

import { TestOrderOptions } from "#specs/types"

export const createOrder = async (
  cl: CommerceLayerClient,
  options: TestOrderOptions
) => {
  const {
    attributes,
    giftCard,
    orderType,
    lineItemsAttributes,
    couponCode,
    orderId,
  } = options

  if (orderId) {
    if (attributes)
      cl.orders.update({
        id: orderId,
        ...attributes,
      })
    return {
      orderId,
    }
  }

  const order = await cl.orders.create(attributes || {})
  const superCl = await getClient(await getSuperToken())

  switch (orderType) {
    case "empty":
      break

    case "plain":
      await createSingleLineItem(cl, order.id)
      break

    case "with-items":
      await createLineItems({
        cl,
        orderId: order.id,
        items: lineItemsAttributes || [],
      })

      if (giftCard) {
        const card = await createAndPurchaseGiftCard(cl, giftCard)
        if (giftCard.apply) {
          const activeCard = await superCl.gift_cards.update({
            id: card.id,
            _activate: true,
          })
          await cl.orders.update({
            id: order.id,
            gift_card_code: activeCard.code,
          })
        } else {
          await cl.line_items.create({
            quantity: 1,
            order: cl.orders.relationship(order),
            item: cl.gift_cards.relationship(card),
          })
        }
      }

      if (couponCode) {
        await cl.orders.update({
          id: order.id,
          coupon_code: couponCode,
        })
      }
      break

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
      await cl.line_items.create({
        quantity: 1,
        order: cl.orders.relationship(order),
        item: cl.gift_cards.relationship(createdCard),
      })
      break
    }
  }

  return {
    orderId: order.id,
    // attributes: {},
  }
}
