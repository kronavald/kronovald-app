import { Injectable } from "@nestjs/common"
import { PrismaService } from "application/prisma.service"
import { Prisma } from "@prisma/client"

@Injectable()
export class TextDocumentsService {
    constructor(private prisma: PrismaService) {}

    public findOne(where: Prisma.TextDocumentWhereUniqueInput) {
        return this.prisma.textDocument.findUnique({ where })
    }

    public findAll(parameters: {
        skip?: number
        take?: number
        cursor?: Prisma.TextDocumentWhereUniqueInput
        where?: Prisma.TextDocumentWhereInput
        orderBy?: Prisma.TextDocumentOrderByWithRelationInput
    }) {
        const { skip, take, cursor, where, orderBy } = parameters
        return this.prisma.textDocument.findMany({ skip, take, cursor, where, orderBy })
    }

    public create(data: Prisma.TextDocumentCreateInput) {
        return this.prisma.textDocument.create({ data })
    }

    public update(parameters: { where: Prisma.TextDocumentWhereUniqueInput; data: Prisma.TextDocumentUpdateInput }) {
        const { where, data } = parameters

        return this.prisma.textDocument.update({ data, where })
    }

    public remove(where: Prisma.TextDocumentWhereUniqueInput) {
        return this.prisma.textDocument.delete({ where })
    }
}
