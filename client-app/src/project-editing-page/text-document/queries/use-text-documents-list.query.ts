import { useQuery } from "@tanstack/react-query"
import { TextDocumentStore } from "../text-document.store"
import { TextDocumentCacheRegistry } from "@/project-editing-page/text-document/entities/text-document-cache-registry.entity"

export function useAllFilesListQuery() {
    return useQuery({
        queryKey: [TextDocumentCacheRegistry.lists()],
        queryFn: TextDocumentStore.all,
    })
}
