import { Button } from "@/shared/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"

import { useTranslation } from "react-i18next"
import { LANGUAGES } from "./i18n"

export function LanguageSelector() {
    const { i18n } = useTranslation()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    {i18n.language}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {LANGUAGES.map((l) => (
                    <DropdownMenuItem key={l.code} onClick={() => i18n.changeLanguage(l.code)}>
                        {l.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
