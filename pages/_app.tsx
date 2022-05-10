import type { AppProps } from "next/app"
import "../styles/globals.css"

function CartApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default CartApp
