import type { AllowedLocaleKeys } from "react-i18next"

type ApiLanguageCode = "en" | "it" | "de" | "pl" | "hu" | "pt" | "nl" | "es" | "fr" | "hr" | "sl"

const langs: Record<ApiLanguageCode, AllowedLocaleKeys> = {
  en: "en",
  it: "it",
  de: "de",
  pl: "pl",
  hu: "hu",
  pt: "pt",
  nl: "nl",
  es: "es",
  fr: "fr",
  hr: "hr",
  sl: "sl",
}

export const parseLanguageCode = (apiLanguageCode: string) =>
  langs[apiLanguageCode as ApiLanguageCode] || langs.en
