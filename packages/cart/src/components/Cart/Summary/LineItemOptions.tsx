import {
  LineItemOption,
  LineItemOptions as LineItemOptionsComponent,
} from "@commercelayer/react-components"
import type { FC } from "react"

export const LineItemOptions: FC = () => {
  return (
    <LineItemOptionsComponent
      showAll
      className="skuOptions"
      data-test-id="line-item-options"
    >
      <LineItemOption data-test-id="item-option" />
    </LineItemOptionsComponent>
  )
}
