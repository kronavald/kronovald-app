import { Outlet } from "react-router"

import { AppFooter } from "./app-footer"
import { AppHeader } from "./app-header"

export function AppLayout() {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <AppHeader></AppHeader>
            <div className="flex-1 px-3 sm:px-4 md:px-6 py-2">
                <Outlet />
            </div>
            <AppFooter />
        </div>
    )
}
