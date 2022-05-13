import {
  GiftCardOrCouponForm,
  GiftCardOrCouponInput,
  GiftCardOrCouponSubmit,
  SubTotalAmount,
  TotalAmount,
} from "@commercelayer/react-components"
import { FC } from "react"

type Props = {
  className: string
}

export const Totals: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="bg-gray-100 py-10 px-7 rounded-md w-full">
        <div>
          Coupon?
          <GiftCardOrCouponForm>
            <GiftCardOrCouponInput />
            <GiftCardOrCouponSubmit />
          </GiftCardOrCouponForm>
        </div>

        <div>
          <div>Subtotal</div>
          <SubTotalAmount />
        </div>
        <div>
          <div>Total</div>
          <TotalAmount />
        </div>
      </div>
    </div>
  )
}
