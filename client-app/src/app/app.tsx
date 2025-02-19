import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { UIThemeProvider } from "@/shared/theme/ui-theme-provider"
import { BrowserRouter, Route, Routes } from "react-router"
import { TextDocumentPage } from "@/features/documents/pages/text-document-page"
import { ErrorPage } from "@/features/errors/error-page"
import { TextDocumentForm } from "@/features/documents/components/text-document-form"

import "./i18n"
import "./app.css"

const queryClient = new QueryClient({})

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UIThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TextDocumentPage />} errorElement={<ErrorPage />}>
                            <Route path=":fileId" element={<TextDocumentForm />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UIThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
