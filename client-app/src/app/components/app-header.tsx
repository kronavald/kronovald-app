import { Link } from "react-router"

import { UIThemeSelector } from "@/shared/theme/ui-theme-selector"

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { buttonVariants } from "@/shared/ui/button"
import { MobileMenu, MobileMenuItem, MobileMenuLink, MobileMenuSeparator } from "@/shared/ui/mobile-nav"
import {
    NavigationMenu,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu"

import { User } from "lucide-react"

import { Logo, LogoSmall } from "./logo"

import { LanguageSelector } from "@/shared/i18n/language-selector"

export function AppHeader() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background">
            <div className="flex items-center px-3 py-2 sm:px-4 md:px-6">
                <div className="hidden items-center md:flex">
                    <LogoSmall className="size-5" />
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to="/documents">Documents</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuIndicator />
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <MobileMenu title={<Logo className="h-5 w-32" />} side="left" className="mr-4 md:hidden">
                    <MobileMenuLink to="/documents">Documents</MobileMenuLink>
                </MobileMenu>
                <div className="flex flex-1 items-center justify-end gap-2">
                    <LanguageSelector />
                    <UIThemeSelector />
                    <MobileMenu
                        title="User anonimous"
                        side="right"
                        className="mr-4 md:hidden"
                        trigger={
                            <Avatar
                                className={buttonVariants({
                                    variant: "ghost",
                                    size: "avatar",
                                    className: "[&_svg]:size-6 -my-2 cursor-pointer",
                                })}
                            >
                                <AvatarImage src="" alt="" />
                                <AvatarFallback>
                                    <User />
                                </AvatarFallback>
                            </Avatar>
                        }
                    >
                        <MobileMenuLink to="/">Profile</MobileMenuLink>
                        <MobileMenuSeparator />
                        <MobileMenuItem>Logout</MobileMenuItem>
                    </MobileMenu>
                </div>
            </div>
        </header>
    )
}
