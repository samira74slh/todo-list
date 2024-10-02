import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddUserTodoListsCommand } from "../commands/add-user-todo-lists.command";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { UserDocument } from "../../infrastructure/database/user.schema";

@CommandHandler(AddUserTodoListsCommand)
export class AddUserTodoListsHandller implements ICommandHandler<AddUserTodoListsCommand> {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute({ id, todoLists }: AddUserTodoListsCommand): Promise<UserDocument> {
        return await this.userRepository.update(id, { $push: { todoLists: { $each: todoLists } } })
    }
}