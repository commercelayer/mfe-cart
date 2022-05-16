import {
  CheckoutLink,
  DiscountAmount,
  SubTotalAmount,
  TotalAmount,
} from "@commercelayer/react-components"
import { useTranslation } from "next-i18next"
import { FC } from "react"

import { CouponForm } from "./CouponForm"

type Props = {
  className: string
}

export const Totals: FC<Props> = ({ className }) => {
  const { t } = useTranslation()
  return (
    <div className={className}>
      <div className="bg-gray-50 py-10 px-7 rounded-md w-full">
        <CouponForm />
        <div className="border-t border-t-gray-100 border-b border-b-gray-400">
          <div className="text-black  py-8 flex justify-between">
            <div className="text-gray-500">{t("general.subtotal")}</div>
            <SubTotalAmount className="font-semibold" />
          </div>
          <div className="text-black pb-8 flex justify-between">
            <div className="text-gray-500">{t("general.discount")}</div>
            <DiscountAmount className="font-semibold" />
          </div>
        </div>
        <div className="text-black py-8 flex justify-between items-center border-b border-b-gray-100 border-dashed">
          <div className="">{t("general.total")}</div>
          <TotalAmount className="font-semibold text-xl" />
        </div>
        <p className="py-7 text-xs font-semibold text-gray-500">
          {t("general.finalPriceInCheckoutText")}
        </p>
        <CheckoutLink
          hostedCheckout
          className="block py-3 px-3 rounded-md bg-primary text-contrast text-center text-sm font-semibold hover:bg-primary-dark transition-bg"
        />
      </div>
    </div>
  )
}
