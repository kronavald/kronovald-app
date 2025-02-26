import { ComponentProps, ReactNode } from "react"

import { Outlet, useParams } from "react-router"

import { UIThemeSelector } from "@/shared/theme/ui-theme-selector"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb"
import KronovaldGithubButton from "@/shared/ui/kronovald-github-link-button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarInset,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/shared/ui/sidebar"

import { Separator } from "@radix-ui/react-separator"
import { ComponentProps } from "react"
import { Outlet, useParams } from "react-router"
import { GithubIcon } from "@/shared/icons/github-icon"

export function TextDocumentPage({ contentElement }: { contentElement: ReactNode }) {
    const { fileId } = useParams()

    const props: ComponentProps<typeof Sidebar> = {}

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon" {...props}>
                <SidebarContent>{contentElement}</SidebarContent>
                <SidebarFooter>
                    <div className="flex justify-between gap-4">
                        <Button size={"icon"} className="rounded-full">
                            <a href="https://github.com/kronavald/kronovald" target="_blank" rel="noreferrer">
                                <GithubIcon />
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
                                    <BreadcrumbPage>{fileId}</BreadcrumbPage>
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
