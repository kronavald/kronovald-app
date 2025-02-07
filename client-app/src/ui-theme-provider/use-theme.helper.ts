import { useContext } from "react"
import { UIThemeProviderContext } from "./ui-theme-provider.context"

export function useTheme() {
    const context = useContext(UIThemeProviderContext)

    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
