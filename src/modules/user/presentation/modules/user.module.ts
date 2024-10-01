import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../infrastructure/database/user.schema";
import { UserService } from "../../application/services/user.service";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { CreateUserHandler } from "../../application/handlers/create-user.handler";
import { GetUserHandler } from "../../application/handlers/get-user.handler";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UserService, UserRepository, CreateUserHandler, GetUserHandler],
    exports: [UserService]
})
export class UserModule { }