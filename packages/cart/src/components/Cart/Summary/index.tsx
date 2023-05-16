import {
  LineItemImage,
  LineItemName,
  LineItemAmount,
  LineItem,
  TLineItem,
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
  listTypes: TLineItem[]
}

export const Summary: FC<Props> = ({ listTypes }) => {
  const { t } = useTranslation()
  const { settings } = useSettings()

  const hasReturnUrl =
    settings.isValid &&
    settings.returnUrl &&
    settings.returnUrl !== window.parent.location.href // no need to show return url is the same as current url

  // allow to send close message to parent window when embedded in same page of returnUrl
  const isEmbeddedMiniCart =
    isEmbedded() &&
    settings.isValid &&
    settings.returnUrl === window.parent.location.href &&
    window.parent.location.href !== window.location.href

  return (
    <>
      {listTypes.map((type) => (
        <LineItem key={type} type={type}>
          <div
            className="flex gap-5 pb-8 mb-8 border-b border-b-gray-300"
            data-test-id={`line-item-${type}`}
          >
            <LineItemImage
              width={170}
              className="w-1/4 self-start md:self-center max-h-32 object-contain"
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
      <div className="pt-2 pb-8">
        {hasReturnUrl ? (
          <a
            data-test-id="return-url"
            href={settings.returnUrl}
            className="link-base text-xs font-bold"
            target={isEmbedded() ? "_top" : undefined} // if embedded, open in parent window
          >
            &lt; {t("general.returnUrlLabel")}
          </a>
        ) : isEmbeddedMiniCart ? (
          <button
            className="link-base text-xs font-bold"
            onClick={() => {
              window.parentIFrame?.sendMessage({ type: "close" }, "*")
            }}
          >
            &lt; {t("general.returnUrlLabel")}
          </button>
        ) : null}
      </div>
    </>
  )
}
