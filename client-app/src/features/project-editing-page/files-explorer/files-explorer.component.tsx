import { ChevronRight, SquareTerminal } from "lucide-react"
import { useAllFilesListQuery } from "@/features/project-editing-page/text-document/queries/text-documents-list.query"
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
} from "@/shared/ui/sidebar/sidebar.component"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible"
import { NavLink } from "react-router"

export function FilesExplorer() {
    const { data: files, isLoading } = useAllFilesListQuery()

    const placeholderForNewFile = { title: "New", url: ":new" }

    const navFilesItems = files
        ? [...files.map((file) => ({ title: file.id, url: `/:${file.id}` })), placeholderForNewFile]
        : [placeholderForNewFile]

    const navFilesData = [{ title: "Files", url: "#", icon: SquareTerminal, isActive: true, items: navFilesItems }]

    return isLoading ? (
        <SidebarMenuSkeleton />
    ) : (
        <SidebarGroup>
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
    )
}
