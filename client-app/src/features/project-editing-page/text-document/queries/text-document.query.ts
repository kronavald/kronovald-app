import { useQueryClient, useQuery } from "@tanstack/react-query"
import { TextDocumentQueryKeys } from "../model/text-document.query-keys"
import { TextDocument } from "../model/text-document.model"
import { TextDocumentStore } from "../text-document.store"

export function useTextDocumentQuery(id: string, enabled?: boolean) {
    const queryClient = useQueryClient()

    return useQuery({
        queryKey: [TextDocumentQueryKeys.detail(id)],
        queryFn: () => TextDocumentStore.one(id),
        initialData: () => {
            const filesList = queryClient.getQueryData<TextDocument[]>([TextDocumentQueryKeys.lists()])

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
