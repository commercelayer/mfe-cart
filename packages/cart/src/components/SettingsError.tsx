import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "wouter"

import { PageErrorLayout } from "./PageErrorLayout"

import { EmptyCartEmbedded } from "#components/EmptyCartEmbedded"

type Props = {
  /**
   * When this is `false`, the component will redirect user to a static 404 page and will remove all URL params.
   * If `true`, the current URL will be maintained (along with query string params), so user can manually retry by refreshing the page.
   */
  retryable?: boolean
  isEmbedded?: boolean
  redirectTo?: string
}

export const SettingsError: FC<Props> = ({
  retryable,
  isEmbedded,
  redirectTo,
}) => {
  const { base } = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    if (!retryable && !isEmbedded) {
      // router.push won't work here since we need a genuine 404 HTTP response status code
      window.location.href = redirectTo ?? `${base}/404`
    }
  }, [retryable])

  const statusCode = t("general.retryableErrorCode")

  return isEmbedded ? (
    <EmptyCartEmbedded />
  ) : retryable ? (
    <PageErrorLayout
      statusCode={statusCode}
      message={t("general.retryableErrorDescription")}
    />
  ) : null
}
