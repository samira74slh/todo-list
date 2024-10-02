import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoListRepository } from '../../infrastructure/repositories/todo-list.repository';
import { DeleteTodoListCommand } from '../commands/delete-todo-list.command';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler implements ICommandHandler<DeleteTodoListCommand> {
    constructor(
        private readonly todoListRepository: TodoListRepository
    ) { }

    async execute({ id }: DeleteTodoListCommand): Promise<void> {
        return await this.todoListRepository.delete(id);
    }
}