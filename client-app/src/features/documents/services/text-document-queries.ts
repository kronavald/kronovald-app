import { useQuery, useQueryClient } from "@tanstack/react-query"

import { TextDocument } from "../model/text-document-model"
import { TextDocumentQueryKeys } from "./text-document-query-keys"
import { TextDocumentApi } from "./text-documents-api"

export function useTextDocumentQuery(id: string, enabled?: boolean) {
    const queryClient = useQueryClient()

    return useQuery({
        queryKey: [TextDocumentQueryKeys.detail(id)],
        queryFn: () => TextDocumentApi.getById(id),
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

export function useTextDocumentListQuery() {
    return useQuery({
        queryKey: [TextDocumentQueryKeys.lists()],
        queryFn: TextDocumentApi.get,
    })
}
