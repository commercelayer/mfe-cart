import {
  LineItemImage,
  LineItemName,
  LineItemCode,
  LineItemOptions,
  LineItemAmount,
  LineItem,
  LineItemOption,
  LineItemsEmpty,
} from "@commercelayer/react-components"
import { FC } from "react"

import { ButtonRemoveItem } from "./ButtonRemoveItem"
import { QuantitySelector } from "./QuantitySelector"

type Props = {
  className: string
}

export const Summary: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <LineItemsEmpty />
      <LineItem>
        <div className="flex gap-5 pb-8 mb-8 border-b border-b-gray-300">
          <LineItemImage width={170} className="self-center" />

          <div className="flex-1 flex flex-col min-h-[150px]">
            <div className="flex justify-between items-center gap-1">
              <LineItemName className="font-bold" />
              <ButtonRemoveItem />
            </div>

            <div>
              <LineItemCode className="text-sm text-gray-400 mb-3" />
              <LineItemOptions showName showAll>
                <LineItemOption />
              </LineItemOptions>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <QuantitySelector />
              <LineItemAmount className="text-lg font-semibold" />
            </div>
          </div>
        </div>
      </LineItem>
    </div>
  )
}
