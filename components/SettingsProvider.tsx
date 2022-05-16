import { InvalidSettings, Settings } from "HostedApp"
import { changeLanguage } from "i18next"
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { parseLanguageCode } from "./i18n/parseLanguageCode"

import { getAccessTokenFromUrl } from "#utils/getAccessTokenFromUrl"
import { defaultSettings, getSettings } from "#utils/getSettings"

type SettingsProviderValue = {
  settings: Settings | InvalidSettings
  isLoading: boolean
}

interface SettingsProviderProps {
  orderId: string
  children: ((props: SettingsProviderValue) => ReactNode) | ReactNode
}

const initialValues: SettingsProviderValue = {
  settings: defaultSettings,
  isLoading: true,
}

export const SettingsContext =
  createContext<SettingsProviderValue>(initialValues)

export const useSettings = (): SettingsProviderValue => {
  const ctx = useContext(SettingsContext)
  return {
    settings: ctx.settings,
    isLoading: !!ctx.isLoading,
  }
}

export const SettingsProvider: FC<SettingsProviderProps> = ({
  orderId,
  children,
}) => {
  const [settings, setSettings] = useState<Settings | InvalidSettings>(
    defaultSettings
  )
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = getAccessTokenFromUrl()

  useEffect(() => {
    setIsLoading(!!accessToken)

    if (accessToken) {
      getSettings({ orderId, accessToken })
        .then(setSettings)
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [accessToken])

  // keep i18n in sync
  useEffect(() => {
    if (settings.language) {
      changeLanguage(parseLanguageCode(settings.language))
    }
  }, [settings.language])

  const value = { settings, isLoading }
  return (
    <SettingsContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </SettingsContext.Provider>
  )
}
