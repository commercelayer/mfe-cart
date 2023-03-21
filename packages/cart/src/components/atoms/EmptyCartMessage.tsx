import { FC } from "react"
import { useTranslation } from "react-i18next"

export const EmptyCartMessage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="pt-8 pb-20 text-lg text-gray-500 font-bold">
      {t("general.emptyCart")}
    </div>
  )
}
