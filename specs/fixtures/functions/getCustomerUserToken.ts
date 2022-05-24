import { getCustomerToken } from "@commercelayer/js-auth"

import { getClient } from "./getClient"
import { getSuperToken } from "./getSuperToken"

type GetUserTokenParams = {
  email: string
  password: string
}

export const getCustomerUserToken = async ({
  email,
  password,
}: GetUserTokenParams) => {
  const {
    E2E_SALES_CHANNEL_CLIENT_ID: clientId,
    E2E_ENDPOINT: endpoint,
    E2E_MARKET_ID: scope,
  } = process.env as Record<string, string>

  const token = await getSuperToken()
  const cl = await getClient(token)
  const existingUser = await cl.customers.list({
    filters: {
      email_eq: email,
    },
  })

  if (existingUser.length === 0) {
    await cl.customers.create({ email, password })
  }

  const authResponse = await getCustomerToken(
    {
      clientId,
      endpoint,
      scope,
    },
    {
      username: email,
      password,
    }
  )

  return authResponse?.accessToken || ""
}
