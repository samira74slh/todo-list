import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TodoItemRepository } from "../../infrastructure/repositories/todo-item.repository";
import { TodoItemDocument } from "../../infrastructure/database/todo-item.schema";
import { GetTodoItemsQuery } from "../queries/get-todo-items.query";

@QueryHandler(GetTodoItemsQuery)
export class GetTodoItemsHandler implements IQueryHandler<GetTodoItemsQuery> {
    constructor(private readonly todoItemRepository: TodoItemRepository) { }

    async execute({ id }: GetTodoItemsQuery): Promise<TodoItemDocument[]> {
        return this.todoItemRepository.find({ todoListId: id });
    }
}