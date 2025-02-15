import { useQueryClient, useMutation } from "@tanstack/react-query"
import { TextDocumentQueryKeys } from "../model/text-document.query-keys"
import { TextDocument } from "../model/text-document.model"
import { TextDocumentStore } from "../text-document.store"

export function useDeleteTextDocumentMutation(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TextDocumentQueryKeys.detail(id)],
        mutationFn: () => TextDocumentStore.delete(id),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: [TextDocumentQueryKeys.lists()] })
            await queryClient.cancelQueries({ queryKey: [TextDocumentQueryKeys.detail(id)] })

            const previousFilesList = queryClient.getQueryData<TextDocument[]>([TextDocumentQueryKeys.lists()])
            const deletedFile = queryClient.getQueryData<TextDocument>([TextDocumentQueryKeys.detail(id)])

            if (previousFilesList && deletedFile) {
                const newFilesList = previousFilesList.filter((file) => file.id !== id)

                queryClient.setQueryData([TextDocumentQueryKeys.lists()], newFilesList)

                return { previousFilesList, deletedFile }
            }
        },
        onSuccess: () => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [TextDocumentQueryKeys.lists()] })
            // Optionally, you can also remove the detail query for the deleted file
            queryClient.removeQueries({ queryKey: TextDocumentQueryKeys.detail(id), exact: true })
        },
        onError: (_, variables, context) => {
            if (context?.previousFilesList) {
                queryClient.setQueryData([TextDocumentQueryKeys.lists()], context.previousFilesList)
            }
            if (context?.deletedFile) {
                queryClient.setQueryData(["files", "detail", variables], context.deletedFile)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [TextDocumentQueryKeys.lists()] })
        },
    })
}
