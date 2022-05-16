import { useTranslation } from "next-i18next"
import NextHead from "next/head"
import { FC } from "react"

import { defaultSettings } from "#utils/getSettings"

interface Props {
  title?: string
  faviconUrl?: string
}

export const PageHead: FC<Props> = ({ faviconUrl, title }) => {
  const { t } = useTranslation("common")

  return (
    <NextHead>
      <title>{title || t("general.title")}</title>
      <link rel="icon" href={faviconUrl || defaultSettings.favicon} />
    </NextHead>
  )
}
