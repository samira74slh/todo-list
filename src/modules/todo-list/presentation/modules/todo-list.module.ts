import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CqrsModule } from "@nestjs/cqrs";
import { TodoListController } from "../controllers/todo-list.controller";
import { TodoList, TodoListSchema } from "../../infrastructure/database/todo-list.schema";
import { TodoListService } from "../../application/services/todo-list.service";
import { TodoListRepository } from "../../infrastructure/repositories/todo-list.repository";
import { CreateTodoListSagas } from "../../application/sagas/create-todo-list.saga";
import { ListCommandHandllers, ListQueryHandllers } from "../../application/handlers";
import { UserModule } from '../../../user/presentation/modules/user.module';
import { TodoItemModule } from '../../../todo-item/presentation/modules/todo-item.module';

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
        ...ListCommandHandllers,
        ...ListQueryHandllers
    ],
    exports: [TodoListService]
})
export class TodoListModule { }