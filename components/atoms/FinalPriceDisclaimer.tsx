import { useTranslation } from "next-i18next"
import { VFC } from "react"

export const FinalPriceDisclaimer: VFC = () => {
  const { t } = useTranslation()

  return (
    <p className="py-7 text-xs font-semibold text-gray-500">
      {t("general.finalPriceInCheckoutText")}
    </p>
  )
}
