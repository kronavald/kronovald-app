export function debounce(func: any, wait: number) {
    let timeout: number
    return function (...args: any[]) {
        clearTimeout(timeout)
        // @ts-expect-error
        timeout = setTimeout(() => func.apply(this, args), wait)
    }
}
