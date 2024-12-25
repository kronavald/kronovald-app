import { Controller, Get, Body, Patch } from "@nestjs/common"
import { TextDocumentsService } from "./text-documents.service"
import { UpdateTextDocumentDto } from "./dto/update-text-document.dto"
import { FileNotExistsError } from "./entities/file-not-exists.class"

@Controller("text-documents")
export class TextDocumentsController {
    constructor(private readonly textDocumentsService: TextDocumentsService) {}

    @Get()
    findOne() {
        try {
            return this.textDocumentsService.findOne()
        } catch (error) {
            if (error instanceof FileNotExistsError) {
                this.textDocumentsService.create({ blob: "" })
                return this.textDocumentsService.findOne()
            } else throw error
        }
    }

    @Patch()
    update(@Body() updateTextDocumentDto: UpdateTextDocumentDto) {
        try {
            this.textDocumentsService.update(updateTextDocumentDto)
            return this.textDocumentsService.findOne()
        } catch (error) {
            if (error instanceof FileNotExistsError) {
                this.textDocumentsService.create({
                    blob: updateTextDocumentDto.blob,
                })
                return this.textDocumentsService.findOne()
            } else throw error
        }
    }
}
