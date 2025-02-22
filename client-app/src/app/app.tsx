import { BrowserRouter, Route, Routes } from "react-router"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { FilesExplorer } from "@/features/documents/components/files-explorer"
import { TextDocumentForm } from "@/features/documents/components/text-document-form"
import { TextDocumentPage } from "@/features/documents/pages/text-document-page"
import { ErrorPage } from "@/features/errors/error-page"

import { UIThemeProvider } from "@/shared/theme/ui-theme-provider"

import "./app.css"
import "./i18n"

const queryClient = new QueryClient({})

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UIThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<TextDocumentPage contentElement={<FilesExplorer />} />}
                            errorElement={<ErrorPage />}
                        >
                            <Route path=":fileId" element={<TextDocumentForm />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UIThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
