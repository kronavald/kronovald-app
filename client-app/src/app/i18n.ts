import { initReactI18next } from "react-i18next"

import i18n from "i18next"
import languageDetector from "i18next-browser-languagedetector"
import httpBackend from "i18next-http-backend"

export const LANGUAGES = ["en", "ru"]

i18n.use(httpBackend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: {
            default: ["en"],
        },
    })

export default i18n
