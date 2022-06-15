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
    <div>
      <GiftCardOrCouponForm
        onSubmit={({ success }) => {
          setCouponError(!success)
        }}
      >
        <button
          type="button"
          className={cn(
            {
              "cursor-default": showInput,
            },
            "py-1 text-gray-500 text-sm font-bold"
          )}
          onClick={() => setShowInput(true)}
          data-test-id="show-coupon-input"
        >
          {t("couponOrGift.label")}
        </button>

        {showInput && (
          <div className="flex w-full pt-1">
            <GiftCardOrCouponInput
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
              className="button-base bg-primary text-contrast px-4 rounded-md rounded-tl-none rounded-bl-none"
              label={t("couponOrGift.submit")}
              data-test-id="coupon-submit"
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
      <div className={cn({ "pb-4": showInput })} />
    </div>
  )
}
