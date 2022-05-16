import { AllowedLocaleKeys } from "react-i18next"

type ApiLanguageCode = "en" | "it"

const langs: Record<ApiLanguageCode, AllowedLocaleKeys> = {
  en: "en",
  it: "it",
}

export const parseLanguageCode = (apiLanguageCode: string) =>
  langs[apiLanguageCode as ApiLanguageCode] || langs.en
