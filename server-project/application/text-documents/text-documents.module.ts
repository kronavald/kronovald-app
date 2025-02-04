import { Module } from "@nestjs/common"
import { TextDocumentsService } from "./text-documents.service"
import { TextDocumentsController } from "./text-documents.controller"
import { PrismaService } from "application/prisma.service"

@Module({
    controllers: [TextDocumentsController],
    providers: [TextDocumentsService, PrismaService],
})
export class TextDocumentsModule {}
