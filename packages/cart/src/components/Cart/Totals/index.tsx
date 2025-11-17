import {
  DiscountAmount,
  GiftCardAmount,
  PaymentMethodAmount,
  ShippingAmount,
  SubTotalAmount,
  TotalAmount,
} from "@commercelayer/react-components"
import type { FC } from "react"
import { useTranslation } from "react-i18next"
import { CartTitle } from "#components/atoms/CartTitle"
import { FinalPriceDisclaimer } from "#components/atoms/FinalPriceDisclaimer"
import { SubTotal } from "#components/atoms/SubTotal"
import { Total } from "#components/atoms/Total"
import { CouponOrGiftCard } from "#components/Cart/CouponOrGiftCard"
import { useSettings } from "#components/SettingsProvider"
import { ButtonCheckout } from "./ButtonCheckout"

export const Totals: FC = () => {
  const { t } = useTranslation()
  const { settings } = useSettings()

  return (
    <>
      <div className="mb-6">
        <CartTitle className="hidden md:flex" />
        <SubTotalAmount>
          {({ priceCents, price }) => (
            <SubTotal priceCents={priceCents} price={price} />
          )}
        </SubTotalAmount>
      </div>

      {settings.isValid && !settings.hidePromoCode && <CouponOrGiftCard />}

      <DiscountAmount>
        {({ priceCents, price }) => (
          <RecapAmountRow
            label={t("general.discount")}
            priceCents={priceCents}
            price={price}
            testId="discount-amount"
          />
        )}
      </DiscountAmount>

      <GiftCardAmount>
        {({ priceCents, price }) => (
          <RecapAmountRow
            label={t("general.giftCard")}
            priceCents={priceCents}
            price={price}
            testId="gift-card-amount"
          />
        )}
      </GiftCardAmount>

      <ShippingAmount>
        {({ priceCents, price }) => (
          <RecapAmountRow
            label={t("general.shippingAmount")}
            priceCents={priceCents}
            price={price}
            testId="shipping-method-amount"
          />
        )}
      </ShippingAmount>

      <PaymentMethodAmount>
        {({ priceCents, price }) => (
          <RecapAmountRow
            label={t("general.paymentMethodAmount")}
            priceCents={priceCents}
            price={price}
            testId="payment-method-amount"
          />
        )}
      </PaymentMethodAmount>

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

const RecapAmountRow: FC<{
  label: string
  priceCents?: number
  price?: string
  testId: string
}> = ({ label, priceCents, price, testId }) => {
  if (!priceCents) {
    return <div />
  }

  return (
    <div className="text-black mb-2 flex justify-between">
      <div className="text-gray-500">{label}</div>
      <div
        className="font-semibold"
        data-test-id={testId}
        data-amount={priceCents}
      >
        {price}
      </div>
    </div>
  )
}
