import { PartialType } from "@nestjs/mapped-types"
import { CreateTextDocumentDto } from "./create-text-document.dto"

export class UpdateTextDocumentDto extends PartialType(CreateTextDocumentDto) {
    blob: string
}
