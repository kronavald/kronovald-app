import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFile, deleteFile, getAllFiles, getFileById, updateFile } from "."
import { ITextDocument } from "@/project-editing-page/text-document/text-document.entity"

export const fileKeys = {
    all: ["files"] as const,

    lists: () => [...fileKeys.all, "list"] as const,

    list: (filters: string) => [...fileKeys.lists(), { filters }] as const,

    details: () => [...fileKeys.all, "detail"] as const,

    detail: (id: string) => [...fileKeys.details(), id] as const,
}

// пока что без фильтрации
export const useFilesListQuery = () => {
    return useQuery({
        queryKey: [fileKeys.lists()],
        queryFn: getAllFiles,
    })
}

export const useFileQuery = (id: string, enabled?: boolean) => {
    const queryClient = useQueryClient()

    return useQuery({
        queryKey: [fileKeys.detail(id)],
        queryFn: () => getFileById(id),
        initialData: () => {
            const filesList = queryClient.getQueryData<ITextDocument[]>([fileKeys.lists()])

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

export const useCreateFileMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [fileKeys.detail("new")],
        mutationFn: createFile,
        // onMutate: async (newContent) => {
        //     await queryClient.cancelQueries({ queryKey: [fileKeys.lists()] })
        //     const previousFiles = queryClient.getQueryData<ITextDocument[]>([fileKeys.lists()])

        // if (previousFiles) {
        // оставлю на время для примера
        // const newFile = { id: Date.now(), content: newContent }
        // queryClient.setQueryData([fileKeys.lists()], [...previousFiles, newFile])
        //         return { previousFiles }
        //     }
        // },
        // onError: (err, variables, context) => {
        //     if (context?.previousFiles) {
        //         queryClient.setQueryData([fileKeys.lists()], context.previousFiles)
        //     }
        // },
        onSuccess: (data) => {
            // Optionally, you can also update the detail query for the newly created file
            queryClient.setQueryData([fileKeys.detail(data.id)], data)
        },
        onSettled: () => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [fileKeys.lists()] })
        },
    })
}

export const useUpdateFileMutation = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [fileKeys.detail(id)],
        mutationFn: (data: ITextDocument) => updateFile(data.id, data.content),
        onMutate: async (updatedContent) => {
            const id = updatedContent.id
            await queryClient.cancelQueries({ queryKey: [fileKeys.lists()] })
            await queryClient.cancelQueries({ queryKey: [fileKeys.detail(id)] })

            const previousFilesList = queryClient.getQueryData<ITextDocument[]>([fileKeys.lists()])
            const previousFile = queryClient.getQueryData<ITextDocument>([fileKeys.detail(id)])

            if (previousFilesList) {
                const newFilesList = [...previousFilesList.filter((file) => file.id !== id), updatedContent]

                queryClient.setQueryData([fileKeys.lists()], newFilesList)
                queryClient.setQueryData([fileKeys.detail(id)], updatedContent)

                return { previousFilesList, previousFile }
            }
        },
        onSuccess: (data) => {
            // Optionally, you can also update the detail query for the updated file
            queryClient.setQueryData([fileKeys.detail(data.id)], data)
        },
        onError: (_, __, context) => {
            if (context?.previousFilesList) {
                queryClient.setQueryData([fileKeys.lists()], context.previousFilesList)
            }
            if (context?.previousFile) {
                queryClient.setQueryData([fileKeys.detail(context.previousFile.id)], context.previousFile)
            }
        },
        onSettled: (_, __, variables) => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [fileKeys.lists()] })
            // Invalidate the file query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [fileKeys.detail(variables.id)] })
        },
    })
}

export const useDeleteFileMutation = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [fileKeys.detail(id)],
        mutationFn: () => deleteFile(id),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: [fileKeys.lists()] })
            await queryClient.cancelQueries({ queryKey: [fileKeys.detail(id)] })

            const previousFilesList = queryClient.getQueryData<ITextDocument[]>([fileKeys.lists()])
            const deletedFile = queryClient.getQueryData<ITextDocument>([fileKeys.detail(id)])

            if (previousFilesList && deletedFile) {
                const newFilesList = previousFilesList.filter((file) => file.id !== id)

                queryClient.setQueryData([fileKeys.lists()], newFilesList)

                return { previousFilesList, deletedFile }
            }
        },
        onSuccess: () => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: [fileKeys.lists()] })
            // Optionally, you can also remove the detail query for the deleted file
            queryClient.removeQueries({ queryKey: fileKeys.detail(id), exact: true })
        },
        onError: (_, variables, context) => {
            if (context?.previousFilesList) {
                queryClient.setQueryData([fileKeys.lists()], context.previousFilesList)
            }
            if (context?.deletedFile) {
                queryClient.setQueryData(["files", "detail", variables], context.deletedFile)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [fileKeys.lists()] })
        },
    })
}
