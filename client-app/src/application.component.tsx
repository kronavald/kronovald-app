import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Route, BrowserRouter, Routes } from "react-router"
import { ErrorPage } from "./error-page/error-page.component"
import { ThemeProvider } from "./components/theme-provider"
import { ProjectEditingPage } from "./project-editing-page/project-editing-page.component"
import { FileEditor } from "./project-editing-page/file-editor/file-editor.component"
import "@/application.component.css"

const queryClient = new QueryClient({})

export function Application() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ProjectEditingPage />} errorElement={<ErrorPage />}>
                            <Route path=":fileId" element={<FileEditor />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
