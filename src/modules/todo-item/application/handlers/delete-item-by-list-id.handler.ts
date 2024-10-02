import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TodoItemRepository } from "../../infrastructure/repositories/todo-item.repository";
import { DeleteItemByListIdCommand } from "../commands/delete-item-by-list-id.command";

@CommandHandler(DeleteItemByListIdCommand)
export class DeleteItemByListIdHandler implements ICommandHandler<DeleteItemByListIdCommand> {
    constructor(
        private readonly todoItemRepository: TodoItemRepository
    ) { }

    async execute({ id }: DeleteItemByListIdCommand): Promise<void> {
        return await this.todoItemRepository.deleteMany({ todoListId: id });
    }
}