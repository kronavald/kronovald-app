import { Hero } from "@/components/hero"
import { useTranslation } from "react-i18next"

export default function Home() {
    const { t } = useTranslation("translation")
    return (
        <>
            <title>{t("title")}</title>
            <Hero />
        </>
    )
}
