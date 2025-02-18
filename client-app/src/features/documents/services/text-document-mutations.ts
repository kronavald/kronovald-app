import { useQueryClient, useMutation } from "@tanstack/react-query"
import { TextDocumentQueryKeys } from "./text-document-query-keys"
import { TextDocumentApi } from "./text-documents-api"
import { TextDocument } from "../model/text-document-model"

export function useTextDocumentCreateMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TextDocumentQueryKeys.detail("new")],
        mutationFn: TextDocumentApi.create,
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

export function useTextDocumentUpdateMutation(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TextDocumentQueryKeys.detail(id)],
        mutationFn: (data: TextDocument) => TextDocumentApi.update(data.id, data),
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

export function useTextDocumentDeleteMutation(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TextDocumentQueryKeys.detail(id)],
        mutationFn: () => TextDocumentApi.delete(id),
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
