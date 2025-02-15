import { cn } from "@/shared/helpers/concat-class-names.helper"

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />
}
