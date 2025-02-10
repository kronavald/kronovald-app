import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Route, BrowserRouter, Routes } from "react-router"
import { ErrorPage } from "./error-page/error-page.component"
import { ThemeProvider } from "./components/theme-provider"
import { HomePage } from "./home-page/home-page.component"
import { FileEditorWrapper } from "./pages/home/FileEditor"
import "@/application.component.css"

const queryClient = new QueryClient({})

export function Application() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} errorElement={<ErrorPage />}>
                            <Route path=":fileId" element={<FileEditorWrapper />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
