import { IEvent } from "@nestjs/cqrs";
import { CreateTodoItemDto } from "../dto/create-todo-item.dto";

export class BulkCreateTodoListEvent implements IEvent {
  constructor(
    public todoItems: CreateTodoItemDto[]
  ) { }
}