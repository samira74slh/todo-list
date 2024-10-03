import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CqrsModule } from "@nestjs/cqrs";
import { TodoItemController } from "../controllers/todo-item.controller";
import { TodoItem, TodoItemSchema } from "../../infrastructure/database/todo-item.schema";
import { TodoItemService } from "../../application/services/todo-item.service";
import { TodoItemRepository } from "../../infrastructure/repositories/todo-item.repository";
import { BulkCreateTodoItemsSagas } from "../../application/sagas/bulk-create-todo-items.saga";
import { UserModule } from '../../../user/presentation/modules/user.module';
import { TodoListModule } from '../../../todo-list/presentation/modules/todo-list.module';
import { ItemCommandHandllers, ItemQueryHandllers } from "../../application/handlers";

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
        ...ItemCommandHandllers,
        ...ItemQueryHandllers
    ],
    exports: [TodoItemService]
})
export class TodoItemModule { }