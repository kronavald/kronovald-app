import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TextDocumentsStore } from "../text-document.store"
import { TextDocumentCacheRegistry } from "../text-document.cache-registry"

export function useCreateTextDocumentMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TextDocumentCacheRegistry.detail("new")],
        mutationFn: TextDocumentsStore.create,
        onSuccess: (data) => {
            // Optionally, you can also update the detail query for the newly created file
            queryClient.setQueryData([TextDocumentCacheRegistry.detail(data.id)], data)
        },
        onSettled: () => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [TextDocumentCacheRegistry.lists()] })
        },
    })
}
