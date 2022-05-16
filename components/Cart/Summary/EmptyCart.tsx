import { useTranslation } from "next-i18next"
import { FC } from "react"

import { useSettings } from "#components/SettingsProvider"

export const EmptyCart: FC = () => {
  const { t } = useTranslation()
  const { settings } = useSettings()
  const isEmptyCart = settings.isValid && !settings.itemsCount

  return isEmptyCart ? (
    <div className="pt-8 pb-20 text-lg text-gray-500 font-bold">
      {t("general.emptyCart")}
    </div>
  ) : null
}
