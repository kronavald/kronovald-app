import { useEffect, useState } from "react"
import { UITheme } from "./ui-theme.types"
import { UIThemeProviderContext } from "./ui-theme-context"

type UIThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: UITheme
    storageKey?: string
}

const STORAGE_KEY = "ui-theme"

const getInitialTheme = () => {
    try {
        const storedTheme = localStorage.getItem(STORAGE_KEY) as UITheme
        if (storedTheme) return storedTheme
    } catch (e) {
        console.error("Error accessing localStorage", e)
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function UIThemeProvider({ children, ...props }: UIThemeProviderProps) {
    const [uiTheme, setUIThemeState] = useState<UITheme>(getInitialTheme)

    useEffect(() => {
        const root = window.document.documentElement

        if (!root.classList.contains(uiTheme)) {
            root.classList.remove("light", "dark")
            root.classList.add(uiTheme)
        }
    }, [uiTheme])

    const setUITheme = (theme: UITheme) => {
        setUIThemeState(theme)
        try {
            localStorage.setItem(STORAGE_KEY, theme)
        } catch (e) {
            console.error("Error saving to localStorage", e)
        }
    }

    const value = {
        uiTheme,
        setUITheme,
        switchUITheme: () => {
            const newTheme = uiTheme === "dark" ? "light" : "dark"
            setUITheme(newTheme)
        },
    }

    return (
        <UIThemeProviderContext.Provider {...props} value={value}>
            {children}
        </UIThemeProviderContext.Provider>
    )
}
