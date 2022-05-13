import {
  CommerceLayer,
  LineItemsContainer,
  LineItemsCount,
  OrderContainer,
} from "@commercelayer/react-components"
import { FC } from "react"

import { Totals } from "./Totals"

import { Summary } from "#components/Cart/Summary"
import { PageHeader } from "#components/PageHeader"
import { PageLayout } from "#components/PageLayout"
import { useSettings } from "#components/SettingsProvider"

const Cart: FC = () => {
  const { settings } = useSettings()

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
          attributes={{ return_url: settings.returnUrl }}
        >
          <LineItemsContainer>
            <PageHeader>
              <h1 className="text-black font-semibold text-xl md:text-3xl">
                Cart
              </h1>
              <div className="text-sm text-gray-500 font-semibold">
                <LineItemsCount /> items
              </div>
            </PageHeader>

            <div className="flex gap-8 pt-8 items-start">
              <Summary className="w-7/12" />
              <Totals className="w-5/12" />
            </div>
          </LineItemsContainer>
        </OrderContainer>
      </CommerceLayer>
    </PageLayout>
  )
}

export default Cart
