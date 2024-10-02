import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TodoListRepository } from "../../infrastructure/repositories/todo-list.repository";
import { TodoListDocument } from "../../infrastructure/database/todo-list.schema";
import { GetTodoListsQuery } from "../queries/get-todo-listes.query";

@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
    constructor(private readonly todoListRepository: TodoListRepository) { }

    async execute({ id }: GetTodoListsQuery): Promise<TodoListDocument[]> {
        return this.todoListRepository.find({ userId: id });
    }
}