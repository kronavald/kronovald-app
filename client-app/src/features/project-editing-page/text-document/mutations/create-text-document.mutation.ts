import { useQueryClient, useMutation } from "@tanstack/react-query"
import { TextDocumentQueryKeys } from "../model/text-document.query-keys"
import { TextDocumentStore } from "../text-document.store"

export function useCreateTextDocumentMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TextDocumentQueryKeys.detail("new")],
        mutationFn: TextDocumentStore.create,
        onSuccess: (data) => {
            // Optionally, you can also update the detail query for the newly created file
            queryClient.setQueryData([TextDocumentQueryKeys.detail(data.id)], data)
        },
        onSettled: () => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [TextDocumentQueryKeys.lists()] })
        },
    })
}
