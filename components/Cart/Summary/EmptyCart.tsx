import { LineItemsEmpty } from "@commercelayer/react-components"
import { useTranslation } from "next-i18next"
import { FC } from "react"

import { LineItemsSkeleton } from "#components/Skeleton/LineItems"

export const EmptyCart: FC = () => {
  const { t } = useTranslation()

  return (
    <LineItemsEmpty>
      {({ quantity }) => {
        if (quantity === 0) {
          return <LineItemsSkeleton />
        }

        if (quantity === 0) {
          return (
            <div className="pt-8 pb-20 text-lg text-gray-500 font-bold">
              {t("general.emptyCart")}
            </div>
          )
        }

        return null
      }}
    </LineItemsEmpty>
  )
}
