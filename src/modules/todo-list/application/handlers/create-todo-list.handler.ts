import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoListRepository } from '../../infrastructure/repositories/todo-list.repository';
import { TodoList, TodoListDocument } from '../../infrastructure/database/todo-list.schema';
import { CreateTodoListCommand } from '../commands/create-todo-list.command';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
    constructor(
        private readonly todoListRepository: TodoListRepository
    ) { }

    async execute({ title, userId, todoItems }: CreateTodoListCommand): Promise<TodoListDocument> {
        let todoList = new TodoList();
        todoList.title = title;
        todoList.userId = userId;
        if (todoItems?.length > 0) todoList.todoItems = todoItems;
        return await this.todoListRepository.create(todoList);
    }
}