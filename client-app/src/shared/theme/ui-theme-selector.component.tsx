import { Moon, Sun } from "lucide-react"
import { Button } from "@/shared/ui/button.component"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useUITheme } from "./use-ui-theme.hook"

export function UIThemeSelector() {
    const { setUITheme } = useUITheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setUITheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUITheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUITheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
