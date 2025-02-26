import { NavLink } from "react-router"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/shared/ui/sidebar"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"

import { ChevronRight, SquareTerminal } from "lucide-react"

import { useTextDocumentListQuery } from "../services/text-document-queries"

export function FilesExplorer() {
    const { data: files, isLoading } = useTextDocumentListQuery()

    const placeholderForNewFile = { title: "New", url: "new" }

    const navFilesItems = files
        ? [...files.map((file) => ({ title: file.id, url: `/documents/${file.id}` })), placeholderForNewFile]
        : [placeholderForNewFile]

    const navFilesData = [{ title: "Files", url: "#", icon: SquareTerminal, isActive: true, items: navFilesItems }]

    return isLoading ?
            <SidebarMenuSkeleton />
        :   <SidebarGroup>
                <SidebarGroupLabel>Project</SidebarGroupLabel>
                <SidebarMenu>
                    {navFilesData.map((item) => (
                        <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <NavLink to={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </NavLink>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
}
