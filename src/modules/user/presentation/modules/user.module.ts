import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../infrastructure/database/user.schema";
import { UserService } from "../../application/services/user.service";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { UserController } from "../controllers/user.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from '../../../auth/presentation/modules/auth.module';
import { TodoListModule } from '../../../todo-list/presentation/modules/todo-list.module';
import { TodoItemModule } from '../../../todo-item/presentation/modules/todo-item.module';
import { UserCommandHandlers, UserEventHandlers, UserQueryHandlers } from "../../application/handlers";

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
        ...UserCommandHandlers,
        ...UserQueryHandlers,
        ...UserEventHandlers,
    ],
    exports: [UserService]
})
export class UserModule { }