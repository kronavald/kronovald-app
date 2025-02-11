import { Button } from "@/ui-kit/button.component"
import { useTranslation } from "react-i18next"
import { Link, useRouteError } from "react-router"

export function ErrorPage() {
    const error = useRouteError() as any
    const { t } = useTranslation("notfound")

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-left">
            <h1>{t("oops")}</h1>
            <p>{t("title")}</p>
            <p className="font-mono">
                <span className="mr-2">{error?.status}</span>
                <i>{error?.statusText || error?.message}</i>
            </p>
            <Button>
                <Link to="/">{t("backtohomepage")}</Link>
            </Button>
        </div>
    )
}
