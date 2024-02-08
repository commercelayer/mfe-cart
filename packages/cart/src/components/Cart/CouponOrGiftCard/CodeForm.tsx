import {
  GiftCardOrCouponForm,
  GiftCardOrCouponInput,
  GiftCardOrCouponSubmit,
  Errors,
} from "@commercelayer/react-components"
import cn from "classnames"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"

export const CodeForm: FC = () => {
  const [couponError, setCouponError] = useState(false)
  const { t } = useTranslation()

  return (
    <div>
      <GiftCardOrCouponForm
        onSubmit={({ success }) => {
          setCouponError(!success)
        }}
      >
        <label
          htmlFor="code-input"
          className="py-1 text-gray-500 text-sm font-bold"
        >
          {t("couponOrGift.label")}
        </label>

        <div className="flex w-full pt-1 pb-4">
          <GiftCardOrCouponInput
            id="code-input"
            className={cn(
              "input-base flex-1 rounded-md rounded-tr-none rounded-br-none",
              {
                "-error ": couponError,
              }
            )}
            placeholderTranslation={(codeType) =>
              t(`couponOrGift.placeholder.${codeType}`)
            }
            required={false}
            data-test-id="coupon-input"
          />
          <GiftCardOrCouponSubmit
            className="button-base bg-primary text-contrast px-8 rounded-md rounded-tl-none rounded-bl-none"
            label={t("couponOrGift.submit")}
            data-test-id="coupon-submit"
          />
        </div>
      </GiftCardOrCouponForm>
      <Errors
        resource="orders"
        className="text-xs text-red-400"
        messages={[
          {
            code: "VALIDATION_ERROR",
            resource: "orders",
            field: "gift_card_or_coupon_code",
            message: t("couponOrGift.error.gift_card_or_coupon_code"),
          },
          {
            code: "VALIDATION_ERROR",
            resource: "orders",
            field: "coupon_code",
            message: t("couponOrGift.error.coupon_code"),
          },
          {
            code: "VALIDATION_ERROR",
            resource: "orders",
            field: "gift_card_code",
            message: t("couponOrGift.error.gift_card_code"),
          },
        ]}
      />
    </div>
  )
}
