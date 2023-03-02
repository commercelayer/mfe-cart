import {
  CommerceLayer,
  LineItemsContainer,
  LineItemsCount,
  OrderContainer,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { Totals } from "./Totals"

import { Summary } from "#components/Cart/Summary"
import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"
import { PageHeader } from "#components/PageHeader"
import { PageLayout } from "#components/PageLayout"
import { useSettings } from "#components/SettingsProvider"

const Cart: FC = () => {
  const { settings } = useSettings()
  const { t } = useTranslation()

  if (!settings || !settings.isValid) {
    return null
  }

  return (
    <CommerceLayer
      accessToken={settings.accessToken}
      endpoint={settings.endpoint}
    >
      <OrderContainer
        orderId={settings.orderId}
        attributes={{
          cart_url: settings.cartUrl || window.location.href,
        }}
        fetchOrder={() => {
          // send update event to parent iframe if iframe-resizer is enabled
          window.parentIFrame?.sendMessage({ type: "update" }, "*")
        }}
      >
        <EmbeddedCapabilities.OrderRefresher />
        <LineItemsContainer>
          <PageLayout
            top={
              <PageHeader>
                <div className="text-lg leading-6 text-gray-700">
                  Shopping Cart{" "}
                  <span>
                    {" "}
                    {
                      <LineItemsCount>
                        {({ quantity }) =>
                          quantity ? (
                            <span data-test-id="items-count">{quantity}</span>
                          ) : (
                            <div />
                          )
                        }
                      </LineItemsCount>
                    }
                  </span>
                </div>
              </PageHeader>
            }
            main={<Summary listTypes={["bundles", "skus", "gift_cards"]} />}
            aside={<Totals />}
          />
        </LineItemsContainer>
      </OrderContainer>
    </CommerceLayer>
  )
}

export default Cart
