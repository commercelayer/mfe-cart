import {
  GiftCardOrCouponCode,
  GiftCardOrCouponRemoveButton,
} from "@commercelayer/react-components"
import type { FC } from "react"
import { useTranslation } from "react-i18next"

const allowedCodeTypes = ["coupon", "gift_card"] as const

export const CodeRecap: FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      {allowedCodeTypes.map((type) => (
        <GiftCardOrCouponCode key={type} type={type}>
          {({ code }) =>
            code ? (
              <div className="flex justify-between items-center text-sm mb-2 gap-3">
                <div className="select-all" data-test-id={`applied-${type}`}>
                  {code}
                </div>
                <GiftCardOrCouponRemoveButton
                  type={type}
                  className="font-bold text-primary border-b leading-none border-black border-opacity-10 md: transition ease-in duration-200 hover:border-opacity-50 hover:text-primary-dark focus:outline-hidden"
                  label={t("general.remove")}
                  data-test-id={`button-remove-${type}`}
                />
              </div>
            ) : (
              <div />
            )
          }
        </GiftCardOrCouponCode>
      ))}
    </div>
  )
}
