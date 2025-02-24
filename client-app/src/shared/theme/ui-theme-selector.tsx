import { Moon, Sun } from "lucide-react"
import { Button, ButtonProps } from "@/shared/ui/button"
import { useUITheme } from "./use-ui-theme"

export interface UIThemeSelectorProps extends ButtonProps {}

export function UIThemeSelector({ variant = "ghost", size = "icon", ...rest }: UIThemeSelectorProps) {
    const { uiTheme, switchUITheme } = useUITheme()

    return (
        <Button variant={variant} size={size} onClick={switchUITheme} {...rest}>
            {uiTheme === "light" ? <Sun /> : <Moon />}
        </Button>
    )
}
