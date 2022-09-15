import { Settings } from "HostedApp"
import { useTranslation } from "next-i18next"
import NextHead from "next/head"
import { FC } from "react"

import { defaultSettings } from "#utils/getSettings"

type Props = Partial<Pick<Settings, "faviconUrl">> & {
  /**
   * Page title, if `undefined` default app title will be used.
   */
  title?: string
}

export const PageHead: FC<Props> = ({ faviconUrl, title }) => {
  const { t } = useTranslation("common")

  return (
    <NextHead>
      <title>{title || t("general.title")}</title>
      <link rel="icon" href={faviconUrl || defaultSettings.faviconUrl} />
    </NextHead>
  )
}
