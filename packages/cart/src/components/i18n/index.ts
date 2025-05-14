import i18n, { use } from "i18next"
import {
  type AllowedLocaleKeys,
  type AppResources,
  initReactI18next,
} from "react-i18next"

import commonDe from "#assets/locales/de/common.json"
import commonEn from "#assets/locales/en/common.json"
import commonHu from "#assets/locales/hu/common.json"
import commonIt from "#assets/locales/it/common.json"
import commonNl from "#assets/locales/nl/common.json"
import commonPl from "#assets/locales/pl/common.json"
import commonPt from "#assets/locales/pt/common.json"

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
  pt: {
    common: commonPt,
  },
  nl: {
    common: commonNl,
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
