import type { CommerceLayerClient } from "@commercelayer/sdk"

import { GiftCardOptions } from "#specs/types"

export const createAndPurchaseGiftCard = async (
  cl: CommerceLayerClient,
  options?: GiftCardOptions
) => {
  const card = await cl.gift_cards.create({
    currency_code: options?.currency_code ? options.currency_code : "USD",
    balance_cents: options?.balance_cents ? options.balance_cents : 10000,
    recipient_email: options?.customer_email
      ? options.customer_email
      : "customer@tk.com",
  })

  const activeCard = await cl.gift_cards.update({
    id: card.id,
    _purchase: true,
  })
  return activeCard
}
