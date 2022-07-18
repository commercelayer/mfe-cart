import { test as base } from "@playwright/test"

import { CartPage } from "./CartPage"
import { createOrder } from "./functions/createOrder"
import { getClient } from "./functions/getClient"
import { getCustomerUserToken } from "./functions/getCustomerUserToken"
import { getSalesChannelToken } from "./functions/getSalesChannelToken"

import { TestOrderOptions } from "#specs/types"

type FixtureType = {
  CartPage: CartPage
  options: TestOrderOptions
}

export const test = base.extend<FixtureType>({
  CartPage: async ({ page, options }, use) => {
    const token = await (options.customer
      ? getCustomerUserToken(options.customer)
      : getSalesChannelToken(options.market))

    const cl = await getClient(token)
    const { orderId } = await createOrder(cl, options)

    const cartPage = new CartPage(page)
    const accessToken = options.token || token

    await cartPage.goto({
      orderId: options.orderId || orderId,
      accessToken,
      embed: options.embed,
    })
    await use(cartPage)
  },
  options: {
    organization: {},
    attributes: {},
    orderType: "plain",
  },
})

export { expect } from "@playwright/test"
