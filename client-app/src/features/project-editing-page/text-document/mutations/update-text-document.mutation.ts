import { useQueryClient, useMutation } from "@tanstack/react-query"
import { TextDocumentQueryKeys } from "../model/text-document.query-keys"
import { TextDocument } from "../model/text-document.model"
import { TextDocumentStore } from "../text-document.store"

export function useUpdateTextDocumentMutation(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TextDocumentQueryKeys.detail(id)],
        mutationFn: (data: TextDocument) => TextDocumentStore.update(data.id, data),
        onMutate: async (updatedContent) => {
            const id = updatedContent.id
            await queryClient.cancelQueries({ queryKey: [TextDocumentQueryKeys.lists()] })
            await queryClient.cancelQueries({ queryKey: [TextDocumentQueryKeys.detail(id)] })

            const previousFilesList = queryClient.getQueryData<TextDocument[]>([TextDocumentQueryKeys.lists()])
            const previousFile = queryClient.getQueryData<TextDocument>([TextDocumentQueryKeys.detail(id)])

            if (previousFilesList) {
                const newFilesList = [...previousFilesList.filter((file) => file.id !== id), updatedContent]

                queryClient.setQueryData([TextDocumentQueryKeys.lists()], newFilesList)
                queryClient.setQueryData([TextDocumentQueryKeys.detail(id)], updatedContent)

                return { previousFilesList, previousFile }
            }
        },
        onSuccess: (data) => {
            // Optionally, you can also update the detail query for the updated file
            queryClient.setQueryData([TextDocumentQueryKeys.detail(data.id)], data)
        },
        onError: (_, __, context) => {
            if (context?.previousFilesList) {
                queryClient.setQueryData([TextDocumentQueryKeys.lists()], context.previousFilesList)
            }
            if (context?.previousFile) {
                queryClient.setQueryData(
                    [TextDocumentQueryKeys.detail(context.previousFile.id)],
                    context.previousFile
                )
            }
        },
        onSettled: (_, __, variables) => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [TextDocumentQueryKeys.lists()] })
            // Invalidate the file query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [TextDocumentQueryKeys.detail(variables.id)] })
        },
    })
}
