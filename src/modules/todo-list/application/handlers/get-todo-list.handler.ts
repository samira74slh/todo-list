import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTodoListByIdQuery } from '../queries/get-todo-list.query';
import { TodoListRepository } from "../../infrastructure/repositories/todo-list.repository";
import { TodoListDocument } from "../../infrastructure/database/todo-list.schema";

@QueryHandler(GetTodoListByIdQuery)
export class GetTodoListByIdHandler implements IQueryHandler<GetTodoListByIdQuery> {
    constructor(private readonly todoListRepository: TodoListRepository) { }

    async execute(query: GetTodoListByIdQuery): Promise<TodoListDocument> {
        return this.todoListRepository.findById(query.id);
    }
}