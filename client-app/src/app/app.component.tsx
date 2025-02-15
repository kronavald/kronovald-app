import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Route, BrowserRouter, Routes } from "react-router"
import { ErrorPage } from "@/features/error-page/error-page.component"
import { ProjectEditingPage } from "@/features/project-editing-page/project-editing-page.component"
import { TextDocumentForm } from "@/features/project-editing-page/text-document/text-document-form.component"
import { UIThemeProvider } from "@/shared/theme/ui-theme-provider.component"

import "./i18n.config"
import "./app.component.css"

const queryClient = new QueryClient({})

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UIThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ProjectEditingPage />} errorElement={<ErrorPage />}>
                            <Route path=":fileId" element={<TextDocumentForm />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UIThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
