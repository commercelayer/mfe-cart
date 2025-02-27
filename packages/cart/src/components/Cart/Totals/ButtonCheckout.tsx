import {
  CheckoutLink,
  Errors,
  LineItemsCount,
  PaymentMethod,
  PaymentMethodsContainer,
  PaymentSource,
  useOrderContainer,
} from "@commercelayer/react-components"
import type { FC } from "react"
import { useTranslation } from "react-i18next"
import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { isEmbedded } from "#utils/isEmbedded"

export const ButtonCheckout: FC = () => {
  const { t } = useTranslation()
  const label = t("general.gotToCheckoutCta")
  const { order } = useOrderContainer()

  return (
    <>
      <div key={order?.total_amount_cents}>
        <PaymentMethodsContainer>
          <PaymentMethod
            expressPayments
            className="mb-4"
            loader={<div />}
            hide={({ payment_source_type }) => {
              // only show stripe payments
              return payment_source_type === "stripe_payments"
            }}
          >
            <PaymentSource loader={<div />} />
          </PaymentMethod>
        </PaymentMethodsContainer>
      </div>

      <Errors
        resource="line_items"
        className="block text-xs text-red-400 mb-4"
        messages={[
          {
            code: "VALIDATION_ERROR",
            resource: "line_items",
            field: "quantity",
            message: t("general.quantityNotAvailable"),
          },
        ]}
      />

      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <CheckoutLink
              hostedCheckout
              data-test-id="button-checkout"
              aria-disabled="false"
              className={
                "button-base bg-primary text-contrast block rounded-md py-3 px-3 !text-xs md:!text-base"
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
