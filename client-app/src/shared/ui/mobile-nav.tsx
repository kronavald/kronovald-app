import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/shared/ui/sheet"
import { cn } from "@/shared/utils"
import { Menu } from "lucide-react"
import { Link, LinkProps } from "react-router"
import { Button, ButtonProps, buttonVariants } from "./button"
import { Separator } from "./separator"

export interface MobileMenuProps {
    side?: "left" | "right"
    title?: string
    trigger?: React.ReactNode
    children: React.ReactNode
    className?: string
}

const MobileMenu = ({ side = "left", title, trigger, children, className }: MobileMenuProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {trigger ? (
                    trigger
                ) : (
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "[&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 -ml-2 mr-2 h-8 w-8",
                            className,
                        )}
                    >
                        <Menu />
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent side={side} className="p-4">
                {title && <SheetTitle className="mb-4">{title}</SheetTitle>}
                <nav className="flex flex-col space-y-2">{children}</nav>
            </SheetContent>
        </Sheet>
    )
}

export interface MobileMenuItemProps extends ButtonProps {}

const MobileMenuItem = ({ className, ...rest }: MobileMenuItemProps) => {
    return <Button variant="ghost" className={cn("justify-start text-left", className)} {...rest} />
}

export interface MobileMenuLinkProps extends LinkProps {
    className?: string
}

const MobileMenuLink = ({ to, children, className, ...props }: MobileMenuLinkProps) => {
    return (
        <Link
            to={to}
            className={cn(buttonVariants({ variant: "ghost" }), "justify-start text-left ", className)}
            {...props}
        >
            {children}
        </Link>
    )
}

const MobileMenuSeparator = () => {
    return <Separator />
}

export { MobileMenu, MobileMenuItem, MobileMenuLink, MobileMenuSeparator }
