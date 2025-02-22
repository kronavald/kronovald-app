import { useCallback, useState } from "react"

import { useNavigate, useParams } from "react-router"

import { TextEditor } from "@/features/documents/components/text-editor"

import { Button } from "@/shared/ui/button"

import { Loader2 } from "lucide-react"

import {
    useTextDocumentCreateMutation,
    useTextDocumentDeleteMutation,
    useTextDocumentUpdateMutation,
} from "../services/text-document-mutations"
import { useTextDocumentQuery } from "../services/text-document-queries"

import { debounce } from "@/shared/utils"

const PARAM_NEW = "new"

export function TextDocumentForm() {
    const { fileId } = useParams()

    if (!fileId) throw new Error("fileId is undefined")

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <section className="flex w-full flex-col items-center justify-center py-32 md:py-48">
                    <h1>{fileId}</h1>
                    <TextDocumentFormInternal id={fileId} />
                </section>
            </div>
        </div>
    )
}

function TextDocumentFormInternal({ id }: { id: string }) {
    const navigate = useNavigate()
    const [content, setContent] = useState("")

    const { data, isFetching } = useTextDocumentQuery(id, id !== undefined && id !== PARAM_NEW)

    const handleChange = useCallback(
        debounce((newContent: string) => setContent(newContent), 300),
        [],
    )

    const createFile = useTextDocumentCreateMutation()
    const updateFile = useTextDocumentUpdateMutation(id)
    const deleteFile = useTextDocumentDeleteMutation(id)

    return (
        <>
            <div>{isFetching && <Loader2 className="animate-spin" />}</div>
            <div>{data && `Data from API: ${data?.content}`}</div>
            <div>{`Local state: ${content}`}</div>
            {id === PARAM_NEW && <TextEditor onChange={handleChange} initialContent={"New file content"} />}
            {data && <TextEditor onChange={handleChange} initialContent={data.content} />}
            <div className="mt-2 flex flex-row gap-2">
                {id === PARAM_NEW ?
                    <Button
                        onClick={() =>
                            createFile.mutate(content, {
                                onSuccess: (data) => navigate(`/${data.id}`),
                            })
                        }
                        disabled={createFile.isPending}
                    >
                        {createFile.isPending ?
                            <Loader2 />
                        :   "Create"}
                    </Button>
                :   <>
                        <Button
                            onClick={() => updateFile.mutate({ id: data!.id, content })}
                            disabled={updateFile.isPending || data?.id === undefined}
                        >
                            {updateFile.isPending ?
                                <Loader2 />
                            :   "Update"}
                        </Button>
                        <Button
                            onClick={() =>
                                deleteFile.mutate(undefined, {
                                    onSuccess: () => navigate("/new"),
                                })
                            }
                            disabled={deleteFile.isPending || data?.id === undefined}
                        >
                            {deleteFile.isPending ?
                                <Loader2 />
                            :   "Delete"}
                        </Button>
                    </>
                }
            </div>
        </>
    )
}
