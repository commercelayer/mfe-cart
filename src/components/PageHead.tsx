import { Settings } from "HostedApp"
import { FC } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"

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
    <Helmet>
      <title>{title || t("general.title")}</title>
      <link rel="icon" href={faviconUrl || defaultSettings.faviconUrl} />
    </Helmet>
  )
}
