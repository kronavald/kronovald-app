import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import I18NextHttpBackend from "i18next-http-backend"

export const LANGUAGES = ["en", "ru"]

i18next
    .use(I18NextHttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({ debug: true, fallbackLng: { default: ["en"] } })

export default i18next
