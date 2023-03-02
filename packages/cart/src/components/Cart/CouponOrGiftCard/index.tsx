import { FC } from "react"

import { CodeForm } from "./CodeForm"
import { CodeRecap } from "./CodeRecap"

export const CouponOrGiftCard: FC = () => {
  return (
    <div className="border-t border-t-gray-100 border-b border-b-gray-100 py-6 mb-6">
      <CodeForm />
      <CodeRecap />
    </div>
  )
}
