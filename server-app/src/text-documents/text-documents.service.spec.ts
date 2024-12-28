import { Test, TestingModule } from "@nestjs/testing"
import { TextDocumentsService } from "./text-documents.service"

describe("TextDocumentsService", () => {
    let service: TextDocumentsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TextDocumentsService],
        }).compile()

        service = module.get<TextDocumentsService>(TextDocumentsService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
