import { GlobalStylesProvider } from "@commercelayer/react-utils"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { useRoute } from "wouter"

import { GoogleTagManager } from "#components/GoogleTagManager"
import { PageHead } from "#components/PageHead"
import { RuntimeConfigProvider } from "#components/RuntimeConfigProvider"
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

  if (!orderId) {
    // first render
    return <Skeleton />
  }

  return (
    <RuntimeConfigProvider>
      {(config) => (
        <SettingsProvider orderId={orderId} config={config}>
          {({ settings, isLoading }) => (
            <GlobalStylesProvider primaryColor={settings.primaryColor}>
              {isLoading ? (
                <Skeleton />
              ) : !settings.isValid ? (
                <SettingsError
                  retryable={settings.retryable}
                  isEmbedded={isEmbedded()}
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
      )}
    </RuntimeConfigProvider>
  )
}

export default CartPage
