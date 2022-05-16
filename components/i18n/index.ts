import i18n, { use } from "i18next"
import {
  initReactI18next,
  AllowedLocaleKeys,
  AppResources,
} from "react-i18next"

import commonEn from "public/locales/en/common.json"
import commonIt from "public/locales/it/common.json"

const resources: Record<AllowedLocaleKeys, AppResources> = {
  en: {
    common: commonEn,
  },
  it: {
    common: commonIt,
  },
}

use(initReactI18next).init({
  resources,
  lng: "en",
  defaultNS: "common",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
