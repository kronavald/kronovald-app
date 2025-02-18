import i18n from "i18next"
import httpBackend from "i18next-http-backend"
import languageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

export const LANGUAGES = ["en", "ru"]

i18n
    .use(httpBackend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: {
            default: ["en"],
        },
    })

export default i18n
