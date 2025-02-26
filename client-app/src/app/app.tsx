import "@/shared/i18n/i18n"
import "./app.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { UIThemeProvider } from "@/shared/theme/ui-theme-provider"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"

import { AppLayout } from "@/app/components/app-layout"
import { TextDocumentModule } from "@/features/documents"

const queryClient = new QueryClient({})

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UIThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route index element={<Navigate to="/documents" replace />} />
                            <Route path="/documents/*" element={<TextDocumentModule />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UIThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
