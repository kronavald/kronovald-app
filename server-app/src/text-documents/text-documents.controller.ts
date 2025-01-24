import { Controller, Get, Body, Patch, Param, Post, Delete } from "@nestjs/common"
import { TextDocumentsService } from "./text-documents.service"
import { Prisma } from "@prisma/client"

@Controller("text-documents")
export class TextDocumentsController {
    constructor(private readonly textDocumentsService: TextDocumentsService) {}

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.textDocumentsService.findOne({ id: Number(id) })
    }

    @Get()
    findAll() {
        return this.textDocumentsService.findAll({})
    }

    @Post()
    create(@Body() data: Prisma.TextDocumentCreateInput) {
        return this.textDocumentsService.create(data)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() data: Prisma.TextDocumentUpdateInput) {
        return this.textDocumentsService.update({ where: { id: Number(id) }, data })
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.textDocumentsService.remove({ id: Number(id) })
    }
}
