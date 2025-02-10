/// @ts-expect-error Sanya, pochini facking i18n
import translation from "../i18n/locales/en/translation.json"
/// @ts-expect-error Sanya, pochini facking i18n
import notfound from "../i18n/locales/en/notfound.json"

const resources = {
    notfound,
    translation,
} as const

export default resources
