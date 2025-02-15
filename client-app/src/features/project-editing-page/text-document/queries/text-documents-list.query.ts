import { useQuery } from "@tanstack/react-query"
import { TextDocumentStore } from "../text-document.store"
import { TextDocumentQueryKeys } from "@/features/project-editing-page/text-document/model/text-document.query-keys"

export function useAllFilesListQuery() {
    return useQuery({
        queryKey: [TextDocumentQueryKeys.lists()],
        queryFn: TextDocumentStore.all,
    })
}
