import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Route, BrowserRouter, Routes } from "react-router"
import Home from "./pages/home"
// import FileEditor from "./pages/home/FileEditor"
import ErrorPage from "./components/error-page"
import About from "./pages/about"

const queryClient = new QueryClient({})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
                        {/* <Route path=":fileId" element={<FileEditor />} /> */}
                    </Route>
                    <Route path="about" element={<About />} errorElement={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default App
