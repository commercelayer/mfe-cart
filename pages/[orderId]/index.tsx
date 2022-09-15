import { GlobalStylesProvider } from "@commercelayer/react-utils"
import type { NextPage } from "next"
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"

import { GoogleTagManager } from "#components/GoogleTagManager"
import { PageHead } from "#components/PageHead"
import { SettingsError } from "#components/SettingsError"
import { SettingsProvider } from "#components/SettingsProvider"
import { Skeleton } from "#components/Skeleton"
import { isEmbedded } from "#utils/isEmbedded"

const LazyCart = dynamic(() => import("#components/Cart"), {
  loading: function LoadingSkeleton() {
    return <Skeleton />
  },
})

const CartPage: NextPage = () => {
  const { query } = useRouter()
  const { t } = useTranslation()
  const orderId = query.orderId as string | undefined

  if (!orderId) {
    // first render
    return <Skeleton />
  }

  return (
    <SettingsProvider orderId={orderId}>
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
              <LazyCart />
            </>
          )}
        </GlobalStylesProvider>
      )}
    </SettingsProvider>
  )
}

export default CartPage
