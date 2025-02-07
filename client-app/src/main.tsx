import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app.component"

const rootElement = document.getElementById("root")

if (rootElement === null) throw new Error("Invalid document!")

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
