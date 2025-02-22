import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function concatClassNames(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const cn = concatClassNames

export function convertBase64ToBlob(base64: string) {
    const arr = base64.split(",")
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

export function debounce(func: any, wait: number) {
    let timeout: number
    return function (...args: any[]) {
        clearTimeout(timeout)
        // @ts-expect-error
        timeout = window.setTimeout(() => func.apply(this, args), wait)
    }
}
