import { useTranslation } from "react-i18next"

export const ButtonCheckoutDisabled = () => {
  const { t } = useTranslation()

  return (
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
