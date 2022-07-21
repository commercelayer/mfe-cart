import {
  CommerceLayer,
  LineItemsContainer,
  LineItemsCount,
  OrderContainer,
} from "@commercelayer/react-components"
import { useTranslation } from "next-i18next"
import { FC } from "react"

import { Totals } from "./Totals"

import { Summary } from "#components/Cart/Summary"
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
    <PageLayout>
      <CommerceLayer
        accessToken={settings.accessToken}
        endpoint={settings.endpoint}
      >
        <OrderContainer
          orderId={settings.orderId}
          attributes={{
            cart_url: settings.cartUrl || window.location.href,
          }}
        >
          <LineItemsContainer>
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
                    <div className="text-sm text-gray-500 font-semibold">
                      <span data-test-id="items-count">{quantity}</span>{" "}
                      {t("general.item", { count: quantity })}
                    </div>
                  ) : null
                }
              </LineItemsCount>
            </PageHeader>

            <div className="flex flex-col md:flex-row md:gap-8 xl:gap-36 pt-8 items-start">
              <Summary
                className="w-full md:w-7/12"
                listTypes={["bundles", "skus", "gift_cards"]}
              />
              <Totals className="w-full md:w-5/12" />
            </div>
          </LineItemsContainer>
        </OrderContainer>
      </CommerceLayer>
    </PageLayout>
  )
}

export default Cart
