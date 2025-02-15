import { useCallback, useState } from "react"
import { TextEditor } from "@/features/shared/text-editor/text-editor.component"
import { Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router"
import { debounce } from "@/shared/helpers/debounce.helper"
import { Button } from "@/shared/ui/button.component"
import { useCreateTextDocumentMutation } from "./mutations/create-text-document.mutation"
import { useDeleteTextDocumentMutation } from "./mutations/delete-text-document.mutation"
import { useUpdateTextDocumentMutation } from "./mutations/update-text-document.mutation"
import { useTextDocumentQuery } from "./queries/text-document.query"

const PARAM_NEW = "new"

export function TextDocumentForm() {
    const { fileId } = useParams()

    if (!fileId) throw new Error("fileId is undefined")

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <section className="w-full py-32 md:py-48 flex flex-col items-center justify-center">
                    <h1>{fileId}</h1>
                    <TextDocumentFormInternal id={fileId.slice(1)} />
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

    const createFile = useCreateTextDocumentMutation()
    const updateFile = useUpdateTextDocumentMutation(id)
    const deleteFile = useDeleteTextDocumentMutation(id)

    return (
        <>
            <div>{isFetching && <Loader2 className="animate-spin" />}</div>
            <div>{data && `Data from API: ${data?.content}`}</div>
            <div>{`Local state: ${content}`}</div>
            {id === PARAM_NEW && <TextEditor onChange={handleChange} initialContent={"New file content"} />}
            {data && <TextEditor onChange={handleChange} initialContent={data.content} />}
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
