import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import "../styles/globals.css"
import "components/i18n"
import Script from "next/script"

import { isEmbedded } from "#utils/isEmbedded"

function App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : (
        <>
          {
            isEmbedded() ? (
              <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.js"
                strategy="afterInteractive"
                data-test-id="iframe-resizer-script"
              />
            ) : null // disabling ssr
          }
          <Component {...pageProps} />
        </>
      )}
    </div>
  )
}

export default appWithTranslation(App)
