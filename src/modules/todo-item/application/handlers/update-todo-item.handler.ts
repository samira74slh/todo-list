import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoItemRepository } from '../../infrastructure/repositories/todo-item.repository';
import { TodoItem, TodoItemDocument } from '../../infrastructure/database/todo-item.schema';
import { UpdateTodoItemCommand } from '../commands/update-todo-item.command';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler implements ICommandHandler<UpdateTodoItemCommand> {
    constructor(
        private readonly todoItemRepository: TodoItemRepository
    ) { }

    async execute({ id, ...item }: UpdateTodoItemCommand): Promise<TodoItemDocument> {
        let todoItem = new TodoItem()
        let key = Object.keys(item);
        key.forEach(k => {
            todoItem[k] = item[k];
        });
        return await this.todoItemRepository.update(id, todoItem);
    }
}