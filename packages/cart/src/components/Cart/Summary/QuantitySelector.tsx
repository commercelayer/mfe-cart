import { LineItemQuantity } from "@commercelayer/react-components"
import { LineItem } from "@commercelayer/sdk"
import { FC } from "react"

import { InputSpinner } from "#components/atoms/InputSpinner"

type Props = {
  readonly?: boolean
}

export const QuantitySelector: FC<Props> = () => {
  return (
    <div className="relative w-full">
      <LineItemQuantity>
        {({ quantity, handleChange, lineItem }) => {
          return (
            <InputSpinner
              data-test-id="quantity-selector"
              quantity={quantity}
              handleChange={handleChange}
              debounceMs={600}
              availability={getItemInventoryQuantity(lineItem)}
            />
          )
        }}
      </LineItemQuantity>
    </div>
  )
}

function getItemInventoryQuantity(lineItem?: LineItem): number | undefined {
  const item = lineItem?.item
  if (item == null) {
    return undefined
  }

  if ("inventory" in item && item.inventory?.quantity != null) {
    return item.inventory.quantity
  }

  return undefined
}
