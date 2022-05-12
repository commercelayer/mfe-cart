import {
  OrderContainer,
  LineItemsContainer,
  LineItemsCount,
  LineItem,
  LineItemImage,
  LineItemName,
  LineItemQuantity,
  LineItemAmount,
  LineItemRemoveLink,
  Errors,
  CommerceLayer,
} from "@commercelayer/react-components"
import { GlobalStylesProvider } from "@commercelayer/react-utils"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import { Head } from "#components/Head"
import { SettingsProvider } from "#components/SettingsProvider"

const Cart: NextPage = () => {
  const { query } = useRouter()
  const orderId = query.orderId as string | undefined

  if (!orderId) {
    return null
  }

  return (
    <SettingsProvider orderId={orderId}>
      {({ settings }) =>
        !settings ? (
          <div>Loading</div>
        ) : (
          <GlobalStylesProvider primaryColor={settings.primaryColor}>
            <Head faviconUrl={settings.favicon} />

            <CommerceLayer
              accessToken={settings.accessToken}
              endpoint={settings.endpoint}
            >
              <OrderContainer
                orderId={orderId}
                attributes={{ return_url: "https://url.com" }}
              >
                <LineItemsContainer>
                  <div className="bg-primary">
                    <p>
                      Your shopping cart contains <LineItemsCount />
                      items
                    </p>
                    <LineItem>
                      <LineItemImage width={50} />
                      <LineItemName />
                      <LineItemQuantity max={10} />
                      <Errors resource="line_items" field="quantity" />
                      <LineItemAmount />
                      <LineItemRemoveLink />
                    </LineItem>
                  </div>
                </LineItemsContainer>
              </OrderContainer>
            </CommerceLayer>
          </GlobalStylesProvider>
        )
      }
    </SettingsProvider>
  )
}

export default Cart
