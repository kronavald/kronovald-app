import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Route, BrowserRouter, Routes } from "react-router"
// import { router } from "./router"
import { ThemeProvider } from "./components/theme-provider"
import Home from "./pages/home"
import SomeFile from "./pages/home/Editorch"

const queryClient = new QueryClient({})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />}>
                            <Route path=":fileId" element={<SomeFile />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default App
