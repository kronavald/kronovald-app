import { Outlet } from "react-router"

import { AppFooter } from "./app-footer"
import { AppHeader } from "./app-header"

export function AppLayout() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <AppHeader />
            <Outlet />
            <AppFooter />
        </div>
    )
}
