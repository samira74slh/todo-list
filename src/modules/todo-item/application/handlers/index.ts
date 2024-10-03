import { BulkCreateTodoItemHandler } from "./bulk-create-todo-item.handler";
import { CancelBulkCreateTodoItemHandler } from './cancel-bulk-create-todo-item.handler';
import { DeleteItemByListIdHandler } from "./delete-item-by-list-id.handler";
import { DeleteTodoItemHandler } from "./delete-todo-item.handler";
import { GetTodoItemByIdHandler } from "./get-todo-item.handler";
import { GetTodoItemsHandler } from "./get-todo-items.handler";
import { RevertUpdateTodoListHandler } from "./revert-update-todo-item.handler";
import { UpdateTodoItemHandler } from "./update-todo-item.handler";

export const ItemCommandHandllers = [
    BulkCreateTodoItemHandler,
    CancelBulkCreateTodoItemHandler,
    DeleteItemByListIdHandler,
    DeleteTodoItemHandler,
    UpdateTodoItemHandler,
    RevertUpdateTodoListHandler
];
export const ItemQueryHandllers = [
    GetTodoItemByIdHandler,
    GetTodoItemsHandler
];
