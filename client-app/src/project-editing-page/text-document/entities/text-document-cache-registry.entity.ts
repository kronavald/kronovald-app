export const TextDocumentCacheRegistry = {
    all: () => ["files"] as const,

    lists: () => [...TextDocumentCacheRegistry.all(), "list"] as const,

    list: (filters: string) => [...TextDocumentCacheRegistry.lists(), { filters }] as const,

    details: () => [...TextDocumentCacheRegistry.all(), "detail"] as const,

    detail: (id: string) => [...TextDocumentCacheRegistry.details(), id] as const,
} as const
