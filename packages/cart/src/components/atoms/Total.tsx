import { FC } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  priceCents?: number
  price?: string
}

export const Total: FC<Props> = ({ price, priceCents }) => {
  const { t } = useTranslation()

  return (
    <div className="text-black flex justify-between items-center border-b border-b-gray-100 border-dashed">
      <div data-test-id="label-total">{t("general.total")}</div>
      <div
        data-test-id="total-amount"
        data-amount={priceCents}
        className="font-semibold text-2xl"
      >
        {price}
      </div>
    </div>
  )
}
