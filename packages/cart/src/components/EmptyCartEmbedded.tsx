import { FC } from "react"

import { ButtonCheckoutDisabled } from "./atoms/ButtonCheckoutDisabled"
import { PageLayout } from "./PageLayout"

import { EmptyCartMessage } from "#components/atoms/EmptyCartMessage"
import { FinalPriceDisclaimer } from "#components/atoms/FinalPriceDisclaimer"
import { SubTotal } from "#components/atoms/SubTotal"
import { Total } from "#components/atoms/Total"

export const EmptyCartEmbedded: FC = () => {
  return (
    <PageLayout
      main={<EmptyCartMessage />}
      aside={
        <div>
          <div className="mb-6">
            <SubTotal price={"-"} />
          </div>

          <div className="pt-2 pb-8">
            <Total price={"-"} />
          </div>

          <FinalPriceDisclaimer />
          <ButtonCheckoutDisabled />
        </div>
      }
    />
  )
}
