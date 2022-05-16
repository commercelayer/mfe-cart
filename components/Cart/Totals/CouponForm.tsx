import {
  GiftCardOrCouponCode,
  GiftCardOrCouponForm,
  GiftCardOrCouponInput,
  GiftCardOrCouponSubmit,
  GiftCardOrCouponRemoveButton,
} from "@commercelayer/react-components"
import cn from "classnames"
import { useTranslation } from "next-i18next"
import { FC, useState } from "react"

export const CouponForm: FC = () => {
  const [showInput, setShowInput] = useState(false)
  const [couponError, setCouponError] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="mb-8">
      <GiftCardOrCouponCode>
        {({ code }) =>
          code ? (
            <div>
              <p className="py-1 text-gray-500 text-sm font-bold">
                Applied Coupon
              </p>
              <div className="flex w-full pt-1">
                <div className="flex-1 px-4 py-2 text-sm rounded-md rounded-tr-none rounded-br-none bg-white text-primary-dark border border-gray-500 font-bold">
                  {code}
                </div>
                <GiftCardOrCouponRemoveButton
                  className="bg-gray-500 px-4 text-contrast text-sm font-sm font-semibold rounded-md rounded-tl-none rounded-bl-none"
                  onClick={() => {
                    setShowInput(true)
                  }}
                  label="Remove"
                />
              </div>
            </div>
          ) : (
            <>
              <button
                className="py-1 text-gray-500 text-sm font-bold"
                onClick={() => setShowInput((p) => !p)}
              >
                {t("general.coupon.label")}
              </button>

              {showInput && (
                <div>
                  <GiftCardOrCouponForm
                    className="flex w-full pt-1"
                    onSubmit={({ success }) => {
                      setCouponError(!success)
                    }}
                  >
                    <GiftCardOrCouponInput
                      className={cn(
                        "flex-1 px-4 py-2 text-sm rounded-md rounded-tr-none rounded-br-none border",
                        {
                          "border-red-500": couponError,
                        }
                      )}
                      placeholder={t("general.coupon.placeholder")}
                    />
                    <GiftCardOrCouponSubmit
                      className="bg-primary px-4 text-contrast text-sm font-sm font-semibold rounded-md rounded-tl-none rounded-bl-none"
                      label={t("general.coupon.submit")}
                    />
                  </GiftCardOrCouponForm>
                  {couponError && (
                    <div className="text-red-500 text-sm">Code not valid</div>
                  )}
                </div>
              )}
            </>
          )
        }
      </GiftCardOrCouponCode>
    </div>
  )
}
