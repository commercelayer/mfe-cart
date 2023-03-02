import { CheckoutLink, LineItemsCount } from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { isEmbedded } from "#utils/isEmbedded"
import { useSettings } from "#components/SettingsProvider"
import { navigate } from "wouter/use-location"

export const ButtonCheckout: FC = () => {
  const { settings } = useSettings()
  const { t } = useTranslation()
  const label = t("general.gotToCheckoutCta")

  if (!settings || !settings.isValid) {
    return null
  }

  const onProceedCheckout = () => {
    window.open(
      `http://localhost:3001/${settings.orderId }?accessToken=${settings.accessToken}`
    );
  }

  return (
    <>
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (  <div
              className="button-checkout text-center text-white py-2 px-4 rounded"
              onClick={onProceedCheckout}
            >
              {"PROCEED TO CHECKOUT"}
            </div>
          ) : (
            <ButtonCheckoutDisabled />
          )
        }
      </LineItemsCount>
    </>
  )
}
