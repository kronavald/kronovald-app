import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { UIThemeProvider } from "@/shared/theme/ui-theme-provider"
import { BrowserRouter, Routes } from "react-router"
import { Documents } from "@/features/documents"

import "./i18n"
import "./app.component.css"

const queryClient = new QueryClient({})

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UIThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Documents />
                    </Routes>
                </BrowserRouter>
            </UIThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
