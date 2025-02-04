export interface ITextDocument {
    id: string
    content: string
}

// create text-document
export const createFile = async (content: string): Promise<ITextDocument> =>
    fetch(`/api/text-documents`, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ content }),
    })
        .then((res) => res.json())
        .then((data) => ({
            id: String(data.id),
            content: data.content,
        }))

// find text-document (id:1)
export const getAllFiles = async (): Promise<ITextDocument[]> =>
    fetch(`/api/text-documents/`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) =>
            data.map((file: { id: number; content: string }) => ({ id: String(file.id), content: file.content })),
        )

// find text-document (id:1)
export const getFileById = async (id: string): Promise<ITextDocument> =>
    fetch(`/api/text-documents/${id}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => ({
            id: String(data.id),
            content: data.content,
        }))

// update text-document (id:1)
export const updateFile = async (id: string, content: string): Promise<ITextDocument> =>
    fetch(`/api/text-documents/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ content }),
    })
        .then((res) => res.json())
        .then((data) => ({
            id: String(data.id),
            content: data.content,
        }))

// delete text-document (id:1)
export const deleteFile = async (id: string): Promise<ITextDocument> =>
    fetch(`/api/text-documents/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => ({
            id: String(data.id),
            content: data.content,
        }))
