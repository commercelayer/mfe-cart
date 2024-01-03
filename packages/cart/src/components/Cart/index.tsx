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
                <h1
                  data-test-id="page-title"
                  data-cart-id={settings.orderId}
                  className="text-black font-semibold text-xl md:text-3xl"
                >
                  {t("general.title")}
                </h1>

                <LineItemsCount>
                  {({ quantity }) =>
                    quantity ? (
                      <div className="text-sm text-gray-400 font-semibold">
                        <span data-test-id="items-count">{quantity}</span>{" "}
                        {t("general.item", { count: quantity })}
                      </div>
                    ) : (
                      <div />
                    )
                  }
                </LineItemsCount>
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
