import { Route, Routes } from "react-router"
import { TextDocumentPage } from "./pages/text-document-page"
import { ErrorPage } from "../errors/error-page"
import { TextDocumentForm } from "./components/text-document-form"

export function TextDocumentModule() {
    return (
        <Routes>
            <Route path='/' element={<TextDocumentPage />} errorElement={<ErrorPage />}>
                <Route path=":fileId" element={<TextDocumentForm />} />
            </Route>
        </Routes>
    )
}
