import { GlobalStylesProvider } from "@commercelayer/react-utils"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { useRoute } from "wouter"

import { GoogleTagManager } from "#components/GoogleTagManager"
import { PageHead } from "#components/PageHead"
import { SettingsError } from "#components/SettingsError"
import { SettingsProvider } from "#components/SettingsProvider"
import { Skeleton } from "#components/Skeleton"
import { isEmbedded } from "#utils/isEmbedded"

const LazyCart = lazy(() => import("#components/Cart"))

function CartPage(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [match, params] = useRoute("/:orderId")

  const { t } = useTranslation()
  const orderId = params?.orderId

  const config = {
    ...window.clAppConfig,
    selfHostedSlug:
      // local config is always overwritten by ENV var, if present
      import.meta.env.PUBLIC_SELF_HOSTED_SLUG ??
      window.clAppConfig.selfHostedSlug,
  }

  if (!orderId) {
    // first render
    return <Skeleton />
  }

  return (
    <SettingsProvider orderId={orderId} config={config}>
      {({ settings, isLoading }) => (
        <GlobalStylesProvider primaryColor={settings.primaryColor}>
          {isLoading ? (
            <Skeleton />
          ) : !settings.isValid ? (
            <SettingsError
              isEmbedded={isEmbedded()}
              retryable={settings.retryable}
              redirectTo={settings.redirectTo}
            />
          ) : (
            <>
              <PageHead
                title={`${settings.companyName} - ${t("general.title")}`}
                faviconUrl={settings.faviconUrl}
              />
              <GoogleTagManager gtmId={settings.gtmId} />
              <Suspense fallback={<Skeleton />}>
                <LazyCart />
              </Suspense>
            </>
          )}
        </GlobalStylesProvider>
      )}
    </SettingsProvider>
  )
}

export default CartPage
