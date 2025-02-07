import { useCallback, useState } from "react"
import { Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router"
import { useTextDocumentQuery } from "@/text-document/queries/use-text-document.query"
import { debounce } from "@/core/debounce.helper"
import { useCreateTextDocumentMutation } from "@/text-document/mutations/use-create-text-document.mutation"
import { useDeleteTextDocumentMutation } from "@/text-document/mutations/use-delete-text-document.mutation"
import { useUpdateTextDocumentMutation } from "@/text-document/mutations/use-update-text-document.mutation"
import { Button } from "@/ui-kit/button.component"
import { Editor } from "@/ui-kit/editor.component"

const PARAM_NEW = "new"

function TextDocumentEditorController({ id }: { id: string }) {
    const navigate = useNavigate()
    const [content, setContent] = useState("")
    const { data, isFetching } = useTextDocumentQuery(id, id !== undefined && id !== PARAM_NEW)
    const handleChange = useCallback(
        debounce((newContent: string) => {
            setContent(newContent)
        }, 300),
        [],
    )
    const createFile = useCreateTextDocumentMutation()
    const updateFile = useUpdateTextDocumentMutation(id)
    const deleteFile = useDeleteTextDocumentMutation(id)

    return (
        <>
            <div>{isFetching && <Loader2 className="animate-spin" />}</div>
            <div>{data && `Data from API: ${data?.content}`}</div>
            <div>{`Local state: ${content}`}</div>
            {id === PARAM_NEW && <Editor onChange={handleChange} initialContent={"New file content"} />}
            {data && <Editor onChange={handleChange} initialContent={data.content} />}
            <div className="mt-2 flex flex-row gap-2">
                {id === PARAM_NEW ? (
                    <Button
                        onClick={() =>
                            createFile.mutate(content, {
                                onSuccess: (data) => navigate(`/:${data.id}`),
                            })
                        }
                        disabled={createFile.isPending}
                    >
                        {createFile.isPending ? <Loader2 /> : "Create"}
                    </Button>
                ) : (
                    <>
                        <Button
                            onClick={() => updateFile.mutate({ id: data!.id, content })}
                            disabled={updateFile.isPending || data?.id === undefined}
                        >
                            {updateFile.isPending ? <Loader2 /> : "Update"}
                        </Button>
                        <Button
                            onClick={() =>
                                deleteFile.mutate(undefined, {
                                    onSuccess: () => navigate("/:new"),
                                })
                            }
                            disabled={deleteFile.isPending || data?.id === undefined}
                        >
                            {deleteFile.isPending ? <Loader2 /> : "Delete"}
                        </Button>
                    </>
                )}
            </div>
        </>
    )
}

export function TextDocumentEditor() {
    const { fileId } = useParams()

    if (!fileId) throw new Error("fileId is undefined")

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <section className="w-full py-32 md:py-48 flex flex-col items-center justify-center">
                    <h1>{fileId}</h1>
                    <TextDocumentEditorController id={fileId.slice(1)} />
                </section>
            </div>
        </div>
    )
}
