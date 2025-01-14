import { useTranslation } from "react-i18next"
import TestComponent from "./TestComponent"

import { useCallback, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Editor from "@/components/editor"
import { Editor as TipTapEditor } from "reactjs-tiptap-editor"

function debounce(func: any, wait: number) {
    let timeout: NodeJS.Timeout
    return function (...args: any[]) {
        clearTimeout(timeout)
        // @ts-expect-error
        timeout = setTimeout(() => func.apply(this, args), wait)
    }
}

export default function Home() {
    const { t } = useTranslation("translation")
    const [content, setContent] = useState("default")

    const editorRef = useRef<{ editor: TipTapEditor } | null>(null)

    const handleChange = useCallback(
        debounce(() => {
            if (editorRef.current?.editor) {
                setContent(editorRef.current.editor.getText())
            }
        }, 300),
        [],
    )

    const handleSave = async () => {
        const response = await fetch("/api/text-documents", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ blob: content }),
        })
        console.log(response)
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-pink-700 to-purple-700">
            <section className="w-full py-32 md:py-48 flex flex-col items-center justify-center">
                <h1 className="text-black">{t("title")}</h1>
                <TestComponent />
                <Editor
                    onChange={handleChange}
                    content={content}
                    ref={editorRef}
                />
                <Button onClick={handleSave}>Save</Button>
            </section>
        </div>
    )
}
