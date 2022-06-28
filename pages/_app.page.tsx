import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import "../styles/globals.css"
import "components/i18n"

function App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : <Component {...pageProps} />}
    </div>
  )
}

export default appWithTranslation(App)
