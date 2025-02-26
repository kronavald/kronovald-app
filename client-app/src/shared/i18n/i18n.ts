import i18n from "i18next"
import httpBackend from "i18next-http-backend"
import languageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
]

i18n.use(httpBackend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: LANGUAGES.map((l) => l.code),
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    })

export { i18n, LANGUAGES }
