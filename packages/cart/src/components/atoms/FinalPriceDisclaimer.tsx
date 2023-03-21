import { FC } from "react"
import { useTranslation } from "react-i18next"

export const FinalPriceDisclaimer: FC = () => {
  const { t } = useTranslation()

  return (
    <p className="py-7 text-xs font-semibold text-gray-500">
      {t("general.finalPriceInCheckoutText")}
    </p>
  )
}
