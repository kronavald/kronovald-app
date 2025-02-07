import { useEffect, useState } from "react"
import { TInputThemeTypes } from "./theme-types.entity"
import { UIThemeProviderContext } from "./ui-theme-provider.context"

type TProps = {
    children: React.ReactNode
    defaultTheme?: TInputThemeTypes
    storageKey?: string
}

export function UIThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }: TProps) {
    const [theme, setTheme] = useState<TInputThemeTypes>(
        () => (localStorage.getItem(storageKey) as TInputThemeTypes) || defaultTheme,
    )

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: TInputThemeTypes) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <UIThemeProviderContext.Provider {...props} value={value}>
            {children}
        </UIThemeProviderContext.Provider>
    )
}
