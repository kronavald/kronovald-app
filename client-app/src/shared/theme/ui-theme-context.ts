import { createContext } from "react"

import { UITheme } from "./ui-theme.types"

type UIThemeState = {
    uiTheme: UITheme
    setUITheme: (theme: UITheme) => void
}

export const UI_THEME_INITIAL_STATE: UIThemeState = {
    uiTheme: "system",
    setUITheme: () => null,
}

export const UIThemeProviderContext = createContext<UIThemeState>(UI_THEME_INITIAL_STATE)
