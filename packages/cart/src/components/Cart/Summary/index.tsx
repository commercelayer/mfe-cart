import {
  LineItemImage,
  LineItemAmount,
  LineItem,
  LineItemType,
  LineItemsEmpty,
  LineItemField,
  LineItemsCount,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ButtonRemoveItem } from "./ButtonRemoveItem"
import {
  LineItemOptions,
  LineItemOptionsAtributes,
  LineItemOptionsRespone,
} from "./LineItemOptions"
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

  const goContinueShopping = () => {
    window.location.href = "https://odoo.ezcontacts.com/"
  }


  const ContinueShopping = () => {
    return (
      <div
        onClick={goContinueShopping}
        className="flex items-center space-x-1 cursor-pointer"
      >
        <div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19.92L8.48 13.4C7.71 12.63 7.71 11.37 8.48 10.6L15 4.07996"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="font-normal text-sm leading-5 text-gray-400 cursor-pointer hover:text-gray-700">
          {"Continue shopping"}
        </div>
      </div>
    )
  }

  const ShoppingHeaderCart = (
    <div className="text-lg pb-6 leading-6 text-gray-700">
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <span data-test-id="items-count"> Shopping Cart( {quantity} )</span>
          ) : (
            <div />
          )
        }
      </LineItemsCount>
    </div>
  )

  const SelectQuantity = ({ type }: any) => {
    return (
      <div className="flex pt-2 items-center justify-between space-x-5 mt-auto">
        <div>{type === "gift_cards" ? <div /> : <QuantitySelector />}</div>
        <div>
          <LineItemAmount className="font-semibold text-sm text-right text-gray-700" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="cart-summary-mobile">
        {ShoppingHeaderCart}
        {listTypes.map((type) => (
          <LineItem key={type} type={type}>
            <div className="gap-5 pb-8 mb-8 border-b border-b-gray-100 space-y-2">
              <div
                className="flex space-x-8"
                data-test-id={`line-item-${type}`}
              >
                <div style={{ width: "20%" }}>
                  <div className="card-image-container">
                    <LineItemImage className="self-start md:self-center object-contain" />
                  </div>
                </div>
                <div style={{ width: "70%" }}>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-1">
                      <div className="flex flex-col">
                        <div>
                          <LineItemField attribute="metadata" tagElement="div">
                            {({ attributeValue }: any) => {
                              return (
                                <div className="flex-col">
                                  {attributeValue?.brandName && (
                                    <div className="cart-brandname">
                                      {attributeValue?.brandName}
                                    </div>
                                  )}

                                  <div className="font-semibold text-sm leading-5 text-gray-700 opacity-80">
                                    {attributeValue?.skuDisplayName}
                                  </div>
                                  {attributeValue?.frame_size && (
                                    <div className="pt-2">
                                      <div className="flex gap-1 text-sm">
                                        <div className="font-semibold text-xs leading-5 text-gray-700">
                                          {t("general.size")}:
                                        </div>
                                        <div className="font-normal text-xs leading-5 text-gray-400">
                                          {attributeValue?.frame_size}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {attributeValue?.color && (
                                    <div className="pt-2">
                                      <div className="flex gap-1 text-sm">
                                        <div className="font-semibold text-xs leading-5 text-gray-700">
                                          {t("general.color")}:
                                        </div>
                                        <div className="font-normal text-xs leading-5 text-gray-400">
                                          {attributeValue?.color}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            }}
                          </LineItemField>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ width: "10%" }}>
                  <div className="flex flex-col space-y-16">
                    <div>
                      <ButtonRemoveItem />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-8">
                <div style={{ width: "20%" }}></div>
                <div style={{ width: "80%" }}>
                  <LineItemOptionsRespone />
                </div>
              </div>
              <div className="flex space-x-8">
                <div style={{ width: "20%" }}></div>
                <div style={{ width: "80%" }}>
                  <SelectQuantity />
                </div>
              </div>
            </div>
          </LineItem>
        ))}
      </div>
      <div className="cart-summary-desktop">
        {ShoppingHeaderCart}
        {listTypes.map((type) => (
          <LineItem key={type} type={type}>
            <div className="gap-5 pb-8 mb-8 border-b border-b-gray-100 space-y-5">
              <div
                className="flex space-x-8 w-full"
                data-test-id={`line-item-${type}`}
              >
                <div className="w-3/6 card-image-container">
                  <LineItemImage className="w-3/4 self-start md:self-center object-contain" />
                </div>
                <div className="w-4/5">
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-1">
                      <div className="flex flex-col">
                        <div>
                          <LineItemField attribute="metadata" tagElement="div">
                            {({ attributeValue }: any) => {
                              return (
                                <div className="flex-col">
                                  {attributeValue?.brandName && (
                                    <div className="cart-brandname">
                                      {attributeValue?.brandName}
                                    </div>
                                  )}

                                  <div className="font-semibold text-sm leading-5 text-gray-700 opacity-80">
                                    {attributeValue?.skuDisplayName}
                                  </div>
                                  {attributeValue?.frame_size && (
                                    <div className="pt-2">
                                      <div className="flex gap-1 text-sm">
                                        <div className="font-semibold text-xs leading-5 text-gray-700">
                                          {t("general.size")}:
                                        </div>
                                        <div className="font-normal text-xs leading-5 text-gray-400">
                                          {attributeValue?.frame_size}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {attributeValue?.color && (
                                    <div className="pt-2">
                                      <div className="flex gap-1 text-sm">
                                        <div className="font-semibold text-xs leading-5 text-gray-700">
                                          {t("general.color")}:
                                        </div>
                                        <div className="font-normal text-xs leading-5 text-gray-400">
                                          {attributeValue?.color}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            }}
                          </LineItemField>
                        </div>
                        <div>
                          <LineItemOptions />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/5">
                  <div className="flex flex-col space-y-6">
                    <div className="flex justify-end">
                      <ButtonRemoveItem />
                    </div>
                    <div>
                      <div className="flex pt-2 items-center justify-end space-x-5 mt-auto">
                        <div>
                          {/* {type === "gift_cards" ? (
                            <div />
                          ) : (
                            <QuantitySelector />
                          )} */}
                          <LineItemField attribute="metadata" tagElement="div">
                            {({ attributeValue }: any) => {
                              return (
                                <>
                                  <QuantitySelector />
                                </>
                              )
                            }}
                          </LineItemField>
                        </div>

                        <div>
                          <LineItemAmount className="font-normal text-sm text-right text-gray-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-3">
                <LineItemOptionsAtributes />
              </div>
            </div>
          </LineItem>
        ))}
        <div className="w-40">
          <LineItemsCount>
            {({ quantity }) => (quantity ? <ContinueShopping /> : <div />)}
          </LineItemsCount>
        </div>


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
      </div>
    </>
  )
}
