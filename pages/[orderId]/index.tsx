import { GlobalStylesProvider } from "@commercelayer/react-utils"
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"

import { PageHead } from "#components/PageHead"
import { Redirect } from "#components/Redirect"
import { SettingsProvider } from "#components/SettingsProvider"
import { Skeleton } from "#components/Skeleton"

const LazyCart = dynamic(() => import("#components/Cart"), {
  loading: function LoadingSkeleton() {
    return <Skeleton />
  },
})

const CartPage: NextPage = () => {
  const { query } = useRouter()
  const orderId = query.orderId as string | undefined

  if (!orderId) {
    // first render
    return <Skeleton />
  }

  return (
    <SettingsProvider orderId={orderId}>
      {({ settings, isLoading }) =>
        isLoading ? (
          <Skeleton />
        ) : !settings.isValid ? (
          <Redirect to="/404" />
        ) : (
          <GlobalStylesProvider primaryColor={settings.primaryColor}>
            <PageHead faviconUrl={settings.favicon} />
            <LazyCart />
          </GlobalStylesProvider>
        )
      }
    </SettingsProvider>
  )
}

export default CartPage
