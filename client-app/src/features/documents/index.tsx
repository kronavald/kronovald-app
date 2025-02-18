import { Route } from "react-router"
import { ErrorPage } from "@/features/errors/error-page"
import { TextDocumentPage } from "./pages/text-document-page"
import { TextDocumentForm } from "./components/text-document-form"

export function Documents() {
    return (
        <Route path="/" element={<TextDocumentPage />} errorElement={<ErrorPage />}>
            <Route path=":fileId" element={<TextDocumentForm />} />
        </Route>
    )
}
