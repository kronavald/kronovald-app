import { UIThemeSelector } from "@/shared/theme/ui-theme-selector"
import { FilesExplorer } from "@/features/documents/components/files-explorer"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/shared/ui/breadcrumb"
import { Button } from "@/shared/ui/button"
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
} from "@/shared/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { SiGithub } from '@icons-pack/react-simple-icons'
import { ComponentProps } from "react"
import { Outlet, useParams } from "react-router"

export function TextDocumentPage() {
    const { fileId } = useParams()

    const props: ComponentProps<typeof Sidebar> = {}

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon" {...props}>
                <SidebarContent>
                    <FilesExplorer />
                </SidebarContent>
                <SidebarFooter>
                    <div className="flex justify-between gap-4">
                        <Button size={"icon"} className="rounded-full">
                            <a href="https://github.com/kronavald/kronovald" target="_blank" rel="noreferrer">
                                <SiGithub />
                            </a>
                        </Button>
                        <UIThemeSelector />
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
