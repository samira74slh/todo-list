import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTodoItemByIdQuery } from '../queries/get-todo-item.query';
import { TodoItemRepository } from "../../infrastructure/repositories/todo-item.repository";
import { TodoItemDocument } from "../../infrastructure/database/todo-item.schema";

@QueryHandler(GetTodoItemByIdQuery)
export class GetTodoItemByIdHandler implements IQueryHandler<GetTodoItemByIdQuery> {
    constructor(private readonly todoItemRepository: TodoItemRepository) { }

    async execute(query: GetTodoItemByIdQuery): Promise<TodoItemDocument> {
        return this.todoItemRepository.findById(query.id);
    }
}