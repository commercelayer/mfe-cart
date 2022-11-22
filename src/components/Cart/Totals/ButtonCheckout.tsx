import { CheckoutLink, LineItemsCount } from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { useSettings } from "#components/SettingsProvider"
import { isEmbedded } from "#utils/isEmbedded"
import { makeSubdomain } from "#utils/isValidHost"

export const ButtonCheckout: FC = () => {
  const { t } = useTranslation()
  const { settings } = useSettings()

  const accessToken = settings.isValid && settings.accessToken
  const orderId = settings.isValid && settings.orderId
  const slug = makeSubdomain(window.location.hostname)
  const isTestFlow = Boolean(
    window.location.hostname.includes(".tst.commercelayer.app") &&
      accessToken &&
      orderId &&
      slug
  )
  const checkoutUrlForTestFlow = isTestFlow
    ? `https://${slug}.commercelayer.app/checkout/${orderId}/?accessToken=${accessToken}`
    : undefined

  const hrefProp = checkoutUrlForTestFlow
    ? { href: checkoutUrlForTestFlow }
    : {}

  return (
    <>
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <CheckoutLink
              hostedCheckout={!isTestFlow}
              {...hrefProp}
              data-test-id="button-checkout"
              aria-disabled="false"
              className={
                "button-base bg-primary text-contrast block rounded-md py-3 px-3"
              }
              label={t("general.gotToCheckoutCta")}
              target={isEmbedded() ? "_top" : undefined}
            />
          ) : (
            <ButtonCheckoutDisabled />
          )
        }
      </LineItemsCount>
    </>
  )
}
