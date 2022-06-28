import { useTranslation } from "next-i18next"
import { FC, useEffect } from "react"

import { PageErrorLayout } from "./PageErrorLayout"

type Props = {
  retryable?: boolean
}

export const SettingsError: FC<Props> = ({ retryable }) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (!retryable) {
      // forcing page refresh hoping we can hit a proper 404 on the hosting side
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH}/404`
    }
  }, [retryable])

  return retryable ? (
    <PageErrorLayout
      statusCode={t("general.retryableErrorCode")}
      message={t("general.retryableErrorDescription")}
    />
  ) : null
}
