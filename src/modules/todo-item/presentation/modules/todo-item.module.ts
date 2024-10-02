import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"; import { AuthModule } from "src/modules/auth/presentation/modules/auth.module";
import { CqrsModule } from "@nestjs/cqrs";
import { TodoItemController } from "../controllers/todo-item.controller";
import { TodoItem, TodoItemSchema } from "../../infrastructure/database/todo-item.schema";
import { TodoItemService } from "../../application/services/todo-item.service";
import { TodoItemRepository } from "../../infrastructure/repositories/todo-item.repository";
import { BulkCreateTodoItemHandler } from "../../application/handlers/bulk-create-todo-item.handler";
import { GetTodoItemsHandler } from "../../application/handlers/get-todo-items.handler";
import { GetTodoItemByIdHandler } from "../../application/handlers/get-todo-item.handler";
import { UpdateTodoItemHandler } from "../../application/handlers/update-todo-item.handler";
import { DeleteTodoItemHandler } from "../../application/handlers/delete-todo-item.handler";
import { UserModule } from "src/modules/user/presentation/modules/user.module";
import { TodoListModule } from "src/modules/todo-list/presentation/modules/todo-list.module";
import { BulkCreateTodoItemsSagas } from "../../application/sagas/bulk-create-todo-items.saga";

@Module({
    imports: [
        CqrsModule,
        forwardRef(() => UserModule),
        forwardRef(() => TodoListModule),
        MongooseModule.forFeature([{ name: TodoItem.name, schema: TodoItemSchema }]),
    ],
    controllers: [TodoItemController],
    providers: [
        TodoItemService,
        TodoItemRepository,
        BulkCreateTodoItemsSagas,
        BulkCreateTodoItemHandler,
        UpdateTodoItemHandler,
        DeleteTodoItemHandler,
        GetTodoItemsHandler,
        GetTodoItemByIdHandler,
    ],
    exports: [TodoItemService]
})
export class TodoItemModule { }