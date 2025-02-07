import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function concatClassNames(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const cn = concatClassNames
