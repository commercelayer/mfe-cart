import {
  LineItemOptions as LineItemOptionsComponent,
  LineItemOption,
} from "@commercelayer/react-components"
import { FC } from "react"

import css from "./LineItemOptions.module.css"

export const LineItemOptions: FC = () => {
  return (
    <LineItemOptionsComponent
      showAll
      className={css.skuOptions}
      data-test-id="line-item-options"
    >
      <LineItemOption data-test-id="item-option" />
    </LineItemOptionsComponent>
  )
}
