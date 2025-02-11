import { createContext } from "react"
import { TInputThemeTypes } from "./theme-types.entity"

type TState = {
    theme: TInputThemeTypes
    setTheme: (theme: TInputThemeTypes) => void
}

const INITIAL_STATE: TState = {
    theme: "system",
    setTheme: () => null,
}

export const UIThemeProviderContext = createContext<TState>(INITIAL_STATE)
