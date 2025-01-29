import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    return (
        <div className="control-group">
            <div className="button-group">
                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    variant={editor.isActive("bold") ? "destructive" : "default"}
                >
                    Bold
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    variant={editor.isActive("italic") ? "destructive" : "default"}
                >
                    Italic
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    variant={editor.isActive("strike") ? "destructive" : "default"}
                >
                    Strike
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    variant={editor.isActive("code") ? "destructive" : "default"}
                >
                    Code
                </Button>
                <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</Button>
                <Button onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</Button>
                <Button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    variant={editor.isActive("paragraph") ? "destructive" : "default"}
                >
                    Paragraph
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    variant={editor.isActive("heading", { level: 1 }) ? "destructive" : "default"}
                >
                    H1
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    variant={editor.isActive("heading", { level: 2 }) ? "destructive" : "default"}
                >
                    H2
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    variant={editor.isActive("heading", { level: 3 }) ? "destructive" : "default"}
                >
                    H3
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    variant={editor.isActive("heading", { level: 4 }) ? "destructive" : "default"}
                >
                    H4
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    variant={editor.isActive("heading", { level: 5 }) ? "destructive" : "default"}
                >
                    H5
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    variant={editor.isActive("heading", { level: 6 }) ? "destructive" : "default"}
                >
                    H6
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    variant={editor.isActive("bulletList") ? "destructive" : "default"}
                >
                    Bullet list
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    variant={editor.isActive("orderedList") ? "destructive" : "default"}
                >
                    Ordered list
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    variant={editor.isActive("codeBlock") ? "destructive" : "default"}
                >
                    Code block
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    variant={editor.isActive("blockquote") ? "destructive" : "default"}
                >
                    Blockquote
                </Button>
                <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal rule</Button>
                <Button onClick={() => editor.chain().focus().setHardBreak().run()}>Hard break</Button>
                <Button onClick={() => editor.chain().focus().undo().run()}>Undo</Button>
                <Button onClick={() => editor.chain().focus().redo().run()}>Redo</Button>
            </div>
        </div>
    )
}

export default ({ content = "" }: { content?: string }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        editorProps: {
            attributes: {
                spellcheck: "false",
                class: "height: 100%; background-color: red;",
            },
        },
    })

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Menu Bar</CardTitle>
                    <MenuBar editor={editor} />
                    <CardDescription>Tiptapovoe</CardDescription>
                </CardHeader>
                <CardContent>
                    <EditorContent editor={editor} />
                </CardContent>
                <CardFooter>
                    <p>Footer</p>
                </CardFooter>
            </Card>
        </>
    )
}
