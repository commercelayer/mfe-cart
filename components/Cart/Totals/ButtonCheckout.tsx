import { CheckoutLink } from "@commercelayer/react-components"
import cn from "classnames"
import { useTranslation } from "next-i18next"
import { FC } from "react"

import { useSettings } from "#components/SettingsProvider"

export const ButtonCheckout: FC = () => {
  const { t } = useTranslation()
  const { settings } = useSettings()
  const canProceed = settings.isValid && settings.itemsCount > 0

  return (
    <CheckoutLink hostedCheckout>
      {({ href }) => (
        <a
          data-test-id="button-checkout"
          aria-disabled={`${!canProceed}`}
          href={canProceed ? href : "#"}
          className={cn(
            "button-base bg-primary text-contrast block rounded-md py-3 px-3",
            {
              "opacity-60 cursor-default pointer-events-none touch-none":
                !canProceed,
            }
          )}
        >
          {t("general.gotToCheckoutCta")}
        </a>
      )}
    </CheckoutLink>
  )
}
