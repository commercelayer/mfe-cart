import { LineItemsCount } from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  priceCents?: number
  price?: string
}

export const SubTotal: FC<Props> = ({ price, priceCents }) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="border-b flex justify-between items-center flex-row md:mb-12 pb-2">
        <h2 className="text-black font-semibold text-xl md:text-3xl">
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
      <div className="text-black flex justify-between">
        <div className="text-gray-500" data-test-id="label-subtotal">
          {t("general.subtotal")}
        </div>
        <div
          data-amount={priceCents}
          data-test-id="subtotal-amount"
          className="font-semibold text-lg"
        >
          {price}
        </div>
      </div>
    </>
  )
}
