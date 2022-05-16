import {
  GiftCardOrCouponForm,
  GiftCardOrCouponInput,
  GiftCardOrCouponSubmit,
  SubTotalAmount,
  TotalAmount,
} from "@commercelayer/react-components"
import { useTranslation } from "next-i18next"
import { FC } from "react"

type Props = {
  className: string
}

export const Totals: FC<Props> = ({ className }) => {
  const { t } = useTranslation("common")
  return (
    <div className={className}>
      <div className="bg-gray-100 py-10 px-7 rounded-md w-full">
        <div>
          {t("general.couponLabel")}
          <GiftCardOrCouponForm>
            <GiftCardOrCouponInput />
            <GiftCardOrCouponSubmit />
          </GiftCardOrCouponForm>
        </div>

        <div>
          <div>{t("general.subtotal")}</div>
          <SubTotalAmount />
        </div>
        <div>
          <div>{t("general.total")}</div>
          <TotalAmount />
        </div>
      </div>
    </div>
  )
}
