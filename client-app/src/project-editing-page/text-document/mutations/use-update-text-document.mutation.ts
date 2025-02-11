import { useQueryClient, useMutation } from "@tanstack/react-query"
import { TextDocumentCacheRegistry } from "../entities/text-document-cache-registry.entity"
import { ITextDocument } from "../entities/text-document.entity"
import { TextDocumentStore } from "../text-document.store"

export function useUpdateTextDocumentMutation(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TextDocumentCacheRegistry.detail(id)],
        mutationFn: (data: ITextDocument) => TextDocumentStore.update(data.id, data),
        onMutate: async (updatedContent) => {
            const id = updatedContent.id
            await queryClient.cancelQueries({ queryKey: [TextDocumentCacheRegistry.lists()] })
            await queryClient.cancelQueries({ queryKey: [TextDocumentCacheRegistry.detail(id)] })

            const previousFilesList = queryClient.getQueryData<ITextDocument[]>([TextDocumentCacheRegistry.lists()])
            const previousFile = queryClient.getQueryData<ITextDocument>([TextDocumentCacheRegistry.detail(id)])

            if (previousFilesList) {
                const newFilesList = [...previousFilesList.filter((file) => file.id !== id), updatedContent]

                queryClient.setQueryData([TextDocumentCacheRegistry.lists()], newFilesList)
                queryClient.setQueryData([TextDocumentCacheRegistry.detail(id)], updatedContent)

                return { previousFilesList, previousFile }
            }
        },
        onSuccess: (data) => {
            // Optionally, you can also update the detail query for the updated file
            queryClient.setQueryData([TextDocumentCacheRegistry.detail(data.id)], data)
        },
        onError: (_, __, context) => {
            if (context?.previousFilesList) {
                queryClient.setQueryData([TextDocumentCacheRegistry.lists()], context.previousFilesList)
            }
            if (context?.previousFile) {
                queryClient.setQueryData(
                    [TextDocumentCacheRegistry.detail(context.previousFile.id)],
                    context.previousFile
                )
            }
        },
        onSettled: (_, __, variables) => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [TextDocumentCacheRegistry.lists()] })
            // Invalidate the file query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [TextDocumentCacheRegistry.detail(variables.id)] })
        },
    })
}
