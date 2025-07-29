import { LineItemField } from "@commercelayer/react-components"
import { toString as cronsToString } from "cronstrue"
import type { FC } from "react"
import { useTranslation } from "react-i18next"

import { IconRepeat } from "#components/atoms/IconRepeat"
import { isValidCronExpression } from "#utils/frequency"

export const LineItemFrequency: FC = () => {
  const { t, i18n } = useTranslation()

  return (
    <LineItemField attribute="frequency">
      {/*  @ts-expect-error typing on attribute */}
      {({ attributeValue }) => {
        if (attributeValue == null) {
          return null
        }

        const frequency = isValidCronExpression(attributeValue)
          ? cronsToString(attributeValue, {
              locale: i18n.language,
            })
          : t(`item.frequency.${attributeValue}`)

        return (
          <div
            className="flex bg-white border border-primary text-primary text-xs max-w-max py-1 px-2.5 rounded-sm font-bold lowercase"
            data-test-id="frequency"
          >
            <IconRepeat className="mr-1.5" />
            {frequency}
          </div>
        )
      }}
    </LineItemField>
  )
}
