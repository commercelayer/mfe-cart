import { useTranslation } from "next-i18next"
import { VFC } from "react"

type Props = {
  priceCents?: number
  price?: string
}

export const SubTotal: VFC<Props> = ({ price, priceCents }) => {
  const { t } = useTranslation()

  return (
    <div className="text-black flex justify-between">
      <div className="text-gray-500" data-test-id="label-subtotal">
        {t("general.subtotal")}
      </div>
      <div
        data-amount={priceCents}
        data-test-id="subtotal-amount"
        className="font-semibold"
      >
        {price}
      </div>
    </div>
  )
}
