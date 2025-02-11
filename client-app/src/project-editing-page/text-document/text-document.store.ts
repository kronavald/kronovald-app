import { ITextDocument } from "@/project-editing-page/text-document/text-document.entity"

export const TextDocumentStore = {
    async create(content: string): Promise<ITextDocument> {
        const response = await fetch(`/api/text-documents`, {
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({ content }),
        })

        return response.json()
    },

    async all(): Promise<ITextDocument[]> {
        const response = await fetch(`/api/text-documents/`, {
            method: "GET",
        })

        return response.json()
    },

    async one(id: string): Promise<ITextDocument> {
        const response = await fetch(`/api/text-documents/${id}`, {
            method: "GET",
        })

        return response.json()
    },

    async update(id: string, values: ITextDocument): Promise<ITextDocument> {
        const response = await fetch(`/api/text-documents/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify(values),
        })

        return response.json()
    },

    async delete(id: string): Promise<ITextDocument> {
        const response = await fetch(`/api/text-documents/${id}`, {
            method: "DELETE",
        })

        return response.json()
    },
} as const
