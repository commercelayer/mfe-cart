import { CheckoutLink, LineItemsCount } from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { isEmbedded } from "#utils/isEmbedded"

export const ButtonCheckout: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <CheckoutLink
              hostedCheckout
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
