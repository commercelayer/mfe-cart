import { AllowedLocaleKeys } from "react-i18next"

type ApiLanguageCode = "en" | "it" | "de" | "pl" | "hu"

const langs: Record<ApiLanguageCode, AllowedLocaleKeys> = {
  en: "en",
  it: "it",
  de: "de",
  pl: "pl",
  hu: "hu",
}

export const parseLanguageCode = (apiLanguageCode: string) =>
  langs[apiLanguageCode as ApiLanguageCode] || langs.en
