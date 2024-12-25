import { Module } from "@nestjs/common"
import { TextDocumentsService } from "./text-documents.service"
import { TextDocumentsController } from "./text-documents.controller"

@Module({
    controllers: [TextDocumentsController],
    providers: [TextDocumentsService],
})
export class TextDocumentsModule {}
