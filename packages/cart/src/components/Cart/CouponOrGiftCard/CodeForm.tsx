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
        <div className="flex w-full items-center justify-between jus pt-1 pb-4">
          <div className="flex items-center space-x-5">
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4L7 4C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z"
                stroke="#4D4D4D"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 14.75L15 8.75"
                stroke="#4D4D4D"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.9945 14.75H15.0035"
                stroke="#292D32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.99451 9.25H9.00349"
                stroke="#292D32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
          <GiftCardOrCouponInput
            id="code-input"
            className={cn(
              "font-normal leading-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
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
          </div>
          </div>
          <div className="flex-end">
          <GiftCardOrCouponSubmit
            className="font-normal text-xs leading-5 uppercase text-red-500"
            label={t("couponOrGift.submit")}
            data-test-id="coupon-submit"
          />
          </div>
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
