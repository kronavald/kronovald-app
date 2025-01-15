const apiUrl = "/api"

// Define a default query function that will receive the query key
export const defaultQueryFn = async ({
    queryKey,
    fetchOptions,
}: {
    queryKey: string[]
    fetchOptions?: RequestInit
}) => {
    const response = await fetch(`${apiUrl}${queryKey[0]}`, fetchOptions)
    return await response.json()
}
