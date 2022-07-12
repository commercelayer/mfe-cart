import {
  LineItemImage,
  LineItemName,
  LineItemAmount,
  LineItem,
  LineItemType,
} from "@commercelayer/react-components"
import { useTranslation } from "next-i18next"
import { FC } from "react"

import { ButtonRemoveItem } from "./ButtonRemoveItem"
import { EmptyCart } from "./EmptyCart"
import { LineItemOptions } from "./LineItemOptions"
import { QuantitySelector } from "./QuantitySelector"

import { useSettings } from "#components/SettingsProvider"

type Props = {
  className: string
  listTypes: LineItemType[]
}

export const Summary: FC<Props> = ({ className, listTypes }) => {
  const { t } = useTranslation()
  const { settings } = useSettings()

  return (
    <div className={className}>
      {listTypes.map((type) => (
        <LineItem key={type} type={type}>
          <div
            className="flex gap-5 pb-8 mb-8 border-b border-b-gray-300"
            data-test-id={`line-item-${type}`}
          >
            <LineItemImage
              width={170}
              className="w-1/4 self-start md:self-center max-h-44 object-contain"
            />

            <div className="flex-1 flex flex-col min-h-[150px]">
              <div className="flex justify-between items-center gap-1">
                <LineItemName className="font-bold" />
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

              <div className="flex justify-between items-center mt-auto">
                {type === "gift_cards" ? <div /> : <QuantitySelector />}
                <LineItemAmount className="text-lg font-semibold" />
              </div>
            </div>
          </div>
        </LineItem>
      ))}

      <EmptyCart />

      {settings.isValid && settings.returnUrl ? (
        <div className="pt-2 pb-8">
          <a
            data-test-id="return-url"
            href={settings.returnUrl}
            className="link-base text-xs font-bold"
          >
            &lt; {t("general.returnUrlLabel")}
          </a>
        </div>
      ) : null}
    </div>
  )
}
