import { SquareTerminal } from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { useFilesListQuery } from "@/api/text-documents/queries"
import { SidebarMenuSkeleton } from "@/ui-kit/sidebar.component"

export function ProjectFilesExplorer() {
    const { data: files, isLoading } = useFilesListQuery()

    const placeholderForNewFile = { title: "New", url: ":new" }

    const navFilesItems = files
        ? [...files.map((file) => ({ title: file.id, url: `/:${file.id}` })), placeholderForNewFile]
        : [placeholderForNewFile]

    const navFilesData = [{ title: "Files", url: "#", icon: SquareTerminal, isActive: true, items: navFilesItems }]

    return isLoading ? <SidebarMenuSkeleton /> : <NavMain items={navFilesData} />
}
