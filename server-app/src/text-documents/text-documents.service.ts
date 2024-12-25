import { Injectable } from "@nestjs/common"
import { CreateTextDocumentDto } from "./dto/create-text-document.dto"
import { UpdateTextDocumentDto } from "./dto/update-text-document.dto"
import { writeFileSync, mkdirSync, readFileSync } from "node:fs"
import { dirname } from "node:path"
import { FileNotExistsError } from "./entities/file-not-exists.class"

const filepath = "./.temp/file.txt"

@Injectable()
export class TextDocumentsService {
    create(createTextDocumentDto: CreateTextDocumentDto) {
        mkdirSync(dirname(filepath), { recursive: true })

        writeFileSync(filepath, createTextDocumentDto?.blob ?? "", {
            encoding: "utf-8",
        })
    }

    findAll() {
        return `This action returns all textDocuments`
    }

    /** @throws {FileNotExistsError} */
    findOne() {
        try {
            return {
                blob: readFileSync(filepath, {
                    encoding: "utf-8",
                }),
            }
        } catch (error) {
            if (error?.code === "ENOENT") throw new FileNotExistsError()
            else throw error
        }
    }

    /** @throws {FileNotExistsError} */
    update(updateTextDocumentDto: UpdateTextDocumentDto) {
        try {
            writeFileSync(filepath, updateTextDocumentDto.blob, {
                encoding: "utf-8",
            })
        } catch (error) {
            if (error?.code === "ENOENT") throw new FileNotExistsError()
            else throw error
        }
    }

    remove(id: number) {
        return `This action removes a #${id} textDocument`
    }
}
