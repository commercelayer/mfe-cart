import { Errors, LineItemQuantity } from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { InputSpinner } from "#components/atoms/InputSpinner"

type Props = {
  readonly?: boolean
}

export const QuantitySelector: FC<Props> = () => {
  const { t } = useTranslation()

  return (
    <div className="relative w-full">
      <LineItemQuantity>
        {({ quantity, handleChange }) => {
          return (
            <InputSpinner
              data-test-id="quantity-selector"
              quantity={quantity}
              handleChange={handleChange}
              debounceMs={600}
            />
          )
        }}
      </LineItemQuantity>

      <Errors
        resource="line_items"
        className="absolute top-[100%] block text-xs text-red-400"
        messages={[
          {
            code: "VALIDATION_ERROR",
            resource: "line_items",
            field: "quantity",
            message: t("general.quantityNotAvailable"),
          },
        ]}
      />
    </div>
  )
}
