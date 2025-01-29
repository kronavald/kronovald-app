import { createBrowserRouter } from "react-router"
import ErrorPage from "./components/error-page"
import HomePage from "./pages/home"
import About from "./pages/about"

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomePage,
        ErrorBoundary: ErrorPage,
    },
    {
        path: "/about",
        Component: About,
        ErrorBoundary: ErrorPage,
    },
])
