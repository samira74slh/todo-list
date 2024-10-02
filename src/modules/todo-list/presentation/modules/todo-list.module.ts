import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"; import { AuthModule } from "src/modules/auth/presentation/modules/auth.module";
import { CqrsModule, QueryHandler } from "@nestjs/cqrs";
import { TodoListController } from "../controllers/todo-list.controller";
import { TodoList, TodoListSchema } from "../../infrastructure/database/todo-list.schema";
import { TodoListService } from "../../application/services/todo-list.service";
import { TodoListRepository } from "../../infrastructure/repositories/todo-list.repository";
import { CreateTodoListHandler } from "../../application/handlers/create-todo-list.handler";
import { GetTodoListsHandler } from "../../application/handlers/get-todo-lists.handler";
import { GetTodoListByIdHandler } from "../../application/handlers/get-todo-list.handler";
import { UpdateTodoListHandler } from "../../application/handlers/update-todo-list.handler";
import { DeleteTodoListHandler } from "../../application/handlers/delete-todo-list.handler";
import { UserModule } from "src/modules/user/presentation/modules/user.module";
import { TodoItemModule } from "src/modules/todo-item/presentation/modules/todo-item.module";
import { CreateTodoListSagas } from "../../application/sagas/create-todo-list.saga";
import { CommandHandllers, QueryHandllers } from "../../application/handlers";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: TodoList.name, schema: TodoListSchema }]),
        CqrsModule,
        forwardRef(() => UserModule),
        forwardRef(() => TodoItemModule)

    ],
    controllers: [TodoListController],
    providers: [
        TodoListService,
        TodoListRepository,
        CreateTodoListSagas,
        ...CommandHandllers,
        ...QueryHandllers
    ],
    exports: [TodoListService]
})
export class TodoListModule { }