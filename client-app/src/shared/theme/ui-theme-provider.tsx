import { useEffect, useState } from "react"
import { UITheme } from "./ui-theme.types"
import { UIThemeProviderContext, UI_THEME_INITIAL_STATE } from "./ui-theme-context"

type UIThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: UITheme
    storageKey?: string
}

const STORAGE_KEY = "ui-theme"

export function UIThemeProvider({ children, ...props }: UIThemeProviderProps) {
    const [uiTheme, setUITheme] = useState<UITheme>(
        () => (localStorage.getItem(STORAGE_KEY) as UITheme) || UI_THEME_INITIAL_STATE.uiTheme,
    )

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (uiTheme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(uiTheme)
    }, [uiTheme])

    const value = {
        uiTheme,
        setUITheme: (theme: UITheme) => {
            localStorage.setItem(STORAGE_KEY, theme)
            setUITheme(theme)
        },
    }

    return (
        <UIThemeProviderContext.Provider {...props} value={value}>
            {children}
        </UIThemeProviderContext.Provider>
    )
}
