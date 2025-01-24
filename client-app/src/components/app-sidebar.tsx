import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Github,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { LanguageSelector } from "./language-selector"
import { Button } from "./ui/button"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Separator } from "@radix-ui/react-separator"
import { ModeToggle } from "./mode-toggle"
import { t } from "i18next"

// This is sample data.
const data = {
    navMain: [
        {
            title: "Files",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "file1",
                    url: "file1",
                },
                {
                    title: "file2",
                    url: "file2",
                },
                {
                    title: "file3",
                    url: "file3",
                },
                {
                    title: "file4",
                    url: "file4",
                },
                {
                    title: "file5",
                    url: "file5",
                },
                {
                    title: "file6",
                    url: "file6",
                },
                {
                    title: "file7",
                    url: "file7",
                },
                { title: "file8", url: "file8" },
                {
                    title: "file9",
                    url: "file9",
                },
                { title: "file10", url: "file10" },
                { title: "file11", url: "file11" },
                { title: "file12", url: "file12" },
                { title: "file13", url: "file13" },
                { title: "file14", url: "file14" },
                { title: "file15", url: "file15" },
                { title: "file16", url: "file16" },
                { title: "file17", url: "file17" },
                { title: "file18", url: "file18" },
                { title: "file19", url: "file19" },
                { title: "file20", url: "file20" },
                { title: "file21", url: "file21" },
                { title: "file22", url: "file22" },
                {
                    title: "file1",
                    url: "file1",
                },
                {
                    title: "file2",
                    url: "file2",
                },
                {
                    title: "file3",
                    url: "file3",
                },
                {
                    title: "file4",
                    url: "file4",
                },
                {
                    title: "file5",
                    url: "file5",
                },
                {
                    title: "file6",
                    url: "file6",
                },
                {
                    title: "file7",
                    url: "file7",
                },
                { title: "file8", url: "file8" },
                {
                    title: "file9",
                    url: "file9",
                },
                { title: "file10", url: "file10" },
                { title: "file11", url: "file11" },
                { title: "file12", url: "file12" },
                { title: "file13", url: "file13" },
                { title: "file14", url: "file14" },
                { title: "file15", url: "file15" },
                { title: "file16", url: "file16" },
                { title: "file17", url: "file17" },
                { title: "file18", url: "file18" },
                { title: "file19", url: "file19" },
                { title: "file20", url: "file20" },
                { title: "file21", url: "file21" },
                { title: "file22", url: "file22" },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { t } = useTranslation()

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <h1 className="font-bold center text-center">
                    <Link
                        to="/about"
                        className="hover:text-blue-500 transition-colors duration-300"
                    >
                        {t("slogan")}{" "}
                    </Link>
                </h1>
            </SidebarHeader>
            <Separator orientation="horizontal" className="my-1" />
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <div className="flex justify-between gap-4">
                    <Button size={"icon"} className="rounded-full">
                        <a
                            href="https://github.com/kronavald/kronovald"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Github />
                        </a>
                    </Button>
                    <ModeToggle />
                    <LanguageSelector />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
