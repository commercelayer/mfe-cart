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

  useEffect(() => {
    if (!embedded) {
      return
    }

    window.addEventListener("keydown", sendEventClose)
    window.addEventListener("blur", sendEventBlur)
    return () => {
      window.removeEventListener("keydown", sendEventClose)
      window.removeEventListener("blur", sendEventBlur)
    }
  }, [embedded])

  useLayoutEffect(() => {
    if (!embedded) {
      return
    }

    window.iFrameResizer = {
      onMessage: ({ type }) => {
        if (type === "updateCart") {
          window.reloadOrderCallback && window.reloadOrderCallback()
        }
      },
    }
  }, [embedded])

  return (
    <>
      <Helmet>
        {isEmbedded() && (
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.js"
            data-test-id="iframe-resizer-script"
            type="text/javascript"
          />
        )}
      </Helmet>
    </>
  )
}

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
