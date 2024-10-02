import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoListRepository } from '../../infrastructure/repositories/todo-list.repository';
import { TodoList, TodoListDocument } from '../../infrastructure/database/todo-list.schema';
import { UpdateTodoListCommand } from '../commands/update-todo-list.command';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler implements ICommandHandler<UpdateTodoListCommand> {
    constructor(
        private readonly todoListRepository: TodoListRepository
    ) { }

    async execute({ id, title }: UpdateTodoListCommand): Promise<TodoListDocument> {
        let todoList = new TodoList();
        todoList.title = title;
        return await this.todoListRepository.update(id, todoList);
    }
}