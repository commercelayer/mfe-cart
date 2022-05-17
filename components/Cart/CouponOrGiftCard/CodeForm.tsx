import {
  GiftCardOrCouponForm,
  GiftCardOrCouponInput,
  GiftCardOrCouponSubmit,
  Errors,
} from "@commercelayer/react-components"
import cn from "classnames"
import { useTranslation } from "next-i18next"
import { FC, useState } from "react"

export const CodeForm: FC = () => {
  const [showInput, setShowInput] = useState(false)
  const [couponError, setCouponError] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="mb-4">
      <GiftCardOrCouponForm
        onSubmit={({ success }) => {
          setCouponError(!success)
        }}
      >
        <button
          type="button"
          className="py-1 text-gray-500 text-sm font-bold"
          onClick={() => setShowInput((p) => !p)}
        >
          {t("couponOrGift.label")}
        </button>

        {showInput && (
          <div className="flex w-full pt-1">
            <GiftCardOrCouponInput
              className={cn(
                "flex-1 px-4 py-2 text-sm rounded-md rounded-tr-none rounded-br-none border outline-none",
                {
                  "border-red-400 placeholder-red-400 focus:ring-red-500 focus:border-red-500":
                    couponError,
                }
              )}
              placeholderTranslation={(codeType) =>
                t(`couponOrGift.placeholder.${codeType}`)
              }
            />
            <GiftCardOrCouponSubmit
              className="bg-primary px-4 text-contrast text-sm font-sm font-semibold rounded-md rounded-tl-none rounded-bl-none"
              label={t("couponOrGift.submit")}
            />
          </div>
        )}
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
