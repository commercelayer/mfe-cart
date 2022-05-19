import {
  LineItemImage,
  LineItemName,
  LineItemAmount,
  LineItem,
  LineItemType,
  LineItemOptions,
  LineItemOption,
} from "@commercelayer/react-components"
import { useTranslation } from "next-i18next"
import { FC } from "react"

import { ButtonRemoveItem } from "./ButtonRemoveItem"
import { EmptyCart } from "./EmptyCart"
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
          <LineItemAmount format="cents">
            {({ price }) =>
              isAppliedGiftCard(type, price) ? null : (
                <div className="flex gap-5 pb-8 mb-8 border-b border-b-gray-300">
                  <LineItemImage
                    width={170}
                    className="w-1/4 self-start md:self-center"
                  />

                  <div className="flex-1 flex flex-col min-h-[150px]">
                    <div className="flex justify-between items-center gap-1">
                      <LineItemName className="font-bold" />
                      <ButtonRemoveItem />
                    </div>

                    <LineItemOptions showAll showName={true} className="pt-2">
                      <LineItemOption />
                    </LineItemOptions>

                    <div className="pt-2">
                      <div className="flex gap-1 text-sm">
                        <div className="text-gray-400 font-semibold">
                          {t("general.price")}:
                        </div>
                        <LineItemAmount type="unit" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                      <QuantitySelector />
                      <LineItemAmount className="text-lg font-semibold" />
                    </div>
                  </div>
                </div>
              )
            }
          </LineItemAmount>
        </LineItem>
      ))}

      <EmptyCart />

      {settings.isValid && settings.returnUrl ? (
        <div className="pt-2 pb-8">
          <a href={settings.returnUrl} className="link-base text-xs font-bold">
            &lt; {t("general.returnUrlLabel")}
          </a>
        </div>
      ) : null}
    </div>
  )
}

// prevent rendering within the product list a gift card applied to current
// we will display the applied gift card in the cart/order totals
const isAppliedGiftCard = (type: LineItemType, price?: string) =>
  type === "gift_cards" && price && parseInt(`${price}`, 10) <= 0
