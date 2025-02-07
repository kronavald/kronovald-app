const API_URL = "/api"

/** Define a default query function that will receive the query key */
export async function fetchByQueryKeys(queryKeys: string[], fetchOptions?: RequestInit) {
    const response = await fetch(`${API_URL}${queryKeys[0]}`, fetchOptions)

    return await response.json()
}
