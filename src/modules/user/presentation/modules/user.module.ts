import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../infrastructure/database/user.schema";
import { UserService } from "../../application/services/user.service";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { CreateUserHandler } from "../../application/handlers/create-user.handler";
import { GetUserHandler } from "../../application/handlers/get-user.handler";
import { UserController } from "../controllers/user.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { GetUserByFilterHandler } from "../../application/handlers/get-user-by-filter.handler";
import { SendWelcomeMsgHandler } from "../../application/handlers/user-welcome.handler";
import { AddUserTodoListsHandller } from "../../application/handlers/add-user-todo-lists.handller";
import { AuthModule } from '../../../auth/presentation/modules/auth.module';
import { TodoListModule } from '../../../todo-list/presentation/modules/todo-list.module';
import { TodoItemModule } from '../../../todo-item/presentation/modules/todo-item.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        CqrsModule,
        forwardRef(() => AuthModule),
        forwardRef(() => TodoListModule),
        forwardRef(() => TodoItemModule),

    ],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository,
        CreateUserHandler,
        GetUserHandler,
        GetUserByFilterHandler,
        SendWelcomeMsgHandler,
        AddUserTodoListsHandller
    ],
    exports: [UserService]
})
export class UserModule { }