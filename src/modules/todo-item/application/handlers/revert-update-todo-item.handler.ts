import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoItemRepository } from '../../infrastructure/repositories/todo-item.repository';
import { TodoItem, TodoItemDocument } from '../../infrastructure/database/todo-item.schema';
import { UpdateTodoItemCommand } from '../commands/update-todo-item.command';
import { RevertUpdateTodoListCommand } from '../commands/revert-update-todo-item.command';

@CommandHandler(RevertUpdateTodoListCommand)
export class RevertUpdateTodoListHandler implements ICommandHandler<RevertUpdateTodoListCommand> {
    constructor(
        private readonly todoItemRepository: TodoItemRepository
    ) { }

    async execute({ itemIds, id }: RevertUpdateTodoListCommand): Promise<TodoItemDocument> {
        return await this.todoItemRepository.update(id, { $pullAll: { todoListId: itemIds } });
    }
}