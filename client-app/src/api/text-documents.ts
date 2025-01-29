import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query"

interface ITextDocument {
    id: number
    content: string
}

// api methods
// create text-document
export const createFile = async (content: string): Promise<ITextDocument> =>
    fetch(`/api/text-documents`, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ content }),
    }).then((res) => res.json())

// find text-document (id:1)
export const getAllFiles = async (): Promise<ITextDocument[]> =>
    fetch(`/api/text-documents/`, {
        method: "GET",
    }).then((res) => res.json())

// find text-document (id:1)
export const getFileById = async (id: string): Promise<ITextDocument> =>
    fetch(`/api/text-documents/${id}`, {
        method: "GET",
    }).then((res) => res.json())

// update text-document (id:1)
export const updateFile = async (id: string, content: string): Promise<ITextDocument> =>
    fetch(`/api/text-documents/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ content }),
    }).then((res) => res.json())

// delete text-document (id:1)
export const deleteFile = async (id: string): Promise<ITextDocument> =>
    fetch(`/api/text-documents/${id}`, {
        method: "DELETE",
    }).then((res) => res.json())

// queries
export const fileKeys = {
    all: ["files"] as const,

    lists: () => [...fileKeys.all, "list"] as const,

    list: (filters: string) => [...fileKeys.lists(), { filters }] as const,

    details: () => [...fileKeys.all, "detail"] as const,

    detail: (id: number) => [...fileKeys.details(), id] as const,
}

// пока что без фильтрации
export const useFilesListQuery = () => {
    return useQuery({
        queryKey: [fileKeys.lists()],
        queryFn: getAllFiles,
    })
}

export const useFileQuery = (id: string, enabled?: boolean) => {
    console.log("id: ", id, `enabled: `, enabled)

    const queryClient = useQueryClient()
    return useQuery({
        queryKey: [fileKeys.detail(Number(id))],
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
        mutationFn: createFile,
        onSuccess: (data) => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["files", "list"] })
            // Optionally, you can also update the detail query for the newly created file
            queryClient.setQueryData(["files", "detail", String(data.id)], data)
        },
        onMutate: async (newContent) => {
            await queryClient.cancelQueries({ queryKey: ["files", "list"] })
            const previousFiles = queryClient.getQueryData<ITextDocument[]>(["files", "list"])

            if (previousFiles) {
                const newFile = { id: Date.now(), content: newContent }
                queryClient.setQueryData(["files", "list"], [...previousFiles, newFile])

                return { previousFiles }
            }
        },
        onError: (err, variables, context) => {
            if (context?.previousFiles) {
                queryClient.setQueryData(["files", "list"], context.previousFiles)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["files", "list"] })
        },
    })
}

export const useUpdateFileMutation = (id: string, data: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => updateFile(id, data),
        onSuccess: (data) => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["files", "list"] })
            // Optionally, you can also update the detail query for the updated file
            queryClient.setQueryData(["files", "detail", String(data.id)], data)
        },
        onMutate: async (updatedContent) => {
            const id = typeof updatedContent === "string" ? updatedContent : updatedContent.id
            await queryClient.cancelQueries({ queryKey: ["files", "list"] })
            const previousFiles = queryClient.getQueryData<ITextDocument[]>(["files", "list"])

            if (previousFiles) {
                const targetIndex = previousFiles.findIndex((file) => String(file.id) === id)
                if (targetIndex !== -1) {
                    const updatedFile = {
                        ...previousFiles[targetIndex],
                        content: typeof updatedContent === "string" ? updatedContent : updatedContent.content,
                    }
                    queryClient.setQueryData(
                        ["files", "list"],
                        [...previousFiles.slice(0, targetIndex), updatedFile, ...previousFiles.slice(targetIndex + 1)],
                    )
                }

                return { previousFiles }
            }
        },
        onError: (err, variables, context) => {
            if (context?.previousFiles) {
                queryClient.setQueryData(["files", "list"], context.previousFiles)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["files", "list"] })
        },
    })
}
export const useDeleteFileMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteFile(id),
        onSuccess: (data, variables) => {
            // Invalidate the files list query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["files", "list"] })
            // Optionally, you can also remove the detail query for the deleted file
            queryClient.removeQueries(["files", "detail", variables.id])
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["files", "list"] })
            const previousFiles = queryClient.getQueryData<ITextDocument[]>(["files", "list"])

            if (previousFiles) {
                const targetIndex = previousFiles.findIndex((file) => String(file.id) === id)
                if (targetIndex !== -1) {
                    const deletedFile = previousFiles[targetIndex]
                    queryClient.setQueryData(
                        ["files", "list"],
                        [...previousFiles.slice(0, targetIndex), ...previousFiles.slice(targetIndex + 1)],
                    )

                    return { previousFiles, deletedFile }
                }
            }
        },
        onError: (err, variables, context) => {
            if (context?.previousFiles) {
                queryClient.setQueryData(["files", "list"], context.previousFiles)
            }
            if (context?.deletedFile) {
                queryClient.setQueryData(["files", "detail", variables], context.deletedFile)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["files", "list"] })
        },
    })
}
