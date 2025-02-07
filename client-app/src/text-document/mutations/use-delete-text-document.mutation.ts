import { useQueryClient, useMutation } from "@tanstack/react-query"
import { TextDocumentCacheRegistry } from "../text-document.cache-registry"
import { ITextDocument } from "../text-document.entity"
import { TextDocumentsStore } from "../text-document.store"

export function useDeleteTextDocumentMutation(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TextDocumentCacheRegistry.detail(id)],
        mutationFn: () => TextDocumentsStore.delete(id),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: [TextDocumentCacheRegistry.lists()] })
            await queryClient.cancelQueries({ queryKey: [TextDocumentCacheRegistry.detail(id)] })

            const previousFilesList = queryClient.getQueryData<ITextDocument[]>([TextDocumentCacheRegistry.lists()])
            const deletedFile = queryClient.getQueryData<ITextDocument>([TextDocumentCacheRegistry.detail(id)])

            if (previousFilesList && deletedFile) {
                const newFilesList = previousFilesList.filter((file) => file.id !== id)

                queryClient.setQueryData([TextDocumentCacheRegistry.lists()], newFilesList)

                return { previousFilesList, deletedFile }
            }
        },
        onSuccess: () => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [TextDocumentCacheRegistry.lists()] })
            // Optionally, you can also remove the detail query for the deleted file
            queryClient.removeQueries({ queryKey: TextDocumentCacheRegistry.detail(id), exact: true })
        },
        onError: (_, variables, context) => {
            if (context?.previousFilesList) {
                queryClient.setQueryData([TextDocumentCacheRegistry.lists()], context.previousFilesList)
            }
            if (context?.deletedFile) {
                queryClient.setQueryData(["files", "detail", variables], context.deletedFile)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [TextDocumentCacheRegistry.lists()] })
        },
    })
}
