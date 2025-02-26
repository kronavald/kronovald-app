import { Route, Routes } from "react-router"

import { ErrorPage } from "../errors/error-page"
import { FilesExplorer } from "./components/files-explorer"
import { TextDocumentForm } from "./components/text-document-form"
import { TextDocumentPage } from "./pages/text-document-page"

export function TextDocumentModule() {
    return (
        <Routes>
            <Route
                path="/"
                element={<TextDocumentPage contentElement={<FilesExplorer />} />}
                errorElement={<ErrorPage />}
            >
                <Route path=":fileId" element={<TextDocumentForm />} />
            </Route>
        </Routes>
    )
}
