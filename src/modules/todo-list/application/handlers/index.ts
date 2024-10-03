import { CreateTodoListSagas } from "../sagas/create-todo-list.saga";
import { CreateTodoListHandler } from "./create-todo-list.handler";
import { DeleteTodoListHandler } from "./delete-todo-list.handler";
import { GetTodoListByIdHandler } from "./get-todo-list.handler";
import { GetTodoListsHandler } from "./get-todo-lists.handler";
import { UpdateTodoListHandler } from "./update-todo-list.handler";

export const ListCommandHandllers = [
    CreateTodoListHandler,
    UpdateTodoListHandler,
    DeleteTodoListHandler
];
export const ListQueryHandllers = [
    GetTodoListsHandler,
    GetTodoListByIdHandler
];
