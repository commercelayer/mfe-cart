import { FC, useEffect } from "react"
import TagManager from "react-gtm-module"

type Props = {
  /**
   * Google Tag Manager ID (GTM-XXXXXX).
   * When `undefined` the script will not be initialized.
   */
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
