import { useTranslation } from "next-i18next"
import NextHead from "next/head"
import { FC } from "react"

import { defaultSettings } from "#utils/getSettings"

interface Props {
  /**
   * Page title, if `undefined` default app title will be used.
   */
  title?: string
  /**
   * URL to be used to render the favicon, if `undefined` default CL logo will be used.
   */
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
