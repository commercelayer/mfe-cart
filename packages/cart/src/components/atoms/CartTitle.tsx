import { LineItemsCount } from "@commercelayer/react-components"
import cn from "classnames"
import type { FC } from "react"
import { useTranslation } from "react-i18next"

import { isEmbedded } from "#utils/isEmbedded"

export const CartTitle: FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        "border-b flex justify-between items-center flex-row py-4 md:pt-0 md:mb-12 md:pb-2",
        className,
        {
          "border-t md:border-t-0": !isEmbedded(),
        },
      )}
    >
      <h2
        className="text-black font-semibold text-xl md:text-3xl"
        data-test-id="page-title"
      >
        {t("general.title")}
      </h2>
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <p className="text-gray-400 font-semibold">
              {quantity} {t("general.item", { count: quantity })}
            </p>
          ) : (
            <p />
          )
        }
      </LineItemsCount>
    </div>
  )
}
