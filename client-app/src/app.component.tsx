import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Home } from "lucide-react"
import { Route, BrowserRouter, Routes } from "react-router"
import { UIThemeProvider } from "./ui-theme-provider/ui-theme-provider.component"
import { ErrorPage } from "./error-page/error-page.component"
import "@/app.component.css"
import { TextDocumentEditor } from "./text-document/text-document-editor/text-document-editor.component"

const queryClient = new QueryClient({})

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UIThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
                            <Route path=":fileId" element={<TextDocumentEditor />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UIThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
