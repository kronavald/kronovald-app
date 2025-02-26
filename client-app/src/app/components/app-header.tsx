import { LanguageSelector } from "@/shared/i18n/language-selector"
import { UIThemeSelector } from "@/shared/theme/ui-theme-selector"
import {
    NavigationMenu,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu"
import { MobileMenu, MobileMenuItem, MobileMenuLink, MobileMenuSeparator } from "@/shared/ui/mobile-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { User } from "lucide-react"
import { Link } from "react-router"
import { buttonVariants } from "@/shared/ui/button"
import { Logo, LogoSmall } from "./logo"

export function AppHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-grid bg-background">
            <div className="px-3 sm:px-4 md:px-6 py-2 flex items-center">
                <div className="hidden md:flex items-center">
                    <LogoSmall className="w-5 h-5" />
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
                <MobileMenu title={<Logo className="w-32 h-5" />} side="left" className="mr-4 md:hidden">
                    <MobileMenuLink to="/documents">Documents</MobileMenuLink>
                </MobileMenu>
                <div className="flex flex-1 items-center gap-2 justify-end">
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
