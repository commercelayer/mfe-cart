import {
  DiscountAmount,
  GiftCardAmount,
  SubTotalAmount,
  TotalAmount,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonCheckout } from "./ButtonCheckout"

import { FinalPriceDisclaimer } from "#components/atoms/FinalPriceDisclaimer"
import { SubTotal } from "#components/atoms/SubTotal"
import { Total } from "#components/atoms/Total"
import { CouponOrGiftCard } from "#components/Cart/CouponOrGiftCard"

export const Totals: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="mb-6">
        <SubTotalAmount>
          {({ priceCents, price }) => (
            <SubTotal priceCents={priceCents} price={price} />
          )}
        </SubTotalAmount>
      </div>

      <CouponOrGiftCard />

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
          ) : (
            <div />
          )
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
          ) : (
            <div />
          )
        }
      </GiftCardAmount>

      <div className="pt-2 pb-8">
        <TotalAmount>
          {({ priceCents, price }) => (
            <Total priceCents={priceCents} price={price} />
          )}
        </TotalAmount>
      </div>

      <FinalPriceDisclaimer />
      <ButtonCheckout />
    </>
  )
}
