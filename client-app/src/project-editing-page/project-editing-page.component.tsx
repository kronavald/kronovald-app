import { ModeToggle } from "@/components/mode-toggle"
import { ProjectFilesExplorer } from "@/project-editing-page/project-files-explorer/project-files-explorer.component"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/ui-kit/breadcrumb.component"
import { Button } from "@/ui-kit/button.component"
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
} from "@/ui-kit/sidebar.component"
import { Separator } from "@radix-ui/react-separator"
import { Github } from "lucide-react"
import { ComponentProps } from "react"
import { Outlet, useParams } from "react-router"

export function ProjectEditingPage() {
    const { fileId } = useParams()

    const props: ComponentProps<typeof Sidebar> = {}

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon" {...props}>
                <SidebarContent>
                    <ProjectFilesExplorer />
                </SidebarContent>
                <SidebarFooter>
                    <div className="flex justify-between gap-4">
                        <Button size={"icon"} className="rounded-full">
                            <a href="https://github.com/kronavald/kronovald" target="_blank" rel="noreferrer">
                                <Github />
                            </a>
                        </Button>
                        <ModeToggle />
                    </div>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/">Files</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{fileId?.slice(1)}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}
