import i18n, { use } from "i18next"
import {
  initReactI18next,
  AllowedLocaleKeys,
  AppResources,
} from "react-i18next"

import commonDe from "#assets/locales/de/common.json"
import commonEn from "#assets/locales/en/common.json"
import commonHu from "#assets/locales/hu/common.json"
import commonIt from "#assets/locales/it/common.json"
import commonPl from "#assets/locales/pl/common.json"

const resources: Record<AllowedLocaleKeys, AppResources> = {
  en: {
    common: commonEn,
  },
  it: {
    common: commonIt,
  },
  de: {
    common: commonDe,
  },
  pl: {
    common: commonPl,
  },
  hu: {
    common: commonHu,
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
