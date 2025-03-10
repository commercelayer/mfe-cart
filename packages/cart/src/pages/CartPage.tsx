import { Suspense, lazy } from "react"
import { useTranslation } from "react-i18next"
import { useRoute } from "wouter"
import { GoogleTagManager } from "#components/GoogleTagManager"
import { InjectCssCustomProperties } from "#components/InjectCssCustomProperties/index"
import { PageHead } from "#components/PageHead"
import { SettingsError } from "#components/SettingsError"
import { SettingsProvider } from "#components/SettingsProvider"
import { Skeleton } from "#components/Skeleton"
import { isEmbedded } from "#utils/isEmbedded"

const LazyCart = lazy(() => import("#components/Cart"))

function CartPage(): JSX.Element {
  const [, params] = useRoute("/:orderId")

  const { t } = useTranslation()
  const orderId = params?.orderId

  const appConfig = {
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
    <SettingsProvider orderId={orderId} appConfig={appConfig}>
      {({ settings, isLoading }) => (
        <>
          <InjectCssCustomProperties primaryColor={settings.primaryColor} />
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
        </>
      )}
    </SettingsProvider>
  )
}

export default CartPage
