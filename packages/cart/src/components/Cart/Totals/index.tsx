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
    <div>
      <div className="pb-4">
        <span className="text-xxs leading-5 text-gray-700`">{"Coupons"}</span>
      </div>
      <div>
        <CouponOrGiftCard />
      </div>

      <div className="pb-4">
        <span className="font-normal text-sm leading-5 text-gray-700">
          {"Price Details"}
        </span>
        <span className="pl-1">
          {"("}
          <span className="font-normal text-sm leading-5 text-gray-700">
            {"3"} <span>{"items"}</span>
          </span>
          {")"}
        </span>
      </div>

      <div className="pb-2 flex items-center justify-between">
        <div className="font-normal text-sm leading-7 text-gray-500">
          Items total
        </div>
        <div className="font-normal text-sm leading-7 text-gray-500">
          <TotalAmount>
            {({ priceCents, price }) => (
              <span data-test-id="total-amount" data-amount={priceCents}>
                {price}
              </span>
            )}
          </TotalAmount>
        </div>
      </div>
      <div className="pb-2">
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
      </div>
      <div className="pb-2 flex items-center justify-between">
        <div className="font-normal text-sm leading-7 text-gray-500">
          Coupon Discount
        </div>
        <div className="font-normal text-sm leading-7 text-gray-500">
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
                <div>{"0.00"} </div>
              )
            }
          </DiscountAmount>
        </div>
      </div>
      <div className="mt-2 mb-4 divider-line-cart"></div>
      <div className="pb-4 pt-4 flex items-center justify-between">
        <div className="font-normal text-sm leading-5">Subtotal</div>
        <div className="font-normal text-sm leading-5">
          <SubTotalAmount>
            {({ priceCents, price }) => (
              <span data-amount={priceCents} data-test-id="subtotal-amount">
                {price}
              </span>
            )}
          </SubTotalAmount>
        </div>
      </div>

      <ButtonCheckout />
      <div className="text-center pt-2 pb-5">
          <span className="font-normal text-xs leading-5 text-center text-gray-600">
            {"if applicable, shipping costs will be calculated at checkout"}
          </span>
        </div>
    </div>
  )
}
