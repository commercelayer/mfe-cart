import { useEffect } from "react"

import { isEmbedded } from "#utils/isEmbedded"

function sendEventClose(e: KeyboardEvent) {
  if (e.key === "Escape") {
    window.parentIFrame?.sendMessage({ type: "close" }, "*")
  }
}

function sendEventBlur() {
  window.parentIFrame?.sendMessage({ type: "blur" }, "*")
}

export function useSendEmbeddedEvents() {
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
  return null
}
