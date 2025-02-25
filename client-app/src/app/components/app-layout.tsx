import { Outlet } from "react-router"

import { AppFooter } from "./app-footer"
import { AppHeader } from "./app-header"

export function AppLayout() {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <AppHeader />
            <Outlet />
            <AppFooter />
        </div>
    )
}
