import {
  CheckoutLink,
  LineItemsCount,
  PaymentMethod,
  PaymentMethodsContainer,
  PaymentSource,
  useOrderContainer,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { isEmbedded } from "#utils/isEmbedded"

export const ButtonCheckout: FC = () => {
  const { t } = useTranslation()
  const label = t("general.gotToCheckoutCta")
  const { order } = useOrderContainer()

  return (
    <>
      {!isEmbedded() ? (
        <div key={order?.total_amount_cents}>
          <PaymentMethodsContainer>
            <PaymentMethod expressPayments className="mb-4" loader={<div />}>
              <PaymentSource loader={<div />} />
            </PaymentMethod>
          </PaymentMethodsContainer>
        </div>
      ) : null}
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
              label={label}
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
