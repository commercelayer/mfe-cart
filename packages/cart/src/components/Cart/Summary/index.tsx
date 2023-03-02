import {
  LineItemImage,
  LineItemName,
  LineItemAmount,
  LineItem,
  LineItemType,
  LineItemsEmpty,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonRemoveItem } from "./ButtonRemoveItem"
import { LineItemOptions } from "./LineItemOptions"
import { QuantitySelector } from "./QuantitySelector"

import { EmptyCartMessage } from "#components/atoms/EmptyCartMessage"
import { useSettings } from "#components/SettingsProvider"
import { LineItemsSkeleton } from "#components/Skeleton/LineItems"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  listTypes: LineItemType[]
}

export const Summary: FC<Props> = ({ listTypes }) => {
  const { t } = useTranslation()
  const { settings } = useSettings()

  return (
    <>
      {listTypes.map((type) => (
        <LineItem key={type} type={type}>
          <div
            className="flex gap-5 pb-8 mb-8 border-b border-b-gray-100"
            data-test-id={`line-item-${type}`}
          >
            <div className="card-image-container">
              <LineItemImage className="w-1/2 self-start md:self-center object-contain" />
            </div>
            <div className="flex-1 flex flex-col min-h-[150px]">
              <div className="flex justify-between items-center gap-1">
                <LineItemName className="box-border border-0 border-solid border-gray-200 text-sm  not-italic leading-5 text-[rgba(77,77,77,1)]" />
                <ButtonRemoveItem />
              </div>

              <LineItemOptions />

              <div className="pt-2">
                <div className="flex gap-1 text-sm">
                  <div className="text-gray-400 font-semibold">
                    {t("general.price")}:
                  </div>
                  <LineItemAmount type="unit" />
                </div>
              </div>

              {/* <div className="flex justify-between items-center mt-auto">
                {type === "gift_cards" ? <div /> : <QuantitySelector />}
                <LineItemAmount className="font-normal text-sm text-right text-gray-700" />
              </div> */}
              <div className="flex pt-2 items-center justify-end space-x-5 mt-auto" >
                <div>
                  {type === "gift_cards" ? <div /> : <QuantitySelector />}
                </div>
                <div>
                  <LineItemAmount className="font-normal text-sm text-right text-gray-700" />
                </div>
              </div>
            </div>
          </div>
        </LineItem>
      ))}

      {/* Empty cart */}
      <LineItemsEmpty>
        {({ quantity }) => {
          if (quantity === undefined) {
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
