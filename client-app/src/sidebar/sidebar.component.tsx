import { Github, SquareTerminal } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "@/ui-kit/button.component"
import {
    useSidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenuSkeleton,
    SidebarFooter,
    SidebarRail,
    Sidebar as BaseSidebar,
} from "@/ui-kit/sidebar.component"
import { useTextDocumentsListQuery } from "@/text-document/queries/use-text-documents-list.query"
import { UIThemeSelector } from "@/ui-theme-selector/ui-theme-selector.component"
import { Navigation } from "../navigation/navigation.component"

export function Sidebar({ ...props }: React.ComponentProps<typeof BaseSidebar>) {
    const { t } = useTranslation()
    const { open } = useSidebar()

    const { data: files, isLoading } = useTextDocumentsListQuery()

    const navFilesItems = files
        ? [...files.map((file) => ({ title: String(file.id), url: `/:${file.id}` })), { title: "New", url: ":new" }]
        : [{ title: "New", url: ":new" }]

    const navFilesData = [{ title: "Files", url: "#", icon: SquareTerminal, isActive: true, items: navFilesItems }]

    return (
        <BaseSidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <h1 className="font-bold center text-center">
                    <Link to="/about" className="hover:text-blue-500 transition-colors duration-300">
                        {open ? t("slogan") : null}{" "}
                    </Link>
                </h1>
            </SidebarHeader>
            <Separator orientation="horizontal" className="my-1" />
            <SidebarContent>{isLoading ? <SidebarMenuSkeleton /> : <Navigation items={navFilesData} />}</SidebarContent>
            <SidebarFooter>
                <div className="flex justify-between gap-4">
                    <Button size={"icon"} className="rounded-full">
                        <a href="https://github.com/kronavald/kronovald" target="_blank" rel="noreferrer">
                            <Github />
                        </a>
                    </Button>
                    <UIThemeSelector />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </BaseSidebar>
    )
}
