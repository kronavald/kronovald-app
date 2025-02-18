export const TextDocumentQueryKeys = {
    all: () => ["text-document"] as const,

    lists: () => [...TextDocumentQueryKeys.all(), "list"] as const,

    list: (filters: string) => [...TextDocumentQueryKeys.lists(), { filters }] as const,

    details: () => [...TextDocumentQueryKeys.all(), "detail"] as const,

    detail: (id: string) => [...TextDocumentQueryKeys.details(), id] as const,
} as const
