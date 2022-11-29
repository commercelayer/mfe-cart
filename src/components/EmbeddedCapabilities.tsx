import useOrderContainer from "@commercelayer/react-components/hooks/useOrderContainer"
import { FC, useEffect, useLayoutEffect } from "react"
import { Helmet } from "react-helmet-async"

import { isEmbedded } from "#utils/isEmbedded"

function sendEventClose(e: KeyboardEvent) {
  if (e.key === "Escape") {
    window.parentIFrame?.sendMessage({ type: "close" }, "*")
  }
}

function sendEventBlur() {
  window.parentIFrame?.sendMessage({ type: "blur" }, "*")
}

const IframeResizerInit: FC = () => {
  const embedded = isEmbedded()

  useEffect(
    function setEventListeners() {
      if (!embedded) {
        return
      }

      window.addEventListener("keydown", sendEventClose)
      window.addEventListener("blur", sendEventBlur)
      return () => {
        window.removeEventListener("keydown", sendEventClose)
        window.removeEventListener("blur", sendEventBlur)
      }
    },
    [embedded]
  )

  useLayoutEffect(
    function initIFrameResizerSettings() {
      if (!embedded) {
        return
      }

      window.iFrameResizer = {
        onMessage: ({ type }) => {
          if (type === "update") {
            // `reloadOrderCallback` will be create insider `<OrderRefresher>` component
            // since we need to access order context that will be available later
            window.reloadOrderCallback && window.reloadOrderCallback()
          }
        },
      }
    },
    [embedded]
  )

  if (!embedded) {
    return null
  }

  return (
    <Helmet>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.js"
        data-test-id="iframe-resizer-script"
        type="text/javascript"
      />
    </Helmet>
  )
}

// This component is only responsible to inject in globalWindow the `reloadOrderCallback` function
// that will be used in the `onMessage` method initialized from iFrameResizer
const OrderRefresher: FC = () => {
  const { order, reloadOrder } = useOrderContainer()

  useLayoutEffect(() => {
    window.reloadOrderCallback = () => {
      reloadOrder()
    }
  }, [order])

  return null
}

export const EmbeddedCapabilities = {
  IframeResizerInit,
  OrderRefresher,
}
