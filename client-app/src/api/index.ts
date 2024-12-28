const apiUrl = "/api"

// Define a default query function that will receive the query key
export const defaultQueryFn = async ({ queryKey }: { queryKey: string[] }) => {
    const response = await fetch(`${apiUrl}${queryKey[0]}`)
    return await response.json()
}
