import { useQueryClient, useQuery } from "@tanstack/react-query"
import { TextDocumentCacheRegistry } from "../entities/text-document-cache-registry.entity"
import { ITextDocument } from "../entities/text-document.entity"
import { TextDocumentStore } from "../text-document.store"

export function useTextDocumentQuery(id: string, enabled?: boolean) {
    const queryClient = useQueryClient()

    return useQuery({
        queryKey: [TextDocumentCacheRegistry.detail(id)],
        queryFn: () => TextDocumentStore.one(id),
        initialData: () => {
            const filesList = queryClient.getQueryData<ITextDocument[]>([TextDocumentCacheRegistry.lists()])

            if (!filesList) {
                return null
            }

            const target = filesList.find((file) => String(file.id) === id)

            if (!target) {
                return null
            }

            return target
        },
        enabled,
    })
}
