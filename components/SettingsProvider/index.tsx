import { Settings } from "HostedApp"
import { createContext, FC, ReactNode, useEffect, useState } from "react"

import { getAccessTokenFromUrl } from "#utils/getAccessTokenFromUrl"
import { getSettings } from "#utils/getSettings"

type SettingsProviderValue = {
  settings: Settings | null
  isLoading: boolean
}

interface SettingsProviderProps {
  orderId: string
  children: ((props: SettingsProviderValue) => ReactNode) | ReactNode
}

const initialValues: SettingsProviderValue = {
  settings: null,
  isLoading: true,
}

export const SettingsContext =
  createContext<SettingsProviderValue>(initialValues)

export const SettingsProvider: FC<SettingsProviderProps> = ({
  orderId,
  children,
}) => {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = getAccessTokenFromUrl()

  useEffect(() => {
    setIsLoading(true)
    if (accessToken) {
      getSettings({ orderId, accessToken })
        .then(setSettings)
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [accessToken])

  const value = { settings, isLoading }
  return (
    <SettingsContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </SettingsContext.Provider>
  )
}
