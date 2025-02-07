import { useQueryClient, useQuery } from "@tanstack/react-query"
import { TextDocumentCacheRegistry } from "../text-document.cache-registry"
import { ITextDocument } from "../text-document.entity"
import { TextDocumentsStore } from "../text-document.store"

export function useTextDocumentQuery(id: string, enabled?: boolean) {
    const queryClient = useQueryClient()

    return useQuery({
        queryKey: [TextDocumentCacheRegistry.detail(id)],
        queryFn: () => TextDocumentsStore.once(id),
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
