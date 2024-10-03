import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddUserTodoListsCommand } from "../commands/add-user-todo-lists.command";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { UserDocument } from "../../infrastructure/database/user.schema";
import { DeleteUserTodoListsCommand } from "../commands/delete-user-todo-lists.command";

@CommandHandler(DeleteUserTodoListsCommand)
export class DeleteUserTodoListsHandler implements ICommandHandler<DeleteUserTodoListsCommand> {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute({ id, todoLists }: DeleteUserTodoListsCommand): Promise<UserDocument> {
        return await this.userRepository.update(id, { $pullAll: { todoLists: { $each: todoLists } } })
    }
}