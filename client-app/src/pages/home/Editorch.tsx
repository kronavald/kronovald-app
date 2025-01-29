import { useTranslation } from "react-i18next"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import Editor from "@/components/editor"
import { Loader2 } from "lucide-react"

import { useFileQuery } from "@/api/text-documents"
import { debounce } from "@/lib/utils"
import { useParams } from "react-router"

const PARAM_NEW = "new"

const FileEditorController = ({ id }: { id: string }) => {
    const [content, setContent] = useState("")

    const { data, isSuccess } = useFileQuery(id, id !== undefined && id !== PARAM_NEW)

    const handleChange = useCallback(
        debounce((newContent: string) => {
            setContent(newContent)
        }, 300),
        [],
    )

    return (
        <>
            <div>{data && `Data from back: ${data?.content}`}</div>
            <div>{`Local state: : ${content}`}</div>
            {isSuccess && data?.content && <Editor onChange={handleChange} initialContent={data.content} />}
        </>
    )
}

const FileEditorWrapper = () => {
    const { t } = useTranslation("translation")
    const { fileId } = useParams()

    if (!fileId) {
        throw new Error("fileId is undefined")
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <section className="w-full py-32 md:py-48 flex flex-col items-center justify-center">
                    <h1>{fileId}</h1>
                    <FileEditorController id={fileId.slice(1)} />
                    {/* <Button onClick={() => mutateFile()} disabled={isPending}>
                        {isPending ? <Loader2 /> : "Save"}
                    </Button>
                    {isSuccess && !isSuccessSave && (
                        <div>Initial data from backend: {JSON.stringify(data.content)}</div>
                    )}
                    {isSuccessSave && isSuccess && (
                        <div>Successfully saved to backed data: {JSON.stringify(data.content)}</div>
                    )} */}
                </section>
            </div>
        </div>
    )
}

export default FileEditorWrapper
