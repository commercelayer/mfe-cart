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

  const onProceedCheckout = async () => {
    if (settings.orderId) {
      let paymentToken = await getPaymentToken(settings.orderId)
      window.open(
        `https://ezcontacts-stage-checkout.netlify.app/${settings.orderId}?accessToken=${settings.accessToken}&paymentToken=${paymentToken}`,
        "_self"
      )
    }
  }

  const getPaymentToken = (orderId: any) => {
    if (orderId) {
      const requestBody = {
        data: {
          order: {
            id: orderId,
          },
          customer: {
            email: "ezdev.mahesh@gmail.com",
          },
        },
      }
      return fetch(
        `https://odoo.ezcontacts.com/cl/order/payment/v1/payment-token`,
        {
          headers: {
            Accept: "application/json",
          },
          method: "POST",
          body: JSON.stringify(requestBody),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          const res = result?.data?.payment_source_token
          return res
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
  }

  return (
    <>
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <div
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
