import { AddUserTodoListsCommand } from "../commands/add-user-todo-lists.command";
import { AddUserTodoListsHandller } from "./add-user-todo-lists.handller";
import { CreateUserHandler } from "./create-user.handler";
import { DeleteUserTodoListsHandler } from "./delete-user-todo-lists.handller";
import { GetUserByFilterHandler } from "./get-user-by-filter.handler";
import { GetUserHandler } from "./get-user.handler";
import { SendWelcomeMsgHandler } from "./user-welcome.handler";

export const UserCommandHandlers = [
    CreateUserHandler,
    AddUserTodoListsHandller,
    DeleteUserTodoListsHandler
];

export const UserQueryHandlers = [
    GetUserByFilterHandler,
    GetUserHandler
];

export const UserEventHandlers = [
    SendWelcomeMsgHandler
];
