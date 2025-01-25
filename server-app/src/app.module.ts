import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TextDocumentsModule } from "./text-documents/text-documents.module"
import { ConfigModule } from "@nestjs/config"
import { UsersModule } from './users/users.module';

@Module({
    imports: [ConfigModule.forRoot(), TextDocumentsModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
