import {
  CommerceLayer,
  LineItemsContainer,
  LineItemsCount,
  OrderContainer,
} from "@commercelayer/react-components"
import type { FC } from "react"
import { useTranslation } from "react-i18next"
import { Summary } from "#components/Cart/Summary"
import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"
import { PageHeader } from "#components/PageHeader"
import { PageLayout } from "#components/PageLayout"
import { useSettings } from "#components/SettingsProvider"
import { Totals } from "./Totals"

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
            "*",
          )
        }}
      >
        <EmbeddedCapabilities.OrderRefresher />
        <LineItemsContainer>
          <PageLayout
            top={
              <PageHeader>
                <div className="hidden md:block mb-12">
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
              </PageHeader>
            }
            main={<Summary listTypes={["bundles", "skus", "gift_cards"]} />}
            aside={<Totals hidePromoCode={settings.hidePromoCode} />}
          />
        </LineItemsContainer>
      </OrderContainer>
    </CommerceLayer>
  )
}

export default Cart
