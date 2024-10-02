import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoItemRepository } from '../../infrastructure/repositories/todo-item.repository';
import { TodoItem, TodoItemDocument } from '../../infrastructure/database/todo-item.schema';
import { BulkCreateTodoItemCommand } from '../commands/bulk-create-todo-item.command';

@CommandHandler(BulkCreateTodoItemCommand)
export class BulkCreateTodoItemHandler implements ICommandHandler<BulkCreateTodoItemCommand> {
    constructor(
        private readonly todoItemRepository: TodoItemRepository
    ) { }

    async execute({ todoItems }: BulkCreateTodoItemCommand): Promise<TodoItemDocument[]> {
        let items: TodoItem[] = [];
        for (const item of todoItems) {
            let todoItem = new TodoItem();
            todoItem.title = item.title;
            todoItem.description = item.description;
            todoItem.priority = item.priority.getValue();
            todoItem.todoListId = item.todoListId;
            items.push(todoItem);
        }
        return await this.todoItemRepository.bulkCreate(items);
    }
}