import { Settings } from "HostedApp"
import { FC, useEffect } from "react"
import TagManager from "react-gtm-module"

type Props = Pick<Settings, "gtmId">

export const GoogleTagManager: FC<Props> = ({ gtmId }) => {
  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({ gtmId })
    }
  }, [gtmId])

  return null
}
