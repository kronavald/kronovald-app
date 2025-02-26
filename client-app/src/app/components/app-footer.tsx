import { GithubIcon } from "@/shared/icons/github-icon"
import { buttonVariants } from "@/shared/ui/button"

export function AppFooter() {
    return (
        <footer className="z-50 border-t border-grid bg-background">
            <div className="px-3 sm:px-4 md:px-6 py-2 md:flex md:items-center md:justify-between">
                <div className="flex justify-center gap-x-6 md:order-2">
                    <a
                        href="https://github.com/kronovald/kronovald"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "avatar",
                            className: "[&_svg]:size-6",
                        })}
                    >
                        <GithubIcon />
                    </a>
                </div>
                <p className="mt-2 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">
                    &copy; 2024-{new Date().getFullYear()} Kronovald team
                </p>
            </div>
        </footer>
    )
}
