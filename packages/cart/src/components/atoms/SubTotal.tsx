import { FC } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  priceCents?: number
  price?: string
}

export const SubTotal: FC<Props> = ({ price, priceCents }) => {
  const { t } = useTranslation()

  return (
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
  )
}
