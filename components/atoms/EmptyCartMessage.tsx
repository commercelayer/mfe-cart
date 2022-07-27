import { useTranslation } from "next-i18next"
import { VFC } from "react"

export const EmptyCartMessage: VFC = () => {
  const { t } = useTranslation()

  return (
    <div className="pt-8 pb-20 text-lg text-gray-500 font-bold">
      {t("general.emptyCart")}
    </div>
  )
}
