import { GlobalStylesProvider } from "@commercelayer/react-utils"
import type { GetServerSidePropsContext, NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

import nextI18NextConfig from "../../next-i18next.config.js"

import { PageHead } from "#components/PageHead"
import { SettingsProvider } from "#components/SettingsProvider"
import { Skeleton } from "#components/Skeleton"

const LazyCart = dynamic(() => import("#components/Cart"), {
  loading: function LoadingSkeleton() {
    return <Skeleton />
  },
})

const CartPage: NextPage<{ orderId: string }> = ({ orderId }) => {
  return (
    <SettingsProvider orderId={orderId}>
      {({ settings, isLoading }) =>
        isLoading ? (
          <Skeleton />
        ) : !settings.isValid ? (
          <div>404?</div>
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

export const getServerSideProps = async ({
  locale = "en",
  params,
}: GetServerSidePropsContext) => {
  return {
    props: {
      orderId: params?.orderId,
      ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig)),
    },
  }
}
