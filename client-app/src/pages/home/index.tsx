import { useTranslation } from "react-i18next"
import TestComponent from "./TestComponent"

export default function Home() {
    const { t } = useTranslation("translation")
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-pink-700 to-purple-700">
            <section className="w-full py-32 md:py-48 flex flex-col items-center justify-center">
                <h1 className="text-black">{t("title")}</h1>
                <TestComponent />
            </section>
        </div>
    )
}
