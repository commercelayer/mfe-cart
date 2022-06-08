import { FC, useEffect } from "react"
import TagManager from "react-gtm-module"

type Props = {
  gtmId?: string
}

export const GoogleTagManager: FC<Props> = ({ gtmId }) => {
  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({ gtmId })
    }
  }, [gtmId])

  return null
}
