import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoItemRepository } from '../../infrastructure/repositories/todo-item.repository';
import { TodoItem, TodoItemDocument } from '../../infrastructure/database/todo-item.schema';
import { BulkCreateTodoItemCommand } from '../commands/bulk-create-todo-item.command';
import { CancelBulkCreateTodoItemCommand } from '../commands/cancel-bulk-create-todo-item.command';

@CommandHandler(CancelBulkCreateTodoItemCommand)
export class CancelBulkCreateTodoItemHandler implements ICommandHandler<CancelBulkCreateTodoItemCommand> {
    constructor(
        private readonly todoItemRepository: TodoItemRepository
    ) { }

    async execute({ itemIds }: CancelBulkCreateTodoItemCommand): Promise<TodoItemDocument[]> {
        return await this.todoItemRepository.deleteMany({ _id: { $in: itemIds } });
    }
}