import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Route, BrowserRouter, Routes } from "react-router"
import ErrorPage from "./components/error-page"
import { ThemeProvider } from "./components/theme-provider"
import Home from "./pages/home"
import FileEditor from "./pages/home/FileEditor"
import About from "./pages/about"

const queryClient = new QueryClient({})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
                            <Route path=":fileId" element={<FileEditor />} />
                        </Route>
                        <Route path="about" element={<About />} errorElement={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default App
