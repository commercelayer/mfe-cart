import { CheckoutLink, LineItemsCount } from "@commercelayer/react-components"
import { useTranslation } from "next-i18next"
import { FC } from "react"

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
            />
          ) : (
            <button
              data-test-id="button-checkout"
              disabled
              aria-disabled="true"
              className={
                "button-base w-full bg-primary text-contrast block rounded-md py-3 px-3 opacity-60 cursor-default pointer-events-none touch-none"
              }
            >
              {t("general.gotToCheckoutCta")}
            </button>
          )
        }
      </LineItemsCount>
    </>
  )
}
