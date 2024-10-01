import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../infrastructure/database/user.schema";
import { UserService } from "../../application/services/user.service";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { CreateUserHandler } from "../../application/handlers/create-user.handler";
import { GetUserHandler } from "../../application/handlers/get-user.handler";
import { UserController } from "../controllers/user.controller";
import { AuthModule } from "src/modules/auth/presentation/modules/auth.module";
import { CqrsModule } from "@nestjs/cqrs";
import { GetUserByFilterHandler } from "../../application/handlers/get-user-by-filter.handler";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        CqrsModule,
        forwardRef(() => AuthModule),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository,
        CreateUserHandler,
        GetUserHandler,
        GetUserByFilterHandler
    ],
    exports: [UserService]
})
export class UserModule { }