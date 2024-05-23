import {
  LineItemImage,
  LineItemName,
  LineItemAmount,
  LineItem,
  TLineItem,
  LineItemsEmpty,
  useOrderContainer,
  LineItemCode,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonRemoveItem } from "./ButtonRemoveItem"
import { LineItemFrequency } from "./LineItemFrequency"
import { LineItemOptions } from "./LineItemOptions"
import { QuantitySelector } from "./QuantitySelector"

import { EmptyCartMessage } from "#components/atoms/EmptyCartMessage"
import { useSettings } from "#components/SettingsProvider"
import { LineItemsSkeleton } from "#components/Skeleton/LineItems"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  listTypes: TLineItem[]
}

export const Summary: FC<Props> = ({ listTypes }) => {
  const { t } = useTranslation()
  const { settings } = useSettings()
  const { order } = useOrderContainer()

  return (
    <>
      {listTypes.map((type) => (
        <LineItem key={type} type={type}>
          <div
            className="flex gap-5 pb-8 mb-8 border-b border-dashed border-b-gray-300"
            data-test-id={`line-item-${type}`}
          >
            <LineItemImage
              width={170}
              className="w-[58px] max-h-[58px] object-contain"
            />

            <div className="flex-1 flex flex-col min-h-[150px]">
              <LineItemCode className="text-xs text-gray-400" />
              <div className="flex gap-1 justify-between">
                <LineItemName className="font-bold text-normal mb-2" />
                <LineItemAmount className="font-bold" />
              </div>
              <LineItemOptions />

              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-1 text-xs font-bold text-gray-500 bg-gray-50 rounded py-1 px-2 leading-none">
                  {t("general.price")}
                  <LineItemAmount type="unit" />
                </div>
                <LineItemFrequency />
              </div>

              <div className="flex justify-between items-center mt-auto">
                {type === "gift_cards" ? <div /> : <QuantitySelector />}
                <ButtonRemoveItem />
              </div>
            </div>
          </div>
        </LineItem>
      ))}

      {/* Empty cart */}
      <LineItemsEmpty>
        {({ quantity }) => {
          if (quantity === undefined || order === undefined) {
            return <LineItemsSkeleton />
          }

          if (quantity === 0) {
            return <EmptyCartMessage />
          }

          return <div />
        }}
      </LineItemsEmpty>

      {/* Return Url */}
      {settings.isValid && settings.returnUrl ? (
        <div className="pt-2 pb-8">
          <a
            data-test-id="return-url"
            href={settings.returnUrl}
            className="link-base text-xs font-bold"
            target={isEmbedded() ? "_top" : undefined}
          >
            &lt; {t("general.returnUrlLabel")}
          </a>
        </div>
      ) : null}
    </>
  )
}
