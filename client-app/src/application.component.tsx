import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Route, BrowserRouter, Routes } from "react-router"
import { ErrorPage } from "./error-page/error-page.component"
import { ProjectEditingPage } from "./project-editing-page/project-editing-page.component"
import { TextDocumentForm } from "./project-editing-page/text-document/text-document-form.component"
import "@/application.component.css"
import { UIThemeProvider } from "./ui-theme-provider/ui-theme-provider.component"

const queryClient = new QueryClient({})

export function Application() {
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
