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
  /**
   * Can contains either a valid `Settings` or `InvalidSettings` object.
   * Invalid settings will be returned when part of initial API data fetching fails
   * and it's not possible to show a full cart page.
   */
  settings: Settings | InvalidSettings
  /**
   * When `true` it means that app is fetching content from API and is not ready to return the `Settings` object.
   * It can be used to control the UI state.
   */
  isLoading: boolean
}

type SettingsProviderProps = {
  /**
   * The required Order ID to be used to get cart information and to fill the `Settings` object.
   * Order status must be either `draft` or `pending`, otherwise an `InvalidSettings` object will be returned instead.
   *
   * Read more at {@link https://docs.commercelayer.io/developers/v/how-tos/shopping-cart/create-a-shopping-cart}
   */
  orderId: string
  /**
   * App config served locally from public/config.js
   */
  appConfig: CommerceLayerAppConfig
  /**
   * If needed, context value can be also accessed using a function as a child.
   *
   * Example:
   * ```
   * <SettingsProvider orderId={orderId}>
   *  {(ctx) => <div>cart</div>}
   * </SettingsProvider>
   * ```
   */
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
  appConfig,
}) => {
  const [settings, setSettings] = useState<Settings | InvalidSettings>(
    defaultSettings
  )
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = getAccessTokenFromUrl()

  useEffect(() => {
    setIsLoading(!!accessToken)

    if (accessToken) {
      getSettings({ orderId, accessToken, appConfig })
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
