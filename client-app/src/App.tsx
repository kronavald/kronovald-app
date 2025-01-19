import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ThemeProvider } from "./components/theme-provider"

const queryClient = new QueryClient({})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default App
