import { LineItemsCount } from "@commercelayer/react-components"
import { useTranslation } from "next-i18next"
import { FC } from "react"

export const EmptyCart: FC = () => {
  const { t } = useTranslation()

  return (
    <LineItemsCount>
      {({ quantity }) =>
        !quantity ? (
          <div className="pt-8 pb-20 text-lg text-gray-500 font-bold">
            {t("general.emptyCart")}
          </div>
        ) : null
      }
    </LineItemsCount>
  )
}
