import {
  CommerceLayer,
  LineItemsContainer,
  LineItemsCount,
  OrderContainer,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { Totals } from "./Totals"

import { CartTitle } from "#components/atoms/CartTitle"
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
        fetchOrder={(order) => {
          // send update event to parent iframe if iframe-resizer is enabled
          window.parentIFrame?.sendMessage(
            { type: "update", payload: order },
            "*"
          )
        }}
      >
        <EmbeddedCapabilities.OrderRefresher />
        <LineItemsContainer>
          <PageLayout
            top={
              <PageHeader>
                <div className="hidden md:block">
                  <h1
                    data-cart-id={settings.orderId}
                    className="text-black font-semibold text-xl"
                  >
                    {t("general.itemsTitle")}
                  </h1>

                  <LineItemsCount>
                    {({ quantity }) =>
                      quantity ? (
                        <div className="text-gray-400">
                          {t("general.cartContains")}{" "}
                          <span data-test-id="items-count">{quantity}</span>{" "}
                          {t("general.item", { count: quantity })}
                        </div>
                      ) : (
                        <div />
                      )
                    }
                  </LineItemsCount>
                </div>
                <CartTitle className="md:hidden" />
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
