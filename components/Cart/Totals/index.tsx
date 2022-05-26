import {
  DiscountAmount,
  GiftCardAmount,
  SubTotalAmount,
  TotalAmount,
} from "@commercelayer/react-components"
import { useTranslation } from "next-i18next"
import { FC } from "react"

import { ButtonCheckout } from "./ButtonCheckout"

import { CouponOrGiftCard } from "#components/Cart/CouponOrGiftCard"

type Props = {
  className: string
}

export const Totals: FC<Props> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <div className={className}>
      <div className="md:bg-gray-50 pb-8 md:py-10 md:px-7 rounded-md w-full">
        <div className="mb-8">
          <CouponOrGiftCard />
        </div>
        <div className="border-t border-t-gray-100 border-b border-b-gray-400 py-6">
          <div className="text-black mb-2 flex justify-between">
            <div className="text-gray-500" data-test-id="label-subtotal">
              {t("general.subtotal")}
            </div>
            <SubTotalAmount>
              {({ priceCents, price }) => (
                <div
                  data-amount={priceCents}
                  data-test-id="subtotal-amount"
                  className="font-semibold"
                >
                  {price}
                </div>
              )}
            </SubTotalAmount>
          </div>
          <DiscountAmount>
            {({ priceCents, price }) =>
              priceCents ? (
                <div className="text-black mb-2 flex justify-between">
                  <div className="text-gray-500">{t("general.discount")}</div>
                  <div
                    className="font-semibold"
                    data-test-id="discount-amount"
                    data-amount={priceCents}
                  >
                    {price}
                  </div>
                </div>
              ) : null
            }
          </DiscountAmount>
          <GiftCardAmount>
            {({ priceCents, price }) =>
              priceCents ? (
                <div className="text-black mb-2 flex justify-between">
                  <div className="text-gray-500">{t("general.giftCard")}</div>
                  <div
                    className="font-semibold"
                    data-test-id="gift-card-amount"
                    data-amount={priceCents}
                  >
                    {price}
                  </div>
                </div>
              ) : null
            }
          </GiftCardAmount>
        </div>
        <div className="text-black py-8 flex justify-between items-center border-b border-b-gray-100 border-dashed">
          <div data-test-id="label-total">{t("general.total")}</div>
          <TotalAmount>
            {({ priceCents, price }) => (
              <div
                data-test-id="total-amount"
                data-amount={priceCents}
                className="font-semibold text-xl"
              >
                {price}
              </div>
            )}
          </TotalAmount>
        </div>
        <p className="py-7 text-xs font-semibold text-gray-500">
          {t("general.finalPriceInCheckoutText")}
        </p>

        <ButtonCheckout />
      </div>
    </div>
  )
}
