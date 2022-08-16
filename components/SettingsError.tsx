import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"

import { PageErrorLayout } from "./PageErrorLayout"

import { EmptyCartEmbedded } from "#components/EmptyCartEmbedded"

type Props = {
  retryable?: boolean
  isEmbedded?: boolean
}

export const SettingsError: FC<Props> = ({ retryable, isEmbedded }) => {
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    if (!retryable && !isEmbedded) {
      // router.push won't work here since we need a genuine 404 status code
      window.location.href = `${router.basePath}/404`
    }
  }, [retryable])

  return isEmbedded ? (
    <EmptyCartEmbedded />
  ) : retryable ? (
    <PageErrorLayout
      statusCode={t("general.retryableErrorCode")}
      message={t("general.retryableErrorDescription")}
    />
  ) : null
}
