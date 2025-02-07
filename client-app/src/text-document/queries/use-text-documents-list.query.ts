import { useQuery } from "@tanstack/react-query"
import { TextDocumentCacheRegistry } from "../text-document.cache-registry"
import { TextDocumentsStore } from "../text-document.store"

export function useTextDocumentsListQuery() {
    return useQuery({
        queryKey: [TextDocumentCacheRegistry.lists()],
        queryFn: TextDocumentsStore.all,
    })
}
