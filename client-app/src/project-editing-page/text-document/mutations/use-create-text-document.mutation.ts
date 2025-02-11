import { useQueryClient, useMutation } from "@tanstack/react-query"
import { TextDocumentCacheRegistry } from "../entities/text-document-cache-registry.entity"
import { TextDocumentStore } from "../text-document.store"

export function useCreateTextDocumentMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TextDocumentCacheRegistry.detail("new")],
        mutationFn: TextDocumentStore.create,
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
